from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from db.session import get_session
from db.models import Product, Category
from schemas.product import (
    ProductCreate,
    ProductUpdate,
    ProductResponse,
)
from deps.auth import get_current_admin

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)

# --------------------
# Public APIs
# --------------------

@router.get("/", response_model=list[ProductResponse])
def get_products(
    session: Session = Depends(get_session)
):
    products = session.exec(select(Product)).all()
    return products


@router.get("/{product_id}", response_model=ProductResponse)
def get_product(
    product_id: int,
    session: Session = Depends(get_session)
):
    product = session.get(Product, product_id)

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    return product


# --------------------
# Admin APIs
# --------------------

@router.post(
    "/",
    response_model=ProductResponse,
    status_code=status.HTTP_201_CREATED
)
def create_product(
    data: ProductCreate,
    session: Session = Depends(get_session),
    admin=Depends(get_current_admin),
):
    # Ensure category exists
    category = session.get(Category, data.category_id)
    if not category:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid category",
        )

    product = Product(
        name=data.name,
        price=data.price,
        category_id=data.category_id,
        images=[img.model_dump() for img in data.images],
    )

    session.add(product)
    session.commit()
    session.refresh(product)

    return product


@router.put("/{product_id}", response_model=ProductResponse)
def update_product(
    product_id: int,
    data: ProductUpdate,
    session: Session = Depends(get_session),
    admin=Depends(get_current_admin),
):
    product = session.get(Product, product_id)

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    if data.name is not None:
        product.name = data.name
    if data.price is not None:
        product.price = data.price
    if data.category_id is not None:
        category = session.get(Category, data.category_id)
        if not category:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid category",
            )
        product.category_id = data.category_id
    if data.images is not None:
        product.images = [img.model_dump() for img in data.images]

    session.add(product)
    session.commit()
    session.refresh(product)

    return product


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(
    product_id: int,
    session: Session = Depends(get_session),
    admin=Depends(get_current_admin),
):
    product = session.get(Product, product_id)

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    # NOTE:
    # ImageKit delete can be added here using file_id if needed

    session.delete(product)
    session.commit()