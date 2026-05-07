import React, { useState } from 'react';
import { 
  Check, 
  ShieldCheck, 
  Zap, 
  Users, 
  Building2, 
  Cpu, 
  Lock, 
  Globe, 
  ChevronDown, 
  Terminal,
  Code2,
  Activity,
  ArrowRight
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const PLANS = [
  {
    name: "Individual",
    id: "individual",
    price: "$20",
    description: "For solo developers building at speed.",
    features: [
      "500 AI Agent interactions / mo",
      "10 Indexed repositories",
      "128k Context window",
      "Claude 3.5 & GPT-4o access",
      "Local-first indexing",
      "Standard support"
    ],
    cta: "Start Free Trial",
    highlight: false
  },
  {
    name: "Pro Team",
    id: "pro",
    price: "$45",
    description: "For engineering teams scaling production code.",
    features: [
      "Unlimited AI interactions",
      "Unlimited indexed repositories",
      "200k Context window",
      "Shared team knowledge base",
      "SSO & SAML integration",
      "Audit logs & RBAC",
      "Priority GPU compute"
    ],
    cta: "Upgrade Team",
    highlight: true,
    badge: "Most Popular"
  },
  {
    name: "Enterprise",
    id: "enterprise",
    price: "Custom",
    description: "For organizations with strict compliance needs.",
    features: [
      "VPC / On-prem deployment",
      "Zero data retention policy",
      "Custom model fine-tuning",
      "Dedicated account manager",
      "SOC 2 Type II compliance",
      "White-glove migration",
      "Unlimited context window"
    ],
    cta: "Contact Sales",
    highlight: false
  }
];

const FAQS = [
  {
    q: "How do you handle my source code privacy?",
    a: "We never train our models on your private code. For Pro and Enterprise plans, we offer zero-data retention (ZDR) options where your code is processed in memory and never persisted to disk by the model provider."
  },
  {
    q: "What counts as an 'AI Agent interaction'?",
    a: "An interaction is a multi-step task where the agent plans, edits code, and runs tests. Simple chat completions are unlimited on all paid plans."
  },
  {
    q: "Can I bring my own API keys?",
    a: "Yes. Enterprise customers can connect their own Azure OpenAI or AWS Bedrock instances to maintain full control over data residency."
  },
  {
    q: "Do you support monorepos?",
    a: "Absolutely. Our indexing engine is built for large-scale monorepos. We use vector embeddings and AST parsing to ensure the agent understands cross-file dependencies."
  }
];

const FeatureIcon = ({ icon: Icon }) => (
  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
    <Icon size={18} />
  </div>
);

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  return (
    <div className="min-h-screen text-slate-200 selection:bg-primary/30">
      {/* Navigation */}
      <nav className="border-b border-white/5 sticky top-0 z-50 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="bg-primary p-1 rounded">
              <Terminal size={20} className="text-white" />
            </div>
            <span>Syntax<span className="text-primary">AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Features</a>
            <a href="#" className="hover:text-white transition-colors">Docs</a>
            <a href="#" className="hover:text-white transition-colors">Changelog</a>
            <a href="#" className="text-white">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm font-medium hover:text-white transition-colors">Sign In</button>
            <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-slate-200 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Ship faster with <span className="gradient-text">Agentic Workflows</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
            From solo hackers to global engineering orgs. Choose the plan that fits your scale.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={cn("text-sm font-medium", billingCycle === 'monthly' ? "text-white" : "text-slate-500")}>Monthly</span>
            <button 
              onClick={() => setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
              className="w-12 h-6 rounded-full bg-slate-800 relative p-1 transition-colors hover:bg-slate-700"
            >
              <div className={cn(
                "w-4 h-4 bg-primary rounded-full transition-transform duration-200",
                billingCycle === 'yearly' ? "translate-x-6" : "translate-x-0"
              )} />
            </button>
            <span className={cn("text-sm font-medium", billingCycle === 'yearly' ? "text-white" : "text-slate-500")}>
              Yearly <span className="text-emerald-400 text-xs ml-1">(-20%)</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {PLANS.map((plan) => (
            <div 
              key={plan.id}
              className={cn(
                "glass-card rounded-2xl p-8 flex flex-col relative transition-all duration-300 hover:border-primary/50",
                plan.highlight && "ring-2 ring-primary border-transparent"
              )}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-slate-400 text-sm">/user/mo</span>}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <button className={cn(
                "w-full py-3 rounded-xl font-bold text-sm mb-8 transition-all",
                plan.highlight 
                  ? "bg-primary text-white hover:bg-blue-600 shadow-lg shadow-primary/20" 
                  : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
              )}>
                {plan.cta}
              </button>

              <div className="space-y-4 flex-grow">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">What's included</p>
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <Check size={16} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Trust Signals */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-16 border-y border-white/5 mb-24">
          <div className="flex flex-col items-center text-center">
            <FeatureIcon icon={ShieldCheck} />
            <h4 className="font-bold mb-1">SOC 2 Type II</h4>
            <p className="text-xs text-slate-500">Enterprise-grade security standards and audits.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <FeatureIcon icon={Lock} />
            <h4 className="font-bold mb-1">Zero Training</h4>
            <p className="text-xs text-slate-500">Your code is never used to train our models.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <FeatureIcon icon={Globe} />
            <h4 className="font-bold mb-1">Data Residency</h4>
            <p className="text-xs text-slate-500">Choose between US, EU, or local hosting.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <FeatureIcon icon={Cpu} />
            <h4 className="font-bold mb-1">Multi-Model</h4>
            <p className="text-xs text-slate-500">Switch between Claude, GPT, and Llama 3.</p>
          </div>
        </div>

        {/* Comparison Table (Simplified for Team focus) */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold mb-8 text-center">Built for Professional Teams</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="py-4 px-6 text-sm font-medium text-slate-500">Capability</th>
                  <th className="py-4 px-6 text-sm font-medium text-slate-500">Individual</th>
                  <th className="py-4 px-6 text-sm font-medium text-slate-500 text-primary">Pro Team</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-white/5">
                  <td className="py-4 px-6 font-medium">Parallel Agents</td>
                  <td className="py-4 px-6 text-slate-400">1 Agent</td>
                  <td className="py-4 px-6 text-white">Up to 10 Agents</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-4 px-6 font-medium">Context Window</td>
                  <td className="py-4 px-6 text-slate-400">128k tokens</td>
                  <td className="py-4 px-6 text-white">200k tokens</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-4 px-6 font-medium">Team Knowledge Base</td>
                  <td className="py-4 px-6 text-slate-400">—</td>
                  <td className="py-4 px-6 text-white">Included</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-4 px-6 font-medium">SSO / SAML</td>
                  <td className="py-4 px-6 text-slate-400">—</td>
                  <td className="py-4 px-6 text-white">Okta, Auth0, Google</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-4 px-6 font-medium">Audit Logs</td>
                  <td className="py-4 px-6 text-slate-400">—</td>
                  <td className="py-4 px-6 text-white">7-day retention</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mb-24">
          <h2 className="text-3xl font-bold mb-12 text-center">Common Questions</h2>
          <div className="space-y-6">
            {FAQS.map((faq, i) => (
              <div key={i} className="glass-card rounded-xl p-6">
                <h4 className="font-bold mb-3 flex items-center justify-between">
                  {faq.q}
                  <ChevronDown size={16} className="text-slate-500" />
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-gradient-to-br from-primary/20 to-purple-500/10 border border-primary/20 rounded-3xl p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10"><Code2 size={120} /></div>
            <div className="absolute bottom-10 right-10"><Activity size={120} /></div>
          </div>
          <h2 className="text-3xl font-bold mb-4">Ready to upgrade your workflow?</h2>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Join 50,000+ developers using SyntaxAI to automate the tedious parts of coding.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-600 transition-all flex items-center gap-2">
              Get Started for Free <ArrowRight size={18} />
            </button>
            <button className="bg-white/5 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 border border-white/10 transition-all">
              Talk to Sales
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 font-bold text-lg opacity-50">
            <Terminal size={18} />
            <span>SyntaxAI</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-500">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Security</a>
            <a href="#" className="hover:text-white">Status</a>
          </div>
          <p className="text-slate-600 text-xs">
            © 2024 SyntaxAI Systems Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}