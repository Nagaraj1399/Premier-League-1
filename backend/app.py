import os
import time
import random
import threading
from flask import Flask, request, jsonify, send_from_directory
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from gemini_service import GeminiService
from models import db, Fan
from fan_agent import FanAgent
from analytics_agent import AnalyticsAgent

# Set static folder to 'dist' directory which is in the same folder in the container
app = Flask(__name__, static_folder='dist', static_url_path='/')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///fanpulse.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)
# Important: async_mode='eventlet' for production with gunicorn
socketio = SocketIO(app, cors_allowed_origins="*", async_mode='eventlet')
db.init_app(app)

ai_service = GeminiService()
fan_agent = FanAgent(ai_service)
analytics_agent = AnalyticsAgent(ai_service)

with app.app_context():
    db.create_all()
    if not Fan.query.filter_by(username="You").first():
        db.session.add(Fan(username="You", xp=1200, streak=3, rank=1245))
        db.session.commit()

# --- ROUTES FOR REACT SERVING ---
@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

# --- MATCH LOGIC ---
match_state = {
    "team1": {"name": "Mumbai Indians", "score": 124, "wickets": 4, "overs": 15.0},
    "team2": {"name": "Chennai Super Kings", "score": 184, "wickets": 5, "overs": 20.0},
    "current_over": 15, "current_ball": 1
}

def trigger_major_event(event_type, description):
    global match_state
    hype = ai_service.generate_insight(match_state)
    pro_insight = analytics_agent.get_tactical_breakdown(match_state)
    poll = ai_service.generate_poll(match_state)
    socketio.emit('major_event', {
        "type": event_type, "description": description,
        "hype": hype, "pro_insight": pro_insight, "poll": poll
    })

def match_simulator():
    with app.app_context():
        global match_state
        ball_count = 1
        while True:
            time.sleep(10)
            if random.random() < 0.1:
                match_state["team1"]["wickets"] += 1
                trigger_major_event("WICKET", f"WICKET! Big blow for MI.")
            else:
                runs = random.choice([0, 1, 2, 4, 6])
                match_state["team1"]["score"] += runs
                if runs >= 4:
                    trigger_major_event("BOUNDARY", f"{runs} RUNS! Spectacular shot.")
            if ball_count == 6:
                match_state["current_over"] += 1
                ball_count = 1
            else:
                ball_count += 1
            match_state["team1"]["overs"] = float(f"{match_state['current_over']}.{ball_count}")
            socketio.emit('score_update', match_state)
            
            user = Fan.query.filter_by(username="You").first()
            if user:
                challenge = fan_agent.evaluate_engagement(user.to_dict(), match_state)
                if challenge and random.random() < 0.3:
                    socketio.emit('agentic_challenge', challenge)

# Start simulator thread immediately
sim_thread = threading.Thread(target=match_simulator)
sim_thread.daemon = True
sim_thread.start()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    socketio.run(app, host='0.0.0.0', port=port, debug=False)
