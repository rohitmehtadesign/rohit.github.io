import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { caseStudies, projectsOverview } from '../data/projects';

export default function Work() {
  const { id } = useParams();
  const study = caseStudies[id];

  // Simple next project logic
  const currentIndex = projectsOverview.findIndex(p => p.id === id);
  const nextProject = currentIndex >= 0 && currentIndex < projectsOverview.length - 1 
    ? projectsOverview[currentIndex + 1] 
    : projectsOverview[0]; // loop back to first if at end

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  if (!study) {
    return (
      <main className="page-content">
        <article className="case-study container">
          <h2>Case study not found</h2>
          <Link to="/" className="btn btn-primary">Return to Work</Link>
        </article>
      </main>
    );
  }

  return (
    <main className="page-content">
      <article className="case-study container">
        {/* Hero Section */}
        <motion.div 
          className="case-study-hero"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="back-link-wrapper">
             <Link to="/" className="back-link"><ArrowLeft size={16}/> Back to Work</Link>
          </motion.div>
          <motion.h1 variants={itemVariants} className="hero-heading" style={{ fontSize: '3rem', lineHeight: '1.2', maxWidth: '800px' }}>
            {study.title}
          </motion.h1>
          
          <motion.div variants={itemVariants} className="case-study-meta">
            {Object.entries(study.meta).map(([key, value]) => (
              <div className="meta-item" key={key}>
                <span className="section-label" style={{ textTransform: 'capitalize' }}>{key}</span>
                <p>{value}</p>
              </div>
            ))}
          </motion.div>

          {study.coverImg && (
            <motion.div variants={itemVariants} className="case-study-cover">
              <img 
                src={study.coverImg} 
                alt={`${study.title} Cover`} 
                className="cover-img"
              />
            </motion.div>
          )}
        </motion.div>

        {/* Dynamic Sections */}
        {study.sections.map((section, index) => (
          <motion.section 
            key={index}
            className="case-study-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-grid">
              <div className="section-header-col">
                <span className="section-label">{section.title}</span>
              </div>
              <div className="section-content-col">
                {section.type === 'text' && section.paragraphs.map((p, i) => (
                  <p key={i} className="text-body" dangerouslySetInnerHTML={{ __html: p }}></p>
                ))}

                {section.type === 'list' && (
                  <>
                    {section.paragraphs.map((p, i) => (
                      <p key={i} className="text-body" dangerouslySetInnerHTML={{ __html: p }}></p>
                    ))}
                    <ul className="text-body" style={{ marginTop: '16px', paddingLeft: '24px' }}>
                      {section.items.map((item, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: item }}></li>
                      ))}
                    </ul>
                  </>
                )}

                {section.type === 'steps' && (
                  <div className="process-steps">
                    {section.steps.map((step, i) => (
                      <div key={i} className="process-step" style={{ marginBottom: '32px' }}>
                        <div className="step-num" style={{ fontSize: '12px', color: 'var(--text-accent)', marginBottom: '8px', fontWeight: '600' }}>STEP {step.num}</div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{step.title}</h3>
                        <p className="text-body">{step.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        ))}

        {/* Stats Section if any */}
        {study.stats && study.stats.length > 0 && (
          <motion.section 
            className="case-study-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-grid">
              <div className="section-header-col">
                <span className="section-label">Impact</span>
              </div>
              <div className="section-content-col">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
                  {study.stats.map((stat, index) => (
                    <div key={index} className="stat-card" style={{ padding: '24px', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
                      <div className="stat-num" style={{ fontSize: '3rem', fontWeight: '500', color: 'var(--text-accent)', marginBottom: '8px' }}>{stat.num}</div>
                      <div className="stat-lbl" style={{ color: 'var(--text-secondary)' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {/* Next Project */}
        {nextProject && (
          <div className="next-project-nav">
             <Link to={`/work/${nextProject.id}`} className="next-link">
                <span className="section-label">Next Project</span>
                <h2 className="next-title">{nextProject.name} <ArrowRight size={24} /></h2>
             </Link>
          </div>
        )}
      </article>
    </main>
  );
}
