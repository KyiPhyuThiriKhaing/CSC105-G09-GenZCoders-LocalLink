import { prisma } from "../lib/prisma";

export type ConversationSummary = {
  id: string;
  jobId?: string | null;
  jobTitle?: string | null;
  participant: {
    id: string;
    fullName: string;
    avatarUrl?: string | null;
  };
  lastMessage?: string | null;
  lastMessageAt?: string | null;
  unreadCount: number;
};

export type ConversationMessage = {
  id: string;
  conversationId: string;
  body: string;
  sentAt: Date;
  editedAt?: Date | null;
  deletedAt?: Date | null;
  sender: {
    id: string;
    fullName: string;
    avatarUrl?: string | null;
  };
};

export const getUserConversations = async (userId: string): Promise<ConversationSummary[]> => {
  const conversations = await prisma.conversation.findMany({
    where: {
      participants: {
        some: { userId },
      },
    },
    orderBy: { updatedAt: "desc" },
    include: {
      job: { select: { id: true, title: true } },
      participants: {
        include: {
          user: {
            select: { id: true, fullName: true, avatarUrl: true },
          },
        },
      },
      messages: {
        orderBy: { sentAt: "desc" },
        take: 1,
        select: { body: true, sentAt: true, senderId: true },
      },
    },
  });

  const summaries = await Promise.all(
    conversations.map(async (conversation) => {
      const otherParticipant = conversation.participants.find(
        (participant) => participant.userId !== userId,
      );
      const currentParticipant = conversation.participants.find(
        (participant) => participant.userId === userId,
      );

      const lastMessage = conversation.messages[0] ?? null;
      const lastReadAt = currentParticipant?.lastReadAt ?? null;

      const unreadCount = await prisma.message.count({
        where: {
          conversationId: conversation.id,
          senderId: { not: userId },
          ...(lastReadAt ? { sentAt: { gt: lastReadAt } } : {}),
        },
      });

      return {
        id: conversation.id,
        jobId: conversation.jobId,
        jobTitle: conversation.job?.title ?? null,
        participant: {
          id: otherParticipant?.user.id ?? userId,
          fullName: otherParticipant?.user.fullName ?? "Unknown",
          avatarUrl: otherParticipant?.user.avatarUrl ?? null,
        },
        lastMessage: lastMessage?.body ?? null,
        lastMessageAt: lastMessage?.sentAt?.toISOString() ?? null,
        unreadCount,
      } satisfies ConversationSummary;
    }),
  );

  return summaries;
};

export const getConversationMessages = async (
  conversationId: string,
  userId: string,
): Promise<ConversationMessage[]> => {
  const participant = await prisma.conversationParticipant.findUnique({
    where: { conversationId_userId: { conversationId, userId } },
  });

  if (!participant) {
    throw new Error("Forbidden");
  }

  const messages = await prisma.message.findMany({
    where: { conversationId },
    orderBy: { sentAt: "asc" },
    include: {
      sender: {
        select: { id: true, fullName: true, avatarUrl: true },
      },
    },
  });

  await prisma.conversationParticipant.update({
    where: { conversationId_userId: { conversationId, userId } },
    data: { lastReadAt: new Date() },
  });

  return messages.map((message) => ({
    id: message.id,
    conversationId: message.conversationId,
    body: message.body,
    sentAt: message.sentAt,
    editedAt: message.editedAt,
    deletedAt: message.deletedAt,
    sender: message.sender,
  }));
};

