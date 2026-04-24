export default function ChatPage() {
  const chats = [
    {
      name: "Min Thuta",
      message: "Hi! Is the tutoring spot near the library still available?",
      time: "9:12 AM",
    },
    {
      name: "Nang Hsu",
      message: "Thanks for the update. I can meet around 2 PM.",
      time: "Yesterday",
    },
    {
      name: "Gloria",
      message: "Sent you the project notes. Let me know if you need anything else.",
      time: "Mon",
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--color-ink-border-soft)] bg-white shadow-sm">
      <div className="border-b border-[var(--color-ink-border-faint)] px-5 py-4">
        <h1 className="text-base font-bold text-[var(--color-ink-strong)]">Messages</h1>
        <p className="text-xs text-[var(--color-text-muted)]">Your recent conversations</p>
      </div>

      {chats.map((chat, idx) => (
        <button
          key={chat.name}
          type="button"
          className={`w-full px-5 py-4 text-left transition hover:bg-[var(--color-brand-soft)] ${
            idx < chats.length - 1 ? "border-b border-[var(--color-ink-border-faint)]" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-primary)] text-sm font-bold text-white">
              {chat.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-semibold text-[var(--color-ink-strong)]">
                  {chat.name}
                </p>
                <span className="shrink-0 text-xs text-[var(--color-text-muted)]">{chat.time}</span>
              </div>
              <p className="mt-0.5 truncate text-sm text-[var(--color-text-muted)]">{chat.message}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
