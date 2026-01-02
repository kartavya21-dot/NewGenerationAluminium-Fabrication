from sqlmodel import SQLModel, Field, Relationship
from typing import List, Optional
from sqlalchemy import Column, JSON

class Admin(SQLModel, table=True):
    __tablename__ = "admins"

    id: Optional[int] = Field(primary_key=True, default=None)
    email: str = Field(index=True, unique=True)
    hashed_password: str

class Category(SQLModel, table=True):
    __tablename__ = "category"

    id: Optional[int] = Field(primary_key=True, default=None)
    name: str = Field(index=True)
    image_url: str

class Product(SQLModel, table=True):
    __tablename__ = "product"

    id: Optional[int] = Field(primary_key=True, default=None)
    name: str = Field(index=True)
    price: str

    category_id: int = Field(foreign_key="category.id")
    
    images: List[dict] = Field(sa_column=Column(JSON))