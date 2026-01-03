from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from db.session import get_session
from db.models import Category
from schemas.category import CategoryCreate, CategoryResponse, CategoryUpdate
from deps.auth import get_current_admin

router = APIRouter(prefix="/categories", tags=["Categories"])


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
        image=data.image.model_dump(),  # ✅ FIX
    )

    session.add(category)
    session.commit()
    session.refresh(category)

    return category


@router.put("/{category_id}", response_model=CategoryResponse)
def update_category(
    category_id: int,
    data: CategoryUpdate,
    session: Session = Depends(get_session),
    admin=Depends(get_current_admin),
):
    category = session.get(Category, category_id)

    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found",
        )

    if data.name is not None:
        category.name = data.name

    if data.image is not None:
        category.image = data.image.model_dump()  # ✅ FIX

    session.add(category)
    session.commit()
    session.refresh(category)

    return category


@router.delete("/{category_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_category(
    category_id: int,
    session: Session = Depends(get_session),
    admin=Depends(get_current_admin),
):
    category = session.get(Category, category_id)

    if not category:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found",
        )

    session.delete(category)
    session.commit()