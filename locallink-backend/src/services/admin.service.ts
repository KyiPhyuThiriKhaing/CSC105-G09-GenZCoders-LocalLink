const NOT_IMPLEMENTED = "NOT_IMPLEMENTED";

export interface DashboardStats {
  totalUsers: number;
  totalJobs: number;
  totalSubmissions: number;
  pendingSubmissions: number;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  throw new Error(NOT_IMPLEMENTED);
};