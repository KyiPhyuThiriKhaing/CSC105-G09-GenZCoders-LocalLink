import type {
  CreateSubmissionInput,
  Submission,
  SubmissionStatus,
  UpdateSubmissionStatusInput,
} from "../models/submission.model";
import { prisma } from "../lib/prisma";

const selectSubmission = {
  id: true,
  userId: true,
  status: true,
  submittedAt: true,
  reviewedAt: true,
  notes: true,
  adminComment: true,
  documents: {
    select: {
      id: true,
      fileName: true,
      fileUrl: true,
      mimeType: true,
      fileSize: true,
    },
  },
};

export const listSubmissions = async (): Promise<Submission[]> =>
  prisma.verificationSubmission.findMany({
    orderBy: { submittedAt: "desc" },
    select: selectSubmission,
  });

export const getSubmissionById = async (id: string): Promise<Submission | null> =>
  prisma.verificationSubmission.findUnique({
    where: { id },
    select: selectSubmission,
  });

export const createSubmission = async (payload: CreateSubmissionInput): Promise<Submission> => {
  const documents = payload.documents.map((doc) => ({
    fileName: doc.fileName,
    fileUrl: doc.fileUrl,
    mimeType: doc.mimeType ?? null,
    fileSize: doc.fileSize ?? null,
  }));

  return prisma.verificationSubmission.create({
    data: {
      userId: payload.userId,
      notes: payload.notes ?? null,
      documents: {
        create: documents,
      },
    },
    select: selectSubmission,
  });
};

export const updateSubmissionStatus = async (
  id: string,
  payload: SubmissionStatus | UpdateSubmissionStatusInput,
): Promise<Submission | null> => {
  const updatePayload: UpdateSubmissionStatusInput =
    typeof payload === "string" ? { status: payload } : payload;

  const existing = await prisma.verificationSubmission.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!existing) {
    return null;
  }

  return prisma.verificationSubmission.update({
    where: { id },
    data: {
      status: updatePayload.status,
      adminComment: updatePayload.adminComment ?? null,
      notes: updatePayload.notes ?? null,
      reviewedAt: new Date(),
      reviewedById: updatePayload.reviewedById ?? null,
    },
    select: selectSubmission,
  });
};

export const deleteSubmission = async (id: string): Promise<void> => {
  await prisma.verificationSubmission.delete({ where: { id } });
};
