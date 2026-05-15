import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function ChatPage() {
  const conversations: Array<{
    id: string;
    name: string;
    lastMessage: string;
    time: string;
    unread: number;
  }> = [];

  return (
    <div className="flex h-[calc(100vh-8rem)] -mt-6 -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden bg-white sm:rounded-4xl sm:border sm:border-slate-200">
      {/* Sidebar - Contacts List */}
      <div className="w-full sm:w-80 lg:w-96 flex flex-col border-r border-slate-200 bg-slate-50">
        <div className="p-4 border-b border-slate-200 bg-white sticky top-0 z-10">
          <h2 className="text-xl font-extrabold text-slate-900 mb-4">
            Messages
          </h2>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full rounded-xl border border-slate-200 bg-slate-100 py-2.5 pl-10 pr-4 text-sm font-medium outline-none transition-all focus:border-(--color-brand-primary) focus:bg-white focus:ring-4 focus:ring-(--color-brand-focus-ring)"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="m-6 rounded-3xl border-2 border-dashed border-slate-200 bg-white p-8 text-center text-sm font-semibold text-slate-500">
              No messages yet.
            </div>
          ) : (
            conversations.map((chat, idx) => (
              <div
                key={chat.id}
                className={`flex cursor-pointer items-start gap-3 p-4 transition-colors ${idx === 0
                    ? "bg-(--color-brand-soft)/20 border-l-4 border-(--color-brand-primary)"
                    : "hover:bg-slate-100 border-l-4 border-transparent"
                  }`}
              >
                <div className="relative">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.name}&backgroundColor=e2e8f0`}
                    alt={chat.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  {chat.unread > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                      {chat.unread}
                    </span>
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="truncate text-sm font-bold text-slate-900">
                      {chat.name}
                    </h3>
                    <span
                      className={`text-xs font-bold ${chat.unread > 0 ? "text-(--color-brand-primary)" : "text-slate-400"}`}
                    >
                      {chat.time}
                    </span>
                  </div>
                  <p
                    className={`truncate text-sm ${chat.unread > 0 ? "text-slate-900 font-bold" : "text-slate-500 font-medium"}`}
                  >
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area - Empty State */}
      <div className="hidden sm:flex flex-1 flex-col items-center justify-center bg-white">
        <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm font-semibold text-slate-500">
          No chat history yet. Start a conversation after applying to a job.
        </div>
      </div>
    </div>
  );
}
