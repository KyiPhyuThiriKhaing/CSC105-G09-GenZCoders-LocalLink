export type SubmissionStatus = "Pending" | "Approved" | "Rejected";

export type Submission = {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  status: SubmissionStatus;
  documents: string[];
  notes: string;
};
