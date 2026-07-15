from pydantic import BaseModel


class Interaction(BaseModel):
    hcpName: str
    interactionType: str
    date: str
    time: str
    attendees: str
    topics: str
    sentiment: str
    materialsShared: bool
    samplesDistributed: bool
    outcomes: str
    followUp: str