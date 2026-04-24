import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const jobPostSchema = z.object({
  title: z.string().min(10, "Please provide a descriptive job title."),
  location: z.string().min(5, "Enter the job location or area.").max(80),
  feeRange: z.string().min(3, "Enter an expected pay range."),
  timeRange: z.string().min(3, "Enter the estimated duration."),
  contact: z.string().min(5, "Enter how applicants should contact you."),
  description: z.string().min(20, "Tell helpers more about the task.").max(1000),
  requirements: z.string().max(400).optional(),
});

type JobPostFormValues = z.infer<typeof jobPostSchema>;

export default function JobPostDialog() {
  const [open, setOpen] = useState(false);
  const form = useForm<JobPostFormValues>({
    resolver: zodResolver(jobPostSchema),
    defaultValues: {
      title: "",
      location: "",
      feeRange: "",
      timeRange: "",
      contact: "",
      description: "",
      requirements: "",
    },
  });

  const { register, handleSubmit, formState, reset } = form;

  const onSubmit = (values: JobPostFormValues) => {
    toast.success("Your job post is ready and visible to the community.");
    console.log("Job posted:", values);
    reset();
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-full bg-(--color-brand-primary) px-8 py-4 text-sm font-bold text-white shadow-lg shadow-(--color-brand-primary)/25 transition-all hover:bg-(--color-brand-primary-hover) hover:scale-[1.02]"
        >
          <PlusIcon className="h-5 w-5" />
          Post a Job
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_35px_80px_rgba(15,23,42,0.18)] focus:outline-none">
          <div className="flex flex-col gap-6 px-6 py-6 sm:px-8 sm:py-8">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">1. Job details</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">2. Compensation</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">3. Publish</span>
                </div>
                <div>
                  <Dialog.Title className="text-2xl font-semibold text-slate-900">
                    Post a local job
                  </Dialog.Title>
                  <Dialog.Description className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                    Share what you need, when you need it, and how much you will pay. The community can respond quickly to nearby opportunities.
                  </Dialog.Description>
                </div>
              </div>
              <Dialog.Close asChild>
                <button
                  type="button"
                  aria-label="Close post job form"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
                >
                  <Cross2Icon className="h-5 w-5" />
                </button>
              </Dialog.Close>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm">
                  <span className="font-semibold text-slate-900">Job title</span>
                  <input
                    {...register("title")}
                    placeholder="e.g. Help move furniture from 4th floor"
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-(--color-brand-primary) focus:bg-white focus:ring-2 focus:ring-(--color-brand-focus-ring)"
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
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-(--color-brand-primary) focus:bg-white focus:ring-2 focus:ring-(--color-brand-focus-ring)"
                  />
                  {formState.errors.location ? (
                    <span className="text-xs text-red-600">{formState.errors.location.message}</span>
                  ) : null}
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm">
                  <span className="font-semibold text-slate-900">Pay range</span>
                  <input
                    {...register("feeRange")}
                    placeholder="e.g. ฿200 - ฿350"
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-(--color-brand-primary) focus:bg-white focus:ring-2 focus:ring-(--color-brand-focus-ring)"
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
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-(--color-brand-primary) focus:bg-white focus:ring-2 focus:ring-(--color-brand-focus-ring)"
                  />
                  {formState.errors.timeRange ? (
                    <span className="text-xs text-red-600">{formState.errors.timeRange.message}</span>
                  ) : null}
                </label>
              </div>

              <label className="grid gap-2 text-sm">
                <span className="font-semibold text-slate-900">Description</span>
                <textarea
                  {...register("description")}
                  placeholder="Share the details helpers need to know — what, when, who should bring, and any special instructions."
                  rows={5}
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-(--color-brand-primary) focus:bg-white focus:ring-2 focus:ring-(--color-brand-focus-ring)"
                />
                {formState.errors.description ? (
                  <span className="text-xs text-red-600">{formState.errors.description.message}</span>
                ) : null}
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm">
                  <span className="font-semibold text-slate-900">Contact details</span>
                  <input
                    {...register("contact")}
                    placeholder="Email or phone number"
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-(--color-brand-primary) focus:bg-white focus:ring-2 focus:ring-(--color-brand-focus-ring)"
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
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 outline-none transition focus:border-(--color-brand-primary) focus:bg-white focus:ring-2 focus:ring-(--color-brand-focus-ring)"
                  />
                </label>
              </div>

              <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1 text-sm text-slate-600">
                  <p className="font-semibold text-slate-900">Ready to publish</p>
                  <p>Review your request and submit it for local helpers to see.</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                  </Dialog.Close>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-2xl bg-(--color-brand-primary) px-6 py-3 text-sm font-semibold text-white transition hover:bg-(--color-brand-primary-hover)"
                  >
                    Publish job
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
