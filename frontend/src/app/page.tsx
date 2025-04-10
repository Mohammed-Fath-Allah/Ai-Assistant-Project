// pages/index.js
import Navbar from '@/app/components/Navbar';
import Hero from '@/app/components/Hero';
import Footer from '@/app/components/Footer';
import AIWidget from '@/app/components/AIWidget';
import ChatPage from './prompt-page/page';

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Footer />
      <AIWidget />

    </div>
  );
}
