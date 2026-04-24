import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { saveJob, type Job, type JobPostFormValues, jobPostSchema } from "../data/mockJobs";

export default function PostJobPage() {
  const navigate = useNavigate();
  const form = useForm<JobPostFormValues>({
    resolver: zodResolver(jobPostSchema),
    mode: "onTouched",
    defaultValues: {
      title: "",
      location: "",
      image: "",
      feeRange: "",
      timeRange: "",
      contact: "",
      description: "",
      requirements: "",
    },
  });

  const { register, handleSubmit, formState, reset, watch } = form;
  const imageUrl = watch("image");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = (values: JobPostFormValues) => {
    const newJob: Job = {
      id: Date.now().toString(),
      title: values.title,
      location: values.location,
      feeRange: values.feeRange,
      timeRange: values.timeRange,
      postedAt: "Just now",
      description: values.description,
      image: values.image ||
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
      poster: {
        name: "You",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You&backgroundColor=e2e8f0",
      },
    };

    saveJob(newJob);
    toast.success("Job created successfully.");
    reset();
    navigate("/jobs");
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to jobs
            </Link>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Post a new job
            </h1>
            <p className="mt-3 max-w-2xl text-base text-slate-600">
              Create a polished listing that helps your neighbors understand what you need and when.
            </p>
          </div>
        </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            <section className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">
                  Job essentials
                </h2>
                <p className="mt-2 text-sm text-slate-600 max-w-2xl">
                  Add the key details for your job listing so helpers can quickly understand what you need.
                </p>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className="grid gap-2 text-sm">
                  <span className="font-semibold text-slate-900">Job title</span>
                  <input
                    {...register("title")}
                    placeholder="e.g. Help move furniture from 4th floor"
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-(--color-brand-primary) focus:ring-2 focus:ring-(--color-brand-focus-ring)"
                  />
                  {formState.errors.title ? (
                    <span className="text-xs text-red-600">{formState.errors.title.message}</span>
                  ) : null}
                </label>

                <label className="grid gap-2 text-sm">
                  <span className="font-semibold text-slate-900">Location</span>
                  <input
                    {...register("location")}
                    placeholder="e.g. Sukhumvit, Bangkok"
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-(--color-brand-primary) focus:ring-2 focus:ring-(--color-brand-focus-ring)"
                  />
                  {formState.errors.location ? (
                    <span className="text-xs text-red-600">{formState.errors.location.message}</span>
                  ) : null}
                </label>
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-3">
                <label className="grid gap-2 text-sm">
                  <span className="font-semibold text-slate-900">Image URL</span>
                  <input
                    {...register("image")}
                    placeholder="Optional image URL"
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-(--color-brand-primary) focus:ring-2 focus:ring-(--color-brand-focus-ring)"
                  />
                  {formState.errors.image ? (
                    <span className="text-xs text-red-600">{formState.errors.image.message}</span>
                  ) : null}
                </label>

                <label className="grid gap-2 text-sm">
                  <span className="font-semibold text-slate-900">Pay range</span>
                  <input
                    {...register("feeRange")}
                    placeholder="e.g. ฿200 - ฿350"
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-(--color-brand-primary) focus:ring-2 focus:ring-(--color-brand-focus-ring)"
                  />
                  {formState.errors.feeRange ? (
                    <span className="text-xs text-red-600">{formState.errors.feeRange.message}</span>
                  ) : null}
                </label>

                <label className="grid gap-2 text-sm">
                  <span className="font-semibold text-slate-900">Duration</span>
                  <input
                    {...register("timeRange")}
                    placeholder="e.g. 1–2 hours"
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-(--color-brand-primary) focus:ring-2 focus:ring-(--color-brand-focus-ring)"
                  />
                  {formState.errors.timeRange ? (
                    <span className="text-xs text-red-600">{formState.errors.timeRange.message}</span>
                  ) : null}
                </label>
              </div>

              {imageUrl ? (
                <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
                  <img
                    src={imageUrl}
                    alt="Job preview"
                    className="h-44 w-full object-cover"
                    onError={(event) => {
                      (event.currentTarget as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80";
                    }}
                  />
                </div>
              ) : null}
            </section>

            <section id="publish-section" className="space-y-6 pt-6 border-t border-slate-200">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    Final details
                  </h2>
                </div>
                <div className="text-sm text-slate-500">
                  Your job will appear immediately after posting.
                </div>
              </div>

              <div className="mt-6 grid gap-5">
                <label className="grid gap-2 text-sm">
                  <span className="font-semibold text-slate-900">Description</span>
                  <textarea
                    {...register("description")}
                    placeholder="Share the details helpers need to know — what, when, who should bring, and any special instructions."
                    rows={8}
                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-(--color-brand-primary) focus:ring-2 focus:ring-(--color-brand-focus-ring)"
                  />
                  {formState.errors.description ? (
                    <span className="text-xs text-red-600">{formState.errors.description.message}</span>
                  ) : null}
                </label>

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm">
                    <span className="font-semibold text-slate-900">Contact details</span>
                    <input
                      {...register("contact")}
                      placeholder="Email or phone number"
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-(--color-brand-primary) focus:ring-2 focus:ring-(--color-brand-focus-ring)"
                    />
                    {formState.errors.contact ? (
                      <span className="text-xs text-red-600">{formState.errors.contact.message}</span>
                    ) : null}
                  </label>

                  <label className="grid gap-2 text-sm">
                    <span className="font-semibold text-slate-900">Optional requirements</span>
                    <input
                      {...register("requirements")}
                      placeholder="Tools or experience needed"
                      className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-(--color-brand-primary) focus:ring-2 focus:ring-(--color-brand-focus-ring)"
                    />
                  </label>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  to="/jobs"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-2xl bg-(--color-brand-primary) px-6 py-3 text-sm font-semibold text-white transition hover:bg-(--color-brand-primary-hover)"
                >
                  Publish job
                </button>
              </div>
            </section>
          </form>
        </div>
      </div>
  );
}
