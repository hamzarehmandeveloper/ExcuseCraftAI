'use client';

import { useState, useEffect } from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose?: () => void;
  duration?: number;
}

export default function Notification({ 
  message, 
  type, 
  isVisible, 
  onClose, 
  duration = 3000 
}: NotificationProps) {
  const [isShowing, setIsShowing] = useState(false);
  
  useEffect(() => {
    if (isVisible) {
      setIsShowing(true);
      
      if (duration > 0) {
        const timer = setTimeout(() => {
          setIsShowing(false);
          if (onClose) onClose();
        }, duration);
        
        return () => clearTimeout(timer);
      }
    } else {
      setIsShowing(false);
    }
  }, [isVisible, duration, onClose]);
  
  if (!isShowing) return null;
  
  const notificationClass = {
    success: 'notification-success',
    error: 'notification-error',
    info: 'notification-info'
  }[type];

  const iconMap = {
    success: (
      <svg className="notification-icon text-green-500" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 11.0857V12.0057C21.9988 14.1621 21.3005 16.2604 20.0093 17.9875C18.7182 19.7147 16.9033 20.9782 14.8354 21.5896C12.7674 22.201 10.5573 22.1276 8.53447 21.3803C6.51168 20.633 4.78465 19.2518 3.61096 17.4428C2.43727 15.6338 1.87979 13.4938 2.02168 11.342C2.16356 9.19029 2.99721 7.14205 4.39828 5.5028C5.79935 3.86354 7.69279 2.72111 9.79619 2.24587C11.8996 1.77063 14.1003 1.98806 16.07 2.86572" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M22 4L12 14.01L9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    error: (
      <svg className="notification-icon text-destructive" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 9L9 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    info: (
      <svg className="notification-icon text-blue-500" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  };
  
  return (
    <div className={`notification ${notificationClass} ${isShowing ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
      <div className="notification-content">
        {iconMap[type]}
        <div className="notification-message">
          {message}
        </div>
        {onClose && (
          <button 
            onClick={() => {
              setIsShowing(false);
              onClose();
            }}
            className="notification-close"
            aria-label="Close notification"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
} 