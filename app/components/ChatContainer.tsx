'use client';

import { useRef, useEffect } from 'react';
import Message from './Message';

interface MessageType {
  content: string;
  sender: 'You' | 'DeepSeek AI';
  time: string;
}

interface ChatContainerProps {
  messages: MessageType[];
  isTyping: boolean;
  onClearChat: () => void;
}

export default function ChatContainer({ messages, isTyping, onClearChat }: ChatContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const formatTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    
    return `${hours}:${minutesStr} ${ampm}`;
  };

  return (
    <div className="chat-messages-container" ref={containerRef}>
      {messages.map((message, index) => (
        <Message
          key={index}
          content={message.content}
          sender={message.sender}
          time={message.time}
        />
      ))}
      
      {isTyping && (
        <div className="message ai-message">
          <div className="text-xs font-bold mb-1 text-[var(--primary)]">DeepSeek AI</div>
          <div className="flex gap-1 items-center">
            <span className="w-2 h-2 bg-[var(--primary)] rounded-full opacity-40 animate-[blink_1s_infinite_0.3333s]"></span>
            <span className="w-2 h-2 bg-[var(--primary)] rounded-full opacity-40 animate-[blink_1s_infinite_0.6666s]"></span>
            <span className="w-2 h-2 bg-[var(--primary)] rounded-full opacity-40 animate-[blink_1s_infinite_0.9999s]"></span>
          </div>
          <div className="text-[11px] text-gray-500 text-right mt-1">{formatTime()}</div>
        </div>
      )}
      
      {messages.length > 0 && (
        <button
          onClick={onClearChat}
          className="absolute top-4 right-4 bg-white/80 dark:bg-[var(--container-bg)]/80 text-gray-600 dark:text-gray-300 rounded px-3 py-1.5 text-xs border border-gray-300 dark:border-gray-600 hover:bg-white dark:hover:bg-[var(--container-bg)] z-10"
        >
          Clear Chat
        </button>
      )}
    </div>
  );
} 