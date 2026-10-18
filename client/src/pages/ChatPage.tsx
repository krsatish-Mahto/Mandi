import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { INITIAL_CONVERSATIONS } from '../data/mockData';
import { formatPrice } from '../utils/helpers';
import type { Conversation, Message } from '../types';

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState<string | null>(INITIAL_CONVERSATIONS[0]?.id || null);
  const [newMessage, setNewMessage] = useState('');

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConv) return;

    const messageObj: Message = {
      id: `m-${Date.now()}`,
      senderId: 'current-user',
      text: newMessage,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };

    const updated = conversations.map((c) => {
      if (c.id === activeConv.id) {
        return {
          ...c,
          last_message: newMessage,
          last_message_time: new Date().toISOString(),
          messages: [...c.messages, messageObj],
        };
      }
      return c;
    });

    setConversations(updated);
    setNewMessage('');

    // Simulate auto-reply after 1.5s for realism
    setTimeout(() => {
      const replyObj: Message = {
        id: `m-reply-${Date.now()}`,
        senderId: activeConv.participant.id,
        text: 'Ji bilkul, aap kal subah 10 baje tak aakar inspect kar sakte hain! (Yes, you can inspect tomorrow morning!)',
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        status: 'seen',
      };
      setConversations((prev) =>
        prev.map((c) => (c.id === activeConv.id ? { ...c, messages: [...c.messages, replyObj] } : c))
      );
    }, 1500);
  };

  return (
    <div className="bg-gray-100 py-4 sm:py-8 pb-24 sm:pb-12 min-h-[calc(100vh-80px)] flex flex-col justify-center">
      <div className="container-primary max-w-5xl h-[750px] flex-1 flex flex-col">

        {/* Chat App Card Container */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex-1 grid grid-cols-1 md:grid-cols-12">

          {/* Left Pane: Conversations List */}
          <div className="md:col-span-4 border-r border-gray-200 flex flex-col bg-gray-50/50">
            <div className="p-4 border-b border-gray-200 bg-white">
              <h2 className="text-lg font-bold text-gray-900">Village Inquiries & Chat</h2>
              <p className="text-xs text-gray-500">Direct negotiations with local farmers</p>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
              {conversations.map((conv) => {
                const isSelected = conv.id === activeConv?.id;
                return (
                  <button
                    key={conv.id}
                    type="button"
                    onClick={() => setActiveConvId(conv.id)}
                    className={`w-full text-left p-4 flex items-start gap-3 transition-colors cursor-pointer ${
                      isSelected ? 'bg-green-50/80 border-l-4 border-primary' : 'hover:bg-gray-100'
                    }`}
                  >
                    <img
                      src={conv.participant.avatar}
                      alt={conv.participant.name}
                      className="w-11 h-11 rounded-full object-cover shrink-0 border border-gray-200"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-bold text-gray-900 truncate">
                          {conv.participant.name}
                        </h4>
                        <span className="text-[10px] text-gray-400">
                          {conv.participant.village}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-primary truncate mb-1">
                        🌾 {conv.listing.title}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {conv.last_message}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Pane: Active Chat Room */}
          {activeConv ? (
            <div className="md:col-span-8 flex flex-col h-full bg-white">

              {/* Chat Header with Listing Preview Card */}
              <div className="p-3.5 sm:p-4 border-b border-gray-200 bg-white flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={activeConv.participant.avatar}
                    alt={activeConv.participant.name}
                    className="w-10 h-10 rounded-full object-cover border border-primary"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-bold text-gray-900">
                        {activeConv.participant.name}
                      </h3>
                      <span className="text-[10px] bg-green-100 text-primary font-bold px-1.5 py-0.5 rounded">
                        {activeConv.participant.village}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400">
                      ★ {activeConv.participant.rating} • Online in village radius
                    </p>
                  </div>
                </div>

                {/* Quick Link to Listing */}
                <Link
                  to={`/listings/${activeConv.listing.id}`}
                  className="flex items-center gap-2 p-1.5 pr-3 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 text-xs transition-colors"
                >
                  <img
                    src={activeConv.listing.images?.[0]}
                    alt={activeConv.listing.title}
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                  <div className="text-left hidden sm:block max-w-[120px]">
                    <p className="font-semibold text-gray-800 truncate text-[11px]">{activeConv.listing.title}</p>
                    <p className="text-primary font-bold text-[10px]">{formatPrice(activeConv.listing.price)}</p>
                  </div>
                </Link>
              </div>

              {/* Messages Thread Container */}
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-gray-50/40 space-y-3">
                {activeConv.messages.map((msg) => {
                  const isMe = msg.senderId === 'current-user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[80%] sm:max-w-md px-4 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                          isMe
                            ? 'bg-primary text-white rounded-br-none'
                            : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-gray-400 mt-1 px-1">
                        {msg.time} {isMe && (msg.status === 'seen' ? '✓✓' : '✓')}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Message Input Box */}
              <div className="p-3 sm:p-4 bg-white border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message, offer rate, or ask pickup time..."
                    className="flex-1 px-4 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-full focus:bg-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!newMessage.trim()}
                    className="btn-primary py-2.5 px-5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Send</span>
                    <span>→</span>
                  </button>
                </form>
              </div>

            </div>
          ) : (
            <div className="md:col-span-8 flex items-center justify-center p-8 text-center text-gray-400">
              Select a conversation to begin chatting
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
