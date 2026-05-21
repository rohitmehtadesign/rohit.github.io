import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projectsOverview as projects } from '../data/projects';

export default function WorkGrid() {
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
    <section className="work-grid-section container">
      <div className="section-header">
        <span className="section-label">Selected Work</span>
      </div>
      
      <motion.div 
        className="work-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={cardVariants}>
            <Link to={`/work/${project.id}`} className="work-card">
              <div 
                className="work-thumbnail" 
                style={{ background: project.gradient }}
              ></div>
              <div className="work-info">
                <h3 className="work-title">{project.name}</h3>
                <span className="work-meta">{project.type} · {project.year}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
