from app.extensions import db
from .base import BaseModel


class Category(BaseModel):

    __tablename__ = "categories"

    name = db.Column(
        db.String(100),
        unique=True,
        nullable=False
    )

    description = db.Column(db.Text)

    image = db.Column(db.String(255))

    products = db.relationship(
        "Product",
        backref="category",
        lazy=True
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "image": self.image,
        }