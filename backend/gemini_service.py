import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

class GeminiService:
    def __init__(self):
        api_key = os.getenv("GOOGLE_API_KEY")
        if api_key:
            genai.configure(api_key=api_key)
            self.model = genai.GenerativeModel('gemini-pro')
            self.enabled = True
        else:
            print("Warning: GOOGLE_API_KEY not found. Gemini integration disabled.")
            self.enabled = False

    def generate_insight(self, match_state):
        if not self.enabled:
            return "AI Insight: Match is heating up! Keep watching."
        
        prompt = f"""
        Given the current cricket match state: {match_state}
        Provide a 1-sentence tactical insight or fun trivia about the players/situation.
        Keep it punchy and engaging for a second-screen experience.
        """
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            return f"AI Insight: Technical edge cases are being analyzed. {str(e)}"

    def generate_poll(self, match_state):
        if not self.enabled:
            return {"question": "Who will win?", "options": ["MI", "CSK"]}
        
        prompt = f"""
        Given the current cricket match state: {match_state}
        Generate a unique prediction poll question and 3 options based on the current momentum.
        Format: Question | Opt1 | Opt2 | Opt3
        """
        try:
            response = self.model.generate_content(prompt)
            parts = response.text.split('|')
            if len(parts) >= 4:
                return {
                    "question": parts[0].strip(),
                    "options": [p.strip() for p in parts[1:4]]
                }
        except:
            pass
        return {"question": "Next milestone?", "options": ["50 Runs", "10 Overs", "Wicket"]}
