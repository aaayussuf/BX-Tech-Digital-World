from app.extensions import db
from .base import BaseModel


class Address(BaseModel):
    __tablename__ = "addresses"

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    full_name = db.Column(db.String(150), nullable=False)

    phone = db.Column(db.String(30), nullable=False)

    county = db.Column(db.String(100), nullable=False)

    city = db.Column(db.String(100), nullable=False)

    address_line_1 = db.Column(db.String(255), nullable=False)

    address_line_2 = db.Column(db.String(255))

    postal_code = db.Column(db.String(20))

    is_default = db.Column(db.Boolean, default=False)

    user = db.relationship(
        "User",
        backref=db.backref("addresses", lazy=True)
    )

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "full_name": self.full_name,
            "phone": self.phone,
            "county": self.county,
            "city": self.city,
            "address_line_1": self.address_line_1,
            "address_line_2": self.address_line_2,
            "postal_code": self.postal_code,
            "is_default": self.is_default
        }