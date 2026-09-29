from database import SessionLocal
from models import Contact
from schemas.contacts import ContactCreate
from sqlalchemy import select

def create_contact(contact_data: ContactCreate):
    with SessionLocal() as db:
        contact = Contact(
            name=contact_data.name,
            email=contact_data.email,
            subject=contact_data.subject,
            message=contact_data.message,
        )

        db.add(contact)
        db.commit()
        db.refresh(contact)

        return contact

def get_contacts():
    with SessionLocal() as db:
        return db.scalars(
            select(Contact).order_by(Contact.created_at.desc())
        ).all()

def get_contact(contact_id: int):
    with SessionLocal() as db:
        return db.get(Contact, contact_id)