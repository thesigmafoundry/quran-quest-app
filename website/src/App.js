import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [waitlistCount, setWaitlistCount] = useState(157);
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

  useEffect(() => {
    // Simulate increasing waitlist count for social proof
    const interval = setInterval(() => {
      setWaitlistCount(prev => {
        const increase = Math.floor(Math.random() * 3);
        return prev + (increase > 0 ? 1 : 0);
      });
    }, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.email) {
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        isError: true,
        message: 'Please enter your email.'
      });
      return;
    }
    
    setFormStatus({
      isSubmitting: true,
      isSubmitted: false,
      isError: false,
      message: ''
    });
    
    setTimeout(() => {
      setFormStatus({
        isSubmitting: false,
        isSubmitted: true,
        isError: false,
        message: 'Thank you for joining our waitlist! We\'ll be in touch soon.'
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        childrenCount: '',
        childrenAgeRange: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo">Quranic Quest</div>
          <nav>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#benefits">Benefits</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </nav>
          <a href="#waitlist" className="btn btn-primary">Join Waitlist</a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Help Your Children Learn Quran with AI</h1>
            <p className="hero-subtitle">
              An interactive, personalized Quran learning experience designed specifically for Muslim immigrant families in Western countries.
            </p>
            <div className="cta-buttons">
              <a href="#waitlist" className="btn btn-primary">Join the Waitlist</a>
              <a href="#how-it-works" className="btn btn-secondary">Learn More</a>
            </div>
            <div className="social-proof">
              <div className="avatars">
                <div className="avatar">👨‍👩‍👧</div>
                <div className="avatar">👨‍👩‍👦</div>
                <div className="avatar">👩‍👦</div>
                <div className="avatar">+</div>
              </div>
              <p><strong>{waitlistCount}+ families</strong> already on the waitlist</p>
            </div>
          </div>
          <div className="hero-image">
            <div className="app-preview">
              <div className="app-icon">📱</div>
              <h3>Quranic Quest App</h3>
              <p>Interactive AI-powered learning for your children</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: '75%' }}></div>
              </div>
              <p className="progress-text">Development: 75% complete</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <h2>Powerful Features for Effective Learning</h2>
            <p>Quranic Quest combines traditional teaching methods with cutting-edge technology to create an engaging and effective learning experience.</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎙️</div>
              <h3>AI-Powered Pronunciation Feedback</h3>
              <p>Advanced speech recognition technology provides real-time feedback on Quranic recitation, helping children develop proper pronunciation.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🧩</div>
              <h3>Personalized Learning Paths</h3>
              <p>Adaptive curriculum that adjusts to each child's learning pace, strengths, and areas for improvement.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>Interactive Voice Conversations</h3>
              <p>Engage in natural conversations with the app to practice reading, receive guidance, and answer questions.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Progress Tracking & Analytics</h3>
              <p>Detailed insights into your child's learning journey with visual progress reports and achievement tracking.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👨‍👩‍👧</div>
              <h3>Family Involvement Tools</h3>
              <p>Features that help parents participate in their child's learning journey, regardless of their own Arabic proficiency.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3>Cultural Context Integration</h3>
              <p>Content designed specifically for Muslim families in Western countries, bridging cultural contexts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="benefits">
        <div className="container">
          <div className="benefits-content">
            <h2>Why Families Choose Quranic Quest</h2>
            <div className="benefits-list">
              <div className="benefit-item">
                <div className="benefit-icon">🕌</div>
                <div>
                  <h3>Preserve Religious Heritage</h3>
                  <p>Help your children maintain their Islamic identity and connect with their religious heritage in a Western context.</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">⏰</div>
                <div>
                  <h3>Fit Into Busy Family Life</h3>
                  <p>Flexible learning that adapts to your family's schedule, eliminating the need for fixed class times.</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">🔊</div>
                <div>
                  <h3>Build Confidence in Recitation</h3>
                  <p>Children develop proper pronunciation and confidence in their Quranic reading abilities.</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">🌉</div>
                <div>
                  <h3>Bridge Language Barriers</h3>
                  <p>Parents can support their children's learning regardless of their own Arabic proficiency.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial">
              <p>"Quranic Quest has transformed how my children learn the Quran. They're excited to practice every day, and I can finally be involved in their learning journey despite my limited Arabic."</p>
              <p className="testimonial-author">- Sarah M., mother of 3</p>
            </div>
            <div className="app-stats">
              <div className="stat-header">
                <span>Weekly Practice Goal</span>
                <span>85% Complete</span>
              </div>
              <div className="progress-bar">
                <div className="progress" style={{ width: '85%' }}></div>
              </div>
              <div className="stat-grid">
                <div className="stat-item">
                  <p className="stat-label">Streak</p>
                  <p className="stat-value">14 days</p>
                </div>
                <div className="stat-item">
                  <p className="stat-label">Accuracy</p>
                  <p className="stat-value">92%</p>
                </div>
                <div className="stat-item">
                  <p className="stat-label">Verses</p>
                  <p className="stat-value">37</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>How Quranic Quest Works</h2>
            <p>Our app uses advanced AI technology to create a personalized, effective learning experience for your child.</p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-number">01</div>
              <div className="step-content">
                <h3>Personalized Assessment</h3>
                <p>The app evaluates your child's current Quranic reading level, strengths, and areas for improvement.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">02</div>
              <div className="step-content">
                <h3>Custom Learning Path</h3>
                <p>Based on the assessment, a personalized curriculum is created that adapts to your child's learning style.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">03</div>
              <div className="step-content">
                <h3>Interactive Learning</h3>
                <p>Children engage with interactive lessons, games, and voice-based activities to develop their skills.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">04</div>
              <div className="step-content">
                <h3>Real-time Feedback</h3>
                <p>AI-powered speech recognition provides immediate feedback on pronunciation and recitation.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">05</div>
              <div className="step-content">
                <h3>Progress Tracking</h3>
                <p>Parents receive detailed insights into their child's progress and achievement milestones.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq">
        <div className="container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Find answers to common questions about Quranic Quest</p>
          </div>
          <div className="faq-list">
            <div className="faq-item">
              <h3>How is Quranic Quest different from other Quran learning apps?</h3>
              <p>Quranic Quest is specifically designed for Muslim immigrant families in Western countries, with AI-powered speech recognition for accurate pronunciation feedback, personalized learning paths that adapt to each child's needs, and family involvement features that help parents participate regardless of their own Arabic proficiency.</p>
            </div>
            <div className="faq-item">
              <h3>What age group is the app suitable for?</h3>
              <p>The app is designed for children ages 5-15, with content and activities tailored to different developmental stages. The interface and learning approach adjust based on the child's age and abilities.</p>
            </div>
            <div className="faq-item">
              <h3>Do I need to know Arabic to help my child use the app?</h3>
              <p>Not at all! Quranic Quest is designed to support parents with limited or no Arabic knowledge. The app provides all necessary guidance and feedback, while giving parents tools to monitor progress and participate in their child's learning journey.</p>
            </div>
            <div className="faq-item">
              <h3>How much time should my child spend on the app each day?</h3>
              <p>We recommend 15-20 minutes daily for consistent progress. The app is designed to make these short sessions highly effective through focused, personalized learning activities.</p>
            </div>
            <div className="faq-item">
              <h3>Will the app teach my child the meaning of the Quran?</h3>
              <p>The initial focus is on proper reading and pronunciation (tajweed). However, the app does include basic word meanings and context to help children understand what they're reading. More comprehensive meaning and tafsir features will be added in future updates.</p>
            </div>
            <div className="faq-item">
              <h3>When will the app be available?</h3>
              <p>We're currently in development with plans to launch a beta version in the coming months. Join our waiting list to be among the first to try Quranic Quest and receive updates on our progress.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="waitlist">
        <div className="container">
          <div className="waitlist-content">
            <h2>Join the Quranic Quest Waitlist</h2>
            <p>Be among the first to experience our AI-driven Quran learning app.</p>
          </div>
          <div className="waitlist-form-container">
            {formStatus.isSubmitted ? (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h3>Thank You!</h3>
                <p>{formStatus.message}</p>
                <button 
                  onClick={() => setFormStatus(prev => ({ ...prev, isSubmitted: false }))}
                  className="btn btn-secondary"
                >
                  Sign Up Another
                </button>
              </div>
            ) : (
              <div className="form-card">
                <h3>Sign Up for Early Access</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Sign Up
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;