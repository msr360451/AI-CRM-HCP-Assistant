import json
from datetime import datetime

from langchain_core.tools import tool
from app.agents.llm import llm


def normalize_data(data: dict):
    """
    Normalize extracted values so the frontend
    always receives consistent data.
    """
    today = datetime.today().strftime("%Y-%m-%d")

    # ---------- Interaction Type ----------
    if "interactionType" in data:
        value = str(data["interactionType"]).strip().lower()
        mapping = {
            "meeting": "In Person",
            "visit": "In Person",
            "discussion": "In Person",
            "appointment": "In Person",
            "in person": "In Person",
            "phone": "Phone",
            "phone call": "Phone",
            "call": "Phone",
            "video": "Video Call",
            "video call": "Video Call",
            "virtual": "Video Call",
        }
        if value in mapping:
            data["interactionType"] = mapping[value]

    # ---------- Sentiment ----------
    if "sentiment" in data:
        value = str(data["sentiment"]).strip().lower()
        if value == "positive":
            data["sentiment"] = "Positive"
        elif value == "neutral":
            data["sentiment"] = "Neutral"
        elif value == "negative":
            data["sentiment"] = "Negative"

    # ---------- Date ----------
    if "date" in data:
        if str(data["date"]).strip().lower() == "today":
            data["date"] = today

    return data


def extract_interaction(message: str):
    """
    Extract a COMPLETE HCP interaction.
    """
    today = datetime.today().strftime("%Y-%m-%d")

    prompt = f"""
You are an expert AI CRM assistant for pharmaceutical sales representatives.

Today's date is {today}.

Your task is to extract information from an HCP interaction.

Return ONLY ONE valid JSON object.

DO NOT:
- Write explanations.
- Write markdown.
- Use ```json.
- Write anything before or after the JSON.

The response MUST start with {{
The response MUST end with }}

Return EXACTLY this schema:

{{
    "hcpName":"",
    "interactionType":"",
    "date":"",
    "time":"",
    "attendees":"",
    "topics":"",
    "sentiment":"",
    "materialsShared":false,
    "samplesDistributed":false,
    "outcomes":"",
    "followUp":""
}}

Rules

1. hcpName
Return ONLY the doctor's name.

Example:
Dr. Rajesh
Dr. Anil Kumar

----------------------------

2. interactionType

Allowed values ONLY:

"In Person"
"Phone"
"Video Call"

----------------------------

3. date

Always return

YYYY-MM-DD

Convert:

Today -> {today}

Yesterday -> calculate yesterday

Tomorrow -> calculate tomorrow

----------------------------

4. time

Always return

HH:MM

24-hour format

Example

2:30 PM -> 14:30

10:15 AM -> 10:15

----------------------------

5. attendees

Return ONLY people.

Never return:

Hospital
Clinic
Medical College

Example

Correct:

"Dr. Rajesh"

Wrong:

"Apollo Hospital"

----------------------------

6. topics

Return only the medical discussion.

Examples

Diabetes medicine

Hypertension treatment

Cardiology products

Clinical trial discussion

----------------------------

7. sentiment

Allowed values only

Positive

Neutral

Negative

----------------------------

8. materialsShared

Return true if user mentions

brochure
brochures
catalogue
leaflet
presentation
email
literature
clinical paper
PDF

Otherwise false.

----------------------------

9. samplesDistributed

Return true only if medicine samples were distributed.

Otherwise false.

----------------------------

10. outcomes

Return the final result of the meeting.

Examples

Doctor agreed to prescribe.

Doctor requested more evidence.

Doctor showed interest.

Doctor rejected the proposal.

----------------------------

11. followUp

Return only the follow-up date.

Convert relative dates into YYYY-MM-DD.

If not mentioned return "".

----------------------------

If any field is missing:

Strings -> ""

Boolean -> false

User Interaction:

{message}
"""

    response = llm.invoke(prompt)

    print("\n========== AI RESPONSE ==========")
    print(response.content)
    print("=================================\n")

    try:
        content = response.content.strip()
        content = content.replace("```json", "")
        content = content.replace("```", "")
        content = content.strip()

        data = json.loads(content)
        return normalize_data(data)

    except Exception as e:
        print("JSON ERROR:", e)
        print("LLM OUTPUT:")
        print(response.content)

        return {
            "hcpName": "",
            "interactionType": "",
            "date": "",
            "time": "",
            "attendees": "",
            "topics": "",
            "sentiment": "",
            "materialsShared": False,
            "samplesDistributed": False,
            "outcomes": "",
            "followUp": ""
        }


