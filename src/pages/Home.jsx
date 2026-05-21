import Hero from '../components/Hero';
import ComingSoon from '../components/ComingSoon';
import Contact from './Contact';

export default function Home() {
  return (
    <main className="page-content">
      <Hero />
      <ComingSoon />
      <Contact />
    </main>
  );
}
