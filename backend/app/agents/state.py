from typing import TypedDict


class AgentState(TypedDict):
    user_message: str
    interaction: dict
    intent: str
    response: dict