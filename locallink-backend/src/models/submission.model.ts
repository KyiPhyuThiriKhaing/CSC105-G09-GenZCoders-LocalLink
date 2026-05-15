export type SubmissionStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface SubmissionDocumentInput {
  fileName: string;
  fileUrl: string;
  mimeType?: string | null;
  fileSize?: number | null;
}

export interface SubmissionDocument extends SubmissionDocumentInput {
  id: string;
}

export interface Submission {
  id: string;
  userId: string;
  status: SubmissionStatus;
  submittedAt: Date;
  reviewedAt?: Date | null;
  notes?: string | null;
  adminComment?: string | null;
  documents: SubmissionDocument[];
}

export interface CreateSubmissionInput {
  userId: string;
  documents: SubmissionDocumentInput[];
  notes?: string;
}

export interface UpdateSubmissionStatusInput {
  status: SubmissionStatus;
  adminComment?: string;
  notes?: string;
  reviewedById?: string;
}
