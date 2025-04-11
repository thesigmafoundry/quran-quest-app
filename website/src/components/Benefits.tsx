import React from 'react';
import Image from 'next/image';

const Benefits = () => {
  const benefits = [
    {
      title: "Preserve Religious Heritage",
      description: "Help your children maintain their Islamic identity and connect with their religious heritage in a Western context.",
      icon: "🕌"
    },
    {
      title: "Fit Into Busy Family Life",
      description: "Flexible learning that adapts to your family's schedule, eliminating the need for fixed class times.",
      icon: "⏰"
    },
    {
      title: "Build Confidence in Recitation",
      description: "Children develop proper pronunciation and confidence in their Quranic reading abilities.",
      icon: "🔊"
    },
    {
      title: "Bridge Language Barriers",
      description: "Parents can support their children's learning regardless of their own Arabic proficiency.",
      icon: "🌉"
    }
  ];

  return (
    <section id="benefits" className="section bg-[var(--background)]">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="mb-6 text-[var(--primary)]">Why Families Choose Quranic Quest</h2>
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mr-4 shadow-md flex-shrink-0">
                    <span className="text-2xl">{benefit.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{benefit.title}</h3>
                    <p className="text-[var(--text-light)]">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="relative w-full h-[400px] bg-white rounded-xl shadow-lg p-6 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--secondary)] rounded-full opacity-10 -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[var(--primary)] rounded-full opacity-10 -ml-10 -mb-10"></div>
              <div className="relative h-full flex flex-col justify-center items-center">
                <div className="text-center mb-8">
                  <p className="text-[var(--primary)] font-bold mb-2">Testimonial Placeholder</p>
                  <p className="italic text-[var(--text-light)]">"Quranic Quest has transformed how my children learn the Quran. They're excited to practice every day, and I can finally be involved in their learning journey despite my limited Arabic."</p>
                  <p className="mt-4 font-semibold">- Sarah M., mother of 3</p>
                </div>
                <div className="w-full bg-[var(--background)] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold">Weekly Practice Goal</span>
                    <span className="text-sm text-[var(--primary)] font-bold">85% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-[var(--primary)] h-2.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                    <div className="bg-white rounded-md p-2 shadow-sm">
                      <p className="text-xs text-[var(--text-light)]">Streak</p>
                      <p className="font-bold text-[var(--primary)]">14 days</p>
                    </div>
                    <div className="bg-white rounded-md p-2 shadow-sm">
                      <p className="text-xs text-[var(--text-light)]">Accuracy</p>
                      <p className="font-bold text-[var(--primary)]">92%</p>
                    </div>
                    <div className="bg-white rounded-md p-2 shadow-sm">
                      <p className="text-xs text-[var(--text-light)]">Verses</p>
                      <p className="font-bold text-[var(--primary)]">37</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
