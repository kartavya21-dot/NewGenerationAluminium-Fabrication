from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select

from db.session import get_session
from db.models import Admin
from core.security import verify_password, create_access_token
from schemas.auth import TokenResponse

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/login", response_model=TokenResponse)
def login_admin(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: Session = Depends(get_session),
):
    # OAuth2 uses "username" field
    admin = session.exec(
        select(Admin).where(Admin.email == form_data.username)
    ).first()

    if not admin or not verify_password(form_data.password, admin.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    access_token = create_access_token(
        data={"sub": admin.email}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }