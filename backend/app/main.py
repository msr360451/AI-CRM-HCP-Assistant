from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.chat import router as chat_router
from app.routes.interactions import router as interaction_router

from app.database.database import engine
from app.database.models import Base

# Create FastAPI app
app = FastAPI(
    title="AI CRM HCP Assistant",
    version="1.0.0"
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Chat Router
app.include_router(chat_router)

# Register Interaction Router
app.include_router(
    interaction_router,
    prefix="/interactions",
    tags=["Interactions"]
)

# Home API
@app.get("/")
def home():
    return {
        "message": "AI CRM HCP Backend Running"
    }