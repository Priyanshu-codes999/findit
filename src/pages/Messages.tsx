import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Send,
  MoreVertical,
  Phone,
  Video,
  Image,
  Paperclip,
  Smile,
  Check,
  CheckCheck,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTranslation } from '../hooks/useTranslation';

interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

interface Conversation {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    online: boolean;
  };
  itemTitle: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
  messages: ChatMessage[];
}

export const Messages = () => {
  const { t } = useTranslation();
  const { isAuthenticated, user, login } = useStore();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock conversations
  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      user: { id: '2', name: 'Priya Sharma', avatar: 'https://i.pravatar.cc/150?img=5', online: true },
      itemTitle: 'Brown Leather Wallet',
      lastMessage: 'Yes, I found it near the food court!',
      timestamp: new Date(Date.now() - 300000),
      unread: 2,
      messages: [
        { id: '1', senderId: '1', content: 'Hi! I think you found my wallet.', timestamp: new Date(Date.now() - 600000), read: true },
        { id: '2', senderId: '2', content: 'Hello! Can you describe it?', timestamp: new Date(Date.now() - 500000), read: true },
        { id: '3', senderId: '1', content: "It's a brown leather wallet with my initials 'AK' inside.", timestamp: new Date(Date.now() - 400000), read: true },
        { id: '4', senderId: '2', content: 'Yes, I found it near the food court!', timestamp: new Date(Date.now() - 300000), read: false },
      ],
    },
    {
      id: '2',
      user: { id: '3', name: 'Rahul Verma', avatar: 'https://i.pravatar.cc/150?img=12', online: false },
      itemTitle: 'MacBook Pro 14"',
      lastMessage: 'When can we meet to verify?',
      timestamp: new Date(Date.now() - 3600000),
      unread: 0,
      messages: [
        { id: '1', senderId: '3', content: 'I think I found a MacBook matching your description.', timestamp: new Date(Date.now() - 7200000), read: true },
        { id: '2', senderId: '1', content: 'Really? That would be amazing!', timestamp: new Date(Date.now() - 5400000), read: true },
        { id: '3', senderId: '3', content: 'When can we meet to verify?', timestamp: new Date(Date.now() - 3600000), read: true },
      ],
    },
    {
      id: '3',
      user: { id: '4', name: 'Sneha Patel', avatar: 'https://i.pravatar.cc/150?img=9', online: true },
      itemTitle: 'Car Keys with Toyota Logo',
      lastMessage: 'I\'ll keep them safe for you.',
      timestamp: new Date(Date.now() - 86400000),
      unread: 0,
      messages: [
        { id: '1', senderId: '1', content: 'Are those my car keys?', timestamp: new Date(Date.now() - 90000000), read: true },
        { id: '2', senderId: '4', content: "I'll keep them safe for you.", timestamp: new Date(Date.now() - 86400000), read: true },
      ],
    },
  ]);

  const selectedConversation = conversations.find((c) => c.id === selectedChat);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    // In a real app, send to server
    setNewMessage('');
  };

  // Auto-login for demo
  if (!isAuthenticated) {
    login({
      id: '1',
      name: 'Demo User',
      email: 'demo@findit.com',
      role: 'user',
      points: 100,
      badges: [],
      createdAt: new Date(),
    });
  }

  return (
    <div className="min-h-screen bg-surface pt-16">
      <div className="h-[calc(100vh-4rem)] flex">
        {/* Conversations List */}
        <div className={`w-full md:w-80 lg:w-96 bg-white border-r border-border flex flex-col ${
          selectedChat ? 'hidden md:flex' : 'flex'
        }`}>
          {/* Header */}
          <div className="p-4 border-b border-border">
            <h1 className="text-xl font-bold text-foreground mb-4">{t('chat')}</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedChat(conv.id)}
                className={`w-full p-4 flex items-start gap-3 hover:bg-surface-alt transition-colors border-b border-border ${
                  selectedChat === conv.id ? 'bg-primary/5' : ''
                }`}
              >
                <div className="relative">
                  <img
                    src={conv.user.avatar}
                    alt={conv.user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conv.user.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-foreground truncate">{conv.user.name}</h3>
                    <span className="text-xs text-muted">{formatTime(conv.timestamp)}</span>
                  </div>
                  <p className="text-xs text-primary mb-1 truncate">Re: {conv.itemTitle}</p>
                  <p className="text-sm text-muted truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <span className="w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                    {conv.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`flex-1 flex flex-col ${
          selectedChat ? 'flex' : 'hidden md:flex'
        }`}>
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 bg-white border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedChat(null)}
                    className="md:hidden p-2 hover:bg-surface-alt rounded-lg"
                  >
                    ←
                  </button>
                  <div className="relative">
                    <img
                      src={selectedConversation.user.avatar}
                      alt={selectedConversation.user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {selectedConversation.user.online && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{selectedConversation.user.name}</h3>
                    <p className="text-xs text-muted">
                      {selectedConversation.user.online ? 'Online' : 'Offline'} • {selectedConversation.itemTitle}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-surface-alt rounded-lg transition-colors">
                    <Phone className="w-5 h-5 text-muted" />
                  </button>
                  <button className="p-2 hover:bg-surface-alt rounded-lg transition-colors">
                    <Video className="w-5 h-5 text-muted" />
                  </button>
                  <button className="p-2 hover:bg-surface-alt rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-muted" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-surface">
                {selectedConversation.messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${
                      msg.senderId === user?.id
                        ? 'bg-primary text-white rounded-2xl rounded-br-md'
                        : 'bg-white text-foreground rounded-2xl rounded-bl-md'
                    } px-4 py-3 shadow-sm`}>
                      <p className="text-sm">{msg.content}</p>
                      <div className={`flex items-center justify-end gap-1 mt-1 ${
                        msg.senderId === user?.id ? 'text-white/70' : 'text-muted'
                      }`}>
                        <span className="text-xs">{formatTime(msg.timestamp)}</span>
                        {msg.senderId === user?.id && (
                          msg.read ? <CheckCheck className="w-4 h-4" /> : <Check className="w-4 h-4" />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 bg-white border-t border-border">
                <div className="flex items-center gap-3">
                  <button className="p-2 hover:bg-surface-alt rounded-lg transition-colors">
                    <Paperclip className="w-5 h-5 text-muted" />
                  </button>
                  <button className="p-2 hover:bg-surface-alt rounded-lg transition-colors">
                    <Image className="w-5 h-5 text-muted" />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type a message..."
                      className="w-full px-4 py-3 pr-12 rounded-xl border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Smile className="w-5 h-5 text-muted" />
                    </button>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    className="p-3 btn-primary rounded-xl text-white"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-surface">
              <div className="text-center">
                <div className="w-20 h-20 bg-surface-alt rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-muted" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Select a conversation</h3>
                <p className="text-muted">Choose a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
