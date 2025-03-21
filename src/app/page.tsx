import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import About from '../components/About';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main id='top'>
      <Navbar />
      <Hero />
      <Features />
      <About />
      <Footer />
    </main>
  );
}
