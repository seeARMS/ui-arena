import React from 'react';
import { Check, ShieldCheck, Zap, Users, Building2, ChevronDown } from 'lucide-react';

const plans = [
  {
    name: 'Individual',
    price: '$29',
    desc: 'For solo developers building the future.',
    features: ['Unlimited AI completions', '100k context window', '5 parallel agents', '10 indexed repos'],
    cta: 'Start Free Trial',
    highlight: false
  },
  {
    name: 'Team',
    price: '$79',
    desc: 'For engineering teams shipping daily.',
    features: ['Everything in Individual', 'Shared team knowledge base', 'Audit logs & SSO', 'Role-based permissions', 'Priority support'],
    cta: 'Upgrade Team',
    highlight: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'For organizations with strict security needs.',
    features: ['Self-hosted deployment', 'SOC 2 Type II compliant', 'Dedicated Success Manager', 'Custom model fine-tuning', 'Unlimited usage'],
    cta: 'Contact Sales',
    highlight: false
  }
];

const faqs = [
  { q: "How do you handle my source code privacy?", a: "We never train on your private code. All data is encrypted at rest and in transit. We offer zero-retention policies for Enterprise customers." },
  { q: "Which models do you support?", a: "We use a mix of state-of-the-art models including GPT-4o, Claude 3.5 Sonnet, and our own specialized code-reasoning models." },
  { q: "Can I cancel anytime?", a: "Yes. If you cancel, you retain access to your plan features until the end of your current billing cycle." }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Simple, transparent pricing</h1>
        <p className="text-slate-400 text-lg">Choose the plan that fits your development workflow.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-8 mb-24">
        {plans.map((plan) => (
          <div key={plan.name} className={`rounded-2xl p-8 border ${plan.highlight ? 'border-brand-500 bg-slate-900 shadow-2xl shadow-brand-900/20' : 'border-slate-800 bg-slate-900/50'}`}>
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <div className="mb-4">
              <span className="text-4xl font-bold">{plan.price}</span>
              {plan.price !== 'Custom' && <span className="text-slate-400">/mo</span>}
            </div>
            <p className="text-sm text-slate-400 mb-6">{plan.desc}</p>
            <ul className="space-y-4 mb-8">
              {plan.features.map(f => (
                <li key={f} className="flex items-center text-sm text-slate-300">
                  <Check className="w-4 h-4 text-brand-500 mr-2" /> {f}
                </li>
              ))}
            </ul>
            <button className={`w-full py-3 rounded-lg font-medium transition ${plan.highlight ? 'bg-brand-600 hover:bg-brand-500' : 'bg-slate-800 hover:bg-slate-700'}`}>
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      <section className="grid md:grid-cols-2 gap-16 mb-24">
        <div>
          <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map(faq => (
              <div key={faq.q} className="border-b border-slate-800 pb-6">
                <h4 className="font-semibold mb-2 flex justify-between items-center cursor-pointer">
                  {faq.q} <ChevronDown className="w-4 h-4" />
                </h4>
                <p className="text-slate-400 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
          <ShieldCheck className="w-10 h-10 text-brand-500 mb-4" />
          <h3 className="text-xl font-semibold mb-4">Security First</h3>
          <p className="text-slate-400 mb-6">We are SOC 2 Type II compliant and perform annual third-party penetration testing. Your code is your intellectual property, and we treat it as such.</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
              <div className="text-xs text-slate-500">Encryption</div>
              <div className="font-mono text-sm">AES-256</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
              <div className="text-xs text-slate-500">Compliance</div>
              <div className="font-mono text-sm">SOC 2 Type II</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}