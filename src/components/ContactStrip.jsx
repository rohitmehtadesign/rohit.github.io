import { ArrowRight } from 'lucide-react';

export default function ContactStrip() {
  return (
    <section className="contact-strip-section container">
      <div className="contact-strip-card">
        <div className="contact-profile">
          <div className="avatar">
            <span>RM</span>
          </div>
          <div className="contact-info">
            <h4>Rohit Mehta</h4>
            <span className="text-muted">Product Designer</span>
          </div>
        </div>
        <button className="btn btn-primary">
          Let's talk <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
