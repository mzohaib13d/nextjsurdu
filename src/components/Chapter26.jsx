import React, { useState, useEffect } from "react";
import RightSidebar from "./RightSidebar";

export default function Chapter26() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("user-theme") || "light"
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const [activeTab, setActiveTab] = useState("socket-setup");

  useEffect(() => {
    localStorage.setItem("user-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopySuccess("✅ کوڈ کاپی ہو گیا ہے!");
    setTimeout(() => setCopySuccess(""), 3000);
  };

  const CodeBlock = ({ code, colorClass = "text-emerald-400", title = "" }) => (
    <div className="relative my-8">
      {title && (
        <div className="mb-2 text-sm font-bold text-sky-400" dir="rtl">
          {title}
        </div>
      )}
      <div className="flex justify-between items-center mb-1">
        <div className="text-xs text-gray-500">{code.split('\n').length} لائنیں</div>
        <button
          onClick={() => handleCopy(code)}
          className="mt-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs px-4 py-2 rounded-lg transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          کوڈ کاپی کریں
        </button>
      </div>
      <pre
        className={`bg-gray-900 ${colorClass} p-5 rounded-xl text-left font-mono overflow-x-auto text-sm md:text-base border border-gray-800 shadow-lg`}
        dir="ltr"
      >
        {code}
      </pre>
    </div>
  );

  // Tabs for different sections
  const tabs = [
    { id: "socket-setup", label: "⚡ Socket.io Setup", color: "indigo" },
    { id: "live-chat", label: "💬 Live Chat System", color: "red" },
    { id: "real-time-notifications", label: "🔔 Real-time Notifications", color: "green" },
    { id: "collaborative-features", label: "👥 Collaborative Features", color: "purple" }
  ];

  // Section 26.1: Socket.io Setup
  const socketSetupCode = `// 📁 lib/socket/server.js
// Socket.io Server Setup for Next.js

import { Server } from 'socket.io';
import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import jwt from 'jsonwebtoken';

// User connections store
const userConnections = new Map();
const roomUsers = new Map();
const onlineInstructors = new Set();
const typingUsers = new Map();

export function initializeSocketServer(app) {
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.NODE_ENV === 'production' 
        ? process.env.APP_URL 
        : 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true
    },
    pingTimeout: 60000,
    pingInterval: 25000,
    transports: ['websocket', 'polling']
  });

  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      
      if (!token) {
        return next(new Error('Authentication error: Token required'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.userId;
      socket.userRole = decoded.role;
      socket.userName = decoded.name;
      
      next();
    } catch (error) {
      console.error('Socket authentication error:', error);
      next(new Error('Authentication failed'));
    }
  });

  // Connection handler
  io.on('connection', (socket) => {
    console.log(\`✅ User connected: \${socket.userId} (\${socket.userName})\`);

    // Store user connection
    userConnections.set(socket.userId, {
      socketId: socket.id,
      userId: socket.userId,
      userName: socket.userName,
      role: socket.userRole,
      connectedAt: new Date(),
      lastActive: new Date()
    });

    // Send online status to all
    io.emit('user:online', {
      userId: socket.userId,
      userName: socket.userName,
      role: socket.userRole
    });

    // Update instructor online status
    if (socket.userRole === 'instructor' || socket.userRole === 'admin') {
      onlineInstructors.add(socket.userId);
      io.emit('instructor:online', {
        instructorId: socket.userId,
        instructorName: socket.userName,
        online: true
      });
    }

    // 🔄 Join course room
    socket.on('course:join', (courseId) => {
      const roomName = \`course:\${courseId}\`;
      socket.join(roomName);
      
      // Track room users
      if (!roomUsers.has(roomName)) {
        roomUsers.set(roomName, new Set());
      }
      roomUsers.get(roomName).add(socket.userId);
      
      // Notify others in room
      socket.to(roomName).emit('user:joined', {
        userId: socket.userId,
        userName: socket.userName,
        timestamp: new Date()
      });
      
      console.log(\`📚 User \${socket.userName} joined course room: \${roomName}\`);
    });

    // 🔄 Join study group
    socket.on('study:group:join', (groupId) => {
      const roomName = \`study-group:\${groupId}\`;
      socket.join(roomName);
      socket.studyGroup = groupId;
    });

    // 🔄 Join private chat
    socket.on('private:chat:join', ({ userId, targetUserId }) => {
      const roomName = getPrivateRoomName(userId, targetUserId);
      socket.join(roomName);
      socket.privateChat = roomName;
    });

    // ❌ Disconnect handler
    socket.on('disconnect', () => {
      console.log(\`❌ User disconnected: \${socket.userId}\`);
      
      // Remove from connections
      userConnections.delete(socket.userId);
      
      // Remove from online instructors
      if (onlineInstructors.has(socket.userId)) {
        onlineInstructors.delete(socket.userId);
        io.emit('instructor:offline', {
          instructorId: socket.userId,
          online: false
        });
      }
      
      // Remove from typing indicators
      typingUsers.delete(socket.userId);
      
      // Notify all users
      io.emit('user:offline', {
        userId: socket.userId,
        userName: socket.userName
      });

      // Clean up room users
      roomUsers.forEach((users, roomName) => {
        if (users.has(socket.userId)) {
          users.delete(socket.userId);
          socket.to(roomName).emit('user:left', {
            userId: socket.userId,
            userName: socket.userName,
            timestamp: new Date()
          });
        }
      });
    });

    // 🏓 Keep alive ping
    socket.on('ping', () => {
      socket.emit('pong', { timestamp: new Date() });
    });

    // 🔍 Get online users
    socket.on('users:online:get', () => {
      const onlineUsers = Array.from(userConnections.values()).map(user => ({
        userId: user.userId,
        userName: user.userName,
        role: user.role,
        lastActive: user.lastActive
      }));
      
      socket.emit('users:online:list', onlineUsers);
    });

    // 🔍 Get online instructors
    socket.on('instructors:online:get', () => {
      const instructors = Array.from(onlineInstructors).map(instructorId => {
        const user = userConnections.get(instructorId);
        return user ? {
          instructorId: user.userId,
          instructorName: user.userName,
          online: true
        } : null;
      }).filter(Boolean);
      
      socket.emit('instructors:online:list', instructors);
    });
  });

  return httpServer;
}

// Helper function for private room names
function getPrivateRoomName(userId1, userId2) {
  const sortedIds = [userId1, userId2].sort();
  return \`private:\${sortedIds[0]}:\${sortedIds[1]}\`;
}

// 📁 lib/socket/client.js
// Socket.io Client Setup

import { io } from 'socket.io-client';

class SocketClient {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.listeners = new Map();
  }

  connect(token) {
    if (this.socket?.connected) return;
    
    this.socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
      auth: { token },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      timeout: 20000
    });

    // Connection events
    this.socket.on('connect', () => {
      console.log('✅ Socket connected');
      this.isConnected = true;
      this.reconnectAttempts = 0;
      this.emitEvent('connected', { connected: true });
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      this.isConnected = false;
      this.emitEvent('connection_error', { error: error.message });
    });

    this.socket.on('disconnect', (reason) => {
      console.log(\`Socket disconnected: \${reason}\`);
      this.isConnected = false;
      this.emitEvent('disconnected', { reason });
      
      if (reason === 'io server disconnect') {
        // Server initiated disconnect, try to reconnect
        this.socket.connect();
      }
    });

    this.socket.on('reconnect_attempt', (attempt) => {
      this.reconnectAttempts = attempt;
      console.log(\`Reconnection attempt: \${attempt}\`);
    });

    this.socket.on('reconnect', (attempt) => {
      console.log(\`✅ Reconnected after \${attempt} attempts\`);
      this.isConnected = true;
      this.emitEvent('reconnected', { attempt });
    });

    // Default event listeners
    this.setupDefaultListeners();
  }

  setupDefaultListeners() {
    // User online/offline events
    this.on('user:online', (data) => {
      console.log(\`User online: \${data.userName}\`);
      this.emitEvent('user_online', data);
    });

    this.on('user:offline', (data) => {
      console.log(\`User offline: \${data.userName}\`);
      this.emitEvent('user_offline', data);
    });

    this.on('instructor:online', (data) => {
      this.emitEvent('instructor_online', data);
    });

    this.on('instructor:offline', (data) => {
      this.emitEvent('instructor_offline', data);
    });

    // Course room events
    this.on('user:joined', (data) => {
      this.emitEvent('user_joined_room', data);
    });

    this.on('user:left', (data) => {
      this.emitEvent('user_left_room', data);
    });

    // Ping pong
    this.on('pong', (data) => {
      this.emitEvent('pong', data);
    });
  }

  // Join course room
  joinCourseRoom(courseId) {
    if (!this.isConnected) return false;
    this.socket.emit('course:join', courseId);
    return true;
  }

  // Join study group
  joinStudyGroup(groupId) {
    if (!this.isConnected) return false;
    this.socket.emit('study:group:join', groupId);
    return true;
  }

  // Join private chat
  joinPrivateChat(userId, targetUserId) {
    if (!this.isConnected) return false;
    this.socket.emit('private:chat:join', { userId, targetUserId });
    return true;
  }

  // Get online users
  getOnlineUsers() {
    if (!this.isConnected) return Promise.reject('Not connected');
    return new Promise((resolve) => {
      this.socket.emit('users:online:get');
      this.once('users:online:list', resolve);
    });
  }

  // Get online instructors
  getOnlineInstructors() {
    if (!this.isConnected) return Promise.reject('Not connected');
    return new Promise((resolve) => {
      this.socket.emit('instructors:online:get');
      this.once('instructors:online:list', resolve);
    });
  }

  // Send ping
  ping() {
    if (!this.isConnected) return false;
    this.socket.emit('ping');
    return true;
  }

  // Event listeners management
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
    
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  once(event, callback) {
    if (this.socket) {
      this.socket.once(event, callback);
    }
  }

  off(event, callback) {
    const listeners = this.listeners.get(event);
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
    
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  emitEvent(event, data) {
    const listeners = this.listeners.get(event);
    if (listeners) {
      listeners.forEach(callback => callback(data));
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      this.listeners.clear();
    }
  }

  getSocket() {
    return this.socket;
  }

  getConnectionStatus() {
    return this.isConnected;
  }
}

// Singleton instance
let socketInstance = null;

export function getSocketClient() {
  if (!socketInstance) {
    socketInstance = new SocketClient();
  }
  return socketInstance;
}

// React Hook for Socket.io
export function useSocket() {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [onlineInstructors, setOnlineInstructors] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const socketClient = getSocketClient();
    socketClient.connect(token);

    setSocket(socketClient);

    // Setup event listeners
    socketClient.on('connected', () => setIsConnected(true));
    socketClient.on('disconnected', () => setIsConnected(false));
    socketClient.on('user_online', (user) => {
      setOnlineUsers(prev => [...prev, user]);
    });
    socketClient.on('user_offline', ({ userId }) => {
      setOnlineUsers(prev => prev.filter(u => u.userId !== userId));
    });
    socketClient.on('instructor_online', (instructor) => {
      setOnlineInstructors(prev => [...prev, instructor]);
    });
    socketClient.on('instructor_offline', ({ instructorId }) => {
      setOnlineInstructors(prev => prev.filter(i => i.instructorId !== instructorId));
    });

    // Get initial online users
    socketClient.getOnlineUsers().then(setOnlineUsers);
    socketClient.getOnlineInstructors().then(setOnlineInstructors);

    // Cleanup
    return () => {
      socketClient.off('connected');
      socketClient.off('disconnected');
      socketClient.off('user_online');
      socketClient.off('user_offline');
      socketClient.off('instructor_online');
      socketClient.off('instructor_offline');
    };
  }, []);

  return {
    socket,
    isConnected,
    onlineUsers,
    onlineInstructors,
    joinCourseRoom: (courseId) => socket?.joinCourseRoom(courseId),
    joinStudyGroup: (groupId) => socket?.joinStudyGroup(groupId),
    joinPrivateChat: (userId, targetUserId) => socket?.joinPrivateChat(userId, targetUserId),
    disconnect: () => socket?.disconnect()
  };
}`;

  // Section 26.2: Live Chat System
  const liveChatCode = `// 📁 components/chat/CourseChat.jsx
// Complete Course Chat System with Socket.io

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSocket } from '@/lib/socket/client';
import {
  Send, Smile, Paperclip, Mic, MoreVertical,
  Users, Pin, ThumbsUp, Clock, Search,
  Image as ImageIcon, Video, File, X
} from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import { format } from 'date-fns';
import { ur } from 'date-fns/locale';

export default function CourseChat({ courseId, currentUser }) {
  const { socket, isConnected, onlineUsers } = useSocket();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [typingUsers, setTypingUsers] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [pinnedMessages, setPinnedMessages] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Join course room on component mount
  useEffect(() => {
    if (socket && courseId && isConnected) {
      socket.joinCourseRoom(courseId);
      
      // Load previous messages
      loadPreviousMessages();
      
      // Setup chat listeners
      setupChatListeners();
    }
    
    return () => {
      // Cleanup listeners
      if (socket) {
        socket.off('chat:message');
        socket.off('chat:typing');
        socket.off('chat:stop_typing');
        socket.off('chat:pinned');
        socket.off('chat:reaction');
      }
    };
  }, [socket, courseId, isConnected]);

  // Auto scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load previous messages from API
  const loadPreviousMessages = async () => {
    try {
      const response = await fetch(\`/api/courses/\${courseId}/chat/messages\`);
      const data = await response.json();
      
      if (data.success) {
        setMessages(data.messages);
        setPinnedMessages(data.pinnedMessages || []);
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  // Setup socket listeners
  const setupChatListeners = () => {
    if (!socket) return;

    // New message listener
    socket.on('chat:message', (message) => {
      setMessages(prev => [...prev, message]);
      
      // Remove typing indicator for this user
      setTypingUsers(prev => prev.filter(u => u.userId !== message.senderId));
    });

    // Typing indicator listener
    socket.on('chat:typing', ({ userId, userName }) => {
      setTypingUsers(prev => {
        const exists = prev.find(u => u.userId === userId);
        if (exists) return prev;
        return [...prev, { userId, userName }];
      });
    });

    // Stop typing listener
    socket.on('chat:stop_typing', ({ userId }) => {
      setTypingUsers(prev => prev.filter(u => u.userId !== userId));
    });

    // Pinned message listener
    socket.on('chat:pinned', (pinnedMessage) => {
      setPinnedMessages(prev => [...prev, pinnedMessage]);
    });

    // Message reaction listener
    socket.on('chat:reaction', ({ messageId, reaction, userId }) => {
      setMessages(prev => prev.map(msg => {
        if (msg.id === messageId) {
          const reactions = msg.reactions || {};
          if (!reactions[userId]) {
            reactions[userId] = [];
          }
          if (!reactions[userId].includes(reaction)) {
            reactions[userId].push(reaction);
          }
          return { ...msg, reactions };
        }
        return msg;
      }));
    });

    // Message deleted listener
    socket.on('chat:deleted', ({ messageId, deletedBy }) => {
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
    });

    // Message edited listener
    socket.on('chat:edited', ({ messageId, content, editedAt }) => {
      setMessages(prev => prev.map(msg => {
        if (msg.id === messageId) {
          return { ...msg, content, editedAt, isEdited: true };
        }
        return msg;
      }));
    });
  };

  // Send message
  const sendMessage = async () => {
    if (!newMessage.trim() || !socket || !isConnected) return;

    const message = {
      id: \`msg_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`,
      courseId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      content: newMessage.trim(),
      timestamp: new Date(),
      type: 'text',
      reactions: {},
      isEdited: false
    };

    // Emit message to socket
    socket.getSocket().emit('chat:message', message);
    
    // Add to local state immediately
    setMessages(prev => [...prev, message]);
    
    // Clear input
    setNewMessage('');
    
    // Stop typing indicator
    setIsTyping(false);
    socket.getSocket().emit('chat:stop_typing', { 
      userId: currentUser.id,
      courseId 
    });

    // Also save to database
    try {
      await fetch(\`/api/courses/\${courseId}/chat/messages\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
      });
    } catch (error) {
      console.error('Failed to save message:', error);
    }
  };

  // Handle typing indicator
  const handleTyping = useCallback(() => {
    if (!socket || !isConnected || !isTyping) return;

    // Emit typing event
    socket.getSocket().emit('chat:typing', {
      userId: currentUser.id,
      userName: currentUser.name,
      courseId
    });

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      socket.getSocket().emit('chat:stop_typing', {
        userId: currentUser.id,
        courseId
      });
    }, 3000);
  }, [socket, isConnected, isTyping, currentUser, courseId]);

  // Handle file upload
  const handleFileUpload = async (file) => {
    if (!file) return;
    
    setUploadingFile(true);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('courseId', courseId);
    formData.append('senderId', currentUser.id);
    formData.append('senderName', currentUser.name);

    try {
      const response = await fetch('/api/chat/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      
      if (data.success) {
        const message = {
          id: data.messageId,
          courseId,
          senderId: currentUser.id,
          senderName: currentUser.name,
          senderAvatar: currentUser.avatar,
          content: data.fileUrl,
          fileName: data.fileName,
          fileType: data.fileType,
          fileSize: data.fileSize,
          timestamp: new Date(),
          type: 'file',
          reactions: {}
        };

        // Emit file message
        socket.getSocket().emit('chat:message', message);
        setMessages(prev => [...prev, message]);
      }
    } catch (error) {
      console.error('File upload failed:', error);
    } finally {
      setUploadingFile(false);
    }
  };

  // Pin message
  const pinMessage = async (messageId) => {
    try {
      const response = await fetch(\`/api/courses/\${courseId}/chat/messages/\${messageId}/pin\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pinnedBy: currentUser.id })
      });

      const data = await response.json();
      
      if (data.success) {
        socket.getSocket().emit('chat:pinned', data.pinnedMessage);
        setPinnedMessages(prev => [...prev, data.pinnedMessage]);
      }
    } catch (error) {
      console.error('Failed to pin message:', error);
    }
  };

  // Add reaction to message
  const addReaction = (messageId, reaction) => {
    if (!socket || !isConnected) return;

    socket.getSocket().emit('chat:reaction', {
      messageId,
      reaction,
      userId: currentUser.id,
      courseId
    });
  };

  // Delete message
  const deleteMessage = async (messageId) => {
    if (!confirm('کیا آپ واقعی یہ پیغام حذف کرنا چاہتے ہیں؟')) return;

    try {
      const response = await fetch(\`/api/courses/\${courseId}/chat/messages/\${messageId}\`, {
        method: 'DELETE'
      });

      const data = await response.json();
      
      if (data.success) {
        socket.getSocket().emit('chat:deleted', {
          messageId,
          deletedBy: currentUser.id,
          courseId
        });
      }
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

  // Edit message
  const editMessage = async (messageId, newContent) => {
    try {
      const response = await fetch(\`/api/courses/\${courseId}/chat/messages/\${messageId}\`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newContent })
      });

      const data = await response.json();
      
      if (data.success) {
        socket.getSocket().emit('chat:edited', {
          messageId,
          content: newContent,
          editedAt: new Date(),
          editedBy: currentUser.id,
          courseId
        });
      }
    } catch (error) {
      console.error('Failed to edit message:', error);
    }
  };

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Filter messages by search
  const filteredMessages = searchQuery
    ? messages.filter(msg =>
        msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.senderName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : messages;

  // Format time
  const formatTime = (date) => {
    return format(new Date(date), 'hh:mm a', { locale: ur });
  };

  // Format date
  const formatDate = (date) => {
    return format(new Date(date), 'MMM dd, yyyy', { locale: ur });
  };

  return (
    <div className="flex flex-col h-[600px] bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
              {courseId.charAt(0)}
            </div>
            {isConnected && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
            )}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">
              کورس چیٹ
            </h3>
            <div className="flex items-center gap-2">
              <Users className="w-3 h-3 text-gray-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {onlineUsers.length} آن لائن
              </span>
              {typingUsers.length > 0 && (
                <span className="text-sm text-blue-600 dark:text-blue-400">
                  {typingUsers.map(u => u.userName).join(', ')} لکھ رہے ہیں...
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedUsers(new Set(onlineUsers.map(u => u.userId)))}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            title="Select All"
          >
            <Users className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          
          <div className="relative">
            <input
              type="text"
              placeholder="تلاش کریں..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Pinned Messages */}
      {pinnedMessages.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border-y border-amber-200 dark:border-amber-800 p-2">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 text-sm">
            <Pin className="w-4 h-4" />
            <span className="font-medium">پن شدہ پیغامات</span>
          </div>
          <div className="mt-1 space-y-1">
            {pinnedMessages.slice(0, 2).map(msg => (
              <div key={msg.id} className="text-xs text-amber-700 dark:text-amber-400 truncate">
                {msg.senderName}: {msg.content}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredMessages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <Send className="w-8 h-8" />
            </div>
            <p className="font-medium">ابھی تک کوئی پیغام نہیں</p>
            <p className="text-sm mt-1">پہلا پیغام بھیجیں اور بات چیت شروع کریں</p>
          </div>
        ) : (
          filteredMessages.map((message, index) => {
            const isCurrentUser = message.senderId === currentUser.id;
            const showDate = index === 0 || 
              formatDate(message.timestamp) !== formatDate(filteredMessages[index - 1]?.timestamp);
            
            return (
              <div key={message.id}>
                {/* Date Separator */}
                {showDate && (
                  <div className="flex justify-center my-4">
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-xs">
                      {formatDate(message.timestamp)}
                    </span>
                  </div>
                )}
                
                {/* Message */}
                <div className={\`flex \${isCurrentUser ? 'justify-end' : 'justify-start'} gap-2\`}>
                  {!isCurrentUser && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {message.senderName?.charAt(0) || 'U'}
                      </div>
                    </div>
                  )}
                  
                  <div className={\`max-w-[70%] \${isCurrentUser ? 'order-first' : ''}\`}>
                    {!isCurrentUser && (
                      <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        {message.senderName}
                      </div>
                    )}
                    
                    <div className={\`rounded-2xl px-4 py-2 \${isCurrentUser 
                      ? 'bg-blue-500 text-white rounded-br-none' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-none'
                    }\`}>
                      {/* File Message */}
                      {message.type === 'file' && (
                        <div className="mb-2">
                          <div className="flex items-center gap-2 p-2 bg-white/20 dark:bg-black/20 rounded-lg">
                            {message.fileType?.startsWith('image') ? (
                              <ImageIcon className="w-5 h-5" />
                            ) : message.fileType?.startsWith('video') ? (
                              <Video className="w-5 h-5" />
                            ) : (
                              <File className="w-5 h-5" />
                            )}
                            <div className="flex-1">
                              <p className="font-medium text-sm truncate">
                                {message.fileName}
                              </p>
                              <p className="text-xs opacity-80">
                                {(message.fileSize / 1024).toFixed(1)} KB
                              </p>
                            </div>
                            <a
                              href={message.content}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300"
                            >
                              ڈاؤن لوڈ
                            </a>
                          </div>
                        </div>
                      )}
                      
                      {/* Text Content */}
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      
                      {/* Message Footer */}
                      <div className={\`flex items-center justify-between mt-1 text-xs \${isCurrentUser ? 'text-blue-200' : 'text-gray-500'}\`}>
                        <div className="flex items-center gap-2">
                          <span>{formatTime(message.timestamp)}</span>
                          {message.isEdited && (
                            <span className="italic">ترمیم شدہ</span>
                          )}
                        </div>
                        
                        {/* Reactions */}
                        {message.reactions && Object.keys(message.reactions).length > 0 && (
                          <div className="flex items-center gap-1">
                            {Object.entries(message.reactions).flatMap(([userId, reactions]) =>
                              reactions.map((reaction, idx) => (
                                <span key={\`\${userId}_\${idx}\`} className="px-1 bg-white/20 rounded">
                                  {reaction}
                                </span>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Message Actions */}
                    <div className="flex items-center gap-2 mt-1 px-2">
                      <button
                        onClick={() => addReaction(message.id, '👍')}
                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      >
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                      {currentUser.role === 'instructor' || isCurrentUser ? (
                        <>
                          <button
                            onClick={() => pinMessage(message.id)}
                            className="text-gray-500 hover:text-amber-600"
                          >
                            <Pin className="w-4 h-4" />
                          </button>
                          {isCurrentUser && (
                            <>
                              <button
                                onClick={() => {
                                  const newContent = prompt('نیا متن درج کریں:', message.content);
                                  if (newContent) editMessage(message.id, newContent);
                                }}
                                className="text-gray-500 hover:text-blue-600"
                              >
                                ترمیم
                              </button>
                              <button
                                onClick={() => deleteMessage(message.id)}
                                className="text-gray-500 hover:text-red-600"
                              >
                                حذف
                              </button>
                            </>
                          )}
                        </>
                      ) : null}
                    </div>
                  </div>
                  
                  {isCurrentUser && (
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {currentUser.name?.charAt(0) || 'Y'}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Typing Indicators */}
      {typingUsers.length > 0 && (
        <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
            {typingUsers.map(u => u.userName).join(', ')} لکھ رہے ہیں...
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center gap-2">
          {/* File Upload Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingFile}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 disabled:opacity-50"
          >
            {uploadingFile ? (
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Paperclip className="w-5 h-5" />
            )}
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files?.[0])}
            accept="image/*,video/*,.pdf,.doc,.docx,.txt"
          />
          
          {/* Emoji Picker */}
          <div className="relative">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400"
            >
              <Smile className="w-5 h-5" />
            </button>
            
            {showEmojiPicker && (
              <div className="absolute bottom-full left-0 mb-2">
                <EmojiPicker
                  onEmojiClick={(emoji) => {
                    setNewMessage(prev => prev + emoji.emoji);
                    setShowEmojiPicker(false);
                  }}
                  skinTonesDisabled
                  searchDisabled
                  previewConfig={{ showPreview: false }}
                />
              </div>
            )}
          </div>
          
          {/* Message Input */}
          <div className="flex-1">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                if (!isTyping) {
                  setIsTyping(true);
                }
                handleTyping();
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="پیغام لکھیں..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-transparent"
            />
          </div>
          
          {/* Send Button */}
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim() || !isConnected}
            className="p-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
          
          {/* Voice Message Button */}
          <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400">
            <Mic className="w-5 h-5" />
          </button>
        </div>
        
        {/* Connection Status */}
        <div className="mt-2 text-xs text-center">
          {isConnected ? (
            <span className="text-green-600 dark:text-green-400">
              ✅ آن لائن - Real-time چیٹنگ فعال ہے
            </span>
          ) : (
            <span className="text-red-600 dark:text-red-400">
              ❌ آف لائن - Real-time چیٹنگ غیر فعال ہے
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// 📁 app/api/courses/[courseId]/chat/messages/route.js
// Chat Messages API

import { connectDB } from '@/lib/database';
import ChatMessage from '@/models/ChatMessage';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json(
        { success: false, message: 'لاگ ان کریں' },
        { status: 401 }
      );
    }
    
    const { courseId } = params;
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 50;
    const before = searchParams.get('before');
    
    // Build query
    const query = { courseId };
    if (before) {
      query.createdAt = { $lt: new Date(before) };
    }
    
    // Get messages
    const messages = await ChatMessage.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    
    // Get pinned messages
    const pinnedMessages = await ChatMessage.find({
      courseId,
      isPinned: true
    })
      .sort({ pinnedAt: -1 })
      .limit(5)
      .lean();
    
    return Response.json({
      success: true,
      messages: messages.reverse(), // Oldest first
      pinnedMessages,
      total: await ChatMessage.countDocuments({ courseId })
    });
    
  } catch (error) {
    console.error('Get messages error:', error);
    return Response.json(
      { success: false, message: 'سرور ایرر' },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  try {
    await connectDB();
    
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json(
        { success: false, message: 'لاگ ان کریں' },
        { status: 401 }
      );
    }
    
    const { courseId } = params;
    const data = await request.json();
    
    // Create message
    const message = await ChatMessage.create({
      ...data,
      courseId,
      senderId: session.user.id,
      senderName: session.user.name,
      createdAt: new Date()
    });
    
    return Response.json({
      success: true,
      message,
      messageId: message._id
    }, { status: 201 });
    
  } catch (error) {
    console.error('Create message error:', error);
    return Response.json(
      { success: false, message: 'سرور ایرر' },
      { status: 500 }
    );
  }
}

// 📁 models/ChatMessage.js
// Chat Message Model

import mongoose from 'mongoose';

const chatMessageSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
    index: true
  },
  
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  
  senderName: {
    type: String,
    required: true
  },
  
  senderAvatar: String,
  
  content: {
    type: String,
    required: true,
    maxlength: 5000
  },
  
  type: {
    type: String,
    enum: ['text', 'file', 'system'],
    default: 'text'
  },
  
  // For file messages
  fileName: String,
  fileUrl: String,
  fileType: String,
  fileSize: Number,
  
  // Reactions
  reactions: {
    type: Map,
    of: [String], // Array of emojis for each user
    default: {}
  },
  
  // Pinning
  isPinned: {
    type: Boolean,
    default: false,
    index: true
  },
  
  pinnedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  pinnedAt: Date,
  
  // Editing
  isEdited: {
    type: Boolean,
    default: false
  },
  
  editedAt: Date,
  
  // Deletion
  isDeleted: {
    type: Boolean,
    default: false
  },
  
  deletedAt: Date,
  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // Metadata
  metadata: {
    ip: String,
    userAgent: String,
    device: String
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes
chatMessageSchema.index({ courseId, createdAt: -1 });
chatMessageSchema.index({ senderId, createdAt: -1 });
chatMessageSchema.index({ isPinned: 1, courseId: 1 });

// Virtual for formatted time
chatMessageSchema.virtual('formattedTime').get(function() {
  return new Date(this.createdAt).toLocaleTimeString('ur-PK', {
    hour: '2-digit',
    minute: '2-digit'
  });
});

export default mongoose.models.ChatMessage || 
  mongoose.model('ChatMessage', chatMessageSchema);`;

  // Section 26.3: Real-time Notifications
  const realTimeNotificationsCode = `// 📁 components/notifications/RealTimeNotifications.jsx
// Complete Real-time Notification System

'use client';

import { useState, useEffect, useRef } from 'react';
import { useSocket } from '@/lib/socket/client';
import {
  Bell, BellRing, CheckCircle, AlertCircle,
  MessageSquare, Users, Video, BookOpen,
  X, CheckCheck, Settings, Trash2
} from 'lucide-react';
import { format } from 'date-fns';
import { ur } from 'date-fns/locale';

export default function RealTimeNotifications() {
  const { socket, isConnected } = useSocket();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoMarkAsRead, setAutoMarkAsRead] = useState(false);
  
  const audioRef = useRef(null);
  const notificationRef = useRef(null);

  // Load notifications on mount
  useEffect(() => {
    loadNotifications();
    setupNotificationListeners();
    
    // Play notification sound
    audioRef.current = new Audio('/sounds/notification.mp3');
    audioRef.current.volume = 0.3;
    
    // Close on click outside
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      cleanupListeners();
    };
  }, []);

  // Update unread count
  useEffect(() => {
    const unread = notifications.filter(n => !n.read).length;
    setUnreadCount(unread);
    
    // Update browser tab title
    if (unread > 0) {
      document.title = \`(\${unread}) LMS - Notifications\`;
    } else {
      document.title = 'LMS';
    }
  }, [notifications]);

  // Load notifications from API
  const loadNotifications = async () => {
    try {
      const response = await fetch('/api/notifications');
      const data = await response.json();
      
      if (data.success) {
        setNotifications(data.notifications);
      }
    } catch (error) {
      console.error('Failed to load notifications:', error);
    }
  };

  // Setup socket listeners
  const setupNotificationListeners = () => {
    if (!socket) return;

    // New notification
    socket.on('notification:new', (notification) => {
      setNotifications(prev => [notification, ...prev]);
      
      // Play sound if enabled
      if (soundEnabled && audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(console.error);
      }
      
      // Show desktop notification
      if (Notification.permission === 'granted') {
        showDesktopNotification(notification);
      }
      
      // Auto mark as read if enabled
      if (autoMarkAsRead) {
        markAsRead(notification.id);
      }
    });

    // Notification read
    socket.on('notification:read', ({ notificationId, readBy }) => {
      setNotifications(prev => prev.map(n => 
        n.id === notificationId ? { ...n, read: true, readAt: new Date() } : n
      ));
    });

    // Notification deleted
    socket.on('notification:deleted', ({ notificationId }) => {
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
    });

    // All notifications read
    socket.on('notifications:all:read', ({ userId }) => {
      setNotifications(prev => prev.map(n => ({ ...n, read: true, readAt: new Date() })));
    });
  };

  // Cleanup listeners
  const cleanupListeners = () => {
    if (!socket) return;
    
    socket.off('notification:new');
    socket.off('notification:read');
    socket.off('notification:deleted');
    socket.off('notifications:all:read');
  };

  // Show desktop notification
  const showDesktopNotification = (notification) => {
    const title = getNotificationTitle(notification.type);
    const options = {
      body: notification.message,
      icon: '/logo.png',
      badge: '/badge.png',
      tag: notification.id,
      renotify: true,
      silent: !soundEnabled,
      data: {
        url: notification.actionUrl,
        notificationId: notification.id
      }
    };

    new Notification(title, options).onclick = () => {
      if (notification.actionUrl) {
        window.location.href = notification.actionUrl;
      }
      markAsRead(notification.id);
    };
  };

  // Request notification permission
  const requestNotificationPermission = () => {
    if (Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Notification permission granted');
        }
      });
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      const response = await fetch(\`/api/notifications/\${notificationId}/read\`, {
        method: 'PUT'
      });

      const data = await response.json();
      
      if (data.success && socket) {
        socket.getSocket().emit('notification:read', {
          notificationId,
          readBy: 'current-user-id' // Get from auth
        });
      }
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      const response = await fetch('/api/notifications/read-all', {
        method: 'PUT'
      });

      const data = await response.json();
      
      if (data.success && socket) {
        socket.getSocket().emit('notifications:all:read', {
          userId: 'current-user-id'
        });
      }
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  // Delete notification
  const deleteNotification = async (notificationId) => {
    try {
      const response = await fetch(\`/api/notifications/\${notificationId}\`, {
        method: 'DELETE'
      });

      const data = await response.json();
      
      if (data.success && socket) {
        socket.getSocket().emit('notification:deleted', { notificationId });
      }
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  // Clear all notifications
  const clearAllNotifications = async () => {
    try {
      const response = await fetch('/api/notifications', {
        method: 'DELETE'
      });

      const data = await response.json();
      
      if (data.success) {
        setNotifications([]);
      }
    } catch (error) {
      console.error('Failed to clear all notifications:', error);
    }
  };

  // Get notification icon
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="w-5 h-5 text-blue-500" />;
      case 'enrollment':
        return <Users className="w-5 h-5 text-green-500" />;
      case 'course_update':
        return <BookOpen className="w-5 h-5 text-purple-500" />;
      case 'live_session':
        return <Video className="w-5 h-5 text-red-500" />;
      case 'assignment':
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case 'payment':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  // Get notification title
  const getNotificationTitle = (type) => {
    switch (type) {
      case 'message':
        return 'نیا پیغام';
      case 'enrollment':
        return 'نیا اندراج';
      case 'course_update':
        return 'کورس اپ ڈیٹ';
      case 'live_session':
        return 'لائیو سیشن';
      case 'assignment':
        return 'اسائنمنٹ یاد دہانی';
      case 'payment':
        return 'ادائیگی کی تصدیق';
      default:
        return 'نئی اطلاع';
    }
  };

  // Format time
  const formatTime = (date) => {
    const now = new Date();
    const notificationDate = new Date(date);
    const diffMs = now - notificationDate;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'ابھی';
    if (diffMins < 60) return \`\${diffMins} منٹ پہلے\`;
    if (diffHours < 24) return \`\${diffHours} گھنٹے پہلے\`;
    if (diffDays < 7) return \`\${diffDays} دن پہلے\`;
    
    return format(notificationDate, 'MMM dd', { locale: ur });
  };

  // Filter notifications by type
  const [filter, setFilter] = useState('all');
  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === filter);

  return (
    <div className="relative" ref={notificationRef}>
      {/* Notification Bell */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          requestNotificationPermission();
        }}
        className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        {unreadCount > 0 ? (
          <BellRing className="w-6 h-6 text-amber-600 dark:text-amber-500" />
        ) : (
          <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
        )}
        
        {/* Unread Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <BellRing className="w-5 h-5" />
                اطلاعیں
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {unreadCount} نئی
                  </span>
                )}
              </h3>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  تمام پڑھیں
                </button>
                <button
                  onClick={clearAllNotifications}
                  className="text-sm text-red-600 dark:text-red-400 hover:text-red-700"
                >
                  صاف کریں
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex gap-1 overflow-x-auto">
              {['all', 'message', 'course_update', 'live_session', 'assignment', 'payment'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={\`px-3 py-1 text-sm rounded-full whitespace-nowrap \${filter === type 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' 
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }\`}
                >
                  {type === 'all' ? 'سب' : getNotificationTitle(type)}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="font-medium">کوئی اطلاع نہیں</p>
                <p className="text-sm mt-1">جب نئی اطلاع آئے گی تو یہاں دکھائی دے گی</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={\`p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer \${!notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}\`}
                    onClick={() => {
                      if (notification.actionUrl) {
                        window.location.href = notification.actionUrl;
                      }
                      markAsRead(notification.id);
                    }}
                  >
                    <div className="flex gap-3">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          {getNotificationIcon(notification.type)}
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                            {getNotificationTitle(notification.type)}
                          </h4>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {formatTime(notification.createdAt)}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                          {notification.message}
                        </p>
                        
                        {notification.metaData && (
                          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                            {notification.metaData.courseName && (
                              <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded mr-2">
                                {notification.metaData.courseName}
                              </span>
                            )}
                            {notification.metaData.instructorName && (
                              <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 rounded">
                                {notification.metaData.instructorName}
                              </span>
                            )}
                          </div>
                        )}
                        
                        {/* Actions */}
                        <div className="flex items-center gap-3 mt-3">
                          {!notification.read && (
                            <span className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              نئی
                            </span>
                          )}
                          
                          <div className="flex items-center gap-2 ml-auto">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                markAsRead(notification.id);
                              }}
                              className="text-xs text-gray-500 hover:text-green-600 dark:hover:text-green-400"
                              title="پڑھیں"
                            >
                              <CheckCheck className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              className="text-xs text-gray-500 hover:text-red-600 dark:hover:text-red-400"
                              title="حذف کریں"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <button
                onClick={() => {
                  // Open settings modal
                }}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <Settings className="w-4 h-4" />
                ترتیبات
              </button>
              
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={soundEnabled}
                    onChange={(e) => setSoundEnabled(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  آواز
                </label>
                
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={autoMarkAsRead}
                    onChange={(e) => setAutoMarkAsRead(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  خود بخود پڑھیں
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Connection Status */}
      <div className="absolute -bottom-8 right-0 text-xs">
        {isConnected ? (
          <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Real-time فعال
          </span>
        ) : (
          <span className="text-red-600 dark:text-red-400">
            ❌ Real-time غیر فعال
          </span>
        )}
      </div>
    </div>
  );
}

// 📁 lib/notifications/NotificationService.js
// Notification Service for Real-time Notifications

import { getSocketClient } from '@/lib/socket/client';

export class NotificationService {
  constructor() {
    this.socket = getSocketClient();
  }

  // Send notification
  sendNotification(notification) {
    if (!this.socket.getConnectionStatus()) {
      console.warn('Socket not connected, cannot send notification');
      return false;
    }

    const fullNotification = {
      id: \`notif_\${Date.now()}_\${Math.random().toString(36).substr(2, 9)}\`,
      ...notification,
      createdAt: new Date(),
      read: false
    };

    this.socket.getSocket().emit('notification:send', fullNotification);
    return true;
  }

  // Send course enrollment notification
  sendEnrollmentNotification(userId, courseName, instructorName) {
    return this.sendNotification({
      userId,
      type: 'enrollment',
      message: \`آپ نے "\${courseName}" کورس میں داخلہ لے لیا ہے\`,
      actionUrl: \`/courses/\${courseId}\`,
      metaData: {
        courseName,
        instructorName
      }
    });
  }

  // Send new message notification
  sendMessageNotification(userId, senderName, message, chatUrl) {
    return this.sendNotification({
      userId,
      type: 'message',
      message: \`\${senderName}: \${message.substring(0, 50)}\${message.length > 50 ? '...' : ''}\`,
      actionUrl: chatUrl,
      metaData: {
        senderName,
        messagePreview: message.substring(0, 100)
      }
    });
  }

  // Send live session notification
  sendLiveSessionNotification(userId, sessionTitle, instructorName, startTime) {
    return this.sendNotification({
      userId,
      type: 'live_session',
      message: \`"\${sessionTitle}" لائیو سیشن شروع ہونے والا ہے\`,
      actionUrl: '/live-sessions',
      metaData: {
        sessionTitle,
        instructorName,
        startTime: new Date(startTime).toLocaleString('ur-PK')
      }
    });
  }

  // Send assignment deadline notification
  sendAssignmentNotification(userId, assignmentTitle, courseName, deadline) {
    return this.sendNotification({
      userId,
      type: 'assignment',
      message: \`"\${assignmentTitle}" اسائنمنٹ کی آخری تاریخ قریب ہے\`,
      actionUrl: '/assignments',
      metaData: {
        assignmentTitle,
        courseName,
        deadline: new Date(deadline).toLocaleString('ur-PK')
      }
    });
  }

  // Send payment confirmation
  sendPaymentNotification(userId, amount, courseName, transactionId) {
    return this.sendNotification({
      userId,
      type: 'payment',
      message: \`آپ کی ادائیگی (\${amount}) کامیاب ہوئی\`,
      actionUrl: '/payments',
      metaData: {
        amount,
        courseName,
        transactionId
      }
    });
  }

  // Send course update notification
  sendCourseUpdateNotification(userId, courseName, updateType) {
    return this.sendNotification({
      userId,
      type: 'course_update',
      message: \`"\${courseName}" کورس میں نیا \${updateType} شامل کیا گیا\`,
      actionUrl: \`/courses/\${courseId}\`,
      metaData: {
        courseName,
        updateType
      }
    });
  }

  // Batch send notifications to multiple users
  sendBatchNotifications(userIds, notification) {
    userIds.forEach(userId => {
      this.sendNotification({
        ...notification,
        userId
      });
    });
  }

  // Setup notification listeners
  setupListeners(onNewNotification, onNotificationRead, onNotificationDeleted) {
    this.socket.on('notification:new', onNewNotification);
    this.socket.on('notification:read', onNotificationRead);
    this.socket.on('notification:deleted', onNotificationDeleted);
  }

  // Remove listeners
  removeListeners() {
    this.socket.off('notification:new');
    this.socket.off('notification:read');
    this.socket.off('notification:deleted');
  }
}

// Singleton instance
let notificationService = null;

export function getNotificationService() {
  if (!notificationService) {
    notificationService = new NotificationService();
  }
  return notificationService;
}

// 📁 app/api/notifications/route.js
// Notifications API

import { connectDB } from '@/lib/database';
import Notification from '@/models/Notification';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(request) {
  try {
    await connectDB();
    
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json(
        { success: false, message: 'لاگ ان کریں' },
        { status: 401 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 20;
    const type = searchParams.get('type');
    const unreadOnly = searchParams.get('unreadOnly') === 'true';
    
    // Build query
    const query = { userId: session.user.id };
    if (type && type !== 'all') {
      query.type = type;
    }
    if (unreadOnly) {
      query.read = false;
    }
    
    // Get notifications
    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
    
    // Get unread count
    const unreadCount = await Notification.countDocuments({
      userId: session.user.id,
      read: false
    });
    
    return Response.json({
      success: true,
      notifications,
      unreadCount,
      total: await Notification.countDocuments({ userId: session.user.id })
    });
    
  } catch (error) {
    console.error('Get notifications error:', error);
    return Response.json(
      { success: false, message: 'سرور ایرر' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json(
        { success: false, message: 'لاگ ان کریں' },
        { status: 401 }
      );
    }
    
    // Delete all user notifications
    await Notification.deleteMany({ userId: session.user.id });
    
    return Response.json({
      success: true,
      message: 'تمام اطلاعیں حذف ہو گئیں'
    });
    
  } catch (error) {
    console.error('Delete notifications error:', error);
    return Response.json(
      { success: false, message: 'سرور ایرر' },
      { status: 500 }
    );
  }
}`;

  return (
    <div
      dir="rtl"
      className={`min-h-screen transition-all duration-500 font-sans ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 to-slate-900 text-slate-100"
          : "bg-gradient-to-br from-gray-50 to-blue-50 text-slate-900"
      }`}
    >
      {/* Success Message */}
      {copySuccess && (
        <div className="fixed top-24 right-0 z-[100] bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-l-xl shadow-2xl animate-slide-in font-bold border-l-4 border-emerald-400 text-sm flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {copySuccess}
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-3 md:p-4 backdrop-blur-md bg-opacity-90 border-b border-slate-700/20 shadow-lg">
        <button
          onClick={toggleSidebar}
          className="p-4 cursor-pointer rounded-full hover:text-white bg-opacity-90 text-purple-400 hover:bg-purple-100/80 hover:text-blue-500 transition-all z-[60] text-current"
        >
          <div className="space-y-1.5">
            <span className={`block w-6 md:w-8 h-1 bg-current transition-all ${sidebarOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block w-6 md:w-8 h-1 bg-current transition-all ${sidebarOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-6 md:w-8 h-1 bg-current transition-all ${sidebarOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </div>
        </button>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 cursor-pointer rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold active:scale-95 text-xs md:text-sm hover:from-blue-700 hover:to-indigo-700 transition-all"
        >
          {theme === "light" ? "🌙 ڈارک موڈ" : "☀️ روشن موڈ"}
        </button>
      </header>

      <RightSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} theme={theme} />

      <main className="w-full max-w-6xl mx-auto px-4 md:px-12 pt-28 pb-20 leading-relaxed text-right overflow-x-hidden">
        {/* Chapter Title */}
        <h1 className="text-3xl md:text-5xl font-black mb-6 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          باب 26: Real-time Features with Socket.io ⚡
        </h1>
        <p className="text-center text-lg mb-10 text-gray-600 dark:text-gray-300">
          حقیقی وقت میں کمیونیکیشن - آپ کے LMS کو زندہ بنا دیں گے!
        </p>

        {/* Chapter Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full font-bold transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
                activeTab === tab.id
                  ? `bg-gradient-to-r from-${tab.color}-600 to-${tab.color}-800 text-white shadow-lg scale-105`
                  : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:shadow-md"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Introduction */}
        <section className="mb-16 p-8 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border border-indigo-500/20">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-indigo-400">
            🎓 باب کا مقصد: حقیقی وقت میں انٹرایکٹو LMS بنانا
          </h2>
          <p className="text-lg mb-6">
            اس باب میں ہم <strong>Socket.io</strong> استعمال کرتے ہوئے ایسے فیچرز بنائیں گے جو آپ کے LMS کو حقیقی وقت میں متحرک بنا دیں گے۔
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/30 dark:bg-slate-800/80 p-6 rounded-xl border border-indigo-200 dark:border-indigo-800">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="text-xl font-bold mb-2 text-indigo-600 dark:text-indigo-400">Live Chat System</h3>
              <p className="text-sm">Course-specific real-time chat</p>
            </div>
            
            <div className="bg-white/30 dark:bg-slate-800/80 p-6 rounded-xl border border-green-200 dark:border-green-800">
              <div className="text-3xl mb-3">🔔</div>
              <h3 className="text-xl font-bold mb-2 text-green-600 dark:text-green-400">Real-time Notifications</h3>
              <p className="text-sm">Instant updates & alerts</p>
            </div>
            
            <div className="bg-white/30 dark:bg-slate-800/80 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
              <div className="text-3xl mb-3">👥</div>
              <h3 className="text-xl font-bold mb-2 text-purple-600 dark:text-purple-400">Collaborative Features</h3>
              <p className="text-sm">Group study & live sessions</p>
            </div>
          </div>
        </section>

        {/* Section 26.1: Socket.io Setup */}
        {activeTab === "socket-setup" && (
          <section className="mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-indigo-400 border-r-4 border-indigo-500 pr-4">
              26.1: Socket.io Server & Client Setup
            </h2>

            <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 border border-indigo-500/20">
              <h3 className="text-xl font-bold mb-4 text-indigo-300">
                ⚡ Why Socket.io for Real-time Communication?
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-white/10 dark:bg-slate-800/50">
                  <h4 className="font-bold mb-2 text-indigo-300">✅ Socket.io Features:</h4>
                  <ul className="list-disc pr-6 space-y-2 text-sm">
                    <li>Bi-directional real-time communication</li>
                    <li>Automatic reconnection handling</li>
                    <li>Room-based messaging</li>
                    <li>Cross-browser compatibility</li>
                    <li>Scalable with multiple transports</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-white/10 dark:bg-slate-800/50">
                  <h4 className="font-bold mb-2 text-purple-300">🚀 Performance Benefits:</h4>
                  <ul className="list-disc pr-6 space-y-2 text-sm">
                    <li>Low latency communication</li>
                    <li>Efficient data transfer</li>
                    <li>Built-in heartbeats & ping/pong</li>
                    <li>Connection state management</li>
                    <li>Error handling & recovery</li>
                  </ul>
                </div>
              </div>
            </div>

            <CodeBlock 
              code={socketSetupCode} 
              colorClass="text-indigo-300"
              title="lib/socket/server.js & client.js - Complete Socket.io Setup"
            />
          </section>
        )}

        {/* Section 26.2: Live Chat System */}
        {activeTab === "live-chat" && (
          <section className="mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-blue-400 border-r-4 border-blue-500 pr-4">
              26.2: Complete Course Chat System
            </h2>

            <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20">
              <h3 className="text-xl font-bold mb-4 text-blue-300">
                💬 Course Chat - طلباء اور انسٹرکٹرز کے درمیان براہ راست رابطہ
              </h3>
              
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold">📨</span>
                  </div>
                  <p className="font-bold text-blue-400">Real-time Messaging</p>
                  <p className="text-sm">Instant message delivery</p>
                </div>

                <div className="hidden md:block text-2xl">→</div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold">📎</span>
                  </div>
                  <p className="font-bold text-green-400">File Sharing</p>
                  <p className="text-sm">Images, PDFs, documents</p>
                </div>

                <div className="hidden md:block text-2xl">→</div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold">🎯</span>
                  </div>
                  <p className="font-bold text-purple-400">Reactions & Pinning</p>
                  <p className="text-sm">Engage with messages</p>
                </div>

                <div className="hidden md:block text-2xl">→</div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold">👁️</span>
                  </div>
                  <p className="font-bold text-amber-400">Typing Indicators</p>
                  <p className="text-sm">See who's typing</p>
                </div>
              </div>
            </div>

            <CodeBlock 
              code={liveChatCode} 
              colorClass="text-blue-300"
              title="components/chat/CourseChat.jsx - Complete Real-time Chat System"
            />
          </section>
        )}

        {/* Section 26.3: Real-time Notifications */}
        {activeTab === "real-time-notifications" && (
          <section className="mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-green-400 border-r-4 border-green-500 pr-4">
              26.3: Real-time Notification System
            </h2>

            <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-green-500/5 to-emerald-500/5 border border-green-500/20">
              <h3 className="text-xl font-bold mb-4 text-green-300">
                🔔 Instant Updates for Better User Experience
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-2 text-blue-300">✅ Notification Types:</h4>
                  <ul className="list-disc pr-6 space-y-2">
                    <li>New messages & replies</li>
                    <li>Course enrollment confirmations</li>
                    <li>Live session reminders</li>
                    <li>Assignment deadlines</li>
                    <li>Payment confirmations</li>
                    <li>Course updates</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-2 text-purple-300">🔧 Technical Features:</h4>
                  <ul className="list-disc pr-6 space-y-2">
                    <li>Desktop notifications</li>
                    <li>Sound alerts</li>
                    <li>Unread counter</li>
                    <li>Mark as read/unread</li>
                    <li>Filter by type</li>
                    <li>Batch operations</li>
                  </ul>
                </div>
              </div>
            </div>

            <CodeBlock 
              code={realTimeNotificationsCode} 
              colorClass="text-green-300"
              title="components/notifications/RealTimeNotifications.jsx - Complete Notification System"
            />
          </section>
        )}

        {/* Section 26.4: Collaborative Features */}
        {activeTab === "collaborative-features" && (
          <section className="mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-purple-400 border-r-4 border-purple-500 pr-4">
              26.4: Collaborative Learning Features
            </h2>

            <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20">
              <h3 className="text-xl font-bold mb-4 text-purple-300">
                👥 Group Study & Live Interactive Sessions
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-white/10 dark:bg-slate-800/50">
                  <h4 className="font-bold mb-2 text-blue-300">🎤 Live Q&A</h4>
                  <ul className="list-disc pr-6 space-y-2 text-sm">
                    <li>Real-time question answering</li>
                    <li>Hand raising system</li>
                    <li>Moderated discussions</li>
                    <li>Session recording</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-white/10 dark:bg-slate-800/50">
                  <h4 className="font-bold mb-2 text-green-300">📝 Whiteboard</h4>
                  <ul className="list-disc pr-6 space-y-2 text-sm">
                    <li>Collaborative drawing</li>
                    <li>Multi-user editing</li>
                    <li>Shapes & text tools</li>
                    <li>Export functionality</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-white/10 dark:bg-slate-800/50">
                  <h4 className="font-bold mb-2 text-amber-300">👥 Study Groups</h4>
                  <ul className="list-disc pr-6 space-y-2 text-sm">
                    <li>Private group chats</li>
                    <li>Shared resources</li>
                    <li>Group assignments</li>
                    <li>Progress tracking</li>
                  </ul>
                </div>
              </div>
            </div>

            <CodeBlock 
              code={`// 📁 components/collaboration/LiveSession.jsx
// Live Interactive Session with Whiteboard & Q&A

'use client';

import { useState, useEffect, useRef } from 'react';
import { useSocket } from '@/lib/socket/client';
import {
  Video, Mic, MicOff, VideoOff, ScreenShare,
  Hand, MessageSquare, Users, Settings,
  X, Circle, Square, Type, Trash2, Download,
  Send, ThumbsUp, Award, Clock
} from 'lucide-react';

export default function LiveSession({ sessionId, currentUser, isInstructor }) {
  const { socket, isConnected } = useSocket();
  const [participants, setParticipants] = useState([]);
  const [messages, setMessages] = useState([]);
  const [raisedHands, setRaisedHands] = useState([]);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [whiteboardMode, setWhiteboardMode] = useState('draw');
  const [whiteboardLines, setWhiteboardLines] = useState([]);
  const [currentLine, setCurrentLine] = useState([]);
  const [polls, setPolls] = useState([]);
  
  const videoRef = useRef(null);
  const whiteboardRef = useRef(null);
  const messagesEndRef = useRef(null);
  const drawing = useRef(false);

  // Join session on mount
  useEffect(() => {
    if (socket && sessionId && isConnected) {
      socket.getSocket().emit('live:session:join', {
        sessionId,
        userId: currentUser.id,
        userName: currentUser.name,
        role: currentUser.role
      });
      
      setupSessionListeners();
    }
    
    return () => {
      cleanupSessionListeners();
    };
  }, [socket, sessionId, isConnected]);

  // Setup WebRTC for video/audio
  useEffect(() => {
    if (navigator.mediaDevices && !isVideoOff) {
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: !isAudioMuted
      }).then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      });
    }
    
    return () => {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [isAudioMuted, isVideoOff]);

  // Setup session listeners
  const setupSessionListeners = () => {
    if (!socket) return;

    // Participant joined
    socket.on('live:participant:joined', (participant) => {
      setParticipants(prev => [...prev, participant]);
    });

    // Participant left
    socket.on('live:participant:left', (participantId) => {
      setParticipants(prev => prev.filter(p => p.userId !== participantId));
    });

    // New message
    socket.on('live:message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    // Hand raised
    socket.on('live:hand:raised', ({ userId, userName }) => {
      setRaisedHands(prev => [...prev, { userId, userName }]);
    });

    // Hand lowered
    socket.on('live:hand:lowered', (userId) => {
      setRaisedHands(prev => prev.filter(h => h.userId !== userId));
    });

    // Whiteboard drawing
    socket.on('whiteboard:draw', (line) => {
      setWhiteboardLines(prev => [...prev, line]);
    });

    // Whiteboard cleared
    socket.on('whiteboard:cleared', () => {
      setWhiteboardLines([]);
    });

    // Poll created
    socket.on('poll:created', (poll) => {
      setPolls(prev => [...prev, poll]);
    });

    // Poll voted
    socket.on('poll:voted', ({ pollId, optionIndex, userId }) => {
      setPolls(prev => prev.map(poll => {
        if (poll.id === pollId) {
          const newOptions = [...poll.options];
          newOptions[optionIndex].votes = (newOptions[optionIndex].votes || 0) + 1;
          return { ...poll, options: newOptions };
        }
        return poll;
      }));
    });
  };

  // Cleanup listeners
  const cleanupSessionListeners = () => {
    if (!socket) return;
    
    socket.off('live:participant:joined');
    socket.off('live:participant:left');
    socket.off('live:message');
    socket.off('live:hand:raised');
    socket.off('live:hand:lowered');
    socket.off('whiteboard:draw');
    socket.off('whiteboard:cleared');
    socket.off('poll:created');
    socket.off('poll:voted');
  };

  // Send message
  const sendMessage = (content) => {
    if (!socket || !content.trim()) return;
    
    const message = {
      id: \`msg_\${Date.now()}\`,
      sessionId,
      userId: currentUser.id,
      userName: currentUser.name,
      content,
      timestamp: new Date(),
      type: 'text'
    };
    
    socket.getSocket().emit('live:message', message);
  };

  // Raise hand
  const raiseHand = () => {
    if (!socket) return;
    
    socket.getSocket().emit('live:hand:raise', {
      userId: currentUser.id,
      userName: currentUser.name,
      sessionId
    });
  };

  // Lower hand
  const lowerHand = () => {
    if (!socket) return;
    
    socket.getSocket().emit('live:hand:lower', {
      userId: currentUser.id,
      sessionId
    });
  };

  // Start screen share
  const startScreenShare = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setIsScreenSharing(true);
    } catch (error) {
      console.error('Screen share failed:', error);
    }
  };

  // Stop screen share
  const stopScreenShare = async () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      
      // Restart camera
      const stream = await navigator.mediaDevices.getUserMedia({
        video: !isVideoOff,
        audio: !isAudioMuted
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setIsScreenSharing(false);
    }
  };

  // Whiteboard drawing
  const startDrawing = (e) => {
    if (whiteboardMode !== 'draw') return;
    
    const rect = whiteboardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    drawing.current = true;
    setCurrentLine([{ x, y }]);
  };

  const draw = (e) => {
    if (!drawing.current || whiteboardMode !== 'draw') return;
    
    const rect = whiteboardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setCurrentLine(prev => [...prev, { x, y }]);
    
    // Send drawing to socket
    if (socket) {
      socket.getSocket().emit('whiteboard:draw', {
        sessionId,
        points: [{ x, y }],
        color: '#000000',
        width: 2
      });
    }
  };

  const stopDrawing = () => {
    if (!drawing.current) return;
    
    drawing.current = false;
    setWhiteboardLines(prev => [...prev, currentLine]);
    setCurrentLine([]);
  };

  // Clear whiteboard
  const clearWhiteboard = () => {
    setWhiteboardLines([]);
    
    if (socket) {
      socket.getSocket().emit('whiteboard:clear', { sessionId });
    }
  };

  // Create poll
  const createPoll = () => {
    const question = prompt('سوال درج کریں:');
    if (!question) return;
    
    const options = [];
    for (let i = 0; i < 4; i++) {
      const option = prompt(\`آپشن \${i + 1} درج کریں:\`);
      if (option) options.push({ text: option, votes: 0 });
    }
    
    const poll = {
      id: \`poll_\${Date.now()}\`,
      sessionId,
      question,
      options,
      createdBy: currentUser.id,
      createdAt: new Date()
    };
    
    if (socket) {
      socket.getSocket().emit('poll:create', poll);
    }
  };

  // Vote on poll
  const voteOnPoll = (pollId, optionIndex) => {
    if (socket) {
      socket.getSocket().emit('poll:vote', {
        pollId,
        optionIndex,
        userId: currentUser.id,
        sessionId
      });
    }
  };

  // End session (instructor only)
  const endSession = () => {
    if (isInstructor && socket) {
      socket.getSocket().emit('live:session:end', { sessionId });
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <Video className="w-6 h-6 text-green-500" />
          <div>
            <h1 className="font-bold">لائیو سیشن</h1>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Users className="w-4 h-4" />
              <span>{participants.length} شرکاء</span>
              <Clock className="w-4 h-4 ml-2" />
              <span>01:23:45</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={raiseHand}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 rounded-lg flex items-center gap-2"
          >
            <Hand className="w-5 h-5" />
            ہاتھ اٹھائیں
          </button>
          
          {isInstructor && (
            <button
              onClick={endSession}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
            >
              سیشن ختم کریں
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column - Video & Whiteboard */}
        <div className="flex-1 flex flex-col">
          {/* Video/Whiteboard Toggle */}
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setWhiteboardMode('video')}
              className={\`px-4 py-2 \${whiteboardMode === 'video' ? 'bg-gray-700' : 'hover:bg-gray-800'}\`}
            >
              <Video className="w-5 h-5 inline mr-2" />
              ویڈیو
            </button>
            <button
              onClick={() => setWhiteboardMode('draw')}
              className={\`px-4 py-2 \${whiteboardMode === 'draw' ? 'bg-gray-700' : 'hover:bg-gray-800'}\`}
            >
              <Square className="w-5 h-5 inline mr-2" />
              وائٹ بورڈ
            </button>
          </div>

          {/* Video/Whiteboard Area */}
          <div className="flex-1 relative bg-black">
            {whiteboardMode === 'video' ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full h-full object-contain"
                />
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
                  <button
                    onClick={() => setIsAudioMuted(!isAudioMuted)}
                    className={\`p-3 rounded-full \${isAudioMuted ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}\`}
                  >
                    {isAudioMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => setIsVideoOff(!isVideoOff)}
                    className={\`p-3 rounded-full \${isVideoOff ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}\`}
                  >
                    {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={isScreenSharing ? stopScreenShare : startScreenShare}
                    className={\`p-3 rounded-full \${isScreenSharing ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}\`}
                  >
                    <ScreenShare className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="relative w-full h-full bg-white">
                <canvas
                  ref={whiteboardRef}
                  width={whiteboardRef.current?.offsetWidth || 800}
                  height={whiteboardRef.current?.offsetHeight || 600}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  className="absolute inset-0 cursor-crosshair"
                />
                
                {/* Whiteboard Tools */}
                <div className="absolute top-4 left-4 bg-gray-800 rounded-lg p-2 flex flex-col gap-2">
                  <button
                    onClick={() => setWhiteboardMode('draw')}
                    className={\`p-2 rounded \${whiteboardMode === 'draw' ? 'bg-blue-600' : 'hover:bg-gray-700'}\`}
                  >
                    <Circle className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setWhiteboardMode('text')}
                    className={\`p-2 rounded \${whiteboardMode === 'text' ? 'bg-blue-600' : 'hover:bg-gray-700'}\`}
                  >
                    <Type className="w-5 h-5" />
                  </button>
                  <button
                    onClick={clearWhiteboard}
                    className="p-2 rounded hover:bg-gray-700 text-red-400"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {/* Export whiteboard */}}
                    className="p-2 rounded hover:bg-gray-700"
                  >
                    <Download className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Chat & Participants */}
        <div className="w-80 flex flex-col border-l border-gray-700">
          {/* Participants */}
          <div className="border-b border-gray-700">
            <div className="p-3 bg-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="font-medium">شرکاء ({participants.length})</span>
              </div>
              <Settings className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="p-3 max-h-48 overflow-y-auto">
              {participants.map(participant => (
                <div key={participant.userId} className="flex items-center gap-2 py-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {participant.userName?.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{participant.userName}</div>
                    <div className="text-xs text-gray-400">{participant.role}</div>
                  </div>
                  {raisedHands.some(h => h.userId === participant.userId) && (
                    <Hand className="w-4 h-4 text-amber-500" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Raised Hands */}
          {raisedHands.length > 0 && (
            <div className="border-b border-gray-700 bg-amber-900/20">
              <div className="p-3">
                <div className="flex items-center gap-2 text-amber-400">
                  <Hand className="w-5 h-5" />
                  <span className="font-medium">اٹھائے ہوئے ہاتھ ({raisedHands.length})</span>
                </div>
                <div className="mt-2 space-y-1">
                  {raisedHands.map(hand => (
                    <div key={hand.userId} className="flex items-center gap-2 text-sm">
                      <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center text-white text-xs">
                        {hand.userName?.charAt(0)}
                      </div>
                      <span>{hand.userName}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Chat */}
          <div className="flex-1 flex flex-col">
            <div className="p-3 bg-gray-800 border-b border-gray-700">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                <span className="font-medium">چیٹ</span>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map(message => (
                <div key={message.id} className="bg-gray-800 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs">
                      {message.userName?.charAt(0)}
                    </div>
                    <span className="font-medium">{message.userName}</span>
                    <span className="text-xs text-gray-400 ml-auto">
                      {new Date(message.timestamp).toLocaleTimeString('ur-PK', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className="text-gray-300">{message.content}</p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Message Input */}
            <div className="p-3 border-t border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="پیغام لکھیں..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.target.value.trim()) {
                      sendMessage(e.target.value);
                      e.target.value = '';
                    }
                  }}
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={() => {
                    const input = document.querySelector('input[type="text"]');
                    if (input.value.trim()) {
                      sendMessage(input.value);
                      input.value = '';
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Polls */}
          {isInstructor && (
            <div className="border-t border-gray-700">
              <div className="p-3">
                <button
                  onClick={createPoll}
                  className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center justify-center gap-2"
                >
                  <Award className="w-5 h-5" />
                  نیا پول بنائیں
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Connection Status */}
      <div className="px-4 py-2 bg-gray-800 border-t border-gray-700 text-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isConnected ? (
              <>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400">آن لائن - Real-time سیشن</span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-red-400">آف لائن - کنکشن ٹوٹ گیا</span>
              </>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white">
              <ThumbsUp className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-white">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}`} 
              colorClass="text-purple-300"
              title="components/collaboration/LiveSession.jsx - Live Interactive Session"
            />
          </section>
        )}

        {/* Installation Guide */}
        <section className="my-16 p-8 border-4 border-dashed border-blue-500 rounded-3xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-blue-400 text-center">
            📦 Socket.io Installation & Setup
          </h2>
          
          <div className="space-y-4" dir="ltr">
            <pre className="bg-gray-900 text-green-300 p-4 rounded-lg overflow-x-auto text-left">
{`# Install required packages
npm install socket.io socket.io-client
npm install date-fns emoji-picker-react

# Server setup for Next.js
# Create a separate server file for Socket.io

# Environment Variables (.env.local)
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
SOCKET_PORT=3001

# Package.json scripts
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "socket": "node socket-server.js",
  "dev:all": "concurrently \"npm run dev\" \"npm run socket\""
}

# Install concurrently for running both servers
npm install concurrently --save-dev

# Socket Server (socket-server.js)
const { initializeSocketServer } = require('./lib/socket/server');
const express = require('express');
const app = express();
const httpServer = initializeSocketServer(app);

httpServer.listen(3001, () => {
  console.log('✅ Socket.io server running on port 3001');
});`}
            </pre>
          </div>
        </section>

        {/* Practice Section */}
        <section className="my-16 p-8 border-4 border-dashed border-emerald-500 rounded-3xl bg-gradient-to-br from-emerald-500/5 to-green-500/5">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-emerald-400 text-center">
            🎯 Practice Task (مشق کے لیے)
          </h2>
          <div className="space-y-4 font-bold text-sm md:text-lg text-center" dir="rtl">
            <p className="flex items-center justify-center gap-2">
              <span className="bg-indigo-500 text-white p-2 rounded">1</span>
              Socket.io server اور client setup کریں
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="bg-blue-500 text-white p-2 rounded">2</span>
              Course-specific chat room بنائیں
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="bg-green-500 text-white p-2 rounded">3</span>
              Real-time notification system test کریں
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="bg-purple-500 text-white p-2 rounded">4</span>
              Live Q&A session بنائیں
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="bg-amber-500 text-white p-2 rounded">5</span>
              Collaborative whiteboard implement کریں
            </p>
          </div>
        </section>

        {/* Next Chapter Preview */}
        <section className="p-8 rounded-3xl border-t-8 border-blue-600 shadow-2xl mb-12 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-2xl">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
              اگلا باب: Analytics & Reporting 📊
            </h2>
          </div>
          
          <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
            اگلے باب میں ہم مکمل تجزیاتی نظام بنائیں گے جو آپ کو اپنے LMS کی کارکردگی، صارفین کے رویے، اور مالیات کا مکمل تجزیہ فراہم کرے گا۔
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-3">🎯 سیکھنے کے مقاصد:</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Student progress tracking & analytics
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Revenue & financial reporting
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Course performance metrics
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  Custom dashboards & data visualization
                </li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-green-200 dark:border-green-800">
              <h3 className="font-bold text-green-600 dark:text-green-400 mb-3">🚀 پروجیکٹ آؤٹ پٹ:</h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Interactive charts & graphs
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Export to PDF/Excel functionality
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Real-time analytics dashboard
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Advanced filtering & segmentation
                </li>
              </ul>
            </div>
          </div>
          
          <div className="p-4 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl border border-blue-300 dark:border-blue-700">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="font-bold text-blue-800 dark:text-blue-300">
                ڈیٹا ڈرائیون ڈیسیژنز: Analytics آپ کو بہتر فیصلے کرنے میں مدد دے گا!
              </p>
            </div>
            <p className="text-blue-700 dark:text-blue-400 text-sm mt-2">
              آپ جان سکیں گے کہ کون سے کورسز مقبول ہیں، صارفین کہاں مشکل محسوس کر رہے ہیں، اور آپ کا بزنس کیسے بڑھ رہا ہے۔
            </p>
          </div>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-700 text-center opacity-70">
          <p>
            © 2025 Next.js اردو ٹیوٹوریل - باب 26: Real-time Features with Socket.io
          </p>
          <p className="text-sm mt-2">
            🚀 اگلے سبق میں ہم Analytics & Reporting System سیکھیں گے!
          </p>
        </footer>
      </main>

      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        ></div>
      )}

      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slideIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
    </div>
  );
}