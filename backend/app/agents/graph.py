from langgraph.graph import StateGraph, END

from app.agents.state import AgentState
from app.agents.nodes import (
    detect_intent,
    execute_tool,
)


builder = StateGraph(AgentState)

# Nodes
builder.add_node(
    "detect_intent",
    detect_intent
)

builder.add_node(
    "execute_tool",
    execute_tool
)

# Entry Point
builder.set_entry_point("detect_intent")

# Flow
builder.add_edge(
    "detect_intent",
    "execute_tool"
)

builder.add_edge(
    "execute_tool",
    END
)

# Compile Graph
graph = builder.compile()


def run_agent(message: str):
    """
    Execute the LangGraph workflow.
    """

    result = graph.invoke(
        {
            "user_message": message,
            "intent": "",
            "response": {}
        }
    )

    return result["response"]