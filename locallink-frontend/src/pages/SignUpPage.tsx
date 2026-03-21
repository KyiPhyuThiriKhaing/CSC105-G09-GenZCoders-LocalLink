import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import "./SignUpPage.css";

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

  return (
    <main className="ll-auth">
      <section className="ll-auth__card" aria-label="Sign up">
        <div className="ll-auth__panel">
          <header>
            <h1 className="ll-auth__title">Sign up</h1>
            <p className="ll-auth__subtitle">Create your account to get started.</p>
          </header>

          <form className="ll-auth__form" onSubmit={handleSubmit(onSubmit)}>
            <div className="ll-field">
              <label className="ll-label" htmlFor="fullName">
                Full name
              </label>
              <input
                id="fullName"
                className="ll-input"
                placeholder="Your name"
                autoComplete="name"
                {...register("fullName")}
              />
              {errors.fullName && <p className="ll-error">{errors.fullName.message}</p>}
            </div>

            <div className="ll-field">
              <label className="ll-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="ll-input"
                placeholder="you@example.com"
                autoComplete="email"
                {...register("email")}
              />
              {errors.email && <p className="ll-error">{errors.email.message}</p>}
            </div>

            <div className="ll-field">
              <label className="ll-label" htmlFor="password">
                Password
              </label>
              <div className="ll-input-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="ll-input"
                  placeholder="Create a password"
                  autoComplete="new-password"
                  {...register("password")}
                />
                <button
                  type="button"
                  className="ll-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errors.password && <p className="ll-error">{errors.password.message}</p>}
            </div>

            <div className="ll-field">
              <label className="ll-label" htmlFor="confirmPassword">
                Confirm password
              </label>
              <div className="ll-input-wrapper">
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  className="ll-input"
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  className="ll-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="ll-error">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              className="ll-cta"
              type="submit"
              aria-disabled={isSubmitting}
              disabled={isSubmitting}
            >
              <span>Create account</span>
              <span className="ll-cta__arrow" aria-hidden="true">
                →
              </span>
            </button>
          </form>

          <p className="ll-auth__footer">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>

        <aside className="ll-auth__decor" aria-hidden="true">
          <div className="ll-auth__mark" />
        </aside>
      </section>
    </main>
  );
}

export default SignUpPage;