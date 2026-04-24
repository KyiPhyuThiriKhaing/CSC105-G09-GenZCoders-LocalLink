import {
  Pencil1Icon,
  CameraIcon,
  GlobeIcon,
  Share1Icon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import { currentUser } from "../data/mockUsers";

export default function MyProfilePage() {
  const user = currentUser;

  return (
    <div className="mx-auto max-w-4xl px-4 pb-10 sm:px-6 lg:px-8 space-y-12">
      <div className="group relative -mx-4 overflow-hidden rounded-b-[3rem] bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 pb-16 pt-32 sm:-mx-6 sm:rounded-[3rem] sm:pt-40 lg:-mx-8 lg:rounded-[4em]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-(--color-brand-primary) opacity-20 blur-3xl"></div>

        <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
          <div className="relative mx-auto mb-6 h-32 w-32 shrink-0">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.name)}&backgroundColor=f8fafc`}
              alt="Profile"
              className="h-full w-full rounded-4xl border-4 border-white/10 bg-white object-cover shadow-2xl transition-transform duration-500 group-hover:scale-105"
            />
            <button className="absolute -right-3 -bottom-3 flex h-12 w-12 items-center justify-center rounded-[1.2rem] bg-white text-slate-900 shadow-xl transition-all hover:bg-(--color-brand-soft) hover:text-(--color-brand-primary) hover:scale-110">
              <CameraIcon className="h-5 w-5" />
            </button>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            {user.name}
          </h1>
          <p className="mt-2 text-lg font-medium text-slate-300 flex items-center justify-center gap-2">
            <GlobeIcon /> {user.location}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-bold text-slate-900 transition-all hover:scale-105 hover:bg-(--color-brand-soft) hover:text-(--color-brand-primary) shadow-lg">
              <Pencil1Icon /> Edit Profile
            </button>
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-slate-800/50 px-6 py-3 text-sm font-bold text-white shadow-lg backdrop-blur-md transition-all border border-white/10 hover:bg-slate-700/50 hover:scale-105">
              <Share1Icon /> Share
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
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-700">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400">Joined</p>
                  <p className="text-sm font-bold">{user.joined}</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
              Verifications
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-emerald-600">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                  ✔
                </span>
                <span className="text-sm font-bold">Email Verified</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-600">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                  ✔
                </span>
                <span className="text-sm font-bold">Phone Verified</span>
              </div>
              <div className="flex items-center gap-2 text-orange-500">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100">
                  <ExclamationTriangleIcon />
                </span>
                <span className="text-sm font-bold">ID Unverified</span>
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
            <p className="text-base leading-relaxed text-slate-600">
              {user.bio}
            </p>
          </section>

          <section>
            <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
              <h2 className="text-xl font-bold text-slate-900">
                Skills & Services
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-(--color-brand-soft) hover:text-(--color-brand-primary) cursor-pointer"
                >
                  {skill}
                </span>
              ))}
              <button className="flex items-center gap-1 rounded-xl border-2 border-dashed border-slate-200 px-4 py-1.5 text-sm font-bold text-slate-400 transition-colors hover:border-(--color-brand-primary) hover:text-(--color-brand-primary)">
                + Add Skill
              </button>
            </div>
          </section>

          <section>
            <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
              <h2 className="text-xl font-bold text-slate-900">
                Recent Reviews
              </h2>
            </div>
            <div className="space-y-6">
              <div className="border-l-2 border-slate-200 pl-4 transition-colors hover:border-(--color-brand-primary)">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-yellow-400 text-sm">★★★★★</div>
                  <span className="text-xs font-bold text-slate-400">
                    2 days ago
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-700">
                  "Great service! John was punctual and did a fantastic job with
                  the lawn."
                </p>
                <p className="mt-1 text-xs font-bold text-slate-500">
                  - Sarah M.
                </p>
              </div>
              <div className="border-l-2 border-slate-200 pl-4 transition-colors hover:border-(--color-brand-primary)">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex text-yellow-400 text-sm">★★★★★</div>
                  <span className="text-xs font-bold text-slate-400">
                    1 week ago
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-700">
                  "Very helpful and polite. Highly recommended."
                </p>
                <p className="mt-1 text-xs font-bold text-slate-500">
                  - Mike T.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
