import { motion } from 'framer-motion';

export default function ComingSoon() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="work-grid-section container" id="work">
      <div className="section-header">
        <span className="section-label">Selected Work</span>
      </div>
      
      <motion.div 
        className="work-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        style={{ display: 'block' }}
      >
        <motion.div variants={cardVariants} style={{ 
          background: 'var(--bg-secondary)', 
          borderRadius: '16px', 
          padding: '64px 32px', 
          textAlign: 'center',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '300px'
        }}>
          <h3 style={{ fontSize: '2rem', marginBottom: '16px' }}>Case Studies Coming Soon</h3>
          <p className="text-body text-muted" style={{ maxWidth: '500px' }}>
            I am currently migrating my detailed project breakdowns. Check back soon for deep dives into my work at Oracle, Freshii, and Flipp.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
