import random

class FanAgent:
    def __init__(self, gemini_service):
        self.gemini = gemini_service
        self.engagement_threshold = 2  # Streak needed to trigger a challenge

    def evaluate_engagement(self, user_state, match_state):
        """Autonomous evaluation of whether to engage the fan."""
        if user_state['streak'] >= self.engagement_threshold:
            return self.generate_challenge(user_state, match_state)
        return None

    def generate_challenge(self, user_state, match_state):
        """Generates a high-stakes agentic challenge."""
        types = [
            "Double or Nothing",
            "Speed Round",
            "Expert Prediction"
        ]
        challenge_type = random.choice(types)
        
        prompt = f"""
        Role: A hyper-enthusiastic AI Fan Engagement Agent.
        Situation: The fan has a {user_state['streak']} streak. The match is at {match_state['team1']['overs']} overs.
        Challenge: {challenge_type}.
        Goal: Write a 1-sentence challenge to the fan. Be provocative and fun.
        """
        
        challenge_text = self.gemini.generate_insight(match_state) # Using existing gen logic for now
        
        return {
            "type": "AGENTIC_CHALLENGE",
            "title": challenge_type,
            "message": f"Hey expert! You're on fire with a {user_state['streak']} streak. Ready for a {challenge_type}? Predict the next 2 balls correctly for TRIPLE XP!",
            "reward": "3x XP",
            "duration": 30
        }
