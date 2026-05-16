export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  imageUrl: string | null;
  payoutMin: unknown;
  payoutMax: unknown;
  payoutCurrency: string;
  payoutType: string | null;
  payoutText: string | null;
  durationText: string | null;
  contactInfo: string | null;
  requirementsText: string | null;
  status: string;
  postedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  posterId: string;
}

export interface CreateJobInput {
  title: string;
  description: string;
  location: string;
  posterId: string;
  imageUrl?: string;
  payoutText?: string;
  durationText?: string;
  contactInfo?: string;
  requirementsText?: string;
}

export interface UpdateJobInput {
  title?: string;
  description?: string;
  location?: string;
  imageUrl?: string;
  payoutText?: string;
  durationText?: string;
  status?: "OPEN" | "ASSIGNED" | "COMPLETED" | "CANCELLED";
}
