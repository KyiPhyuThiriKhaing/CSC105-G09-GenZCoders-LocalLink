import type { CreateUserInput, UpdateUserInput, User } from "../models/user.model";
import { prisma } from "../lib/prisma";

type ReviewSummary = {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  editedAt: Date | null;
  deletedAt: Date | null;
  reviewer: {
    fullName: string;
    avatarUrl: string | null;
  };
  job: {
    title: string;
  };
};

type PublicUserProfile = {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  avatarUrl: string | null;
  bio: string | null;
  joinedAt: Date;
  emailVerifiedAt: Date | null;
  idVerifiedAt: Date | null;
  skills: string[];
  reviews: ReviewSummary[];
};

export const listUsers = async (): Promise<User[]> => {
  return prisma.user.findMany({ select: { id: true, fullName: true, email: true } });
};

export const getUserById = async (id: string): Promise<PublicUserProfile | null> => {
  const u = await prisma.user.findUnique({
    where: { id },
    include: {
      skills: { include: { skill: true } },
      reviewsReceived: {
        orderBy: { createdAt: "desc" },
        take: 6,
        include: {
          reviewer: { select: { id: true, fullName: true, avatarUrl: true } },
          job: { select: { title: true } },
        },
      },
    },
  });
  if (!u) return null;
  return {
    id: u.id,
    fullName: u.fullName,
    email: u.email,
    phone: u.phone ?? null,
    avatarUrl: u.avatarUrl ?? null,
    bio: u.bio ?? null,
    joinedAt: u.joinedAt,
    emailVerifiedAt: u.emailVerifiedAt ?? null,
    idVerifiedAt: u.idVerifiedAt ?? null,
    skills: u.skills?.map((s) => s.skill.name) ?? [],
    reviews: u.reviewsReceived.map((review) => ({
      id: review.id,
      rating: review.rating,
      comment: review.comment ?? null,
      createdAt: review.createdAt,
      editedAt: review.editedAt ?? null,
      deletedAt: review.deletedAt ?? null,
      reviewer: {
        id: review.reviewer.id,
        fullName: review.reviewer.fullName,
        avatarUrl: review.reviewer.avatarUrl ?? null,
      },
      job: {
        title: review.job.title,
      },
    })),
  };
};

export const createUserReview = async (
  reviewerId: string,
  revieweeId: string,
  rating: number,
  comment?: string | null,
) => {
  if (reviewerId === revieweeId) {
    throw new Error("You cannot review yourself");
  }

  const existingReview = await prisma.review.findFirst({
    where: { reviewerId, revieweeId },
    select: { id: true },
  });
  if (existingReview) {
    throw new Error("You have already reviewed this user");
  }

  const sharedJob = await prisma.job.findFirst({
    where: {
      OR: [
        {
          posterId: reviewerId,
          applications: {
            some: {
              applicantId: revieweeId,
              status: { in: ["ACCEPTED", "COMPLETED"] },
            },
          },
        },
        {
          posterId: revieweeId,
          applications: {
            some: {
              applicantId: reviewerId,
              status: { in: ["ACCEPTED", "COMPLETED"] },
            },
          },
        },
      ],
    },
    orderBy: { updatedAt: "desc" },
    select: { id: true },
  });

  if (!sharedJob) {
    throw new Error("No completed job found between these users");
  }

  return prisma.review.create({
    data: {
      jobId: sharedJob.id,
      reviewerId,
      revieweeId,
      rating,
      comment: comment?.trim() || null,
    },
    include: {
      reviewer: { select: { fullName: true, avatarUrl: true } },
      job: { select: { title: true } },
    },
  });
};

export const createUser = async (payload: CreateUserInput): Promise<User> => {
  return prisma.user.create({ data: { fullName: payload.fullName, email: payload.email, passwordHash: payload.password, role: payload.role as any } });
};

export const updateUser = async (id: string, payload: UpdateUserInput): Promise<User | null> => {
  return prisma.user.update({ where: { id }, data: { fullName: payload.fullName, email: payload.email, role: payload.role as any } });
};

export const deleteUser = async (id: string): Promise<void> => {
  await prisma.user.delete({ where: { id } });
};
