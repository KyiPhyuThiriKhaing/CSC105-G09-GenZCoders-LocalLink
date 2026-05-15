export type SubmissionStatus = "Pending" | "Approved" | "Rejected";

export type SubmissionDocument = {
  id: string;
  fileName: string;
  fileUrl: string;
};

export type Submission = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  date: string;
  status: SubmissionStatus;
  documents: SubmissionDocument[];
  notes: string;
};
