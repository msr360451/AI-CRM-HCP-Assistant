# AI CRM HCP Assistant

## Overview

AI CRM HCP Assistant is an AI-powered Customer Relationship Management (CRM) application developed for managing Healthcare Professional (HCP) interactions.

The application allows users to log HCP interactions in two ways:

- Using a structured interaction form
- Using a conversational AI assistant

The AI assistant understands natural language, extracts important information from the conversation, and automatically fills the interaction form.

The project is built using React, FastAPI, LangGraph, Groq LLM, and MySQL.

---

# Features

### AI Assistant

- Log HCP interactions using natural language
- Automatically extract structured information
- Fill the interaction form automatically
- Edit interaction details through chat

### Interaction Form

- HCP Name
- Interaction Type
- Date & Time
- Attendees
- Topics Discussed
- Sentiment
- Outcomes
- Follow-up Actions
- Materials Shared
- Samples Distributed

### Database Operations

- Save interaction
- View all interactions
- Update interaction
- Delete interaction

---

# LangGraph Tools

The AI agent uses the following tools:

- Log Interaction
- Edit Interaction
- Summarize Interaction
- Schedule Follow-up
- Clear Interaction
- drug_information

---

# Technology Stack

## Frontend

- React
- Redux Toolkit
- Tailwind CSS
- Axios

## Backend

- Python
- FastAPI
- LangGraph
- LangChain
- Groq LLM
- SQLAlchemy

## Database

- MySQL

---

# Project Structure

```
AI-CRM-HCP/

│── backend/
│   ├── app/
│   │   ├── agents/
│   │   ├── database/
│   │   ├── graph/
│   │   ├── routes/
│   │   ├── routers/
│   │   ├── schemas/
│   │   ├── tools/
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .env
│
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# Prerequisites

Before running the project, install:

- Python 3.10 or above
- Node.js (18 or above)
- MySQL Server
- Git

---

# Clone the Repository

```bash
git clone <your-github-repository-link>
```

Go inside the project.

```bash
cd AI-CRM-HCP
```

---

# Backend Setup

Go to the backend folder.

```bash
cd backend
```

## Create Virtual Environment

Windows

```bash
python -m venv venv
```

Activate the virtual environment.

```bash
venv\Scripts\activate
```

---

## Install Python Packages

```bash
pip install -r requirements.txt
```

If you don't have a requirements.txt file, install these packages manually.

```bash
pip install fastapi
pip install uvicorn
pip install sqlalchemy
pip install pymysql
pip install python-dotenv
pip install langgraph
pip install langchain
pip install langchain-groq
pip install pydantic
```

---

## Create Environment File

Create a file named

```
.env
```

inside the backend folder.

Add your Groq API key.

```env
GROQ_API_KEY=YOUR_GROQ_API_KEY
```

---

## Configure MySQL

Create a database.

```sql
CREATE DATABASE ai_crm_hcp;
```

Open

```
backend/app/database/database.py
```

Update the database URL.

Example

```python
DATABASE_URL = "mysql+pymysql://root:YOUR_PASSWORD@localhost/ai_crm_hcp"
```

If your password contains special characters such as **@**, replace it with URL encoding.

Example

```
Password

Manoj@2002
```

becomes

```
Manoj%402002
```

---

## Run Backend

```bash
uvicorn app.main:app --reload
```

Backend URL

```
http://localhost:8000
```

Swagger API

```
http://localhost:8000/docs
```

---

# Frontend Setup

Open another terminal.

Go to frontend.

```bash
cd frontend
```

---

## Install Node Packages

```bash
npm install
```

The following packages are used:

```bash
npm install react-redux
npm install @reduxjs/toolkit
npm install axios
npm install react-icons
npm install tailwindcss
```

---

## Run Frontend

```bash
npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

# How the AI Works

1. User enters interaction details using chat.
2. LangGraph receives the request.
3. The appropriate tool is selected.
4. Groq LLM extracts structured data.
5. Redux updates the interaction form.
6. User can edit the extracted data if required.
7. Interaction is saved into MySQL.

---

# APIs

### Chat

```
POST /chat
```

### Save Interaction

```
POST /interactions/interaction
```

### Get All Interactions

```
GET /interactions
```

### Delete Interaction

```
DELETE /interactions/{id}
```

---

# Assignment Requirements Covered

- React Frontend
- Redux State Management
- FastAPI Backend
- LangGraph AI Agent
- Groq LLM Integration
- MySQL Database
- Structured Form
- Conversational Chat
- CRUD Operations
- Five LangGraph Tools

---

# Future Improvements

Some features that can be added in future versions:

- Search interactions
- Filter by HCP
- Analytics dashboard
- Export interactions to Excel/PDF
- Authentication and role-based access
- Voice input for AI assistant
- Notifications and reminders

---

# Author

**Manoj S R**

Computer Science Engineering

AI CRM HCP Assistant – Technical Assignment
