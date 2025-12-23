
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import IdeaGenerator from './components/IdeaGenerator';
import ImageAnalyzer from './components/ImageAnalyzer';
import Chatbot from './components/Chatbot';
import { SubscriptionTier } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userTier, setUserTier] = useState<SubscriptionTier>(SubscriptionTier.PRO);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'discover':
        return (
          <div className="p-12 text-center card-glass rounded-3xl">
            <h2 className="text-2xl font-bold mb-4">Trend Discovery Feed</h2>
            <p className="text-slate-400">This feature connects to real-time TikTok Trending APIs. In this prototype, please check the Dashboard for latest local trends.</p>
          </div>
        );
      case 'generator':
        return <IdeaGenerator />;
      case 'analyzer':
        return <ImageAnalyzer />;
      case 'chat':
        return (
            <div className="p-12 text-center card-glass rounded-3xl">
                <h2 className="text-2xl font-bold mb-4">AI Creator Assistant</h2>
                <p className="text-slate-400 mb-8">Click the floating chat bubble in the bottom right corner to speak with Gemini about your TikTok strategy.</p>
                <div className="w-20 h-20 bg-yellow-500/10 rounded-full mx-auto flex items-center justify-center text-yellow-500 animate-bounce">
                    ↓
                </div>
            </div>
        );
      case 'analytics':
        return (
            <div className="p-12 text-center card-glass rounded-3xl">
                <h2 className="text-2xl font-bold mb-4">Your Creator Performance</h2>
                <p className="text-slate-400">Sync your TikTok account to see detailed retention graphs and audience demographics for Uganda.</p>
                <button className="mt-6 bg-yellow-500 text-slate-950 px-6 py-3 rounded-xl font-bold">Connect TikTok Account</button>
            </div>
        );
      case 'subscription':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Upgrade Your Account</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Free', price: '0', features: ['5 Idea Generations / day', 'Basic Trends', 'Community Support'], color: 'slate' },
                { name: 'Basic', price: '9', features: ['Unlimited Ideas', 'Image Analysis', 'Weekly Email Reports'], color: 'yellow' },
                { name: 'Pro', price: '29', features: ['Real-time Alerts', 'Priority Gemini Pro access', '1-on-1 Strategy Chat'], color: 'red' },
              ].map((plan, i) => (
                <div key={i} className={`card-glass p-8 rounded-3xl flex flex-col border-2 ${activeTab === plan.name.toLowerCase() ? 'border-yellow-500' : 'border-transparent'}`}>
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-extrabold">${plan.price}</span>
                    <span className="text-slate-500">/mo</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="text-sm text-slate-400 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-xl font-bold transition-all ${
                    plan.name === 'Pro' ? 'bg-yellow-500 text-slate-950' : 'bg-slate-800 text-white hover:bg-slate-700'
                  }`}>
                    {plan.name === 'Free' ? 'Current Plan' : 'Get Started'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} userTier={userTier}>
      {renderContent()}
      <Chatbot />
    </Layout>
  );
};

export default App;
