import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Sparkles, Star } from 'lucide-react';

const PredictionEngine = ({ poll, onSubmit, result }) => {
  const [selected, setSelected] = useState(null);
  const [voted, setVoted] = useState(false);

  const displayPoll = poll || {
    question: "Who will take the next wicket?",
    options: ["Jadeja", "Pathirana", "Deshpande"]
  };

  useEffect(() => {
    setVoted(false);
    setSelected(null);
  }, [poll]);

  const handleVote = (idx) => {
    setSelected(idx);
    setVoted(true);
    onSubmit(idx);
  };

  return (
    <div className="prediction-wrapper">
      {!voted ? (
        <div className="poll-container">
          <div className="poll-header">
            <div className="ai-tag"><Sparkles size={12}/> Gemini Live Poll</div>
            <h4>{displayPoll.question}</h4>
            <p>Predict correctly to gain XP and build your streak!</p>
          </div>
          <div className="options-grid">
            {displayPoll.options.map((opt, idx) => (
              <motion.button key={idx} whileHover={{ scale: 1.02 }} className="option-btn" onClick={() => handleVote(idx)}>
                {opt}
              </motion.button>
            ))}
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="result-container">
          {result?.correct ? (
            <div className="feedback-card success">
              <CheckCircle2 size={40} />
              <h4>Spot on!</h4>
              <div className="xp-gain">+{result.xp_gained} XP</div>
            </div>
          ) : result ? (
            <div className="feedback-card failure">
              <XCircle size={40} />
              <h4>Better luck next time!</h4>
              <p>Streak reset to 0</p>
            </div>
          ) : (
            <div className="loading">Submitting to Pulse Servers...</div>
          )}
          
          <div className="results-preview">
            <p>Most fans predicted: <strong>{displayPoll.options[0]}</strong></p>
          </div>
        </motion.div>
      )}

      <style jsx="true">{`
        .ai-tag { display: flex; align-items: center; gap: 4px; font-size: 0.6rem; color: var(--accent-cyan); text-transform: uppercase; margin-bottom: 8px; font-weight: 800; }
        .poll-container h4 { font-size: 1.1rem; margin-bottom: 4px; }
        .poll-container p { font-size: 0.8rem; color: var(--text-muted); margin-bottom: var(--spacing-lg); }
        .options-grid { display: grid; gap: var(--spacing-sm); }
        .option-btn { background: rgba(255, 255, 255, 0.05); border: 1px solid var(--border-color); padding: var(--spacing-md); border-radius: var(--radius-sm); color: var(--text-primary); font-weight: 600; text-align: left; }
        .feedback-card { display: flex; flex-direction: column; align-items: center; gap: var(--spacing-sm); padding: var(--spacing-xl); border-radius: var(--radius-md); background: rgba(255,255,255,0.03); }
        .feedback-card.success { color: var(--accent-cyan); border: 1px solid rgba(0, 242, 255, 0.2); }
        .feedback-card.failure { color: var(--accent-pink); border: 1px solid rgba(255, 0, 122, 0.2); }
        .xp-gain { font-size: 1.5rem; font-weight: 800; }
        .results-preview { margin-top: var(--spacing-xl); font-size: 0.85rem; color: var(--text-muted); text-align: center; }
      `}</style>
    </div>
  );
};

export default PredictionEngine;
