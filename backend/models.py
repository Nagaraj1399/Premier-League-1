from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Fan(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    xp = db.Column(db.Integer, default=0)
    streak = db.Column(db.Integer, default=0)
    rank = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            "username": self.username,
            "xp": self.xp,
            "streak": self.streak,
            "rank": self.rank
        }

class MatchEvent(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50))
    description = db.Column(db.String(200))
    timestamp = db.Column(db.DateTime, server_default=db.func.now())
