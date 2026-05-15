import {
  ExclamationTriangleIcon,
  UploadIcon,
  FileTextIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import { useCurrentUser } from "../lib/useCurrentUser";

type UploadedDocument = {
  fileName: string;
  fileUrl: string;
  mimeType?: string;
  fileSize?: number;
};

export default function VerifyPage() {
  const { user } = useCurrentUser();
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api";

  const uploadDocument = async (file: File): Promise<UploadedDocument> => {
    if (file.type !== "application/pdf") {
      throw new Error("Only PDF files are allowed.");
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${apiBaseUrl}/submissions/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Upload failed. Please try again.");
    }

    const payload = (await response.json()) as { data: UploadedDocument };
    return payload.data;
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }

    setUploadError("");
    setSubmitMessage("");
    setIsUploading(true);

    try {
      const uploads = await Promise.all(Array.from(files).map(uploadDocument));
      setUploadedDocuments((prev) => [...prev, ...uploads]);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  const handleSubmit = async () => {
    setUploadError("");
    setSubmitMessage("");

    if (!user?.id) {
      setUploadError("Please log in before submitting verification.");
      return;
    }

    if (uploadedDocuments.length === 0) {
      setUploadError("Please upload at least one PDF before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiBaseUrl}/submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
          documents: uploadedDocuments,
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed. Please try again.");
      }

      setUploadedDocuments([]);
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
            <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-600">
              Pending
            </span>
          </div>
          <p className="text-sm text-slate-500">
            Verify your email address to unlock job offers and messaging.
            We'll wire this up later — coming soon.
          </p>
          <button
            type="button"
            disabled
            className="mt-4 rounded-xl bg-slate-100 px-5 py-2.5 text-sm font-bold text-slate-400 cursor-not-allowed"
          >
            Send Verification Email
          </button>
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
            className="group flex min-h-64 w-full cursor-pointer flex-col items-center justify-center rounded-4xl border-2 border-dashed border-slate-200 bg-white px-6 text-center transition-all hover:border-(--color-brand-primary) hover:bg-(--color-brand-soft)/50"
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
            />
          </label>
          {isUploading ? (
            <p className="mt-3 text-sm font-medium text-slate-500">Uploading…</p>
          ) : null}
          {uploadError ? (
            <p className="mt-3 text-sm font-semibold text-red-600">{uploadError}</p>
          ) : null}
          {uploadedDocuments.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {uploadedDocuments.map((doc) => (
                <li
                  key={doc.fileUrl}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
                >
                  <span className="break-all">{doc.fileName}</span>
                  <span className="text-xs text-slate-400">Ready</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="flex items-center gap-4 border-t border-slate-200 pt-8">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || isUploading}
            className="flex items-center gap-2 rounded-xl bg-slate-900 px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-slate-800 hover:scale-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Submit for Review
          </button>
          <span className="text-sm font-medium text-slate-500">
            Usually verified within 24 hours
          </span>
        </div>
        {submitMessage ? (
          <p className="text-sm font-semibold text-slate-600">{submitMessage}</p>
        ) : null}
      </div>
    </div>
  );
}
