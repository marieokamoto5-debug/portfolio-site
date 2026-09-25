import firebase_config
from firebase_admin import auth

email = input("Admin email: ").strip()

user = auth.get_user_by_email(email)

auth.set_custom_user_claims(

    user.uid,
    {"admin": True},

)

print(f"Admin claim set:{user.uid}")