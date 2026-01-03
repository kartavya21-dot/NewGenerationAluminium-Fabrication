from pydantic import BaseModel
from typing import Optional


class CategoryImage(BaseModel):
    image_url: str
    file_id: Optional[str] = None


class CategoryBase(BaseModel):
    name: str


class CategoryCreate(CategoryBase):
    image: CategoryImage


class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    image: Optional[CategoryImage] = None


class CategoryResponse(CategoryBase):
    id: int
    image: CategoryImage

    class Config:
        from_attributes = True
