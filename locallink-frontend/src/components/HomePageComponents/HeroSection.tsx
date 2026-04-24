import { Link } from "react-router-dom";

function HeroSection() {
    return (
        <section className="mx-auto max-w-5xl">
            <div className="overflow-hidden rounded-2xl bg-[#1e1252] px-5 py-10 shadow-[0_8px_40px_rgba(30,18,82,0.22)] sm:rounded-[28px] sm:px-10 sm:py-14 lg:px-14 lg:py-16">
                <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                    <div className="text-white">
                        <p className="mb-3 inline-flex items-center rounded-full border border-white/15 px-3 py-1 text-sm font-semibold text-white/70">
                            Local Link · Community powered
                        </p>
                        <h1 className="text-3xl font-extrabold leading-[1.05] sm:text-4xl lg:text-[2.75rem]">
                            Find Local Help for Any Task
                        </h1>
                        <p className="mt-4 max-w-2xl text-base text-white/65 sm:text-lg leading-relaxed">
                            Connect with trusted local helpers for everyday tasks. From dog walking to furniture moving, find the perfect person for your needs.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link
                                to="/jobs"
                                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1e1252] transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                            >
                                Find Helpers
                            </Link>
                            <Link
                                to="/signup"
                                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                            >
                                Post a Task
                            </Link>
                        </div>
                    </div>

                    <div>
                        <div className="rounded-2xl bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.22)]">
                            <div className="grid gap-4 rounded-xl border border-[var(--color-ink-border-soft)] p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-[var(--color-ink-strong)]">Today&apos;s matches</p>
                                        <p className="text-xs text-[var(--color-text-muted)]">Based on your location</p>
                                    </div>
                                    <span className="rounded-full bg-[var(--color-brand-soft)] px-3 py-1 text-xs font-semibold text-[var(--color-brand-primary)]">Live</span>
                                </div>
                                <div className="grid gap-2">
                                    {[
                                        { title: "Furniture Assembly", sub: "2 helpers available nearby", price: "฿1,500" },
                                        { title: "Dog Walking", sub: "Book in 5 minutes", price: "฿600" },
                                        { title: "Grocery Pickup", sub: "Same-day delivery", price: "฿400" },
                                    ].map((item) => (
                                        <div key={item.title} className="flex items-center justify-between rounded-lg border border-[var(--color-ink-border-soft)] px-3 py-2.5">
                                            <div>
                                                <p className="text-sm font-semibold text-[var(--color-ink-strong)]">{item.title}</p>
                                                <p className="text-xs text-[var(--color-text-muted)]">{item.sub}</p>
                                            </div>
                                            <span className="text-sm font-bold text-[var(--color-brand-primary)]">{item.price}</span>
                                        </div>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    className="mt-1 inline-flex w-full items-center justify-center rounded-full bg-[var(--color-brand-primary)] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--color-brand-primary-hover)] focus-visible:outline-none"
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
