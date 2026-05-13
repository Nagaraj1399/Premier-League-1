import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Target, Star, X } from 'lucide-react';

const AgentChallenge = ({ challenge, onAccept, onDecline }) => {
  if (!challenge) return null;

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="agent-challenge-overlay"
    >
      <div className="challenge-card glass-card">
        <div className="header">
          <div className="agent-avatar">🤖</div>
          <div className="title-group">
            <span className="badge">AGENTIC CHALLENGE</span>
            <h3>{challenge.title}</h3>
          </div>
          <button className="close-btn" onClick={onDecline}><X size={18} /></button>
        </div>
        
        <p className="message">{challenge.message}</p>
        
        <div className="reward-tag">
          <Star size={16} fill="var(--accent-cyan)" />
          <span>Reward: {challenge.reward}</span>
        </div>

        <div className="actions">
          <button className="btn-decline" onClick={onDecline}>Maybe Later</button>
          <button className="btn-accept" onClick={onAccept}>Accept Challenge</button>
        </div>
      </div>

      <style jsx="true">{`
        .agent-challenge-overlay {
          position: fixed;
          bottom: 100px;
          right: var(--spacing-lg);
          z-index: 2000;
          width: 380px;
        }
        .challenge-card {
          padding: var(--spacing-lg);
          border: 2px solid var(--accent-cyan);
          box-shadow: var(--glow-cyan);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }
        .header { display: flex; align-items: flex-start; gap: var(--spacing-md); position: relative; }
        .agent-avatar { font-size: 2rem; background: var(--bg-secondary); border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; }
        .badge { font-size: 0.6rem; font-weight: 800; color: var(--accent-cyan); letter-spacing: 1px; }
        .message { font-size: 0.95rem; color: var(--text-secondary); line-height: 1.4; }
        .reward-tag { display: flex; align-items: center; gap: 8px; color: var(--accent-cyan); font-weight: 700; font-size: 0.9rem; }
        .actions { display: flex; gap: var(--spacing-sm); margin-top: var(--spacing-sm); }
        .actions button { flex: 1; padding: var(--spacing-sm); border-radius: var(--radius-sm); font-weight: 700; font-size: 0.85rem; }
        .btn-accept { background: var(--accent-cyan); color: black; border: none; }
        .btn-decline { background: transparent; border: 1px solid var(--border-color); color: var(--text-muted); }
        .close-btn { position: absolute; top: -10px; right: -10px; background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; color: var(--text-muted); }
      `}</style>
    </motion.div>
  );
};

export default AgentChallenge;
