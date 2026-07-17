from app.extensions import db
from .base import BaseModel


class Wishlist(BaseModel):
    __tablename__ = "wishlists"

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    product_id = db.Column(
        db.Integer,
        db.ForeignKey("products.id"),
        nullable=False
    )

    user = db.relationship(
        "User",
        backref=db.backref("wishlist_items", lazy=True)
    )

    product = db.relationship(
        "Product",
        backref=db.backref("wishlist_items", lazy=True)
    )

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "product": self.product.to_dict() if self.product else None
        }