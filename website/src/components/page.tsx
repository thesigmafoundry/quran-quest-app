import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Benefits from '../components/Benefits';
import HowItWorks from '../components/HowItWorks';
import FAQ from '../components/FAQ';
import WaitlistForm from '../components/WaitlistForm';
import Footer from '../components/Footer';
import WaitlistCTA from '../components/WaitlistCTA';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Features />
      <Benefits />
      <HowItWorks />
      <FAQ />
      <WaitlistForm />
      <Footer />
      <WaitlistCTA />
    </main>
  );
}
