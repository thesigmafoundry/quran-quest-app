import React from 'react';
import Image from 'next/image';

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Personalized Assessment",
      description: "The app evaluates your child's current Quranic reading level, strengths, and areas for improvement."
    },
    {
      number: "02",
      title: "Custom Learning Path",
      description: "Based on the assessment, a personalized curriculum is created that adapts to your child's learning style."
    },
    {
      number: "03",
      title: "Interactive Learning",
      description: "Children engage with interactive lessons, games, and voice-based activities to develop their skills."
    },
    {
      number: "04",
      title: "Real-time Feedback",
      description: "AI-powered speech recognition provides immediate feedback on pronunciation and recitation."
    },
    {
      number: "05",
      title: "Progress Tracking",
      description: "Parents receive detailed insights into their child's progress and achievement milestones."
    }
  ];

  return (
    <section id="how-it-works" className="section bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="mb-4">How Quranic Quest Works</h2>
          <p className="max-w-3xl mx-auto text-[var(--text-light)]">
            Our app uses advanced AI technology to create a personalized, effective learning experience for your child.
          </p>
        </div>
        
        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-[28px] top-10 bottom-10 w-1 bg-[var(--primary)] bg-opacity-20 hidden md:block"></div>
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-bold text-xl z-10">
                  {step.number}
                </div>
                <div className="bg-[var(--background)] rounded-lg p-6 shadow-sm md:ml-4 flex-grow">
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-[var(--text-light)]">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
