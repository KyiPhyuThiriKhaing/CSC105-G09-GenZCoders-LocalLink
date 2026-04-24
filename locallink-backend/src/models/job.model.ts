export interface Job {
  id: string;
  title: string;
  companyName: string;
  description: string;
  location: string;
  postedByUserId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateJobInput {
  title: string;
  companyName: string;
  description: string;
  location: string;
  postedByUserId: string;
}

export interface UpdateJobInput {
  title?: string;
  companyName?: string;
  description?: string;
  location?: string;
}
