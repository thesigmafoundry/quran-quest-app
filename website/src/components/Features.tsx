'use client';

import React, { useState, useEffect } from 'react';

type FeatureCardProps = {
  title: string;
  description: string;
  icon: string;
  delay: number;
};

const FeatureCard = ({ title, description, icon, delay }: FeatureCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={`card hover:scale-105 transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="w-12 h-12 bg-[var(--primary)] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-[var(--text-light)]">{description}</p>
    </div>
  );
};

const Features = () => {
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    // Show CTA after user has viewed features
    const timer = setTimeout(() => {
      setShowCta(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      title: "AI-Powered Pronunciation Feedback",
      description: "Advanced speech recognition technology provides real-time feedback on Quranic recitation, helping children develop proper pronunciation.",
      icon: "🎙️",
      delay: 100
    },
    {
      title: "Personalized Learning Paths",
      description: "Adaptive curriculum that adjusts to each child's learning pace, strengths, and areas for improvement.",
      icon: "🧩",
      delay: 200
    },
    {
      title: "Interactive Voice Conversations",
      description: "Engage in natural conversations with the app to practice reading, receive guidance, and answer questions.",
      icon: "💬",
      delay: 300
    },
    {
      title: "Progress Tracking & Analytics",
      description: "Detailed insights into your child's learning journey with visual progress reports and achievement tracking.",
      icon: "📊",
      delay: 400
    },
    {
      title: "Family Involvement Tools",
      description: "Features that help parents participate in their child's learning journey, regardless of their own Arabic proficiency.",
      icon: "👨‍👩‍👧",
      delay: 500
    },
    {
      title: "Cultural Context Integration",
      description: "Content designed specifically for Muslim families in Western countries, bridging cultural contexts.",
      icon: "🌍",
      delay: 600
    }
  ];

  return (
    <section id="features" className="section bg-white relative">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="mb-4">Powerful Features for Effective Learning</h2>
          <p className="max-w-3xl mx-auto text-[var(--text-light)]">
            Quranic Quest combines traditional teaching methods with cutting-edge technology to create an engaging and effective learning experience.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={feature.delay}
            />
          ))}
        </div>
        
        {/* Floating CTA */}
        {showCta && (
          <div className="fixed bottom-6 right-6 z-40 transition-all duration-500 transform animate-bounce-slow">
            <a 
              href="#waitlist" 
              className="bg-[var(--accent)] text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2 hover:bg-opacity-90 transition-all"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Join Waitlist</span>
              <span>→</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Features;
