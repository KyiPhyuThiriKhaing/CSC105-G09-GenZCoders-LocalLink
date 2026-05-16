import { useEffect, useState } from "react";
import {
  ArrowLeftIcon,
  DrawingPinIcon,
  ClockIcon,
} from "@radix-ui/react-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../lib/apiClient";
import { getAuthToken } from "../lib/authApi";
import { useCurrentUser } from "../lib/useCurrentUser";
import {
  applyToJob,
  fetchMyApplication,
  type ApplicationStatus,
} from "../lib/jobsApi";
import type { Job } from "../pages/JobsPage";

const APPLIED_LABEL: Record<ApplicationStatus, string> = {
  APPLIED: "Applied",
  CONTACTED: "Contacted",
  OFFERED: "Offered",
  ACCEPTED: "Accepted",
  REJECTED: "Application rejected",
  WITHDRAWN: "Application withdrawn",
  COMPLETED: "Completed",
};

export default function JobDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const isEmailVerified = Boolean(user?.emailVerifiedAt);
  const isDocumentVerified = Boolean(user?.idVerifiedAt);
  const [job, setJob] = useState<Job | null>(null);
  const [posterId, setPosterId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [applicationStatus, setApplicationStatus] =
    useState<ApplicationStatus | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [applyError, setApplyError] = useState<string | null>(null);

  const isAuthed = Boolean(getAuthToken());
  const isOwnJob = Boolean(user?.id && posterId && user.id === posterId);
  const hasApplied = applicationStatus !== null;

  useEffect(() => {
    if (!id) return;

    apiClient.get<{ data: Record<string, unknown> }>(`/jobs/${id}`)
      .then(({ data }) => {
        const j = data.data as any; // Using any specifically to access nested relationships for the mock UI right now
        const posterName = j.poster?.fullName || "LocalLink User";
        const posterAvatar = j.poster?.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${String(j.posterId)}`;

        setPosterId(j.posterId ? String(j.posterId) : null);
        setJob({
          id: String(j.id),
          title: String(j.title),
          description: String(j.description),
          location: String(j.location),
          status: String(j.status),
          image: j.imageUrl ? String(j.imageUrl) : "", // Blank if no image provided
          feeRange: j.payoutText ? String(j.payoutText) : "฿—",
          timeRange: j.durationText ? String(j.durationText) : "—",
          postedAt: new Date(String(j.postedAt)).toLocaleDateString(),
          poster: {
            name: posterName,
            avatar: posterAvatar
          },
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!id || !isAuthed) {
      setApplicationStatus(null);
      return;
    }
    let cancelled = false;
    fetchMyApplication(id)
      .then((existing) => {
        if (!cancelled) setApplicationStatus(existing?.status ?? null);
      })
      .catch(() => {
        if (!cancelled) setApplicationStatus(null);
      });
    return () => {
      cancelled = true;
    };
  }, [id, isAuthed]);

  const handleApply = async () => {
    if (!id) return;
    if (!isAuthed) {
      navigate("/login");
      return;
    }
    if (!isDocumentVerified) {
      // Do nothing if document not verified (label shows Document Unverified)
      return;
    }
    if (isOwnJob || hasApplied || isApplying) return;

    setIsApplying(true);
    setApplyError(null);
    try {
      const created = await applyToJob(id);
      setApplicationStatus(created.status);
    } catch (err) {
      setApplyError(err instanceof Error ? err.message : "Unable to apply.");
    } finally {
      setIsApplying(false);
    }
  };

  const handleMessage = async () => {
    if (!id) return;
    if (!isAuthed) {
      navigate("/login");
      return;
    }
    if (isClosed) return;
    if (isOwnJob) return;
    if (!isEmailVerified) return; // block messaging for unverified email

    const params = new URLSearchParams();
    params.set("jobId", id);
    if (job?.title) {
      params.set("jobTitle", job.title);
    }
    navigate(`/profile/chat?${params.toString()}`);
  };

  const isClosed = job?.status !== "OPEN";
  const applyDisabled = isOwnJob || hasApplied || isApplying || isClosed || (!isAuthed ? false : !isDocumentVerified);
  const applyLabel = !isAuthed
    ? "Log in to Apply"
    : isOwnJob
      ? "Your Job"
      : isApplying
        ? "Applying…"
        : hasApplied
          ? APPLIED_LABEL[applicationStatus!] ?? "Applied"
          : isClosed
            ? "Applications Closed"
          : !isDocumentVerified
            ? "Document Unverified"
            : "Apply Now";

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-lg font-medium text-slate-500 animate-pulse">Loading job details...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50">
        <p className="text-lg font-medium text-slate-500">Job not found.</p>
        <Link to="/jobs" className="text-(--color-brand-primary) font-bold hover:underline">Return to Jobs</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-24 lg:pb-20">
      <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6 lg:px-8 lg:pt-10">
        <Link
          to="/jobs"
          className="group mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-slate-900"
        >
          <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Jobs
        </Link>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Main Content */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="mb-8 overflow-hidden rounded-4xl bg-slate-100">
              <div className="relative aspect-4/3 w-full lg:aspect-video flex items-center justify-center bg-slate-200">
                {job.image ? (
                  <img
                    src={job.image}
                    alt={job.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-lg font-medium text-slate-400">No Image</span>
                )}
                <div className="absolute top-4 right-4 inline-flex h-8 items-center rounded-full bg-white/90 backdrop-blur-md px-3 text-xs font-bold tracking-wide text-slate-900 shadow-sm">
                  {job.postedAt}
                </div>
              </div>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-tight">
              {job.title}
            </h1>

            <div className="mt-8 flex flex-wrap items-center gap-6 border-y border-slate-200 py-6">
              <div className="flex items-center gap-3">
                <DrawingPinIcon className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Location</p>
                  <span className="text-sm font-bold text-slate-900">{job.location}</span>
                </div>
              </div>
              <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
              <div className="flex items-center gap-3">
                <ClockIcon className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Duration</p>
                  <span className="text-sm font-bold text-slate-900">{job.timeRange}</span>
                </div>
              </div>
            </div>

            {/* Mobile Poster Snapshot */}
            <div className="mt-8 flex items-center justify-between lg:hidden">
              <div className="flex items-center gap-4">
                {posterId && posterId !== user?.id ? (
                  <Link to={`/users/${posterId}`} className="flex items-center gap-4">
                    <img
                      src={job.poster.avatar}
                      alt={job.poster.name}
                      className="h-12 w-12 rounded-full object-cover border border-slate-200"
                    />
                  </Link>
                ) : (
                  <img
                    src={job.poster.avatar}
                    alt={job.poster.name}
                    className="h-12 w-12 rounded-full object-cover border border-slate-200"
                  />
                )}
                <div>
                  <p className="text-base font-bold text-slate-900">Posted by {job.poster.name}</p>
                  <p className="text-sm font-medium text-slate-500">Verified Local</p>
                </div>
              </div>
            </div>

            <div className="mt-10 mb-8 border-t border-slate-200 pt-8 lg:mt-12 lg:border-t-0 lg:pt-0">
              <h2 className="mb-5 text-xl font-bold text-slate-900">
                About the Job
              </h2>
              <div className="space-y-4">
                {job.description
                  .split("\n")
                  .filter(Boolean)
                  .map((paragraph, idx) => (
                    <p
                      key={idx}
                      className="text-base leading-relaxed text-slate-600"
                    >
                      {paragraph}
                    </p>
                  ))}
              </div>
            </div>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:col-span-5 xl:col-span-4 lg:block">
            <div className="sticky top-28 rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">
                    Payout
                  </p>
                  <p className="text-3xl font-extrabold tracking-tight text-slate-900 leading-none">
                    {job.feeRange}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleApply}
                  disabled={applyDisabled}
                  className={`w-full rounded-2xl py-4 text-base font-bold transition-transform active:scale-[0.98] ${
                    applyDisabled
                      ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                      : "bg-(--color-brand-primary) text-white shadow-md shadow-(--color-brand-primary)/20 hover:bg-(--color-brand-primary-hover)"
                  }`}
                >
                  {applyLabel}
                </button>
                <button
                  type="button"
                  onClick={handleMessage}
                  disabled={isOwnJob || isClosed || !isEmailVerified}
                  className={`w-full rounded-2xl py-4 text-base font-bold transition-colors ${
                    isOwnJob || isClosed || !isEmailVerified
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                  }`}
                >
                  {(!isAuthed && "Message") || (isClosed ? "Applications Closed" : !isEmailVerified ? "Email Unverified" : "Message")}
                </button>
              </div>
              {applyError ? (
                <p className="mt-3 text-sm font-semibold text-red-600">{applyError}</p>
              ) : null}
              {hasApplied && !applyError ? (
                <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Application Status</p>
                  <p className={`text-sm font-bold ${
                    applicationStatus === "ACCEPTED" || applicationStatus === "COMPLETED" ? "text-emerald-600" :
                    applicationStatus === "REJECTED" || applicationStatus === "WITHDRAWN" ? "text-red-500" :
                    applicationStatus === "OFFERED" ? "text-blue-600" :
                    applicationStatus === "CONTACTED" ? "text-purple-600" :
                    "text-orange-500"
                  }`}>
                    {applicationStatus === "APPLIED" && "Applied — waiting for the poster to review"}
                    {applicationStatus === "CONTACTED" && "Contacted — the poster reached out to you"}
                    {applicationStatus === "OFFERED" && "Offered — you've been offered this job"}
                    {applicationStatus === "ACCEPTED" && "Accepted — you've accepted the offer"}
                    {applicationStatus === "REJECTED" && "Application rejected"}
                    {applicationStatus === "WITHDRAWN" && "You withdrew this application"}
                    {applicationStatus === "COMPLETED" && "Completed"}
                  </p>
                </div>
              ) : null}

              <div className="my-6 border-t border-slate-200"></div>

              <div className="flex items-center justify-between">
                {posterId && posterId !== user?.id ? (
                  <Link to={`/users/${posterId}`} className="flex items-center gap-3">
                    <img
                      src={job.poster.avatar}
                      alt={job.poster.name}
                      className="h-10 w-10 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <p className="text-sm font-bold text-slate-900">{job.poster.name}</p>
                      <p className="text-xs text-slate-500">Verified Local</p>
                    </div>
                  </Link>
                ) : (
                  <div className="flex items-center gap-3">
                    <img
                      src={job.poster.avatar}
                      alt={job.poster.name}
                      className="h-10 w-10 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <p className="text-sm font-bold text-slate-900">{job.poster.name}</p>
                      <p className="text-xs text-slate-500">Verified Local</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky Apply bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white/90 px-5 py-4 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Payout
            </p>
            <p className="text-xl font-extrabold text-slate-900 mt-0.5">
              {job.feeRange}
            </p>
          </div>
          <button
            type="button"
            onClick={handleApply}
            disabled={applyDisabled}
            className={`flex-1 rounded-2xl py-3.5 text-sm font-bold transition-transform active:scale-95 ${
              applyDisabled
                ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                : "bg-(--color-brand-primary) text-white shadow-lg shadow-(--color-brand-primary)/20"
            }`}
          >
            {applyLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
