from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from db.session import get_session
from db.models import Category
from schemas.category import CategoryCreate, CategoryResponse, CategoryUpdate
from deps.auth import get_current_admin

router = APIRouter(prefix="/categories", tags=["Categores"])


@router.get("/", response_model=list[CategoryResponse])
def get_categories(session: Session = Depends(get_session)):
    categories = session.exec(select(Category)).all()
    return categories


@router.post(
    "/",
    response_model=CategoryResponse,
    status_code=status.HTTP_201_CREATED
)
def create_category(
    data: CategoryCreate,
    session: Session = Depends(get_session),
    admin=Depends(get_current_admin),
):
    category = Category(
        name=data.name,
        image_url=data.image_url,
    )

    session.add(category)
    session.commit()
    session.refresh(category)

    return category