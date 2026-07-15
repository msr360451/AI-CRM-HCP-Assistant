from sqlalchemy import Column, Integer, String, Boolean

from app.database.database import Base


class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)

    hcpName = Column(String(200))

    interactionType = Column(String(100))

    date = Column(String(50))

    time = Column(String(50))

    attendees = Column(String(500))

    topics = Column(String(1000))

    sentiment = Column(String(100))

    materialsShared = Column(Boolean)

    samplesDistributed = Column(Boolean)

    outcomes = Column(String(1000))

    followUp = Column(String(200))