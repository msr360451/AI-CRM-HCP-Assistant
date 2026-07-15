import json

from app.agents.llm import llm
from app.prompts.prompts import INTENT_PROMPT

from app.tools.interaction_tools import (
    log_interaction,
    edit_interaction,
    summarize_interaction,
    schedule_followup,
    clear_interaction,
)


def detect_intent(state):
    """
    Detect which tool should be executed.
    """

    prompt = INTENT_PROMPT.format(
        message=state["user_message"]
    )

    response = llm.invoke(prompt)

    intent = response.content.strip()

    intent = (
        intent.replace("`", "")
        .replace('"', "")
        .replace("'", "")
        .strip()
        .lower()
    )

    valid_tools = [
        "log_interaction",
        "edit_interaction",
        "summarize_interaction",
        "schedule_followup",
        "clear_interaction",
    ]

    if intent not in valid_tools:
        intent = "log_interaction"

    print("\n========== INTENT ==========")
    print(intent)
    print("============================\n")

    return {
        **state,
        "intent": intent
    }


def execute_tool(state):
    """
    Execute the selected tool.
    """

    tool = state["intent"]
    message = state["user_message"]

    print("\n========== EXECUTING ==========")
    print(tool)
    print("===============================\n")

    if tool == "log_interaction":

        result = log_interaction.invoke(message)

    elif tool == "edit_interaction":

        result = edit_interaction.invoke(message)

    elif tool == "summarize_interaction":

        result = summarize_interaction.invoke(message)

    elif tool == "schedule_followup":

        result = schedule_followup.invoke(message)

    elif tool == "clear_interaction":

        result = clear_interaction.invoke(message)

    else:

        result = {
            "reply": "Unknown tool."
        }

    print("\n========== RESULT ==========")
    print(json.dumps(result, indent=4))
    print("============================\n")

    return {
        **state,
        "response": result
    }