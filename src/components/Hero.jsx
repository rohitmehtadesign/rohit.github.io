import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="hero container">
      <div className="availability-badge">
        <span className="pulse-dot"></span>
        Open to new opportunities
      </div>
      
      <motion.h1 
        className="hero-heading"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="heading-line">
          I'm Rohit Mehta — a product designer
        </motion.div>
        <motion.div variants={itemVariants} className="heading-line">
          crafting <span className="text-accent">digital experiences</span>
        </motion.div>
        <motion.div variants={itemVariants} className="heading-line">
          that feel human, intuitive, and effortless.
        </motion.div>
      </motion.h1>

      <motion.p 
        className="hero-sub"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ maxWidth: '800px', lineHeight: '1.6' }}
      >
        I've spent the last decade doing the kind of design work I genuinely care about — solving messy problems, simplifying the complex, and building things that people actually use. Right now I'm doing that at <strong>Oracle</strong>, working on supply chain tools that need to feel a whole lot less painful than they do today. Before that, I helped <strong>Freshii</strong> rebuild their ordering platform from scratch, worked on growth at <strong>Flipp</strong>, and designed payments at <strong>Ola Cabs</strong> back when it was one of the fastest-growing startups in India. I'm based in <strong>Toronto</strong> — always up for a good conversation.
      </motion.p>

      <motion.div 
        className="hero-ctas"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <a href="#contact" className="btn btn-primary">Let's talk</a>
        <a href="#work" className="btn btn-ghost">
          View work <ArrowDown size={16} />
        </a>
      </motion.div>
    </section>
  );
}
