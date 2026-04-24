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
} from "@radix-ui/react-icons";

const userSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Please enter your password"),
});

type UserFormData = z.infer<typeof userSchema>;

type PasswordToggleButtonProps = {
  isVisible: boolean;
  onToggle: () => void;
};

function PasswordToggleButton({ isVisible, onToggle }: PasswordToggleButtonProps) {
  return (
    <button
      type="button"
      className="absolute right-2 inline-flex items-center justify-center rounded-md p-1.5 text-[var(--color-ink-strong-45)] transition hover:text-[var(--color-ink-strong)]"
      onClick={onToggle}
    >
      {isVisible ? <EyeNoneIcon /> : <EyeOpenIcon />}
    </button>
  );
}

const FEATURES = ["Verified local helpers", "Secure payments", "Real-time messaging"];

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: UserFormData) => {
    void data;
    await new Promise((resolve) => setTimeout(resolve, 250));
  };

  const inputClass =
    "h-11 w-full rounded-xl border border-[var(--color-ink-border-soft)] bg-white px-3 text-sm text-[var(--color-ink-strong)] outline-none transition placeholder:text-[var(--color-ink-strong-45)] focus:border-[var(--color-brand-primary)] focus:ring-4 focus:ring-[var(--color-brand-focus-ring)]";

  const labelClass = "text-sm font-semibold text-[var(--color-ink-strong)]";
  const fieldErrorClass = "text-[0.82rem] text-[var(--color-danger)]";

  return (
    <main className="grid min-h-screen place-items-start bg-[#f5f3ff] px-4 py-5 sm:px-6 sm:py-8 md:place-items-center md:py-10">
      <section className="w-full max-w-[900px] overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(30,18,82,0.08),0_16px_48px_rgba(30,18,82,0.06)] md:grid md:grid-cols-[1.1fr_0.9fr] md:rounded-[24px]">

        {/* Form Panel */}
        <div className="grid content-start gap-6 px-5 py-8 sm:px-7 sm:py-10 md:px-12 md:py-12">
          <header>
            <h1 className="text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold tracking-tight text-[var(--color-ink-strong)]">
              Log in
            </h1>
            <p className="mt-1.5 text-[0.95rem] text-[var(--color-text-muted)]">
              Welcome back. Sign in to continue.
            </p>
          </header>

          <form className="grid w-full gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-1.5">
              <label className={labelClass} htmlFor="email">
                <span className="inline-flex items-center gap-1.5">
                  <EnvelopeClosedIcon />
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
                  <LockClosedIcon />
                  Password
                </span>
              </label>
              <div className="relative flex items-center">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className={`${inputClass} pr-11`}
                  placeholder="Your password"
                  autoComplete="current-password"
                  {...register("password")}
                />
                <PasswordToggleButton
                  isVisible={showPassword}
                  onToggle={() => setShowPassword(!showPassword)}
                />
              </div>
              {errors.password && <p className={fieldErrorClass}>{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-between text-[0.88rem]">
              <Link to="/signup" className="font-semibold text-[var(--color-link)] hover:underline">
                Create account
              </Link>
              <button
                type="button"
                className="font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-link)] hover:underline"
                aria-label="Forgot password"
              >
                Forgot password?
              </button>
            </div>

            <button
              className="mt-1 h-[46px] w-full rounded-full bg-[var(--color-brand-primary)] px-4 text-[0.95rem] font-bold text-white transition hover:bg-[var(--color-brand-primary-hover)] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-accent)]"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in…" : "Log in"}
            </button>
          </form>

          <p className="text-[0.9rem] text-[var(--color-text-muted)]">
            New to LocalLink?{" "}
            <Link to="/signup" className="font-bold text-[var(--color-link)] hover:underline">
              Create an account
            </Link>
          </p>
        </div>

        {/* Brand Panel */}
        <aside className="hidden bg-[#1e1252] p-10 md:flex md:flex-col md:justify-end">
          <div className="space-y-5">
            <p className="text-2xl font-extrabold text-white">LocalLink</p>
            <p className="text-sm leading-relaxed text-white/55">
              Connect with trusted local helpers for everyday tasks in your community.
            </p>
            <div className="pt-2 space-y-2.5">
              {FEATURES.map((f) => (
                <div key={f} className="flex items-center gap-2.5 text-sm text-white/65">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand-accent)]" aria-hidden="true" />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

export default LoginPage;
