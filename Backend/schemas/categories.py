from pydantic import BaseModel
from typing import Optional

class CategoryBase(BaseModel):
    name: str


class CategoryCreate(CategoryBase):
    image_url: str


class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    image_url: Optional[str] = None


class CategoryResponse(CategoryBase):
    id: int
    image_url: str

    class Config:
        from_attributes = True
