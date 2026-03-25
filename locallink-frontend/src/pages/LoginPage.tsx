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
      className="absolute right-2 inline-flex items-center justify-center rounded-md p-1.5 text-[var(--color-ink-strong-70)] transition hover:text-[var(--color-ink-strong)]"
      onClick={onToggle}
    >
      {isVisible ? <EyeNoneIcon /> : <EyeOpenIcon />}
    </button>
  );
}

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
      >
        <div className="relative z-10 isolate grid content-start gap-7 overflow-hidden px-7 py-10 md:px-12 md:py-12">
          <div
            className="pointer-events-none absolute inset-0 -z-10 rounded-l-[28px] bg-white [clip-path:polygon(0_0,78%_0,100%_50%,78%_100%,0_100%)] max-[860px]:rounded-[28px] max-[860px]:[clip-path:none]"
          />

          <header className="relative z-10">
            <h1 className="pb-4 text-[clamp(2rem,3vw,2.75rem)] leading-[1.05] font-extrabold tracking-[-0.02em] text-[var(--color-ink-strong)]">
              Log in
            </h1>
            <p className="text-[0.95rem] text-[var(--color-text-muted)]">
              Welcome back. Sign in to continue.
            </p>
          </header>

          <form className="relative z-10 grid w-full gap-3.5 md:pr-6" onSubmit={handleSubmit(onSubmit)}>
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

            <div className="mt-0.5 flex items-center justify-between text-[0.9rem] text-[var(--color-text-muted)]">
              <Link to="/signup" className="font-semibold text-[var(--color-link)] hover:underline">
                Create new account
              </Link>
              <button
                type="button"
                className="font-semibold text-[var(--color-link)] hover:underline"
                aria-label="Forgot password"
              >
                Forgot password?
              </button>
            </div>

            <button
              className="mt-3 flex h-[46px] w-full items-center justify-center rounded-full border border-[var(--color-ink-border-faint)] bg-white px-4 text-[0.98rem] font-bold tracking-[0.01em] text-[var(--color-ink-strong)] transition hover:bg-white hover:text-[var(--color-ink-strong)] disabled:cursor-not-allowed disabled:saturate-90"
              type="submit"
              disabled={isSubmitting}
            >
              Log in
            </button>
          </form>

          <p className="relative z-10 mt-1 text-[0.92rem] text-[var(--color-text-muted)]">
            New to LocalLink?{" "}
            <Link to="/signup" className="font-bold text-[var(--color-link)] hover:underline">
              Create an account
            </Link>
          </p>
        </div>

        <aside className="relative hidden p-10 md:grid md:content-end md:justify-items-end">
          <div className="absolute inset-[18%_10%_18%_18%] rotate-[-12deg] rounded-[28px] bg-white/12" />
          <div className="absolute inset-[26%_16%_26%_26%] rotate-[10deg] rounded-[28px] bg-white/8" />
          <div className="relative z-10 h-[140px] w-[140px] rounded-[26px] border border-white/18 bg-[radial-gradient(120px_120px_at_30%_25%,rgba(255,255,255,0.26),transparent_55%),linear-gradient(145deg,rgba(255,255,255,0.14),rgba(255,255,255,0.06))]" />
        </aside>
      </section>
    </main>
  );
}

export default LoginPage;