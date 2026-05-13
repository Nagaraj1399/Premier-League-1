import React from 'react';
import { Trophy, Medal, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

const Leaderboard = () => {
  const fans = [
    { name: 'CricketFan_99', points: 4500, rank: 1, avatar: '🤴' },
    { name: 'Rohit_Superfan', points: 4200, rank: 2, avatar: '🏏' },
    { name: 'Jadeja_Magic', points: 3900, rank: 3, avatar: '🪄' },
    { name: 'SkyHigh', points: 3500, rank: 4, avatar: '🚀' },
    { name: 'WicketKeeper', points: 3200, rank: 5, avatar: '🧤' }
  ];

  return (
    <div className="leaderboard-wrapper">
      <div className="header">
        <Trophy size={20} color="var(--accent-cyan)" />
        <h4>Top Predictors</h4>
      </div>

      <div className="fans-list">
        {fans.map((fan, i) => (
          <motion.div 
            key={fan.rank}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`fan-item ${fan.rank <= 3 ? 'top-tier' : ''}`}
          >
            <div className="rank-badge">
              {fan.rank === 1 && <Crown size={14} className="crown" />}
              {fan.rank}
            </div>
            <span className="avatar">{fan.avatar}</span>
            <span className="name">{fan.name}</span>
            <span className="points">{fan.points.toLocaleString()} pts</span>
          </motion.div>
        ))}
      </div>

      <div className="user-rank glass-card">
        <span className="rank">#1,245</span>
        <span className="name">You</span>
        <span className="points">1,200 pts</span>
      </div>

      <style jsx="true">{`
        .leaderboard-wrapper {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
          height: 100%;
        }
        .header { display: flex; align-items: center; gap: var(--spacing-sm); }
        .fans-list { display: flex; flex-direction: column; gap: var(--spacing-sm); }
        .fan-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          padding: var(--spacing-sm) var(--spacing-md);
          background: rgba(255, 255, 255, 0.03);
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
        }
        .fan-item.top-tier {
          background: rgba(0, 242, 255, 0.05);
          border: 1px solid rgba(0, 242, 255, 0.1);
        }
        .rank-badge {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-secondary);
          border-radius: 50%;
          font-size: 0.7rem;
          font-weight: 800;
          position: relative;
        }
        .crown { position: absolute; top: -10px; color: #ffd700; }
        .avatar { font-size: 1.2rem; }
        .name { flex-grow: 1; font-weight: 600; }
        .points { color: var(--accent-cyan); font-weight: 700; font-family: monospace; }
        .user-rank {
          margin-top: auto;
          display: flex;
          padding: var(--spacing-md);
          justify-content: space-between;
          font-weight: 700;
          border-left: 4px solid var(--accent-pink);
        }
        .user-rank .rank { color: var(--accent-pink); }
      `}</style>
    </div>
  );
};

export default Leaderboard;
