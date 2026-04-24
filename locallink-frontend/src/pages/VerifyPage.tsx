import {
  ExclamationTriangleIcon,
  UploadIcon,
  FileTextIcon,
} from "@radix-ui/react-icons";

export default function VerifyPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
          Identity Verification
          <ExclamationTriangleIcon className="h-8 w-8 text-emerald-500" />
        </h1>
        <p className="mt-3 text-base text-slate-500 max-w-lg">
          To keep our community safe, we require all users to verify their
          identity before offering or accepting jobs.
        </p>
      </div>

      <div className="space-y-8">
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
            Upload Government ID
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
                <FileTextIcon /> JPG, PNG
              </span>
              <span className="flex items-center gap-1.5">
                <FileTextIcon /> PDF copies
              </span>
              <span>Max 10MB</span>
            </div>

            <input
              id="verification-upload"
              type="file"
              className="hidden"
              accept=".jpg,.jpeg,.png,.pdf"
            />
          </label>
        </div>

        <div className="flex items-center gap-4 border-t border-slate-200 pt-8">
          <button className="flex items-center gap-2 rounded-xl bg-slate-900 px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-slate-800 hover:scale-105 hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-200">
            Submit for Review
          </button>
          <span className="text-sm font-medium text-slate-500">
            Usually verified within 24 hours
          </span>
        </div>
      </div>
    </div>
  );
}
