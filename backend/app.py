# CRITICAL: Monkey patch MUST be at the very top
import eventlet
eventlet.monkey_patch()

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

# Setup Flask
app = Flask(__name__, static_folder='dist', static_url_path='/')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///fanpulse.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)
# Use eventlet as the async mode
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

# --- ROUTES ---
@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')

# --- SIMULATOR ---
def match_simulator():
    with app.app_context():
        # Match state for simulation
        state = {
            "team1": {"name": "Mumbai Indians", "score": 124, "wickets": 4, "overs": 15.0},
            "team2": {"name": "Chennai Super Kings", "score": 184, "wickets": 5, "overs": 20.0},
            "current_over": 15, "current_ball": 1
        }
        
        while True:
            time.sleep(10)
            # Update score
            state["team1"]["score"] += random.randint(0, 6)
            socketio.emit('score_update', state)
            
            # Engagement agent check
            user = Fan.query.filter_by(username="You").first()
            if user:
                challenge = fan_agent.evaluate_engagement(user.to_dict(), state)
                if challenge and random.random() < 0.3:
                    socketio.emit('agentic_challenge', challenge)

# --- SOCKET EVENTS ---
@socketio.on('connect')
def handle_connect():
    with app.app_context():
        user = Fan.query.filter_by(username="You").first()
        emit('init_user', user.to_dict())
        # Emit initial score state
        emit('score_update', {
            "team1": {"name": "Mumbai Indians", "score": 124, "wickets": 4, "overs": 15.0},
            "team2": {"name": "Chennai Super Kings", "score": 184, "wickets": 5, "overs": 20.0},
            "current_over": 15, "current_ball": 1
        })

@socketio.on('submit_prediction')
def handle_prediction(data):
    with app.app_context():
        is_correct = random.random() > 0.4
        user = Fan.query.filter_by(username="You").first()
        if is_correct:
            user.xp += 50
            user.streak += 1
            db.session.commit()
            emit('prediction_result', {"correct": True, "xp_gained": 50, "new_streak": user.streak, "new_xp": user.xp})
        else:
            user.streak = 0
            db.session.commit()
            emit('prediction_result', {"correct": False, "new_streak": 0, "new_xp": user.xp})

@socketio.on('send_reaction')
def handle_reaction(data):
    emit('broadcast_reaction', data, broadcast=True)

if __name__ == '__main__':
    # Start simulator thread
    sim_thread = threading.Thread(target=match_simulator)
    sim_thread.daemon = True
    sim_thread.start()
    
    port = int(os.environ.get('PORT', 8080))
    socketio.run(app, host='0.0.0.0', port=port)
