import axios from "axios";
import { apiClient } from "./apiClient";

export type ChatParticipant = {
  id: string;
  fullName: string;
  avatarUrl?: string | null;
};

export type ChatConversation = {
  id: string;
  jobId?: string | null;
  jobTitle?: string | null;
  participant: ChatParticipant;
  lastMessage?: string | null;
  lastMessageAt?: string | null;
  unreadCount: number;
};

export type ChatMessage = {
  id: string;
  conversationId: string;
  body: string;
  sentAt: string;
  editedAt?: string | null;
  deletedAt?: string | null;
  sender: ChatParticipant;
};

const parseError = (error: unknown, fallback: string) => {
  if (axios.isAxiosError(error)) {
    const message =
      (error.response?.data as { message?: string } | undefined)?.message ??
      fallback;
    return new Error(message);
  }
  return error instanceof Error ? error : new Error(fallback);
};

export const fetchConversations = async (): Promise<ChatConversation[]> => {
  try {
    const result = await apiClient.get<{ data: ChatConversation[] }>(
      "/chat/conversations",
    );
    return result.data.data;
  } catch (error) {
    throw parseError(error, "Unable to load conversations.");
  }
};

export const fetchConversationMessages = async (
  conversationId: string,
): Promise<ChatMessage[]> => {
  try {
    const result = await apiClient.get<{ data: ChatMessage[] }>(
      `/chat/conversations/${conversationId}/messages`,
    );
    return result.data.data;
  } catch (error) {
    throw parseError(error, "Unable to load messages.");
  }
};

export const getJobConversation = async (jobId: string) => {
  try {
    const result = await apiClient.post<{ data: { id: string } }>(
      `/chat/job/${jobId}`,
    );
    return result.data.data;
  } catch (error) {
    throw parseError(error, "Unable to open chat.");
  }
};

export const deleteConversation = async (conversationId: string) => {
  try {
    await apiClient.delete(`/chat/conversations/${conversationId}`);
  } catch (error) {
    throw parseError(error, "Unable to remove chat.");
  }
};
