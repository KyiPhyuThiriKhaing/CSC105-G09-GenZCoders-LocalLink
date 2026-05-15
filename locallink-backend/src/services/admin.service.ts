import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";
import { signAdminToken } from "../lib/jwt";

export type AccountStatus = "ACTIVE" | "PENDING" | "SUSPENDED";
export type VerificationStatus = "PENDING" | "APPROVED" | "REJECTED";
export type AdminActionType =
  | "VERIFY_APPROVE"
  | "VERIFY_REJECT"
  | "USER_SUSPEND"
  | "USER_ACTIVATE"
  | "USER_DELETE";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "minthuta@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "68130500839";

export interface DashboardStats {
  totalUsers: number;
  totalJobs: number;
  totalSubmissions: number;
  pendingSubmissions: number;
}

const ensureAdminUser = async () => {
  const existing = await prisma.user.findUnique({ where: { email: ADMIN_EMAIL } });
  const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);

  if (!existing) {
    return prisma.user.create({
      data: {
        email: ADMIN_EMAIL,
        passwordHash: hashed,
        fullName: "Admin User",
        role: "ADMIN",
        status: "ACTIVE",
      },
    });
  }

  if (existing.role !== "ADMIN") {
    await prisma.user.update({
      where: { id: existing.id },
      data: { role: "ADMIN" },
    });
  }

  return existing;
};

export const adminLogin = async (email: string, password: string) => {
  if (email === ADMIN_EMAIL) {
    await ensureAdminUser();
  }

  const admin = await prisma.user.findUnique({ where: { email } });
  if (!admin) {
    return null;
  }

  if (admin.role !== "ADMIN" || admin.status !== "ACTIVE") {
    return null;
  }

  const matches = await bcrypt.compare(password, admin.passwordHash);
  if (!matches) {
    return null;
  }

  const updated = await prisma.user.update({
    where: { id: admin.id },
    data: { lastLoginAt: new Date() },
    select: { id: true, email: true, fullName: true },
  });

  const token = signAdminToken({ sub: updated.id, role: "ADMIN" });
  return { token, admin: updated };
};

export const getAdminProfile = async (adminId: string) =>
  prisma.user.findUnique({
    where: { id: adminId },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      status: true,
      joinedAt: true,
      lastLoginAt: true,
    },
  });

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

export interface AdminsQuery {
  page: number;
  pageSize: number;
  status: AccountStatus | null;
  search: string;
  sort: string;
}

export interface AdminActionsQuery {
  page: number;
  pageSize: number;
  action: AdminActionType | null;
  actorId: string | null;
  targetUserId: string | null;
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
            { fullName: { contains: search } },
            { email: { contains: search } },
            { phone: { contains: search } },
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

    if (actorId) {
      await tx.adminAction.create({
        data: {
          action: "USER_DELETE",
          actorId,
          targetUserId: userId,
        },
      });
    }

    await tx.user.delete({ where: { id: userId } });
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
            { user: { fullName: { contains: search } } },
            { user: { email: { contains: search } } },
            { user: { phone: { contains: search } } },
            { documents: { some: { fileName: { contains: search } } } },
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

export const listAdmins = async (query: AdminsQuery) => {
  const { page, pageSize, status, search, sort } = query;
  const skip = (page - 1) * pageSize;
  const orderBy = sort === "oldest" ? { joinedAt: "asc" as const } : { joinedAt: "desc" as const };

  const where = {
    role: "ADMIN" as const,
    ...(status ? { status } : {}),
    ...(search
      ? {
          OR: [
            { fullName: { contains: search, mode: "insensitive" as const } },
            { email: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [total, admins] = await prisma.$transaction([
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
        status: true,
        joinedAt: true,
        lastLoginAt: true,
      },
    }),
  ]);

  return {
    data: admins,
    meta: {
      page,
      pageSize,
      total,
    },
  };
};

export const createAdmin = async (payload: { fullName: string; email: string; password: string }) => {
  const existing = await prisma.user.findUnique({ where: { email: payload.email } });
  if (existing) {
    return null;
  }

  const passwordHash = await bcrypt.hash(payload.password, 10);

  return prisma.user.create({
    data: {
      email: payload.email,
      fullName: payload.fullName,
      passwordHash,
      role: "ADMIN",
      status: "ACTIVE",
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      status: true,
      joinedAt: true,
    },
  });
};

export const updateAdminAccountStatus = async (adminId: string, status: AccountStatus) => {
  const existing = await prisma.user.findUnique({ where: { id: adminId } });
  if (!existing || existing.role !== "ADMIN") {
    return null;
  }

  return prisma.user.update({
    where: { id: adminId },
    data: { status },
    select: {
      id: true,
      fullName: true,
      email: true,
      status: true,
      joinedAt: true,
      lastLoginAt: true,
    },
  });
};

export const changeAdminPassword = async (adminId: string, currentPassword: string, newPassword: string) => {
  const admin = await prisma.user.findUnique({ where: { id: adminId } });
  if (!admin || admin.role !== "ADMIN") {
    return null;
  }

  const matches = await bcrypt.compare(currentPassword, admin.passwordHash);
  if (!matches) {
    return false;
  }

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: adminId },
    data: { passwordHash },
  });

  return true;
};

export const listAdminActions = async (query: AdminActionsQuery) => {
  const { page, pageSize, action, actorId, targetUserId } = query;
  const skip = (page - 1) * pageSize;

  const where = {
    ...(action ? { action } : {}),
    ...(actorId ? { actorId } : {}),
    ...(targetUserId ? { targetUserId } : {}),
  };

  const [total, actions] = await prisma.$transaction([
    prisma.adminAction.count({ where }),
    prisma.adminAction.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
      select: {
        id: true,
        action: true,
        details: true,
        createdAt: true,
        actor: {
          select: { id: true, fullName: true, email: true },
        },
        targetUser: {
          select: { id: true, fullName: true, email: true },
        },
        submission: {
          select: { id: true, status: true },
        },
      },
    }),
  ]);

  return {
    data: actions,
    meta: {
      page,
      pageSize,
      total,
    },
  };
};