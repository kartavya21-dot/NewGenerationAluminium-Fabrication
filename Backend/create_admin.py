from sqlmodel import Session, select

from db.session import engine
from db.models import Admin
from core.security import hash_password


EMAIL = "admin@ngaf.com"
PASSWORD = "admin123"   # change after first login


def create_admin():
    with Session(engine) as session:
        existing = session.exec(
            select(Admin).where(Admin.email == EMAIL)
        ).first()

        if existing:
            print("Admin already exists")
            return

        admin = Admin(
            email=EMAIL,
            hashed_password=hash_password(PASSWORD),
        )

        session.add(admin)
        session.commit()
        print("Admin created successfully")


if __name__ == "__main__":
    create_admin()
