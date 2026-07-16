from fastapi import APIRouter
from pydantic import BaseModel

from app.agents.graph import run_agent

router = APIRouter()


class ChatRequest(BaseModel):
    message: str
    interaction: dict = {}


@router.post("/chat")
def chat(request: ChatRequest):
    """
    Chat endpoint for the AI CRM assistant.
    """

    result = run_agent(
        request.message,
        request.interaction
    )

    return result