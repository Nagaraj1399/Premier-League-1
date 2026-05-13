export const MATCH_STAGES = {
  PRE_MATCH: 'PRE_MATCH',
  LIVE: 'LIVE',
  INNINGS_BREAK: 'INNINGS_BREAK',
  COMPLETED: 'COMPLETED'
};

export const INITIAL_MATCH_STATE = {
  team1: { name: 'Mumbai Indians', score: 0, wickets: 0, overs: 0, logo: 'MI' },
  team2: { name: 'Chennai Super Kings', score: 124, wickets: 6, overs: 20, logo: 'CSK' },
  currentInnings: 2,
  momentum: Array.from({ length: 20 }, (_, i) => ({ over: i, value: 50 + Math.random() * 20 - 10 })),
  stage: MATCH_STAGES.LIVE,
  target: 125,
  currentOver: 15,
  currentBall: 4,
  batsman1: { name: 'R. Sharma', runs: 42, balls: 30 },
  batsman2: { name: 'I. Kishan', runs: 15, balls: 12 },
  bowler: { name: 'R. Jadeja', overs: 3.4, runs: 28, wickets: 1 }
};

export const MOCK_EVENTS = [
  { type: 'SCORE_UPDATE', data: { score: 1, wickets: 0, ball: 5 } },
  { type: 'SCORE_UPDATE', data: { score: 4, wickets: 0, ball: 6 } },
  { type: 'OVER_COMPLETE', data: { over: 16, momentumChange: 5 } },
  { type: 'REACTION', data: { emoji: '🔥', count: 120 } },
  { type: 'INSIGHT', data: { text: 'Rohit Sharma has a 160 strike rate against Left-arm spin in the death overs.' } },
  { type: 'PREDICTION_OPEN', data: { question: 'Will the next ball be a boundary?', options: ['Yes', 'No'] } },
  { type: 'SCORE_UPDATE', data: { score: 6, wickets: 0, ball: 1 } },
  { type: 'WICKET', data: { player: 'R. Sharma', score: 48, ball: 2 } },
  { type: 'REACTION', data: { emoji: '😱', count: 450 } },
];

export const useMatchEngine = (callback) => {
  let eventIndex = 0;
  
  const startSimulation = () => {
    const interval = setInterval(() => {
      if (eventIndex < MOCK_EVENTS.length) {
        callback(MOCK_EVENTS[eventIndex]);
        eventIndex++;
      } else {
        clearInterval(interval);
      }
    }, 5000); // New event every 5 seconds
    
    return () => clearInterval(interval);
  };
  
  return { startSimulation };
};
