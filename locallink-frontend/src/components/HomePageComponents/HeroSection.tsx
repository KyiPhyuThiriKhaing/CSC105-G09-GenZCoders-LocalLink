import { Link } from "react-router-dom";

function HeroSection() {
    return (
        <section className="mx-auto max-w-5xl">
            <div
                className="relative overflow-hidden rounded-[28px] px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16 shadow-[0_20px_60px_rgba(31,18,51,0.16)]"
                style={{
                    background:
                        "linear-gradient(130deg, var(--color-brand-primary) 0%, var(--color-brand-primary-600) 48%, var(--color-brand-pink-500) 100%)",
                }}
            >
                <div className="absolute inset-0 opacity-25">
                    <div className="absolute -left-10 top-6 h-48 w-48 rounded-full bg-white blur-3xl" aria-hidden="true" />
                    <div className="absolute bottom-4 right-0 h-40 w-40 rounded-full bg-white/80 blur-2xl" aria-hidden="true" />
                </div>

                <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                    <div className="text-white">
                        <p className="mb-3 inline-flex items-center rounded-full bg-white/18 px-3 py-1 text-sm font-semibold backdrop-blur">
                            Local Link · Community powered
                        </p>
                        <h1 className="text-3xl font-extrabold leading-[1.05] sm:text-4xl lg:text-[2.75rem]">
                            Find Local Help for Any Task
                        </h1>
                        <p className="mt-4 max-w-2xl text-lg text-white/90 sm:text-xl">
                            Connect with trusted local helpers for everyday tasks. From dog walking to furniture moving, find the perfect person for your needs.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                to="/jobs"
                                className="inline-flex items-center justify-center rounded-full bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                            >
                                Find Helpers
                            </Link>
                            <Link
                                to="/signup"
                                className="inline-flex items-center justify-center rounded-full border border-brand-primary px-5 py-3 text-sm font-semibold text-brand-primary bg-white/90 transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                            >
                                Post a Task
                            </Link>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 -left-3 top-3 rounded-[22px] bg-white/15 blur-[26px]" aria-hidden="true" />
                        <div className="relative rounded-2xl border border-white/40 bg-white/92 p-6 shadow-[0_18px_40px_rgba(31,18,51,0.22)] backdrop-blur">
                            <div className="grid gap-4 rounded-xl border border-(--color-ink-border-soft) bg-white p-4 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-(--color-ink-strong)">Today&apos;s matches</p>
                                        <p className="text-sm text-(--color-text-muted)">Based on your location</p>
                                    </div>
                                    <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-primary">Live</span>
                                </div>
                                <div className="grid gap-3 text-(--color-ink-strong)">
                                    <div className="flex items-center justify-between rounded-lg border border-(--color-ink-border-soft) bg-white px-3 py-2">
                                        <div>
                                            <p className="text-sm font-semibold">Furniture Assembly</p>
                                            <p className="text-xs text-(--color-text-muted)">2 helpers available nearby</p>
                                        </div>
                                        <span className="text-sm font-bold text-brand-primary">$45</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg border border-(--color-ink-border-soft) bg-white px-3 py-2">
                                        <div>
                                            <p className="text-sm font-semibold">Dog Walking</p>
                                            <p className="text-xs text-(--color-text-muted)">Book in 5 minutes</p>
                                        </div>
                                        <span className="text-sm font-bold text-brand-primary">$20</span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg border border-(--color-ink-border-soft) bg-white px-3 py-2">
                                        <div>
                                            <p className="text-sm font-semibold">Grocery Pickup</p>
                                            <p className="text-xs text-(--color-text-muted)">Same-day delivery</p>
                                        </div>
                                        <span className="text-sm font-bold text-brand-primary">$18</span>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="mt-2 inline-flex items-center justify-center rounded-full bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
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
