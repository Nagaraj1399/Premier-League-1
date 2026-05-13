import React, { useState, useEffect } from 'react';
import { Activity, Trophy, Zap, TrendingUp, Star, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSocket } from './hooks/useSocket';
import { triggerConfetti, triggerMajorEventEffect } from './components/RewardEffects';
import './App.css';

// Components
import Scoreboard from './components/Scoreboard';
import LiveMomentum from './components/LiveMomentum';
import PredictionEngine from './components/PredictionEngine';
import AIAssistant from './components/AIAssistant';
import ReactionOverlay from './components/ReactionOverlay';
import Leaderboard from './components/Leaderboard';
import AgentChallenge from './components/AgentChallenge';

function App() {
  const { 
    score, insight, poll, reaction, majorEvent, 
    predictionResult, agenticChallenge, setAgenticChallenge, 
    user, sendReaction, submitPrediction 
  } = useSocket();
  
  const [activeTab, setActiveTab] = useState('insights');
  const [events, setEvents] = useState([]);
  const [reactions, setReactions] = useState([]);

  useEffect(() => {
    if (insight) {
      const type = insight.data.pro ? 'PRO' : 'AI';
      setEvents(prev => [{ type, data: insight }, ...prev].slice(0, 5));
    }
  }, [insight]);

  useEffect(() => {
    if (reaction) setReactions(prev => [...prev, reaction]);
  }, [reaction]);

  useEffect(() => {
    if (majorEvent) {
      triggerMajorEventEffect();
      setEvents(prev => [{ type: 'MAJOR', data: { text: majorEvent.description } }, ...prev].slice(0, 5));
    }
  }, [majorEvent]);

  useEffect(() => {
    if (predictionResult?.correct) {
      triggerConfetti();
    }
  }, [predictionResult]);

  const matchState = score ? {
    team1: { ...score.team1, logo: 'MI' },
    team2: { ...score.team2, logo: 'CSK' },
    target: 185,
    momentum: Array.from({ length: 20 }, (_, i) => ({ over: i, value: 50 + Math.random() * 20 })),
    batsman1: { name: 'R. Sharma', runs: 42, balls: 30 },
    batsman2: { name: 'I. Kishan', runs: 15, balls: 12 },
    bowler: { name: 'R. Jadeja', overs: 3.4, runs: 28, wickets: 1 }
  } : null;

  if (!matchState || !user) return <div className="loading">Agentic Systems Online... Initiating Experience...</div>;

  return (
    <div className="app-container">
      <header className="main-header">
        <div className="logo-section">
          <Zap className="logo-icon" />
          <h1 className="logo-text">Fan<span>Pulse</span></h1>
        </div>
        <div className="header-stats">
          <div className="streak-badge">
            <Flame size={16} color="var(--accent-pink)" />
            <span>{user.streak} STREAK</span>
          </div>
          <div className="wallet-card">
            <Star size={16} color="var(--accent-cyan)" />
            <span className="pts">{user.xp}</span>
            <span className="label">XP</span>
          </div>
        </div>
      </header>

      <main className="dashboard-grid">
        <section className="left-column">
          <Scoreboard state={matchState} />
          <LiveMomentum data={matchState.momentum} />
          
          <div className="events-feed glass-card">
            <div className="feed-header"><Activity size={18} /> <h3>Real-Time Feed</h3></div>
            <div className="feed-content">
              <AnimatePresence>
                {events.map((event, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className={`event-item ${event.type}`}>
                    <span className="event-tag">{event.type}</span>
                    <span className="event-desc">{event.data.text || event.data.data?.text}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section className="right-column">
          <div className="tabs-container glass-card">
            <div className="tabs-nav">
              <button className={activeTab === 'insights' ? 'active' : ''} onClick={() => setActiveTab('insights')}>
                <Zap size={18} /> <span className="tab-text">Pro Analytics</span>
              </button>
              <button className={activeTab === 'predict' ? 'active' : ''} onClick={() => setActiveTab('predict')}>
                <TrendingUp size={18} /> <span className="tab-text">Pulse Predictions</span>
              </button>
              <button className={activeTab === 'ranks' ? 'active' : ''} onClick={() => setActiveTab('ranks')}>
                <Trophy size={18} /> <span className="tab-text">Leaderboard</span>
              </button>
            </div>
            
            <div className="tab-content">
              {activeTab === 'insights' && <AIAssistant insights={events.filter(e => e.type === 'AI' || e.type === 'PRO')} />}
              {activeTab === 'predict' && <PredictionEngine poll={poll} onSubmit={submitPrediction} result={predictionResult} />}
              {activeTab === 'ranks' && <Leaderboard />}
            </div>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {agenticChallenge && (
          <AgentChallenge 
            challenge={agenticChallenge} 
            onAccept={() => {
              setAgenticChallenge(null);
              setActiveTab('predict');
            }}
            onDecline={() => setAgenticChallenge(null)}
          />
        )}
      </AnimatePresence>

      <ReactionOverlay reactions={reactions} onSendReaction={sendReaction} />
    </div>
  );
}

export default App;
