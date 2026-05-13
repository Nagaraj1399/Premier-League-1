# FanPulse: Agentic AI Second-Screen Sports Experience

FanPulse is a state-of-the-art second-screen application designed to transform passive sports viewing into an active, immersive interaction. It leverages Agentic AI, Real-Time WebSockets, and Domain-Specific LLMs to engage fans like never before.


## ✨ Key Features
- **Agentic AI Challenges**: Autonomous AI agents that challenge fans with "Double or Nothing" predictions.
- **Pro Analytics**: Domain-specific tactical insights from a "Senior Strategist" AI persona.
- **Real-Time Sync**: Ball-by-ball updates and social reaction broadcasting via WebSockets.
- **Persistent Gamification**: XP tracking, streaks, and global leaderboards stored in a SQLite database.
- **Premium UI**: Dark-mode aesthetic with confetti rewards and glassmorphism.

## 🛠️ Technical Stack
- **Frontend**: React 18, Vite, Framer Motion, Socket.io-client.
- **Backend**: Python 3.11, Flask, Flask-SocketIO, SQLAlchemy, Google Generative AI (Gemini).
- **Deployment**: Dockerized, ready for Google Cloud Run.

## 📦 How to Run Locally
1. **Clone the repo:**
   ```bash
   git clone https://github.com/Nagaraj1399/Premier-League-1.git
   cd Premier-League-1
   ```
2. **Setup Backend:**
   ```bash
   cd backend
   pip install -r requirements.txt
   python app.py
   ```
3. **Setup Frontend:**
   ```bash
   npm install
   npm run dev
   ```
4. **Access:** `http://localhost:5173`

## ☁️ Deployment
The project includes a `Dockerfile` for easy deployment to Google Cloud Run. 
```bash
gcloud run deploy fanpulse --source .
```

---
*Built with ❤️ for the 2026 Sports Engagement Challenge.*
