'use client';

import React, { useState, useEffect } from 'react';

const WaitlistCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 30,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Show after scrolling a bit
    const handleScroll = () => {
      if (window.scrollY > 300 && !isVisible) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown(prev => {
        const newSeconds = prev.seconds - 1;
        
        if (newSeconds < 0) {
          const newMinutes = prev.minutes - 1;
          
          if (newMinutes < 0) {
            const newHours = prev.hours - 1;
            
            if (newHours < 0) {
              const newDays = prev.days - 1;
              return {
                days: newDays,
                hours: 23,
                minutes: 59,
                seconds: 59
              };
            }
            
            return {
              ...prev,
              hours: newHours,
              minutes: 59,
              seconds: 59
            };
          }
          
          return {
            ...prev,
            minutes: newMinutes,
            seconds: 59
          };
        }
        
        return {
          ...prev,
          seconds: newSeconds
        };
      });
    }, 1000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-4 z-40 animate-slide-up">
      <div className="container-custom flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="mr-4">
            <span className="text-[var(--primary)] font-bold">Limited Beta Access:</span>
          </div>
          <div className="flex space-x-2">
            <div className="bg-[var(--primary)] text-white px-2 py-1 rounded">
              <span className="font-mono">{countdown.days.toString().padStart(2, '0')}</span>
              <span className="text-xs ml-1">days</span>
            </div>
            <div className="bg-[var(--primary)] text-white px-2 py-1 rounded">
              <span className="font-mono">{countdown.hours.toString().padStart(2, '0')}</span>
              <span className="text-xs ml-1">hrs</span>
            </div>
            <div className="bg-[var(--primary)] text-white px-2 py-1 rounded">
              <span className="font-mono">{countdown.minutes.toString().padStart(2, '0')}</span>
              <span className="text-xs ml-1">min</span>
            </div>
            <div className="bg-[var(--primary)] text-white px-2 py-1 rounded">
              <span className="font-mono">{countdown.seconds.toString().padStart(2, '0')}</span>
              <span className="text-xs ml-1">sec</span>
            </div>
          </div>
        </div>
        <a 
          href="#waitlist" 
          className="btn-primary"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Secure Your Spot Now
        </a>
      </div>
    </div>
  );
};

export default WaitlistCTA;
