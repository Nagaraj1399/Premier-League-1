import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BrainCircuit, Target, ShieldAlert } from 'lucide-react';

const AIAssistant = ({ insights = [] }) => {
  const defaultInsights = [
    {
      icon: <Target size={18} />,
      title: "Tactical Vulnerability",
      text: "CSK bowler R. Jadeja tends to bowl shorter lengths to I. Kishan.",
      color: "var(--accent-cyan)"
    }
  ];

  const liveInsights = insights.map((insight, i) => ({
    icon: <Sparkles size={18} />,
    title: "Live Gemini Insight",
    text: insight.data.text,
    color: i % 2 === 0 ? "var(--accent-cyan)" : "var(--accent-purple)"
  }));

  const allInsights = [...liveInsights, ...defaultInsights].slice(0, 4);

  return (
    <div className="ai-assistant-wrapper">
      <div className="ai-header">
        <Sparkles size={20} color="var(--accent-cyan)" />
        <h4>Gemini Live Insights</h4>
      </div>
      
      <div className="insights-list">
        {allInsights.map((insight, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="insight-card"
          >
            <div className="insight-title" style={{ color: insight.color }}>
              {insight.icon}
              <span>{insight.title}</span>
            </div>
            <p className="insight-text">{insight.text}</p>
          </motion.div>
        ))}
      </div>

      <div className="ask-ai glass-card">
        <input type="text" placeholder="Ask Gemini about match history..." />
        <button>Ask</button>
      </div>

      <style jsx="true">{`
        .ai-assistant-wrapper { display: flex; flex-direction: column; gap: var(--spacing-lg); height: 100%; }
        .ai-header { display: flex; align-items: center; gap: var(--spacing-sm); }
        .ai-header h4 { font-size: 1.1rem; }
        .insights-list { display: flex; flex-direction: column; gap: var(--spacing-md); }
        .insight-card { background: rgba(255, 255, 255, 0.03); border-left: 3px solid transparent; padding: var(--spacing-md); border-radius: 0 var(--radius-sm) var(--radius-sm) 0; }
        .insight-title { display: flex; align-items: center; gap: var(--spacing-sm); font-weight: 700; font-size: 0.85rem; margin-bottom: 8px; }
        .insight-text { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.4; }
        .ask-ai { margin-top: auto; display: flex; padding: var(--spacing-sm); gap: var(--spacing-sm); }
        .ask-ai input { flex-grow: 1; background: transparent; border: none; color: white; outline: none; font-size: 0.85rem; }
        .ask-ai button { padding: 4px 12px; background: var(--accent-cyan); color: black; font-weight: 700; font-size: 0.8rem; border-radius: 4px; }
      `}</style>
    </div>
  );
};

export default AIAssistant;
