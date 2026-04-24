export default function VerifyPage() {
  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-[var(--color-ink-border-soft)] bg-white px-5 py-6 shadow-sm sm:px-6 sm:py-7">
        <h1 className="mb-5 text-lg font-bold text-[var(--color-ink-strong)]">Verify Identity</h1>

        <label
          htmlFor="verification-upload"
          className="flex min-h-48 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--color-ink-border-soft)] bg-white px-6 text-center transition hover:border-[var(--color-brand-accent)] hover:bg-[var(--color-brand-soft)]"
        >
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-brand-soft)]">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              className="text-[var(--color-brand-primary)]"
            >
              <path d="M12 16V8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              <path
                d="M8.5 11.5 12 8l3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 17.5a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 17.2 8.2 3.8 3.8 0 1 1 18 15.5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <p className="text-base font-semibold text-[var(--color-ink-strong)]">Click to upload document</p>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">or drag and drop</p>
          <p className="mt-3 text-xs text-[var(--color-text-muted)]">JPG, PNG or PDF · max 10 MB</p>

          <input
            id="verification-upload"
            type="file"
            className="hidden"
            accept=".jpg,.jpeg,.png,.pdf"
          />
        </label>

        <p className="mt-4 text-sm text-[var(--color-text-muted)]">
          Please upload a government-issued ID for verification.
        </p>
      </section>
    </div>
  );
}
