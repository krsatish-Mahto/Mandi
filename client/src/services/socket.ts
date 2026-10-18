import { io } from 'socket.io-client';
import type { Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

let socket: Socket | null = null;

export const connectSocket = (token: string): Socket => {
  if (socket) return socket;

  socket = io(SOCKET_URL, {
    auth: {
      token,
    },
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  });

  socket.on('connect', () => {
    console.log('Socket connected:', socket?.id);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  socket.on('error', (error: unknown) => {
    console.error('Socket error:', error);
  });

  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = (): Socket | null => socket;

// Socket event emitters
export const joinConversation = (conversationId: string): void => {
  if (socket) {
    socket.emit('join_conversation', { conversation_id: conversationId });
  }
};

export const leaveConversation = (conversationId: string): void => {
  if (socket) {
    socket.emit('leave_conversation', { conversation_id: conversationId });
  }
};

export const sendMessage = (conversationId: string, content: string): void => {
  if (socket) {
    socket.emit('send_message', { conversation_id: conversationId, content });
  }
};

export const markMessageAsSeen = (messageIds: string[]): void => {
  if (socket) {
    socket.emit('mark_as_seen', { message_ids: messageIds });
  }
};

// Socket event listeners setup
export const setupMessageListener = (callback: (data: unknown) => void): void => {
  if (socket) {
    socket.on('new_message', callback);
  }
};

export const setupSeenStatusListener = (callback: (data: unknown) => void): void => {
  if (socket) {
    socket.on('message_seen', callback);
  }
};

export const setupMessageSentListener = (callback: (data: unknown) => void): void => {
  if (socket) {
    socket.on('message_sent', callback);
  }
};

export const setupNotificationListener = (callback: (data: unknown) => void): void => {
  if (socket) {
    socket.on('new_notification', callback);
  }
};

// Cleanup listeners
export const removeMessageListener = (): void => {
  if (socket) {
    socket.off('new_message');
  }
};

export const removeSeenStatusListener = (): void => {
  if (socket) {
    socket.off('message_seen');
  }
};

export const removeMessageSentListener = (): void => {
  if (socket) {
    socket.off('message_sent');
  }
};

export const removeNotificationListener = (): void => {
  if (socket) {
    socket.off('new_notification');
  }
};
