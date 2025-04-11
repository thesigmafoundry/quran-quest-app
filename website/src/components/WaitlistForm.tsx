'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const WaitlistForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    childrenCount: '',
    childrenAgeRange: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    isError: false,
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.childrenCount || !formData.childrenAgeRange) {
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        isError: true,
        message: 'Please fill in all required fields.'
      });
      return;
    }
    
    // Submit form
    setFormStatus({
      isSubmitting: true,
      isSubmitted: false,
      isError: false,
      message: ''
    });
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setFormStatus({
          isSubmitting: false,
          isSubmitted: true,
          isError: false,
          message: 'Thank you for joining our waitlist! We\'ll be in touch soon.'
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          childrenCount: '',
          childrenAgeRange: '',
          message: ''
        });
      } else {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        isError: true,
        message: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.'
      });
    }
  };

  return (
    <section id="waitlist" className="section bg-[var(--primary)] text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="mb-4">Join the Quranic Quest Waitlist</h2>
            <p className="mb-6">
              Be among the first to experience our AI-driven Quran learning app. Sign up for early access and receive:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <div className="w-6 h-6 bg-[var(--secondary)] rounded-full flex items-center justify-center mr-3 text-[var(--primary)] font-bold text-sm">✓</div>
                <span>Priority access to our beta release</span>
              </li>
              <li className="flex items-center">
                <div className="w-6 h-6 bg-[var(--secondary)] rounded-full flex items-center justify-center mr-3 text-[var(--primary)] font-bold text-sm">✓</div>
                <span>Exclusive development updates</span>
              </li>
              <li className="flex items-center">
                <div className="w-6 h-6 bg-[var(--secondary)] rounded-full flex items-center justify-center mr-3 text-[var(--primary)] font-bold text-sm">✓</div>
                <span>Special founding member discount</span>
              </li>
              <li className="flex items-center">
                <div className="w-6 h-6 bg-[var(--secondary)] rounded-full flex items-center justify-center mr-3 text-[var(--primary)] font-bold text-sm">✓</div>
                <span>Opportunity to provide feedback and shape the app</span>
              </li>
            </ul>
          </div>
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-[var(--text)]">
              {formStatus.isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-[var(--primary)] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl text-[var(--primary)]">✓</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-[var(--primary)]">Thank You!</h3>
                  <p className="mb-6">{formStatus.message}</p>
                  <button 
                    onClick={() => setFormStatus(prev => ({ ...prev, isSubmitted: false }))}
                    className="btn-secondary"
                  >
                    Sign Up Another
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold mb-4 text-[var(--primary)]">Sign Up for Early Access</h3>
                  {formStatus.isError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                      {formStatus.message}
                    </div>
                  )}
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-[var(--text-light)] mb-1">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-[var(--text-light)] mb-1">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-[var(--text-light)] mb-1">Phone Number (Optional)</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="childrenCount" className="block text-sm font-medium text-[var(--text-light)] mb-1">Number of Children</label>
                        <select 
                          id="childrenCount" 
                          name="childrenCount" 
                          value={formData.childrenCount}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                          required
                        >
                          <option value="">Select</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5+">5+</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="childrenAgeRange" className="block text-sm font-medium text-[var(--text-light)] mb-1">Age Range</label>
                        <select 
                          id="childrenAgeRange" 
                          name="childrenAgeRange" 
                          value={formData.childrenAgeRange}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                          required
                        >
                          <option value="">Select</option>
                          <option value="5-7">5-7 years</option>
                          <option value="8-10">8-10 years</option>
                          <option value="11-13">11-13 years</option>
                          <option value="14-15">14-15 years</option>
                          <option value="mixed">Mixed ages</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-[var(--text-light)] mb-1">Message (Optional)</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows={3} 
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                        placeholder="Tell us about your needs or expectations..."
                      ></textarea>
                    </div>
                    <div className="pt-2">
                      <button 
                        type="submit" 
                        className="w-full btn-primary"
                        disabled={formStatus.isSubmitting}
                      >
                        {formStatus.isSubmitting ? 'Submitting...' : 'Join the Waitlist'}
                      </button>
                    </div>
                    <p className="text-xs text-[var(--text-light)] text-center mt-4">
                      By signing up, you agree to our <Link href="#" className="underline">Privacy Policy</Link> and <Link href="#" className="underline">Terms of Service</Link>.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistForm;
