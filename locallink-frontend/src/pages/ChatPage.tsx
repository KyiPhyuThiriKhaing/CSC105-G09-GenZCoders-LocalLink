import { PaperPlaneIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { currentUser, otherUsers } from "../data/mockUsers";

export default function ChatPage() {
  const conversations = [
    { id: otherUsers[0].id, name: otherUsers[0].name, lastMessage: "Yes, 3 PM works for me!", time: "10:42 AM", unread: 2 },
    { id: otherUsers[1].id, name: otherUsers[1].name, lastMessage: "Can you bring your own tools?", time: "Yesterday", unread: 0 },
    { id: otherUsers[2].id, name: otherUsers[2].name, lastMessage: "Thank you for the excellent service", time: "Mon", unread: 0 },
  ];

  return (
    <div className="flex h-[calc(100vh-8rem)] -mt-6 -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden bg-white sm:rounded-[2rem] sm:border sm:border-slate-200">
      {/* Sidebar - Contacts List */}
      <div className="w-full sm:w-80 lg:w-96 flex flex-col border-r border-slate-200 bg-slate-50">
        <div className="p-4 border-b border-slate-200 bg-white sticky top-0 z-10">
          <h2 className="text-xl font-extrabold text-slate-900 mb-4">Messages</h2>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full rounded-xl border border-slate-200 bg-slate-100 py-2.5 pl-10 pr-4 text-sm font-medium outline-none transition-all focus:border-[var(--color-brand-primary)] focus:bg-white focus:ring-4 focus:ring-[var(--color-brand-focus-ring)]"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((chat, idx) => (
            <div
              key={chat.id}
              className={`flex cursor-pointer items-start gap-3 p-4 transition-colors ${idx === 0 ? 'bg-[var(--color-brand-soft)]/20 border-l-4 border-[var(--color-brand-primary)]' : 'hover:bg-slate-100 border-l-4 border-transparent'
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
                  <h3 className="truncate text-sm font-bold text-slate-900">{chat.name}</h3>
                  <span className={`text-xs font-bold ${chat.unread > 0 ? 'text-[var(--color-brand-primary)]' : 'text-slate-400'}`}>
                    {chat.time}
                  </span>
                </div>
                <p className={`truncate text-sm ${chat.unread > 0 ? 'text-slate-900 font-bold' : 'text-slate-500 font-medium'}`}>
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area - Hidden on mobile if not active */}
      <div className="hidden sm:flex flex-1 flex-col bg-white">
        {/* Chat Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${otherUsers[0].name}&backgroundColor=e2e8f0`}
              alt={otherUsers[0].name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <h2 className="text-base font-bold text-slate-900">{otherUsers[0].name}</h2>
              <p className="text-xs font-medium text-emerald-500 flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span> Online
              </p>
            </div>
          </div>
          <button className="text-sm font-bold text-[var(--color-brand-primary)] hover:underline">View Job Details</button>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          <div className="flex items-end gap-2">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${otherUsers[0].name}&backgroundColor=e2e8f0`} className="h-8 w-8 rounded-full mb-1" alt="" />
            <div className="rounded-2xl rounded-bl-none bg-white p-3 shadow-sm border border-slate-100 max-w-md">
              <p className="text-sm font-medium text-slate-800">Hi {currentUser.name.split(' ')[0]}! I saw your proposal for the pet sitting job this weekend. Are you still available?</p>
              <span className="mt-1 block text-[10px] text-slate-400">10:30 AM</span>
            </div>
          </div>

          <div className="flex items-end justify-end gap-2">
            <div className="rounded-2xl rounded-br-none bg-[var(--color-brand-primary)] p-3 shadow-sm max-w-md">
              <p className="text-sm font-medium text-white">Yes, absolutely! I'm free all weekend. What times were you thinking?</p>
              <span className="mt-1 block text-[10px] text-white/70 text-right">10:35 AM</span>
            </div>
          </div>

          <div className="flex items-end gap-2">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${otherUsers[0].name}&backgroundColor=e2e8f0`} className="h-8 w-8 rounded-full mb-1" alt="" />
            <div className="rounded-2xl rounded-bl-none bg-white p-3 shadow-sm border border-slate-100 max-w-md">
              <p className="text-sm font-medium text-slate-800">I need someone from Saturday morning until Sunday evening. We can discuss the exact feeding schedule if that works for you.</p>
              <span className="mt-1 block text-[10px] text-slate-400">10:40 AM</span>
            </div>
          </div>

          <div className="flex items-end gap-2">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${otherUsers[0].name}&backgroundColor=e2e8f0`} className="h-8 w-8 rounded-full mb-1" alt="" />
            <div className="rounded-2xl rounded-bl-none bg-white p-3 shadow-sm border border-slate-100 max-w-md">
              <p className="text-sm font-medium text-slate-800">Yes, 3 PM works for me!</p>
              <span className="mt-1 block text-[10px] text-slate-400">10:42 AM</span>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-slate-200 bg-white p-4">
          <div className="flex items-center gap-3 rounded-[2rem] border-2 border-slate-100 bg-slate-50 p-2 pl-4 focus-within:border-[var(--color-brand-primary)] focus-within:bg-white focus-within:ring-4 focus-within:ring-[var(--color-brand-focus-ring)] transition-all">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
            />
            <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-primary)] text-white shadow-md transition-transform hover:scale-105 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)] focus:ring-offset-2">
              <PaperPlaneIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
