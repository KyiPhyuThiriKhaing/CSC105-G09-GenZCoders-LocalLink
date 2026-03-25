export default function ChatPage() {
  const chats = [
    {
      name: "Min Thuta",
      initials: "67",
      message: "Hi! Is the tutoring spot near the library still available?",
      time: "9:12 AM",
    },
    {
      name: "Nang Hsu",
      initials: "89",
      message: "Thanks for the update. I can meet around 2 PM.",
      time: "Yesterday",
    },
    {
      name: "Gloria",
      initials: "10/11",
      message: "Sent you the project notes. Let me know if you need anything else.",
      time: "Mon",
    },
  ];

  return (
    <div className="min-h-screen bg-white px-0 py-6">
      <div className="mx-auto w-full max-w-7xl">
        {chats.map((chat) => (
          <div
            key={chat.name}
            className="w-full border-b border-[var(--color-ink-border-soft)] px-5 py-6 sm:px-8"
          >
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-brand-primary text-base font-semibold tracking-wide text-white">
                {chat.initials}
              </div>

              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="truncate text-xl font-semibold text-[var(--color-ink-strong)]">
                    {chat.name}
                  </p>
                  <span className="shrink-0 text-sm text-[var(--color-text-muted)]">
                    {chat.time}
                  </span>
                </div>
                <p className="text-base text-[var(--color-text-muted)]">{chat.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}