def extract_edit(message: str):
    """
    Extract ONLY the fields the user wants to update.
    """
    prompt = f"""
You are an AI CRM assistant.

The user is EDITING an existing HCP interaction.

Extract ONLY the fields that should be changed.

Return ONLY valid JSON.

DO NOT include unchanged fields.

Examples

User:
Actually the doctor's name is Dr. John.

Output

{{
    "hcpName":"Dr. John"
}}

-------------------------

User:
Change the sentiment to Negative.

Output

{{
    "sentiment":"Negative"
}}

-------------------------

User:
Update the time to 2:30 PM.

Output

{{
    "time":"14:30"
}}

-------------------------

User:
Update attendees to Dr. John and Nurse Mary.

Output

{{
    "attendees":"Dr. John, Nurse Mary"
}}

-------------------------

User:
Actually I shared brochures.

Output

{{
    "materialsShared": true
}}

-------------------------

User:
I distributed samples.

Output

{{
    "samplesDistributed": true
}}

-------------------------

User:
Follow up next Monday.

Output

{{
    "followUp":"Next Monday"
}}

-------------------------

Rules

- Return ONLY JSON.
- Never return markdown.
- Never explain anything.
- Include ONLY changed fields.

User Message:

{message}
"""

    response = llm.invoke(prompt)

    try:
        data = json.loads(response.content)
        return normalize_data(data)
    except Exception:
        return {}


@tool
def log_interaction(message: str):
    """
    Log a brand new HCP interaction.
    """
    data = extract_interaction(message)

    return {
        "tool": "log_interaction",
        "reply": "Interaction logged successfully.",
        "data": data
    }


@tool
def edit_interaction(message: str):
    """
    Update only the fields mentioned by the user.
    """
    data = extract_edit(message)

    return {
        "tool": "edit_interaction",
        "reply": "Interaction updated successfully.",
        "data": data
    }


@tool
def summarize_interaction(message: str):
    """
    Generate a summary of an HCP interaction.
    """
    prompt = f"""
Summarize the following HCP interaction in exactly 3 concise bullet points.

Interaction:

{message}
"""

    response = llm.invoke(prompt)

    return {
        "tool": "summarize_interaction",
        "reply": response.content
    }


@tool
def schedule_followup(message: str):
    """
    Extract follow-up information.
    """
    prompt = f"""
Extract the follow-up date or reminder from the user's message.

Return ONLY valid JSON.

Example:

{{
    "followUp":"Next Monday"
}}

User Message:

{message}
"""

    response = llm.invoke(prompt)

    try:
        data = json.loads(response.content)
    except Exception:
        data = {
            "followUp": ""
        }

    return {
        "tool": "schedule_followup",
        "reply": "Follow-up scheduled successfully.",
        "data": data
    }


@tool
def clear_interaction(message: str = ""):
    """
    Clear the current interaction.
    """
    return {
        "tool": "clear_interaction",
        "reply": "Interaction cleared successfully.",
        "data": {
            "hcpName": "",
            "interactionType": "",
            "date": "",
            "time": "",
            "attendees": "",
            "topics": "",
            "sentiment": "",
            "materialsShared": False,
            "samplesDistributed": False,
            "outcomes": "",
            "followUp": ""
        }
    }


TOOLS = [
    log_interaction,
    edit_interaction,
    summarize_interaction,
    schedule_followup,
    clear_interaction,
]