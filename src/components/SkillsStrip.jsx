export default function SkillsStrip() {
  const skills = [
    'UI/UX Design',
    'Design Systems',
    'Prototyping',
    'Framer',
    'Figma',
    'React',
    'Interaction Design',
  ];

  return (
    <section className="skills-strip container">
      <div className="section-header">
        <span className="section-label">Capabilities</span>
      </div>
      <div className="skills-container">
        {skills.map((skill) => (
          <div key={skill} className="skill-pill">
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}
