export type SubmissionStatus = "pending" | "reviewed" | "accepted" | "rejected";

export interface Submission {
  id: string;
  jobId: string;
  applicantUserId: string;
  coverLetter: string;
  status: SubmissionStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSubmissionInput {
  jobId: string;
  applicantUserId: string;
  coverLetter: string;
}

export interface UpdateSubmissionStatusInput {
  status: SubmissionStatus;
}
