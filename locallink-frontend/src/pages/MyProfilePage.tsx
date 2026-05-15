import {
  Pencil1Icon,
  CameraIcon,
  PersonIcon,
  EnvelopeClosedIcon,
  MobileIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  CheckCircledIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCurrentUser } from "../lib/useCurrentUser";
import {
  addSkill as addSkillApi,
  fetchSkills,
  removeSkill as removeSkillApi,
  updateProfile,
} from "../lib/authApi";

export default function MyProfilePage() {
  const { user, isLoading, error } = useCurrentUser();
  const navigate = useNavigate();
  const [skills, setSkills] = useState<string[]>([]);
  const [skillsError, setSkillsError] = useState<string | null>(null);
  const [bioInput, setBioInput] = useState("");
  const [bioStatus, setBioStatus] = useState<
    { type: "success" | "error"; message: string } | null
  >(null);
  const [bioSaving, setBioSaving] = useState(false);

  useEffect(() => {
    if (user?.bio !== undefined && user.bio !== null) {
      setBioInput(user.bio);
    }
  }, [user?.bio]);

  useEffect(() => {
    if (!user?.id) return;
    let cancelled = false;
    fetchSkills()
      .then((list) => {
        if (!cancelled) setSkills(list);
      })
      .catch((err) => {
        if (!cancelled) {
          setSkillsError(err instanceof Error ? err.message : "Unable to load skills.");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm font-semibold text-slate-500">
          Loading profile…
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="mx-auto max-w-4xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-sm font-semibold text-red-600">
          {error ?? "Unable to load profile."}
        </div>
      </div>
    );
  }

  const joinedDate = user.joinedAt
    ? new Date(user.joinedAt).toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    })
    : "—";

  const handleAddSkill = async () => {
    const promptValue = window.prompt("Enter a skill name");
    const trimmed = promptValue?.trim();
    if (!trimmed) return;
    try {
      const updated = await addSkillApi(trimmed);
      setSkills(updated);
      setSkillsError(null);
    } catch (err) {
      setSkillsError(err instanceof Error ? err.message : "Unable to add skill.");
    }
  };

  const handleRemoveSkill = async (skill: string) => {
    try {
      const updated = await removeSkillApi(skill);
      setSkills(updated);
      setSkillsError(null);
    } catch (err) {
      setSkillsError(err instanceof Error ? err.message : "Unable to remove skill.");
    }
  };

  const handleBioSave = async () => {
    setBioSaving(true);
    setBioStatus(null);
    try {
      await updateProfile({ bio: bioInput });
      setBioStatus({ type: "success", message: "Bio saved." });
    } catch (err) {
      setBioStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Unable to save bio.",
      });
    } finally {
      setBioSaving(false);
    }
  };

  const aboutRows: Array<{
    icon: React.ReactNode;
    label: string;
    value: string;
  }> = [
      {
        icon: <PersonIcon className="h-5 w-5" />,
        label: "Name",
        value: user.fullName,
      },
      {
        icon: <EnvelopeClosedIcon className="h-5 w-5" />,
        label: "Email",
        value: user.email,
      },
      {
        icon: <MobileIcon className="h-5 w-5" />,
        label: "Phone",
        value: user.phone ?? "Not set",
      },
      {
        icon: <CalendarIcon className="h-5 w-5" />,
        label: "Joined",
        value: joinedDate,
      },
    ];

  return (
    <div className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8 space-y-12">
      <div className="group relative -mx-4 overflow-hidden rounded-b-[3rem] bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 pb-16 pt-32 sm:-mx-6 sm:rounded-[3rem] sm:pt-40 lg:-mx-8 lg:rounded-[4em]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-(--color-brand-primary) opacity-20 blur-3xl"></div>

        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <div className="relative mx-auto mb-6 h-32 w-32 shrink-0">
            <img
              src={
                user.avatarUrl ??
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.fullName)}&backgroundColor=f8fafc`
              }
              alt={user.fullName}
              className="h-full w-full rounded-4xl border-4 border-white/10 bg-white object-cover shadow-2xl transition-transform duration-500 group-hover:scale-105"
            />
            <button className="absolute -right-3 -bottom-3 flex h-12 w-12 items-center justify-center rounded-[1.2rem] bg-white text-slate-900 shadow-xl transition-all hover:bg-(--color-brand-soft) hover:text-(--color-brand-primary) hover:scale-110">
              <CameraIcon className="h-5 w-5" />
            </button>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            {user.fullName}
          </h1>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate("/profile/settings")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-bold text-slate-900 transition-all hover:scale-105 hover:bg-(--color-brand-soft) hover:text-(--color-brand-primary) shadow-lg"
            >
              <Pencil1Icon /> Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-12 sm:grid-cols-3">
        {/* Left Column - Info */}
        <div className="sm:col-span-1 space-y-10">
          <section>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
              About Me
            </h2>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-4 border-b border-slate-100 pb-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-(--color-brand-soft) text-(--color-brand-primary)">
                  <PersonIcon className="h-8 w-8" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Account
                  </p>
                  <p className="truncate text-base font-bold text-slate-900">
                    {user.fullName}
                  </p>
                </div>
              </div>
              <ul className="space-y-4">
                {aboutRows.map((row) => (
                  <li
                    key={row.label}
                    className="flex items-start gap-3 text-slate-700"
                  >
                    <span className="mt-0.5 text-slate-400">{row.icon}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                        {row.label}
                      </p>
                      <p className="truncate text-sm font-bold text-slate-900">
                        {row.value}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
              Verifications
            </h2>
            <div className="space-y-3">
              {user.emailVerifiedAt ? (
                <div className="flex items-center gap-2 text-emerald-600">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                    <CheckCircledIcon />
                  </span>
                  <span className="text-sm font-bold">Email verified</span>
                </div>
              ) : user.emailVerificationRequestedAt ? (
                <div className="flex items-center gap-2 text-orange-500">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100">
                    <ExclamationTriangleIcon />
                  </span>
                  <span className="text-sm font-bold">
                    Email verification pending review
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-slate-500">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100">
                    <ExclamationTriangleIcon />
                  </span>
                  <span className="text-sm font-bold">Email not verified</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-orange-500">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100">
                  <ExclamationTriangleIcon />
                </span>
                <span className="text-sm font-bold">Document unverified</span>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column - Content */}
        <div className="sm:col-span-2 space-y-12">
          <section>
            <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
              <h2 className="text-xl font-bold text-slate-900">Bio</h2>
            </div>
            <div className="space-y-3">
              <textarea
                value={bioInput}
                onChange={(event) => setBioInput(event.target.value)}
                placeholder="Tell your community about your skills and interests."
                rows={4}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-(--color-brand-primary) focus:ring-2 focus:ring-(--color-brand-focus-ring)"
              />
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleBioSave}
                  disabled={bioSaving}
                  className="rounded-2xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
                >
                  {bioSaving ? "Saving…" : "Save Bio"}
                </button>
                {bioStatus ? (
                  <span
                    className={`text-sm font-semibold ${bioStatus.type === "success"
                        ? "text-emerald-600"
                        : "text-red-600"
                      }`}
                  >
                    {bioStatus.message}
                  </span>
                ) : null}
              </div>
            </div>
          </section>

          <section>
            <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
              <h2 className="text-xl font-bold text-slate-900">
                Skills & Services
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="group/skill flex items-center gap-1.5 rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-(--color-brand-soft) hover:text-(--color-brand-primary)"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="rounded-full p-0.5 text-slate-400 transition-colors hover:bg-red-100 hover:text-red-600"
                    aria-label={`Remove ${skill}`}
                  >
                    <Cross2Icon className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
              <button
                type="button"
                onClick={handleAddSkill}
                className="flex items-center gap-1 rounded-xl border-2 border-dashed border-slate-200 px-4 py-1.5 text-sm font-bold text-slate-400 transition-colors hover:border-(--color-brand-primary) hover:text-(--color-brand-primary)"
              >
                + Add Skill
              </button>
            </div>
            {skillsError ? (
              <p className="mt-3 text-sm font-semibold text-red-600">{skillsError}</p>
            ) : null}
          </section>

          <section>
            <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
              <h2 className="text-xl font-bold text-slate-900">
                Recent Reviews
              </h2>
            </div>
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm font-semibold text-slate-500">
              No reviews yet.
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
