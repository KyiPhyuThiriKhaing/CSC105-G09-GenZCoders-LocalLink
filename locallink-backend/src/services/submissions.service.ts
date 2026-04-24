import type {
  CreateSubmissionInput,
  Submission,
  SubmissionStatus,
} from "../models/submission.model";

const NOT_IMPLEMENTED = "NOT_IMPLEMENTED";

export const listSubmissions = async (): Promise<Submission[]> => {
  throw new Error(NOT_IMPLEMENTED);
};

export const getSubmissionById = async (_id: string): Promise<Submission | null> => {
  throw new Error(NOT_IMPLEMENTED);
};

export const createSubmission = async (_payload: CreateSubmissionInput): Promise<Submission> => {
  throw new Error(NOT_IMPLEMENTED);
};

export const updateSubmissionStatus = async (_id: string, _status: SubmissionStatus): Promise<Submission | null> => {
  throw new Error(NOT_IMPLEMENTED);
};

export const deleteSubmission = async (_id: string): Promise<void> => {
  throw new Error(NOT_IMPLEMENTED);
};
