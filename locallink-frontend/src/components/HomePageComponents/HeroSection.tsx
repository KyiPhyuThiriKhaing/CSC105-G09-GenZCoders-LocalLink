import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="relative mx-auto mt-4 max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 px-6 py-16 shadow-2xl sm:px-12 sm:py-20 lg:px-16 lg:py-24">
        {/* Abstract background decorative elements */}
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-(--color-brand-primary) opacity-20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-blue-600 opacity-20 blur-3xl" />

        <div className="relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
          <div className="text-white text-center lg:text-left">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-(--color-brand-soft) backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--color-brand-soft) opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-(--color-brand-soft)"></span>
              </span>
              Community Powered
            </span>

            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Find Local Help <br className="hidden lg:block" />{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-brand-soft) to-blue-200">
                Across the street.
              </span>
            </h1>

            <p className="mt-6 mx-auto lg:mx-0 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl">
              Connect with trusted neighbors for everyday tasks. From dog
              walking to furniture moving, find the perfect person right in your
              community.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                to="/jobs"
                className="w-full sm:w-auto inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-base font-bold text-slate-900 transition-all hover:bg-slate-100 hover:scale-105 shadow-lg shadow-white/10"
              >
                Browse Mini Jobs
              </Link>
              <Link
                to="/signup"
                className="w-full sm:w-auto inline-flex h-14 items-center justify-center rounded-full border-2 border-white/20 bg-white/5 px-8 text-base font-bold text-white transition-all hover:bg-white/10 hover:border-white/40 hover:scale-105 backdrop-blur-md"
              >
                Post a Task
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <div className="rounded-4xl bg-white/10 p-2 backdrop-blur-xl border border-white/10 shadow-2xl">
              <div className="rounded-3xl bg-white p-6 shadow-inner">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900">
                      Today's matches
                    </h3>
                    <p className="text-sm font-medium text-slate-500">
                      Based on your location
                    </p>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600 border border-emerald-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                    Live
                  </span>
                </div>

                <div className="grid gap-3">
                  {[
                    {
                      title: "Furniture Assembly",
                      sub: "2 helpers nearby",
                      price: "฿1,500",
                    },
                    {
                      title: "Dog Walking",
                      sub: "Book in 5 mins",
                      price: "฿600",
                    },
                    {
                      title: "Grocery Pickup",
                      sub: "Same-day delivery",
                      price: "฿400",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="group flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4 transition-all hover:border-(--color-brand-primary)/30 hover:bg-white hover:shadow-md"
                    >
                      <div>
                        <p className="text-sm font-bold text-slate-900 group-hover:text-(--color-brand-primary) transition-colors">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-xs font-medium text-slate-500">
                          {item.sub}
                        </p>
                      </div>
                      <span className="text-base font-extrabold text-slate-900">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="mt-6 w-full rounded-xl bg-(--color-brand-soft) py-3.5 text-sm font-bold text-(--color-brand-primary) transition-colors hover:bg-(--color-brand-primary) hover:text-white"
                >
                  View all categories
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
