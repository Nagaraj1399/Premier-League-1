import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Use current window location for production, or fallback to localhost for dev
const SOCKET_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '/';

export const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [score, setScore] = useState(null);
  const [insight, setInsight] = useState(null);
  const [poll, setPoll] = useState(null);
  const [reaction, setReaction] = useState(null);
  const [majorEvent, setMajorEvent] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [agenticChallenge, setAgenticChallenge] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const s = io(SOCKET_URL, {
      path: '/socket.io',
      transports: ['websocket', 'polling']
    });
    setSocket(s);

    s.on('init_user', (data) => setUser(data));
    s.on('score_update', (data) => setScore(data));
    s.on('ai_insight', (data) => setInsight(data));
    s.on('new_poll', (data) => setPoll(data));
    s.on('broadcast_reaction', (data) => setReaction({ id: Date.now(), ...data }));
    
    s.on('major_event', (data) => {
      setMajorEvent(data);
      if (data.poll) setPoll(data.poll);
      if (data.hype) setInsight({ data: { text: data.hype, pro: data.pro_insight } });
    });

    s.on('agentic_challenge', (data) => setAgenticChallenge(data));

    s.on('prediction_result', (data) => {
      setPredictionResult(data);
      if (data.new_xp) setUser(prev => ({ ...prev, xp: data.new_xp, streak: data.new_streak }));
    });

    return () => s.disconnect();
  }, []);

  const sendReaction = (emoji) => socket?.emit('send_reaction', { emoji });
  const submitPrediction = (choice) => socket?.emit('submit_prediction', { choice });

  return { 
    score, insight, poll, reaction, majorEvent, 
    predictionResult, agenticChallenge, setAgenticChallenge, 
    user, sendReaction, submitPrediction 
  };
};
