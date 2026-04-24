import { Link } from "react-router-dom";

type PromoCardProps = {
  title: string;
  description: string;
  buttonText: string;
  imageUrl?: string;
};

function PromoCard({
  title,
  description,
  buttonText,
  imageUrl,
}: PromoCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-4xl bg-white p-8 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] border border-slate-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]">
      {/* Decorative top gradient line */}
      <div className="absolute top-0 left-0 h-1.5 w-full bg-linear-to-r from-(--color-brand-primary) to-(--color-brand-accent) opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-(--color-brand-soft) shadow-inner mb-8 transition-transform duration-300 group-hover:scale-110">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-(--color-brand-primary)"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>

      <h3 className="mb-3 text-2xl font-extrabold tracking-tight text-slate-900">
        {title}
      </h3>
      <p className="mb-10 text-base leading-relaxed text-slate-600 grow">
        {description}
      </p>

      {imageUrl ? (
        <div className="mb-10 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
          <img
            src={imageUrl}
            alt={title}
            className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="mb-10 rounded-3xl bg-slate-50 p-6 border border-slate-100">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
            Why it matters
          </p>
          <ul className="space-y-3">
            {[
              "Free to join — no subscription needed",
              "Verified profiles and community reviews",
              "Safe in-app messaging",
            ].map((point, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-sm font-medium text-slate-600"
              >
                <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-(--color-brand-primary) text-white">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link
        to={buttonText.toLowerCase().includes("job") ? "/jobs" : "/signup"}
        className="mt-auto inline-flex items-center justify-between rounded-xl bg-slate-50 px-6 py-4 text-sm font-bold text-slate-900 transition-all hover:bg-(--color-brand-primary) hover:text-white"
      >
        {buttonText}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform group-hover:translate-x-1"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </Link>
    </div>
  );
}

export default PromoCard;
