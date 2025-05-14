'use client';

import { useState, useEffect } from 'react';
import Header from './Header';
import ExcuseForm from './ExcuseForm';
import ExcuseCard from './ExcuseCard';
import SplashScreen from './SplashScreen';
import LoadingOverlay from './LoadingOverlay';
import Notification from './Notification';

interface Excuse {
  id: string;
  situation: string;
  audience: string;
  severity: string;
  content: string;
  timestamp: string;
}

export default function ExcuseGenerator() {
  const [excuses, setExcuses] = useState<Excuse[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    message: '',
    type: 'info' as 'success' | 'error' | 'info',
    isVisible: false
  });
  
  useEffect(() => {
    const savedExcuses = localStorage.getItem('excuseGeneratorHistory');
    if (savedExcuses) {
      try {
        const parsedExcuses = JSON.parse(savedExcuses);
        if (Array.isArray(parsedExcuses)) {
          setExcuses(parsedExcuses);
        }
      } catch (error) {
        console.error('Error parsing excuses history:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (excuses.length > 0) {
      localStorage.setItem('excuseGeneratorHistory', JSON.stringify(excuses));
    }
  }, [excuses]);

  const formatTime = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit'
    };
    return new Intl.DateTimeFormat('en-US', options).format(now);
  };

  const handleGenerateExcuse = async (situation: string, audience: string, severity: string) => {
    setIsGenerating(true);
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/generate-excuse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          situation,
          audience,
          severity
        }),
      });
      
      if (!response.ok) {
        throw new Error('API request failed');
      }
      
      const data = await response.json();
      
      const newExcuse: Excuse = {
        id: Date.now().toString(),
        situation,
        audience,
        severity,
        content: data.content,
        timestamp: formatTime()
      };
      
      setExcuses(prev => [newExcuse, ...prev]);
      
      // Show success notification
      setNotification({
        message: 'Excuse generated successfully!',
        type: 'success',
        isVisible: true
      });
      
    } catch (error) {
      console.error('Error generating excuse:', error);
      
      setNotification({
        message: 'Error generating excuse. Please try again.',
        type: 'error',
        isVisible: true
      });
    } finally {
      setIsGenerating(false);
      setIsLoading(false);
    }
  };

  const handleCopyExcuse = (content: string) => {
    navigator.clipboard.writeText(content).then(
      () => {
        setNotification({
          message: 'Excuse copied to clipboard!',
          type: 'success',
          isVisible: true
        });
      },
      (err) => {
        console.error('Could not copy text: ', err);
        setNotification({
          message: 'Failed to copy excuse',
          type: 'error',
          isVisible: true
        });
      }
    );
  };

  const handleDeleteExcuse = (id: string) => {
    setExcuses(prev => prev.filter(excuse => excuse.id !== id));
  };

  const handleClearAllExcuses = () => {
    setExcuses([]);
    localStorage.removeItem('excuseGeneratorHistory');
    setNotification({
      message: 'All excuses cleared',
      type: 'info',
      isVisible: true
    });
  };

  const handleNotificationClose = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  return (
    <div className="app-container">
      <SplashScreen />
      <Header />
      
      <main className="main-content">
        <ExcuseForm 
          onSubmit={handleGenerateExcuse}
          isGenerating={isGenerating}
        />
        
        {excuses.length > 0 && (
          <div className="results-container">
            <div className="results-header">
              <h2 className="results-title">Your Excuses</h2>
              {excuses.length > 1 && (
                <button 
                  onClick={handleClearAllExcuses}
                  className="btn btn-sm btn-outline"
                >
                  Clear All
                </button>
              )}
            </div>
            
            {excuses.map(excuse => (
              <ExcuseCard 
                key={excuse.id} 
                excuse={excuse} 
                onCopy={handleCopyExcuse}
                onDelete={handleDeleteExcuse}
              />
            ))}
          </div>
        )}
      </main>
      
      {isLoading && <LoadingOverlay />}
      
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={handleNotificationClose}
      />
    </div>
  );
} 