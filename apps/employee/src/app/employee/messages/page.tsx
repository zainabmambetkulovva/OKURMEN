'use client';

import { useEffect, useState } from 'react';
import { MessageSquare, Send, Search, User, Clock } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  read: boolean;
}

interface Chat {
  student: Student;
  lastMessage?: Message;
  unreadCount: number;
}

export default function MessagesPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat.student.id);
    }
  }, [selectedChat]);

  const fetchChats = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetch('http://localhost:3002/api/messages/chats', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setChats(data);
      }
    } catch (error) {
      console.error('Failed to fetch chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (studentId: string) => {
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetch(`http://localhost:3002/api/messages/${studentId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedChat || sending) return;

    setSending(true);
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetch('http://localhost:3002/api/messages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          receiverId: selectedChat.student.id,
          content: newMessage,
        }),
      });
      
      if (response.ok) {
        const message = await response.json();
        setMessages([...messages, message]);
        setNewMessage('');
        fetchChats();
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSending(false);
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-12rem)] flex gap-6">
      {/* Chats List */}
      <div className="w-80 flex flex-col bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Search */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск студента..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Chats */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <MessageSquare className="w-12 h-12 text-gray-400 mb-3" />
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {searchTerm ? 'Студенты не найдены' : 'Нет сообщений'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredChats.map((chat) => (
                <button
                  key={chat.student.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                    selectedChat?.student.id === chat.student.id
                      ? 'bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500'
                      : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-medium text-sm">
                        {chat.student.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium text-gray-900 dark:text-white truncate">
                          {chat.student.name}
                        </h3>
                        {chat.unreadCount > 0 && (
                          <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-orange-500 text-white rounded-full">
                            {chat.unreadCount}
                          </span>
                        )}
                      </div>
                      {chat.lastMessage && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                          {chat.lastMessage.content}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Messages Panel */}
      <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {selectedChat.student.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                  </span>
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900 dark:text-white">
                    {selectedChat.student.name}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedChat.student.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <MessageSquare className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    Нет сообщений. Начните разговор!
                  </p>
                </div>
              ) : (
                messages.map((message) => {
                  const isOwn = message.senderId !== selectedChat.student.id;
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${isOwn ? 'order-2' : 'order-1'}`}>
                        <div
                          className={`px-4 py-3 rounded-2xl ${
                            isOwn
                              ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                          }`}
                        >
                          <p className="text-sm break-words">{message.content}</p>
                        </div>
                        <div className={`flex items-center gap-1 mt-1 text-xs text-gray-500 dark:text-gray-400 ${
                          isOwn ? 'justify-end' : 'justify-start'
                        }`}>
                          <Clock className="w-3 h-3" />
                          {new Date(message.createdAt).toLocaleTimeString('ru-RU', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Написать сообщение..."
                  disabled={sending}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:opacity-50"
                />
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim() || sending}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Отправить
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
              <MessageSquare className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Выберите чат
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Выберите студента из списка, чтобы начать общение
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
