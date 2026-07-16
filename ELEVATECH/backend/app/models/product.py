from app.extensions import db
from .base import BaseModel


class Product(BaseModel):

    __tablename__ = "products"

    name = db.Column(
        db.String(150),
        nullable=False
    )

    description = db.Column(db.Text)

    price = db.Column(
        db.Float,
        nullable=False
    )

    quantity = db.Column(
        db.Integer,
        default=0
    )

    image = db.Column(db.String(255))

    brand = db.Column(db.String(100))

    featured = db.Column(
        db.Boolean,
        default=False
    )

    category_id = db.Column(
        db.Integer,
        db.ForeignKey("categories.id")
    )

    order_items = db.relationship(
        "OrderItem",
        backref="product",
        lazy=True
    )

    def to_dict(self):

        return {

            "id": self.id,

            "name": self.name,

            "description": self.description,

            "price": self.price,

            "quantity": self.quantity,

            "image": self.image,

            "brand": self.brand,

            "featured": self.featured,

            "category": self.category.name if self.category else None
        }

