from fastapi import APIRouter
from app.schemas.interaction import Interaction

router = APIRouter()


@router.post("/interaction")
def save_interaction(data: Interaction):

    print("\n=========== INTERACTION RECEIVED ===========")
    print(data.model_dump())
    print("===========================================\n")

    return {
        "success": True,
        "message": "Interaction Saved Successfully",
        "data": data.model_dump()
    }