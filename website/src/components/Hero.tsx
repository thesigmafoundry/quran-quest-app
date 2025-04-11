'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Hero = () => {
  const [waitlistCount, setWaitlistCount] = useState(157);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Simulate increasing waitlist count for social proof
    const interval = setInterval(() => {
      setWaitlistCount(prev => {
        const increase = Math.floor(Math.random() * 3);
        return prev + (increase > 0 ? 1 : 0);
      });
    }, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section bg-gradient-to-b from-white to-[var(--background)]">
      <div className="container-custom">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="order-2 md:order-1">
            <h1 className="mb-4 text-[var(--primary)]">
              Help Your Children Learn Quran with AI
            </h1>
            <p className="text-xl mb-6 text-[var(--text-light)]">
              An interactive, personalized Quran learning experience designed specifically for Muslim immigrant families in Western countries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#waitlist" className="btn-primary text-center relative overflow-hidden group">
                <span className="relative z-10">Join the Waitlist</span>
                <span className="absolute inset-0 bg-[var(--primary-dark)] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </Link>
              <Link href="#how-it-works" className="btn-secondary text-center">
                Learn More
              </Link>
            </div>
            <div className="mt-8 flex items-center">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center">
                  <span className="text-xs">👨‍👩‍👧</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center">
                  <span className="text-xs">👨‍👩‍👦</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center">
                  <span className="text-xs">👩‍👦</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center">
                  <span className="text-xs">+</span>
                </div>
              </div>
              <p className="ml-4 text-sm text-[var(--text-light)]">
                <span className="font-bold">{waitlistCount}+ families</span> already on the waitlist
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative w-full max-w-md h-[500px]">
              <div className="absolute top-0 right-0 w-4/5 h-4/5 bg-[var(--primary)] rounded-2xl opacity-10 transform transition-transform duration-700 hover:scale-105"></div>
              <div className="absolute bottom-0 left-0 w-4/5 h-4/5 bg-[var(--secondary)] rounded-2xl opacity-10 transform transition-transform duration-700 hover:scale-105"></div>
              <div className="absolute inset-0 m-auto w-3/4 h-3/4 bg-white rounded-2xl shadow-xl flex items-center justify-center transform transition-all duration-700 hover:scale-105 hover:shadow-2xl">
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--primary)] bg-opacity-10 flex items-center justify-center">
                    <span className="text-3xl">📱</span>
                  </div>
                  <h3 className="text-lg font-bold text-[var(--primary)] mb-2">Quranic Quest App</h3>
                  <p className="text-sm text-[var(--text-light)] mb-4">Interactive AI-powered learning for your children</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div className="bg-[var(--primary)] h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <p className="text-xs text-[var(--text-light)]">Development: 75% complete</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
