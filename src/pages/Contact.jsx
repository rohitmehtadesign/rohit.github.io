import { motion } from 'framer-motion';
import { Phone, Briefcase, Mail } from 'lucide-react';

export default function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="contact" className="contact-page container" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="section-header" style={{ marginBottom: '40px' }}>
        <span className="section-label">Contact</span>
      </div>
      <motion.div 
        className="contact-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Left Column: Info & Socials */}
        <motion.div variants={itemVariants} className="contact-info-col">
          <h2 className="hero-heading" style={{ fontSize: '3rem' }}>Let's build<br/>something.</h2>
          <p className="text-body text-muted" style={{ marginTop: '24px', marginBottom: '48px', maxWidth: '400px' }}>
            I'm open to full-time roles, contract work, or just a good design conversation. 
            Reach out anytime — I reply to everyone.
          </p>
          
          <div className="social-links">
            <a href="mailto:rohitrmehta23@gmail.com" className="social-link">
              <Mail size={20} /> rohitrmehta23@gmail.com
            </a>
            <a href="https://linkedin.com/in/rohit-mehta" target="_blank" rel="noreferrer" className="social-link">
              <Briefcase size={20} /> linkedin.com/in/rohit-mehta
            </a>
            <a href="tel:+16478815643" className="social-link">
              <Phone size={20} /> (647) 881-5643
            </a>
          </div>
        </motion.div>

        {/* Right Column: Form */}
        <motion.div variants={itemVariants} className="contact-form-col">
          <form className="contact-form" action="https://formspree.io/f/YOUR_FORM_ID_HERE" method="POST">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" placeholder="John Doe" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="john@example.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" placeholder="Tell me about your project..." required></textarea>
            </div>
            <button className="btn btn-primary" type="submit">Send Message</button>
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
}
