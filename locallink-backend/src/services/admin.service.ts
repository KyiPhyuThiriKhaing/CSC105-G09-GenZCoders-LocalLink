import { prisma } from "../lib/prisma";

export type AccountStatus = "ACTIVE" | "PENDING" | "SUSPENDED";
export type VerificationStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface DashboardStats {
  totalUsers: number;
  totalJobs: number;
  totalSubmissions: number;
  pendingSubmissions: number;
}

export interface AdminUsersQuery {
  page: number;
  pageSize: number;
  status: AccountStatus | null;
  search: string;
  sort: string;
}

export interface AdminSubmissionsQuery {
  page: number;
  pageSize: number;
  status: VerificationStatus | null;
  search: string;
  sort: string;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const [totalUsers, totalJobs, totalSubmissions, pendingSubmissions] =
    await prisma.$transaction([
      prisma.user.count(),
      prisma.job.count(),
      prisma.verificationSubmission.count(),
      prisma.verificationSubmission.count({ where: { status: "PENDING" } }),
    ]);

  return {
    totalUsers,
    totalJobs,
    totalSubmissions,
    pendingSubmissions,
  };
};

export const listAdminUsers = async (query: AdminUsersQuery) => {
  const { page, pageSize, status, search, sort } = query;
  const skip = (page - 1) * pageSize;
  const orderBy = sort === "oldest" ? { joinedAt: "asc" as const } : { joinedAt: "desc" as const };

  const where = {
    ...(status ? { status } : {}),
    ...(search
      ? {
          OR: [
            { fullName: { contains: search, mode: "insensitive" as const } },
            { email: { contains: search, mode: "insensitive" as const } },
            { phone: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [total, users] = await prisma.$transaction([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where,
      orderBy,
      skip,
      take: pageSize,
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        status: true,
        joinedAt: true,
        role: true,
      },
    }),
  ]);

  return {
    data: users,
    meta: {
      page,
      pageSize,
      total,
    },
  };
};

export const updateAdminUserStatus = async (
  userId: string,
  status: AccountStatus,
  actorId?: string,
) => {
  return prisma.$transaction(async (tx) => {
    const updated = await tx.user.update({
      where: { id: userId },
      data: { status },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        status: true,
        joinedAt: true,
        role: true,
      },
    });

    if (actorId) {
      await tx.adminAction.create({
        data: {
          action: status === "SUSPENDED" ? "USER_SUSPEND" : "USER_ACTIVATE",
          actorId,
          targetUserId: userId,
        },
      });
    }

    return updated;
  }).catch(() => null);
};

export const deleteAdminUser = async (userId: string, actorId?: string) => {
  return prisma.$transaction(async (tx) => {
    const existing = await tx.user.findUnique({ where: { id: userId } });
    if (!existing) {
      return null;
    }

    await tx.user.delete({ where: { id: userId } });

    if (actorId) {
      await tx.adminAction.create({
        data: {
          action: "USER_DELETE",
          actorId,
          targetUserId: userId,
        },
      });
    }

    return existing;
  });
};

export const listAdminSubmissions = async (query: AdminSubmissionsQuery) => {
  const { page, pageSize, status, search, sort } = query;
  const skip = (page - 1) * pageSize;
  const orderBy = sort === "oldest" ? { submittedAt: "asc" as const } : { submittedAt: "desc" as const };

  const where = {
    ...(status ? { status } : {}),
    ...(search
      ? {
          OR: [
            { user: { fullName: { contains: search, mode: "insensitive" as const } } },
            { user: { email: { contains: search, mode: "insensitive" as const } } },
            { user: { phone: { contains: search, mode: "insensitive" as const } } },
            { documents: { some: { fileName: { contains: search, mode: "insensitive" as const } } } },
          ],
        }
      : {}),
  };

  const [total, submissions] = await prisma.$transaction([
    prisma.verificationSubmission.count({ where }),
    prisma.verificationSubmission.findMany({
      where,
      orderBy,
      skip,
      take: pageSize,
      select: {
        id: true,
        status: true,
        submittedAt: true,
        reviewedAt: true,
        notes: true,
        adminComment: true,
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
        documents: {
          select: {
            id: true,
            fileName: true,
            fileUrl: true,
            mimeType: true,
            fileSize: true,
          },
        },
      },
    }),
  ]);

  return {
    data: submissions,
    meta: {
      page,
      pageSize,
      total,
    },
  };
};

export const getAdminSubmissionById = async (submissionId: string) => {
  return prisma.verificationSubmission.findUnique({
    where: { id: submissionId },
    select: {
      id: true,
      status: true,
      submittedAt: true,
      reviewedAt: true,
      notes: true,
      adminComment: true,
      user: {
        select: {
          id: true,
          fullName: true,
          email: true,
          phone: true,
        },
      },
      documents: {
        select: {
          id: true,
          fileName: true,
          fileUrl: true,
          mimeType: true,
          fileSize: true,
        },
      },
    },
  });
};

export const updateAdminSubmissionStatus = async (
  submissionId: string,
  payload: {
    status: VerificationStatus;
    actorId?: string;
    adminComment?: string;
    notes?: string;
  },
) => {
  const { status, actorId, adminComment, notes } = payload;

  return prisma.$transaction(async (tx) => {
    const existing = await tx.verificationSubmission.findUnique({
      where: { id: submissionId },
      select: { id: true, userId: true },
    });

    if (!existing) {
      return null;
    }

    const updated = await tx.verificationSubmission.update({
      where: { id: submissionId },
      data: {
        status,
        adminComment,
        notes,
        reviewedAt: new Date(),
        reviewedById: actorId,
      },
      select: {
        id: true,
        status: true,
        submittedAt: true,
        reviewedAt: true,
        notes: true,
        adminComment: true,
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
        documents: {
          select: {
            id: true,
            fileName: true,
            fileUrl: true,
            mimeType: true,
            fileSize: true,
          },
        },
      },
    });

    if (status === "APPROVED") {
      await tx.user.update({
        where: { id: existing.userId },
        data: {
          idVerifiedAt: new Date(),
          status: "ACTIVE",
        },
      });
    }

    if (actorId) {
      await tx.adminAction.create({
        data: {
          action: status === "APPROVED" ? "VERIFY_APPROVE" : "VERIFY_REJECT",
          actorId,
          targetUserId: existing.userId,
          submissionId,
        },
      });
    }

    return updated;
  });
};