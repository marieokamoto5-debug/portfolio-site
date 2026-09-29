from repositories.contacts import (
    create_contact,
    get_contact,
    get_contacts,
)
from schemas.contacts import ContactCreate



def create_contact_service(contact_data: ContactCreate):
    return create_contact(contact_data)

def get_contacts_service():
    return get_contacts()

def get_contact_service(contact_id: int):
    return get_contact(contact_id)