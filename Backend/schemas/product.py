from pydantic import BaseModel
from typing import List, Optional


class ProductImage(BaseModel):
    image_url: str
    file_id: Optional[str] = None


class ProductBase(BaseModel):
    name: str
    price: str
    category_id: int


class ProductCreate(ProductBase):
    images: Optional[List[ProductImage]] = None


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[str] = None
    category_id: Optional[int] = None
    images: Optional[List[ProductImage]] = None


class ProductResponse(ProductBase):
    id: int
    images: List[ProductImage]

    class Config:
        from_attributes = True