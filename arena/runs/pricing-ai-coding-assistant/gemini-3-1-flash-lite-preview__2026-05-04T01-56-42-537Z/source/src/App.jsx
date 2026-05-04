import React from 'react';
import './styles.css';

export default function App() {
  const plans = [
    {
      name: "Individual",
      price: "$20",
      desc: "For solo developers building side projects.",
      features: ["1M tokens/mo", "1 parallel agent", "5 indexed repos", "128k context window"],
      cta: "Start Free Trial"
    },
    {
      name: "Team",
      price: "$45",
      desc: "For engineering teams shipping daily.",
      featured: true,
      features: ["Unlimited tokens", "5 parallel agents", "Unlimited repos", "256k context window", "Shared billing", "Audit logs & SSO"],
      cta: "Upgrade Team"
    },
    {
      name: "Enterprise",
      price: "Custom",
      desc: "For organizations with strict security needs.",
      features: ["Everything in Team", "SOC 2 Type II", "Self-hosted options", "Dedicated support", "Role-based access control"],
      cta: "Contact Sales"
    }
  ];

  return (
    <div className="pricing-container">
      <header className="header">
        <h1>Choose your coding partner</h1>
        <p>Transparent pricing for developers, teams, and enterprises.</p>
      </header>

      <div className="grid">
        {plans.map((plan) => (
          <div key={plan.name} className={`card ${plan.featured ? 'featured' : ''}`}>
            {plan.featured && <div className="badge">MOST POPULAR</div>}
            <h3>{plan.name}</h3>
            <div className="price">{plan.price}<span style={{fontSize: '1rem', color: '#666'}}>/mo</span></div>
            <p style={{color: '#888'}}>{plan.desc}</p>
            <ul className="features">
              {plan.features.map(f => <li key={f}>✓ {f}</li>)}
            </ul>
            <button className={`btn ${plan.featured ? 'primary' : ''}`}>{plan.cta}</button>
          </div>
        ))}
      </div>

      <div className="trust-signals">
        <span>🔒 SOC 2 Type II Compliant</span>
        <span>🛡️ Zero-retention policy</span>
        <span>⚡ Powered by Claude 3.5 / GPT-4o</span>
      </div>

      <section className="faq">
        <h3>Frequently Asked Questions</h3>
        <div className="faq-item">
          <h4>Does the AI train on my code?</h4>
          <p>Never. We operate under a strict zero-retention policy. Your code is processed in memory and never stored or used to train our models.</p>
        </div>
        <div className="faq-item">
          <h4>Can I switch plans later?</h4>
          <p>Yes, you can upgrade or downgrade your team plan at any time. Prorated credits are applied automatically.</p>
        </div>
      </section>
    </div>
  );
}