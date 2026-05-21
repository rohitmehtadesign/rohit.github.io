import { motion } from 'framer-motion';

export default function About() {
  // Experience array removed

  const tools = [
    'Figma', 'Framer', 'React', 'Cursor', 'Linear', 'Notion', 'Spline'
  ];

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
    <main className="page-content">
      <article className="about-page container">
        
        {/* Bio Section */}
        <motion.section 
          className="about-hero"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="about-grid">
            <motion.div variants={itemVariants} className="about-text-col">
              <h1 className="hero-heading">About Me</h1>
              <p className="about-bio text-body">
                I've spent the last decade doing the kind of design work I genuinely care about — solving 
                messy problems, simplifying the complex, and building things that people actually use. 
                Right now I'm doing that at Oracle, working on supply chain tools that need to feel a 
                whole lot less painful than they do today. Before that, I helped Freshii rebuild their 
                ordering platform from scratch, worked on growth at Flipp, and designed payments at 
                Ola Cabs.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="about-img-col">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800" 
                alt="Portrait" 
                className="about-portrait"
              />
            </motion.div>
          </div>
        </motion.section>

        {/* Experience section removed by user request */}

        {/* Tools Section */}
        <motion.section 
          className="about-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-grid">
            <div className="section-header-col">
              <span className="section-label">Tools & Stack</span>
            </div>
            <div className="section-content-col">
              <div className="skills-container">
                {tools.map((tool) => (
                  <div key={tool} className="skill-pill">
                    {tool}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

      </article>
    </main>
  );
}
