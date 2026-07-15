from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.database.models import Interaction
from app.schemas.interaction import Interaction as InteractionSchema

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/interaction")
def save_interaction(
    data: InteractionSchema,
    db: Session = Depends(get_db)
):

    interaction = Interaction(
        hcpName=data.hcpName,
        interactionType=data.interactionType,
        date=data.date,
        time=data.time,
        attendees=data.attendees,
        topics=data.topics,
        sentiment=data.sentiment,
        materialsShared=data.materialsShared,
        samplesDistributed=data.samplesDistributed,
        outcomes=data.outcomes,
        followUp=data.followUp,
    )

    db.add(interaction)
    db.commit()
    db.refresh(interaction)

    return {
        "success": True,
        "message": "Interaction Saved Successfully",
        "id": interaction.id,
        "data": interaction.__dict__
    }
@router.get("")
def get_interactions(db: Session = Depends(get_db)):

    interactions = db.query(Interaction).all()

    return interactions
@router.delete("/{interaction_id}")
def delete_interaction(
    interaction_id: int,
    db: Session = Depends(get_db)
):

    interaction = db.query(Interaction).filter(
        Interaction.id == interaction_id
    ).first()

    if interaction is None:
        return {
            "success": False,
            "message": "Interaction not found"
        }

    db.delete(interaction)
    db.commit()

    return {
        "success": True,
        "message": "Interaction deleted successfully"
    }
@router.put("/{interaction_id}")
def update_interaction(
    interaction_id: int,
    data: InteractionSchema,
    db: Session = Depends(get_db)
):

    interaction = db.query(Interaction).filter(
        Interaction.id == interaction_id
    ).first()

    if interaction is None:
        return {
            "success": False,
            "message": "Interaction not found"
        }

    interaction.hcpName = data.hcpName
    interaction.interactionType = data.interactionType
    interaction.date = data.date
    interaction.time = data.time
    interaction.attendees = data.attendees
    interaction.topics = data.topics
    interaction.sentiment = data.sentiment
    interaction.materialsShared = data.materialsShared
    interaction.samplesDistributed = data.samplesDistributed
    interaction.outcomes = data.outcomes
    interaction.followUp = data.followUp

    db.commit()
    db.refresh(interaction)

    return {
        "success": True,
        "message": "Interaction updated successfully",
        "data": interaction
    }