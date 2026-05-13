import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ReactionOverlay = ({ reactions, onSendReaction }) => {
  return (
    <div className="reaction-overlay">
      <AnimatePresence>
        {reactions.map((r) => (
          <motion.div
            key={r.id}
            initial={{ y: '100vh', x: Math.random() * 100 + 'vw', opacity: 1, scale: 0.5 }}
            animate={{ y: '-10vh', opacity: 0, scale: 2, rotate: Math.random() * 360 }}
            transition={{ duration: 4, ease: "easeOut" }}
            className="floating-emoji"
          >
            {r.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="reaction-bar glass-card">
        {['🔥', '😱', '👏', '💔'].map(emoji => (
          <button key={emoji} onClick={() => onSendReaction(emoji)}>{emoji}</button>
        ))}
      </div>

      <style jsx="true">{`
        .reaction-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 1000; }
        .floating-emoji { position: absolute; font-size: 2.5rem; filter: drop-shadow(0 0 10px rgba(255,255,255,0.2)); }
        .reaction-bar { position: fixed; bottom: var(--spacing-xl); left: 50%; transform: translateX(-50%); display: flex; gap: var(--spacing-md); padding: var(--spacing-sm) var(--spacing-xl); pointer-events: auto; border-radius: 100px; }
        .reaction-bar button { background: transparent; border: none; font-size: 1.5rem; cursor: pointer; transition: var(--transition-fast); }
        .reaction-bar button:hover { transform: scale(1.3) translateY(-5px); }
      `}</style>
    </div>
  );
};

export default ReactionOverlay;
