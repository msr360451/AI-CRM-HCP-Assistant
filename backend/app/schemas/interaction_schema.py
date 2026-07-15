from pydantic import BaseModel


class InteractionSchema(BaseModel):
    hcpName: str = ""
    interactionType: str = ""
    date: str = ""
    time: str = ""
    attendees: str = ""
    topics: str = ""
    sentiment: str = ""
    materialsShared: bool = False
    samplesDistributed: bool = False
    outcomes: str = ""
    followUp: str = ""