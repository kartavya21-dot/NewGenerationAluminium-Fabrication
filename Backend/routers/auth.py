from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from db.session import get_session
from db.models import Admin
from schemas.auth import LoginRequest, TokenResponse
from core.security import verify_password, create_access_token

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/login", response_model=TokenResponse)
def login_admin(
    data: LoginRequest,
    session: Session = Depends(get_session)
):
    # 1️⃣ Find admin by email
    admin = session.exec(
        select(Admin).where(Admin.email == data.email)
    ).first()

    if not admin:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    # 2️⃣ Verify password
    if not verify_password(data.password, admin.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    # 3️⃣ Create JWT token
    access_token = create_access_token(
        data={"sub": admin.email}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }