import {
  ExclamationTriangleIcon,
  UploadIcon,
  FileTextIcon,
  EnvelopeClosedIcon,
  CheckCircledIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import { useEffect, useMemo, useState } from "react";
import { useCurrentUser } from "../lib/useCurrentUser";
import { requestEmailVerification } from "../lib/authApi";
import {
  fetchMySubmission,
  uploadVerificationDocument,
  upsertMySubmission,
  type VerificationDocument,
  type VerificationSubmission,
} from "../lib/verificationApi";

export default function VerifyPage() {
  const { user } = useCurrentUser();
  const [submission, setSubmission] = useState<VerificationSubmission | null>(null);
  const [isLoadingSubmission, setIsLoadingSubmission] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [uploadedDocuments, setUploadedDocuments] = useState<VerificationDocument[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [notes, setNotes] = useState("");
  const [isRequestingEmail, setIsRequestingEmail] = useState(false);
  const [emailRequestError, setEmailRequestError] = useState("");

  const submissionStatus = submission?.status ?? "DRAFT";
  const isDocumentVerified = submissionStatus === "APPROVED";
  const isPending = submissionStatus === "PENDING";
  const isRejected = submissionStatus === "REJECTED";
  const isReadOnly = isDocumentVerified;

  const isEmailVerified = Boolean(user?.emailVerifiedAt);
  const isEmailRequestPending = Boolean(user?.emailVerificationRequestedAt);
  const isEmailButtonDisabled =
    isEmailVerified || isEmailRequestPending || isRequestingEmail;

  const canSubmitDocument = isEmailVerified;

  useEffect(() => {
    if (!user?.id) return;
    let isMounted = true;
    setIsLoadingSubmission(true);
    setSubmissionError("");
    fetchMySubmission(user?.id)
      .then((data) => {
        if (!isMounted) return;
        setSubmission(data);
        setUploadedDocuments(data?.documents ?? []);
        setNotes(data?.notes ?? "");
      })
      .catch((error) => {
        if (!isMounted) return;
        setSubmissionError(
          error instanceof Error ? error.message : "Unable to load submission.",
        );
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoadingSubmission(false);
      });
    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  const statusLabel = useMemo(() => {
    if (submissionStatus === "APPROVED") return "Verified";
    if (submissionStatus === "REJECTED") return "Rejected";
    if (submissionStatus === "PENDING") return "Pending Review";
    return "Not submitted";
  }, [submissionStatus]);

  const handleRequestEmailVerification = async () => {
    if (isEmailButtonDisabled) return;
    setEmailRequestError("");
    setIsRequestingEmail(true);
    try {
      await requestEmailVerification();
    } catch (error) {
      setEmailRequestError(
        error instanceof Error ? error.message : "Unable to request email verification.",
      );
    } finally {
      setIsRequestingEmail(false);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }

    if (isReadOnly) return;
    setUploadError("");
    setSubmitMessage("");
    setIsUploading(true);

    try {
      const uploads = await Promise.all(
        Array.from(files).map((file) => uploadVerificationDocument(file)),
      );
      setUploadedDocuments((prev) => [...prev, ...uploads]);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  const handleRemoveDocument = (index: number) => {
    if (isReadOnly) return;
    setUploadedDocuments((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async () => {
    setUploadError("");
    setSubmitMessage("");

    if (!user?.id) {
      setUploadError("Please log in before submitting verification.");
      return;
    }

    if (uploadedDocuments.length === 0) {
      setUploadError("Please upload at least one document before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const updated = await upsertMySubmission({
        userId: user?.id,
        documents: uploadedDocuments,
        notes: notes.trim() || undefined,
      });
      setSubmission(updated);
      setSubmitMessage("Submitted for review successfully.");
    } catch (error) {
      setSubmitMessage(
        error instanceof Error ? error.message : "Submission failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
          Document Verification
          <ExclamationTriangleIcon className="h-8 w-8 text-emerald-500" />
        </h1>
        <p className="mt-3 text-base text-slate-500 max-w-lg">
          To keep our community safe, we require all users to verify their
          identity before offering or accepting jobs.
        </p>
      </div>

      <div className="space-y-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--color-brand-soft) text-(--color-brand-primary)">
                <EnvelopeClosedIcon className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                Email Verification
              </h2>
            </div>
            {isEmailVerified ? (
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                <CheckCircledIcon className="h-3.5 w-3.5" />
                Verified
              </span>
            ) : isEmailRequestPending ? (
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-600">
                Pending
              </span>
            ) : (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
                Not requested
              </span>
            )}
          </div>

          {isEmailVerified ? (
            <p className="text-sm font-semibold text-emerald-700">
              Your email address has been verified.
            </p>
          ) : isEmailRequestPending ? (
            <p className="text-sm font-semibold text-orange-600">
              Email verification request submitted. We'll review it shortly —
              you'll only need to do this once.
            </p>
          ) : (
            <p className="text-sm text-slate-500">
              Verify your email address ({user?.email ?? "your account"}) to
              unlock job offers and messaging. You can only request this once.
            </p>
          )}

          <button
            type="button"
            onClick={handleRequestEmailVerification}
            disabled={isEmailButtonDisabled}
            className={`mt-4 rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${
              isEmailButtonDisabled
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-slate-900 text-white hover:bg-slate-800 hover:scale-105 hover:shadow-lg"
            }`}
          >
            {isRequestingEmail
              ? "Sending…"
              : isEmailVerified
                ? "Email Verified"
                : isEmailRequestPending
                  ? "Request Pending"
                  : "Send Verification Email"}
          </button>

          {emailRequestError ? (
            <p className="mt-3 text-sm font-semibold text-red-600">
              {emailRequestError}
            </p>
          ) : null}
        </section>

        <div className="rounded-2xl bg-emerald-50 p-6 border border-emerald-100 flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <ExclamationTriangleIcon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-emerald-900">
              Why do we need this?
            </h3>
            <p className="mt-1 text-sm text-emerald-700 leading-relaxed">
              Your ID helps us ensure that the Local Link community remains a
              secure and trusted place for everyone. Your data is encrypted and
              stored securely.
            </p>
          </div>
        </div>

        <div>
          <label className="mb-3 block text-sm font-bold text-slate-900">
            Upload Verification Document
          </label>
          <label
            htmlFor="verification-upload"
            className={`group flex min-h-64 w-full flex-col items-center justify-center rounded-4xl border-2 border-dashed border-slate-200 bg-white px-6 text-center transition-all ${
              isReadOnly || !canSubmitDocument
                ? "cursor-not-allowed opacity-60"
                : "cursor-pointer hover:border-(--color-brand-primary) hover:bg-(--color-brand-soft)/50"
            }`}
          >
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-colors group-hover:bg-(--color-brand-soft) group-hover:text-(--color-brand-primary)">
              <UploadIcon className="h-6 w-6" />
            </div>

            <p className="text-lg font-bold text-slate-900 group-hover:text-(--color-brand-primary)">
              Click to browse or drag document here
            </p>
            <div className="mt-4 flex items-center justify-center gap-4 text-sm font-medium text-slate-500">
              <span className="flex items-center gap-1.5">
                <FileTextIcon /> PDF only
              </span>
              <span>Max 10MB</span>
            </div>

            <input
              id="verification-upload"
              type="file"
              className="hidden"
              accept=".pdf"
              multiple
              onChange={handleFileChange}
              disabled={isReadOnly || !canSubmitDocument}
            />
          </label>
          {!isEmailVerified ? (
            <p className="mt-3 text-sm font-semibold text-slate-700">Please verify your email before submitting documents.</p>
          ) : null}
          {isUploading ? (
            <p className="mt-3 text-sm font-medium text-slate-500">Uploading…</p>
          ) : null}
          {uploadError ? (
            <p className="mt-3 text-sm font-semibold text-red-600">{uploadError}</p>
          ) : null}
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Document Verification
              </h2>
              <p className="text-sm text-slate-500">
                Upload and submit your verification documents for review.
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                isDocumentVerified
                  ? "bg-emerald-100 text-emerald-700"
                  : isRejected
                    ? "bg-red-100 text-red-600"
                    : isPending
                      ? "bg-orange-100 text-orange-600"
                      : "bg-slate-100 text-slate-500"
              }`}
            >
              {statusLabel}
            </span>
          </div>

          {submissionError ? (
            <p className="mb-4 text-sm font-semibold text-red-600">
              {submissionError}
            </p>
          ) : null}

          {submission?.adminComment && isRejected ? (
            <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <span className="font-bold">Admin note:</span> {submission.adminComment}
            </div>
          ) : null}

          <div className="mb-4">
            <label className="mb-2 block text-sm font-bold text-slate-900">
              Submission note
            </label>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={3}
              disabled={isReadOnly}
              placeholder="Add a note for the admin reviewing your documents."
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-(--color-brand-primary) focus:ring-2 focus:ring-(--color-brand-focus-ring) disabled:bg-slate-50 disabled:text-slate-400"
            />
          </div>

          <div>
            <h3 className="mb-2 text-sm font-bold text-slate-900">
              Uploaded files
            </h3>
            {isLoadingSubmission ? (
              <p className="text-sm text-slate-500">Loading documents...</p>
            ) : uploadedDocuments.length === 0 ? (
              <p className="text-sm text-slate-500">No documents uploaded yet.</p>
            ) : (
              <ul className="space-y-2">
                {uploadedDocuments.map((doc, index) => (
                  <li
                    key={`${doc.fileUrl}-${index}`}
                    className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                  >
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 break-all underline-offset-2 hover:underline"
                    >
                      <FileTextIcon /> {doc.fileName}
                    </a>
                    {!isReadOnly ? (
                      <button
                        type="button"
                        onClick={() => handleRemoveDocument(index)}
                        className="rounded-full p-1 text-slate-400 transition hover:bg-red-100 hover:text-red-600"
                        aria-label={`Remove ${doc.fileName}`}
                      >
                        <Cross2Icon className="h-3.5 w-3.5" />
                      </button>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || isUploading || isReadOnly || !canSubmitDocument}
            className={`mt-5 w-full rounded-xl px-5 py-3 text-sm font-bold transition-all ${
              isReadOnly || !canSubmitDocument
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-slate-900 text-white hover:bg-slate-800 hover:scale-[1.01]"
            }`}
          >
            {isSubmitting
              ? "Submitting..."
              : isPending
                ? "Resubmit for Review"
                : "Submit for Review"}
          </button>

          {!canSubmitDocument ? (
            <p className="mt-3 text-sm font-semibold text-slate-700">You must verify your email before you can submit documents for document verification.</p>
          ) : null}

          {submitMessage ? (
            <p className="mt-3 text-sm font-semibold text-slate-600">
              {submitMessage}
            </p>
          ) : null}
        </section>
      </div>
    </div>
  );
}