export const getOrCreateJobConversation = async (jobId: string, userId: string) => {
  const job = await prisma.job.findUnique({
    where: { id: jobId },
    select: { id: true, title: true, posterId: true },
  });

  if (!job) {
    throw new Error("Job not found");
  }

  if (job.posterId === userId) {
    throw new Error("Cannot message yourself");
  }

  const existing = await prisma.conversation.findFirst({
    where: {
      jobId,
      participants: {
        some: { userId },
      },
      AND: {
        participants: {
          some: { userId: job.posterId },
        },
      },
    },
    include: {
      participants: {
        include: {
          user: {
            select: { id: true, fullName: true, avatarUrl: true },
          },
        },
      },
      job: { select: { id: true, title: true } },
    },
  });

  if (existing) {
    return existing;
  }

  return prisma.conversation.create({
    data: {
      jobId,
      participants: {
        create: [{ userId }, { userId: job.posterId }],
      },
    },
    include: {
      participants: {
        include: {
          user: {
            select: { id: true, fullName: true, avatarUrl: true },
          },
        },
      },
      job: { select: { id: true, title: true } },
    },
  });
};

export const getJobConversation = async (jobId: string, userId: string) => {
  return prisma.conversation.findFirst({
    where: {
      jobId,
      participants: { some: { userId } },
    },
    include: {
      participants: {
        include: {
          user: {
            select: { id: true, fullName: true, avatarUrl: true },
          },
        },
      },
      job: { select: { id: true, title: true } },
    },
  });
};

export const startJobConversationMessage = async (
  jobId: string,
  userId: string,
  body: string,
) => {
  const trimmed = body.trim();
  if (!trimmed) {
    throw new Error("Message body required");
  }

  const job = await prisma.job.findUnique({
    where: { id: jobId },
    select: { id: true, title: true, posterId: true },
  });

  if (!job) {
    throw new Error("Job not found");
  }

  if (job.posterId === userId) {
    throw new Error("Cannot message yourself");
  }

  return prisma.$transaction(async (tx) => {
    let conversation = await tx.conversation.findFirst({
      where: {
        jobId,
        participants: { some: { userId } },
        AND: { participants: { some: { userId: job.posterId } } },
      },
    });

    if (!conversation) {
      conversation = await tx.conversation.create({
        data: {
          jobId,
          participants: {
            create: [{ userId }, { userId: job.posterId }],
          },
        },
      });
    }

    const message = await tx.message.create({
      data: {
        conversationId: conversation.id,
        senderId: userId,
        body: trimmed,
      },
      include: {
        sender: { select: { id: true, fullName: true, avatarUrl: true } },
      },
    });

    await tx.conversation.update({
      where: { id: conversation.id },
      data: { updatedAt: new Date() },
    });

    return { conversationId: conversation.id, message };
  });
};

export const updateMessageBody = async (
  messageId: string,
  userId: string,
  body: string,
) => {
  const trimmed = body.trim();
  if (!trimmed) {
    throw new Error("Message body required");
  }

  const existing = await prisma.message.findUnique({
    where: { id: messageId },
    select: { id: true, senderId: true, conversationId: true },
  });

  if (!existing) {
    throw new Error("Message not found");
  }

  if (existing.senderId !== userId) {
    throw new Error("Forbidden");
  }

  const updated = await prisma.message.update({
    where: { id: messageId },
    data: { body: trimmed, editedAt: new Date(), deletedAt: null },
    include: {
      sender: { select: { id: true, fullName: true, avatarUrl: true } },
    },
  });

  return updated;
};

export const deleteMessageForUser = async (messageId: string, userId: string) => {
  const existing = await prisma.message.findUnique({
    where: { id: messageId },
    select: { id: true, senderId: true, conversationId: true },
  });

  if (!existing) {
    throw new Error("Message not found");
  }

  if (existing.senderId !== userId) {
    throw new Error("Forbidden");
  }

  const updated = await prisma.message.update({
    where: { id: messageId },
    data: { body: "Message deleted", deletedAt: new Date() },
    include: {
      sender: { select: { id: true, fullName: true, avatarUrl: true } },
    },
  });

  return updated;
};

export const removeConversationForUser = async (
  conversationId: string,
  userId: string,
): Promise<void> => {
  await prisma.conversationParticipant.delete({
    where: { conversationId_userId: { conversationId, userId } },
  });

  const remaining = await prisma.conversationParticipant.count({
    where: { conversationId },
  });

  if (remaining === 0) {
    await prisma.conversation.delete({ where: { id: conversationId } });
  }
};
