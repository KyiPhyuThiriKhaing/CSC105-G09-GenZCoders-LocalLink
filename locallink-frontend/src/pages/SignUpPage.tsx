import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import {
  EnvelopeClosedIcon,
  EyeNoneIcon,
  EyeOpenIcon,
  LockClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";

const signUpSchema = z
  .object({
    fullName: z.string().min(2, "Please enter your name"),
    email: z.email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

type PasswordToggleButtonProps = {
  isVisible: boolean;
  onToggle: () => void;
};

function PasswordToggleButton({ isVisible, onToggle }: PasswordToggleButtonProps) {
  return (
    <button
      type="button"
      className="absolute right-2 inline-flex items-center justify-center rounded-md p-1.5 text-[var(--color-ink-strong-70)] transition hover:text-[var(--color-ink-strong)]"
      onClick={onToggle}
      aria-label={isVisible ? "Hide password" : "Show password"}
    >
      {isVisible ? <EyeNoneIcon aria-hidden="true" /> : <EyeOpenIcon aria-hidden="true" />}
    </button>
  );
}

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    void data;
    // Hook up to backend later.
    await new Promise((resolve) => setTimeout(resolve, 250));
  };

  const inputClass =
    "h-11 w-full rounded-xl border border-[var(--color-ink-border-soft)] bg-white/85 px-3 text-sm text-[var(--color-ink-strong)] outline-none transition placeholder:text-[var(--color-ink-strong-45)] focus:border-[var(--color-brand-focus)] focus:bg-white/95 focus:ring-4 focus:ring-[var(--color-brand-focus-ring)]";

  const labelClass = "text-sm font-semibold text-[var(--color-ink-strong)]";
  const fieldErrorClass = "text-[0.82rem] text-[var(--color-danger)]";

  return (
    <main className="grid min-h-screen place-items-start bg-gradient-to-br from-[var(--color-brand-primary-700)] to-[var(--color-brand-pink-500)] px-5 py-6 sm:px-6 sm:py-8 md:place-items-center md:py-10">
      <section
        className="relative grid min-h-[560px] w-full max-w-[920px] overflow-hidden rounded-[28px] bg-gradient-to-br from-[var(--color-brand-primary-600)] to-[var(--color-brand-pink-500)] shadow-[0_12px_24px_rgba(31,18,51,0.12),0_28px_56px_rgba(31,18,51,0.24),0_52px_104px_rgba(31,18,51,0.32)] md:grid-cols-[1.1fr_0.9fr]"
        aria-label="Sign up"
      >
        <div className="relative z-10 isolate grid content-start gap-7 overflow-hidden px-7 py-10 md:px-12 md:py-12">
          <div
            className="pointer-events-none absolute inset-0 -z-10 bg-white rounded-l-[28px] [clip-path:polygon(0_0,78%_0,100%_50%,78%_100%,0_100%)] max-[860px]:rounded-[28px] max-[860px]:[clip-path:none]"
            aria-hidden="true"
          />

          <header className="relative z-10">
            <h1 className="pb-4 text-[clamp(2rem,3vw,2.75rem)] leading-[1.05] font-extrabold tracking-[-0.02em] text-[var(--color-ink-strong)]">
              Sign up
            </h1>
            <p className="text-[0.95rem] text-[var(--color-text-muted)]">Create your account to get started.</p>
          </header>

          <form className="relative z-10 grid w-full gap-3.5 md:pr-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-1.5">
              <label className={labelClass} htmlFor="fullName">
                <span className="inline-flex items-center gap-1.5">
                  <PersonIcon aria-hidden="true" />
                  Full name
                </span>
              </label>
              <input
                id="fullName"
                className={inputClass}
                placeholder="Your name"
                autoComplete="name"
                {...register("fullName")}
              />
              {errors.fullName && <p className={fieldErrorClass}>{errors.fullName.message}</p>}
            </div>

            <div className="grid gap-1.5">
              <label className={labelClass} htmlFor="email">
                <span className="inline-flex items-center gap-1.5">
                  <EnvelopeClosedIcon aria-hidden="true" />
                  Email
                </span>
              </label>
              <input
                id="email"
                type="email"
                className={inputClass}
                placeholder="you@example.com"
                autoComplete="email"
                {...register("email")}
              />
              {errors.email && <p className={fieldErrorClass}>{errors.email.message}</p>}
            </div>

            <div className="grid gap-1.5">
              <label className={labelClass} htmlFor="password">
                <span className="inline-flex items-center gap-1.5">
                  <LockClosedIcon aria-hidden="true" />
                  Password
                </span>
              </label>
              <div className="relative flex items-center">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className={`${inputClass} pr-11`}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  {...register("password")}
                />
                <PasswordToggleButton
                  isVisible={showPassword}
                  onToggle={() => setShowPassword(!showPassword)}
                />
              </div>
              {errors.password && <p className={fieldErrorClass}>{errors.password.message}</p>}
            </div>

            <div className="grid gap-1.5">
              <label className={labelClass} htmlFor="confirmPassword">
                <span className="inline-flex items-center gap-1.5">
                  <LockClosedIcon aria-hidden="true" />
                  Confirm password
                </span>
              </label>
              <div className="relative flex items-center">
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  className={`${inputClass} pr-11`}
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                  {...register("confirmPassword")}
                />
                <PasswordToggleButton
                  isVisible={showPassword}
                  onToggle={() => setShowPassword(!showPassword)}
                />
              </div>
              {errors.confirmPassword && (
                <p className={fieldErrorClass}>{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              className="group mt-3 grid h-[46px] w-full grid-cols-[1fr_auto] items-center rounded-full border border-[var(--color-ink-border-faint)] bg-white px-2 pl-4 text-[var(--color-ink-strong)] transition hover:-translate-y-[3px] hover:bg-[var(--color-brand-primary-500)] hover:text-white hover:shadow-[0_12px_32px_rgba(168,85,247,0.28)] disabled:cursor-not-allowed disabled:saturate-90"
              type="submit"
              aria-disabled={isSubmitting}
              disabled={isSubmitting}
            >
              <span className="text-[0.98rem] font-bold tracking-[0.01em]">Create account</span>
              <span
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-brand-primary-500)] to-[var(--color-brand-pink-500)] text-white transition group-hover:-translate-x-1 group-hover:scale-x-[-1] group-hover:bg-white/20"
                aria-hidden="true"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M12.95 1.50005C12.95 1.25152 12.7485 1.05005 12.5 1.05005C12.2514 1.05005 12.05 1.25152 12.05 1.50005L12.05 13.5C12.05 13.7486 12.2514 13.95 12.5 13.95C12.7485 13.95 12.95 13.7486 12.95 13.5L12.95 1.50005ZM6.5683 3.93188C6.39257 3.75614 6.10764 3.75614 5.93191 3.93188C5.75617 4.10761 5.75617 4.39254 5.93191 4.56827L8.41371 7.05007L0.499984 7.05007C0.251456 7.05007 0.0499847 7.25155 0.0499847 7.50007C0.0499846 7.7486 0.251457 7.95007 0.499984 7.95007L8.41371 7.95007L5.93191 10.4319C5.75617 10.6076 5.75617 10.8925 5.93191 11.0683C6.10764 11.244 6.39257 11.244 6.56831 11.0683L9.8183 7.81827C9.99404 7.64254 9.99404 7.35761 9.8183 7.18188L6.5683 3.93188Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
          </form>

          <p className="relative z-10 mt-1 text-[0.92rem] text-[var(--color-text-muted)]">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-[var(--color-link)] hover:underline">
              Log in
            </Link>
          </p>
        </div>

        <aside className="relative hidden p-10 md:grid md:content-end md:justify-items-end" aria-hidden="true">
          <div className="absolute inset-[18%_10%_18%_18%] rotate-[-12deg] rounded-[28px] bg-white/12" />
          <div className="absolute inset-[26%_16%_26%_26%] rotate-[10deg] rounded-[28px] bg-white/8" />
          <div className="relative z-10 h-[140px] w-[140px] rounded-[26px] border border-white/18 bg-[radial-gradient(120px_120px_at_30%_25%,rgba(255,255,255,0.26),transparent_55%),linear-gradient(145deg,rgba(255,255,255,0.14),rgba(255,255,255,0.06))]" />
        </aside>
      </section>
    </main>
  );
}

export default SignUpPage;