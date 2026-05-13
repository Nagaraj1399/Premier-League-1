import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const LiveMomentum = ({ data }) => {
  return (
    <div className="momentum-container glass-card">
      <div className="card-header">
        <div className="title-group">
          <TrendingUp size={18} className="icon" />
          <h3>Match Momentum</h3>
        </div>
        <div className="legend">
          <span className="dot mi"></span> MI
          <span className="dot csk"></span> CSK
        </div>
      </div>
      
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={150}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent-cyan)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--accent-cyan)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis 
              dataKey="over" 
              hide 
            />
            <YAxis 
              hide 
              domain={[0, 100]} 
            />
            <Tooltip 
              contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}
              itemStyle={{ color: 'var(--accent-cyan)' }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="var(--accent-cyan)" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorValue)" 
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="momentum-footer">
        <p>MI is currently dominating with a 65% win probability</p>
      </div>

      <style jsx="true">{`
        .momentum-container {
          padding: var(--spacing-md);
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-sm);
        }
        .title-group {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }
        .title-group h3 { font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; color: var(--text-secondary); }
        .icon { color: var(--accent-cyan); }
        .legend { font-size: 0.75rem; color: var(--text-muted); display: flex; gap: var(--spacing-sm); }
        .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
        .dot.mi { background: #004ba0; }
        .dot.csk { background: #fdb913; }
        .chart-wrapper {
          width: 100%;
          margin: var(--spacing-sm) 0;
        }
        .momentum-footer {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-align: center;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default LiveMomentum;
