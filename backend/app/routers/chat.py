from fastapi import APIRouter
from pydantic import BaseModel

from app.agents.graph import run_agent

router = APIRouter()


class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
def chat(request: ChatRequest):
    """
    Chat endpoint for the AI CRM assistant.
    """

    result = run_agent(request.message)

    return result