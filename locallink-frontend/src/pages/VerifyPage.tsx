import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function VerifyPage() {
  const { pathname } = useLocation();
  const isBaseVerify =
    pathname === "/profile/verify" || pathname === "/profile/verify/";

  if (!isBaseVerify) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-brand-soft text-(--color-ink-strong)">
      <div className="flex gap-6 px-6 pb-12 pt-6 lg:pt-8">
        <Sidebar activeKey="Verification" />

        <div className="flex-1 space-y-5">
          <section className="rounded-3xl border border-black/5 bg-white px-6 py-7 shadow-[0_2px_8px_rgba(15,23,42,0.08)]">
            <h1 className="mb-6 text-[20px] font-bold text-(--color-ink-strong)">
              Verify
            </h1>

            <label
              htmlFor="verification-upload"
              className="flex min-h-55 w-full cursor-pointer flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-[#d7dbe4] bg-white px-6 text-center transition hover:border-brand-accent hover:bg-brand-soft/40"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f1e4fb]">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="text-brand-primary"
                >
                  <path
                    d="M12 16V8"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
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

              <p className="text-[18px] font-semibold text-(--color-ink-strong)">
                Click to upload document
              </p>
              <p className="mt-1 text-[16px] text-slate-500">or drag and drop</p>

              <input
                id="verification-upload"
                type="file"
                className="hidden"
                accept=".jpg,.jpeg,.png,.pdf"
              />
            </label>

            <p className="mt-5 text-[16px] text-slate-600">
              Please upload your ID for verification
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}