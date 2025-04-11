import React from 'react';

const FAQ = () => {
  const faqs = [
    {
      question: "How is Quranic Quest different from other Quran learning apps?",
      answer: "Quranic Quest is specifically designed for Muslim immigrant families in Western countries, with AI-powered speech recognition for accurate pronunciation feedback, personalized learning paths that adapt to each child's needs, and family involvement features that help parents participate regardless of their own Arabic proficiency."
    },
    {
      question: "What age group is the app suitable for?",
      answer: "The app is designed for children ages 5-15, with content and activities tailored to different developmental stages. The interface and learning approach adjust based on the child's age and abilities."
    },
    {
      question: "Do I need to know Arabic to help my child use the app?",
      answer: "Not at all! Quranic Quest is designed to support parents with limited or no Arabic knowledge. The app provides all necessary guidance and feedback, while giving parents tools to monitor progress and participate in their child's learning journey."
    },
    {
      question: "How much time should my child spend on the app each day?",
      answer: "We recommend 15-20 minutes daily for consistent progress. The app is designed to make these short sessions highly effective through focused, personalized learning activities."
    },
    {
      question: "Will the app teach my child the meaning of the Quran?",
      answer: "The initial focus is on proper reading and pronunciation (tajweed). However, the app does include basic word meanings and context to help children understand what they're reading. More comprehensive meaning and tafsir features will be added in future updates."
    },
    {
      question: "When will the app be available?",
      answer: "We're currently in development with plans to launch a beta version in the coming months. Join our waiting list to be among the first to try Quranic Quest and receive updates on our progress."
    }
  ];

  return (
    <section id="faq" className="section bg-[var(--background)]">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="mb-4">Frequently Asked Questions</h2>
          <p className="max-w-3xl mx-auto text-[var(--text-light)]">
            Find answers to common questions about Quranic Quest
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                  <p className="text-[var(--text-light)]">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
