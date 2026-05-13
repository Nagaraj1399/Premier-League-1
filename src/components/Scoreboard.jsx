import React from 'react';
import { motion } from 'framer-motion';

const Scoreboard = ({ state }) => {
  return (
    <div className="scoreboard-container glass-card">
      <div className="team-row">
        <div className="team-info">
          <div className="team-logo mi">{state.team1.logo}</div>
          <div className="team-details">
            <h3>{state.team1.name}</h3>
            <p>1st Innings: 184/5</p>
          </div>
        </div>
        <div className="score-main">
          <motion.h2 
            key={state.team1.score}
            initial={{ scale: 1.2, color: '#00f2ff' }}
            animate={{ scale: 1, color: '#ffffff' }}
          >
            {state.team1.score}/{state.team1.wickets}
          </motion.h2>
          <p>Overs: {state.team1.overs.toFixed(1)}</p>
        </div>
      </div>
      
      <div className="divider">VS</div>

      <div className="team-row opponent">
        <div className="score-main">
          <h2>{state.team2.score}/{state.team2.wickets}</h2>
          <p>Overs: {state.team2.overs}</p>
        </div>
        <div className="team-info">
          <div className="team-details">
            <h3>{state.team2.name}</h3>
            <p>Target: {state.target}</p>
          </div>
          <div className="team-logo csk">{state.team2.logo}</div>
        </div>
      </div>

      <div className="current-stats">
        <div className="batsman-stat">
          <span className="name">{state.batsman1.name}*</span>
          <span className="runs">{state.batsman1.runs} ({state.batsman1.balls})</span>
        </div>
        <div className="batsman-stat">
          <span className="name">{state.batsman2.name}</span>
          <span className="runs">{state.batsman2.runs} ({state.batsman2.balls})</span>
        </div>
        <div className="bowler-stat">
          <span className="name">{state.bowler.name}</span>
          <span className="overs">{state.bowler.overs} - {state.bowler.runs}/{state.bowler.wickets}</span>
        </div>
      </div>

      <style jsx="true">{`
        .scoreboard-container {
          padding: var(--spacing-lg);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
          position: relative;
          overflow: hidden;
        }
        .scoreboard-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: var(--accent-cyan);
        }
        .team-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .team-info {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }
        .team-logo {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.2rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .team-logo.mi { background: linear-gradient(135deg, #004ba0, #00bfff); }
        .team-logo.csk { background: linear-gradient(135deg, #fdb913, #fff200); color: #000; }
        .team-details h3 { font-size: 1.1rem; }
        .team-details p { font-size: 0.8rem; color: var(--text-muted); }
        .score-main { text-align: right; }
        .score-main h2 { font-size: 2rem; line-height: 1; }
        .score-main p { font-size: 0.9rem; color: var(--text-muted); }
        .divider {
          text-align: center;
          font-size: 0.7rem;
          font-weight: 800;
          color: var(--text-muted);
          position: relative;
        }
        .divider::before, .divider::after {
          content: '';
          position: absolute;
          top: 50%;
          width: 45%;
          height: 1px;
          background: var(--border-color);
        }
        .divider::before { left: 0; }
        .divider::after { right: 0; }
        .current-stats {
          display: grid;
          grid-template-columns: 1fr 1fr 1.5fr;
          gap: var(--spacing-md);
          padding-top: var(--spacing-md);
          border-top: 1px solid var(--border-color);
          font-size: 0.85rem;
        }
        .batsman-stat, .bowler-stat {
          display: flex;
          flex-direction: column;
        }
        .name { font-weight: 600; color: var(--text-secondary); }
        .runs, .overs { color: var(--accent-cyan); font-family: monospace; }
      `}</style>
    </div>
  );
};

export default Scoreboard;
