import { DotsVerticalIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { io, type Socket } from "socket.io-client";
import { toast } from "sonner";
import { getAuthToken } from "../lib/authApi";
import { useCurrentUser } from "../lib/useCurrentUser";
import {
  deleteConversation,
  fetchConversationMessages,
  fetchConversations,
  type ChatConversation,
  type ChatMessage,
} from "../lib/chatApi";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api";
const SOCKET_URL = API_BASE_URL.replace(/\/api\/?$/, "");
const MUTE_STORAGE_KEY = "chat_muted_conversations";

export default function ChatPage() {
  const { user } = useCurrentUser();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [jobIdDraft, setJobIdDraft] = useState<string | null>(null);
  const [jobTitleDraft, setJobTitleDraft] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [openMenuMessageId, setOpenMenuMessageId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [mutedConversations, setMutedConversations] = useState<string[]>(() => {
    const raw = localStorage.getItem(MUTE_STORAGE_KEY);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const token = getAuthToken();
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = messagesContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  const selectedConversation = useMemo(
    () => conversations.find((conv) => conv.id === selectedId) ?? null,
    [conversations, selectedId],
  );

  const filteredConversations = useMemo(() => {
    const tokenized = searchTerm.trim().toLowerCase();
    if (!tokenized) return conversations;
    return conversations.filter((conv) => {
      const name = conv.participant.fullName.toLowerCase();
      const jobTitle = conv.jobTitle?.toLowerCase() ?? "";
      return name.includes(tokenized) || jobTitle.includes(tokenized);
    });
  }, [conversations, searchTerm]);

  const isMuted = (conversationId: string | null) =>
    conversationId ? mutedConversations.includes(conversationId) : false;
  useEffect(() => {
    if (!openMenuMessageId) return;
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      if (target.closest(`[data-message-menu-id="${openMenuMessageId}"]`)) {
        return;
      }
      setOpenMenuMessageId(null);
    };
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [openMenuMessageId]);


  const toggleMute = (conversationId: string) => {
    setMutedConversations((prev) => {
      const next = prev.includes(conversationId)
        ? prev.filter((id) => id !== conversationId)
        : [...prev, conversationId];
      localStorage.setItem(MUTE_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  useEffect(() => {
    if (!token) return;
    const socketClient = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket"],
    });
    setSocket(socketClient);

    return () => {
      socketClient.disconnect();
    };
  }, [token]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (token && !user?.emailVerifiedAt) {
      navigate("/profile/verify")
      return;
    }
    setLoadingConversations(true);
    fetchConversations()
      .then((data) => {
        const sorted = [...data].sort((a, b) => {
          const aTime = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : 0;
          const bTime = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : 0;
          return bTime - aTime;
        });
        setConversations(sorted);
        const paramConversationId = searchParams.get("conversationId");
        const paramJobId = searchParams.get("jobId");
        const paramJobTitle = searchParams.get("jobTitle");

        if (paramConversationId) {
          setSelectedId(paramConversationId);
          setJobIdDraft(null);
          setJobTitleDraft(null);
          return;
        }

        if (paramJobId) {
          const existing = data.find((conv) => conv.jobId === paramJobId) ?? null;
          setSelectedId(existing?.id ?? null);
          setJobIdDraft(existing ? null : paramJobId);
          setJobTitleDraft(existing ? null : paramJobTitle);
          return;
        }

        const fallbackId = data[0]?.id ?? null;
        setSelectedId(fallbackId);
        setJobIdDraft(null);
        setJobTitleDraft(null);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Unable to load chats.");
      })
      .finally(() => setLoadingConversations(false));
  }, [token, searchParams]);

  useEffect(() => {
    if (!selectedId || !token) {
      setMessages([]);
      return;
    }
    setLoadingMessages(true);
    fetchConversationMessages(selectedId)
      .then((data) => {
        setMessages(data);
        setConversations((prev) =>
          prev.map((conv) =>
            conv.id === selectedId ? { ...conv, unreadCount: 0 } : conv,
          ),
        );
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Unable to load messages.");
      })
      .finally(() => setLoadingMessages(false));

    socket?.emit("conversation:join", selectedId);
    return () => {
      socket?.emit("conversation:leave", selectedId);
    };
  }, [selectedId, token, socket]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message: ChatMessage) => {
      setConversations((prev) => {
        const updated = prev.map((conv) => {
          if (conv.id !== message.conversationId) return conv;
          const unreadCount =
            message.conversationId === selectedId ? 0 : conv.unreadCount + 1;
          return {
            ...conv,
            lastMessage: message.body,
            lastMessageAt: message.sentAt,
            unreadCount,
          };
        });
        const sorted = [...updated].sort((a, b) => {
          const aTime = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : 0;
          const bTime = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : 0;
          return bTime - aTime;
        });
        return sorted;
      });

      if (message.conversationId === selectedId) {
        setMessages((prev) => [...prev, message]);
        return;
      }

      const conversation = conversations.find((conv) => conv.id === message.conversationId);
      if (conversation && !isMuted(conversation.id)) {
        toast(`New message from ${conversation.participant.fullName}`);
      }
    };

    const handleUpdatedMessage = (message: ChatMessage) => {
      setMessages((prev) =>
        prev.map((item) =>
          item.id === message.id
            ? {
                ...item,
                body: message.body,
                editedAt: message.editedAt ?? item.editedAt,
                deletedAt: message.deletedAt ?? item.deletedAt,
              }
            : item,
        ),
      );
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === message.conversationId ? { ...conv, lastMessage: message.body } : conv,
        ),
      );
    };

    socket.on("message:new", handleNewMessage);
    socket.on("message:updated", handleUpdatedMessage);
    return () => {
      socket.off("message:new", handleNewMessage);
      socket.off("message:updated", handleUpdatedMessage);
    };
  }, [socket, selectedId, conversations, mutedConversations]);

  const handleSelectConversation = (conversationId: string) => {
    setSelectedId(conversationId);
    setSearchParams({ conversationId });
  };

  const handleSendMessage = async () => {
    if (!socket || !messageInput.trim()) return;
    const body = messageInput.trim();
    setMessageInput("");

    if (editingMessageId) {
      socket.emit(
        "message:edit",
        { messageId: editingMessageId, body },
        (response: { ok: boolean; message?: string }) => {
          if (!response?.ok) {
            setError(response?.message ?? "Unable to edit message.");
          }
        },
      );
      setEditingMessageId(null);
      return;
    }

    if (selectedId) {
      socket.emit(
        "message:send",
        { conversationId: selectedId, body },
        (response: { ok: boolean; message?: string }) => {
          if (!response?.ok) {
            setError(response?.message ?? "Unable to send message.");
          }
        },
      );
      return;
    }

    if (jobIdDraft) {
      socket.emit(
        "message:start",
        { jobId: jobIdDraft, body },
        (response: { ok: boolean; message?: string; data?: { conversationId?: string } }) => {
          if (!response?.ok) {
            setError(response?.message ?? "Unable to send message.");
            return;
          }

          const conversationId = response.data?.conversationId;
          if (conversationId) {
            setSelectedId(conversationId);
            setSearchParams({ conversationId });
            setJobIdDraft(null);
            setJobTitleDraft(null);
            fetchConversations().then((data) => setConversations(data)).catch(() => undefined);
          }
        },
      );
    }
  };

  const handleDeleteConversation = async () => {
    if (!selectedId) return;
    try {
      await deleteConversation(selectedId);
      setConversations((prev) => prev.filter((conv) => conv.id !== selectedId));
      setSelectedId(null);
      setMessages([]);
      setSearchParams({});
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to remove chat.");
    }
  };

  const handleEditMessage = (message: ChatMessage) => {
    setEditingMessageId(message.id);
    setMessageInput(message.body);
    setOpenMenuMessageId(null);
  };

  const handleDeleteMessage = (messageId: string) => {
    if (!socket) return;
    socket.emit(
      "message:delete",
      { messageId },
      (response: { ok: boolean; message?: string }) => {
        if (!response?.ok) {
          setError(response?.message ?? "Unable to delete message.");
        }
      },
    );
    setOpenMenuMessageId(null);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] -mt-6 -mx-4 sm:-mx-6 lg:-mx-8 overflow-hidden bg-white sm:rounded-4xl sm:border sm:border-slate-200">
      <div className="w-full sm:w-80 lg:w-96 shrink-0 flex flex-col border-r border-slate-200 bg-slate-50">
        <div className="p-4 border-b border-slate-200 bg-white sticky top-0 z-10">
          <h2 className="text-xl font-extrabold text-slate-900 mb-4">
            Messages
          </h2>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-100 py-2.5 pl-10 pr-4 text-sm font-medium outline-none transition-all focus:border-(--color-brand-primary) focus:bg-white focus:ring-4 focus:ring-(--color-brand-focus-ring)"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loadingConversations ? (
            <div className="m-6 rounded-3xl border-2 border-dashed border-slate-200 bg-white p-8 text-center text-sm font-semibold text-slate-500">
              Loading conversations...
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="m-6 rounded-3xl border-2 border-dashed border-slate-200 bg-white p-8 text-center text-sm font-semibold text-slate-500">
              No conversations found.
            </div>
          ) : (
            filteredConversations.map((chat) => {
              const isActive = chat.id === selectedId;
              const timeLabel = chat.lastMessageAt
                ? new Date(chat.lastMessageAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "";

              return (
                <button
                  type="button"
                  key={chat.id}
                  onClick={() => handleSelectConversation(chat.id)}
                  className={`flex w-full items-start gap-3 p-4 text-left transition-colors ${
                    isActive
                      ? "bg-(--color-brand-soft)/20 border-l-4 border-(--color-brand-primary)"
                      : "hover:bg-slate-100 border-l-4 border-transparent"
                  }`}
                >
                  <div className="relative">
                    <img
                      src={
                        chat.participant.avatarUrl ??
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${chat.participant.fullName}&backgroundColor=e2e8f0`
                      }
                      alt={chat.participant.fullName}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    {chat.unreadCount > 0 && (
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                    <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="truncate text-sm font-bold text-slate-900">
                        {chat.participant.fullName}
                      </h3>
                      <span
                        className={`text-xs font-bold ${
                          chat.unreadCount > 0
                            ? "text-(--color-brand-primary)"
                            : "text-slate-400"
                        }`}
                      >
                        {timeLabel}
                      </span>
                    </div>
                    <p
                      className={`truncate text-sm ${
                        chat.unreadCount > 0
                          ? "text-slate-900 font-bold"
                          : "text-slate-500 font-medium"
                      }`}
                    >
                      {chat.lastMessage ?? "Start a conversation"}
                    </p>
                    {chat.jobTitle ? (
                      <p className="mt-1 truncate text-xs text-slate-400">
                        {chat.jobTitle}
                      </p>
                    ) : null}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className="flex-1 flex-col bg-white hidden sm:flex">
        {error ? (
          <div className="m-6 rounded-3xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">
            {error}
          </div>
        ) : null}

        {!selectedConversation && !jobIdDraft ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm font-semibold text-slate-500">
              No chat history yet. Start a conversation from a job.
            </div>
          </div>
        ) : (
          <>
            <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {selectedConversation?.participant.fullName ?? "New message"}
                </h3>
                {(selectedConversation?.jobTitle || jobTitleDraft) ? (
                  <p className="text-sm text-slate-500">
                    {selectedConversation?.jobTitle ?? jobTitleDraft}
                  </p>
                ) : null}
              </div>
              <div className="flex items-center gap-2">
                {(selectedConversation?.jobId || jobIdDraft) ? (
                  <Link
                    to={`/jobs/${selectedConversation?.jobId ?? jobIdDraft}`}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:border-(--color-brand-primary) hover:text-(--color-brand-primary)"
                  >
                    View job
                  </Link>
                ) : null}
                {selectedConversation && selectedConversation.participant.id !== user?.id ? (
                  <Link
                    to={`/users/${selectedConversation.participant.id}`}
                    className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:border-(--color-brand-primary) hover:text-(--color-brand-primary)"
                  >
                    View profile
                  </Link>
                ) : null}
                {selectedConversation ? (
                  <>
                    <button
                      type="button"
                      onClick={() => toggleMute(selectedConversation.id)}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 hover:border-(--color-brand-primary) hover:text-(--color-brand-primary)"
                    >
                      {isMuted(selectedConversation.id) ? "Unmute" : "Mute"}
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteConversation}
                      className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-bold text-red-600 hover:border-red-300 hover:text-red-700"
                    >
                      Remove chat
                    </button>
                  </>
                ) : null}
              </div>
            </div>

            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto overflow-x-hidden px-6 py-4 space-y-3">
              {loadingMessages ? (
                <p className="text-sm text-slate-500">Loading messages...</p>
              ) : messages.length === 0 ? (
                <p className="text-sm text-slate-500">No messages yet.</p>
              ) : (
                messages.map((message) => {
                  const isMine = message.sender.id === user?.id;
                  return (
                    <div
                      key={message.id}
                      className={`flex min-w-0 w-full ${isMine ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex min-w-0 max-w-[85%] items-center gap-2 ${
                          isMine ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        <div
                          className={`min-w-0 rounded-2xl px-4 py-2 text-sm leading-relaxed [overflow-wrap:anywhere] ${
                            message.deletedAt
                              ? isMine
                                ? "bg-red-400/80 text-white"
                                : "bg-red-100 text-red-600"
                              : isMine
                              ? "bg-(--color-brand-primary) text-white"
                              : "bg-violet-100 text-slate-900"
                          }`}
                        >
                          <p className="[overflow-wrap:anywhere]">
                            {message.deletedAt ? "Deleted Message" : message.body}
                          </p>
                          <span
                            className={`mt-1 flex items-center gap-2 text-[10px] ${
                              isMine ? "text-white/70" : "text-slate-400"
                            }`}
                          >
                            {new Date(message.sentAt).toLocaleString([], {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                            {message.editedAt && !message.deletedAt ? (
                              <span className="text-[9px] uppercase tracking-wider">Edited</span>
                            ) : null}
                          </span>
                        </div>

                        {isMine && !message.deletedAt ? (
                          <div
                            className="relative"
                            data-message-menu-id={message.id}
                          >
                            <button
                              type="button"
                              onClick={() =>
                                setOpenMenuMessageId((prev) =>
                                  prev === message.id ? null : message.id,
                                )
                              }
                              className="rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                              aria-label="Message actions"
                            >
                              <DotsVerticalIcon />
                            </button>
                            {openMenuMessageId === message.id ? (
                              <div className="absolute left-0 mt-2 w-28 rounded-xl border border-slate-200 bg-white p-1 text-xs shadow-lg">
                                <button
                                  type="button"
                                  onClick={() => handleEditMessage(message)}
                                  className="w-full rounded-lg px-2 py-1 text-left font-semibold text-slate-700 hover:bg-slate-100"
                                >
                                  Edit
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteMessage(message.id)}
                                  className="w-full rounded-lg px-2 py-1 text-left font-semibold text-red-600 hover:bg-red-50"
                                >
                                  Delete
                                </button>
                              </div>
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="border-t border-slate-200 px-6 py-4">
              {editingMessageId ? (
                <div className="mb-2 flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700">
                  Editing message
                  <button
                    type="button"
                    onClick={() => setEditingMessageId(null)}
                    className="text-amber-700 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              ) : null}
              <div className="flex items-center gap-3">
                <textarea
                  value={messageInput}
                  onChange={(event) => setMessageInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      void handleSendMessage();
                    }
                  }}
                  placeholder="Type a message..."
                  rows={2}
                  className="flex-1 resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-(--color-brand-primary) focus:ring-4 focus:ring-(--color-brand-focus-ring)"
                />
                <button
                  type="button"
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  className="rounded-xl bg-(--color-brand-primary) px-4 py-2 text-sm font-bold text-white transition hover:bg-(--color-brand-primary-hover) disabled:opacity-60"
                >
                  Send
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
