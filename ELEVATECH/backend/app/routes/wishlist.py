from flask import Blueprint, jsonify, request
from app.extensions import db
from app.models.wishlist import Wishlist
from app.models.product import Product

wishlist_bp = Blueprint(
    "wishlist",
    __name__,
    url_prefix="/api/wishlist"
)


# ==========================================
# GET WISHLIST
# ==========================================
@wishlist_bp.route("", methods=["GET"])
def get_wishlist():

    items = Wishlist.query.filter_by(user_id=1).all()

    return jsonify({
        "count": len(items),
        "wishlist": [item.to_dict() for item in items]
    })


# ==========================================
# ADD TO WISHLIST
# ==========================================
@wishlist_bp.route("", methods=["POST"])
def add_to_wishlist():

    data = request.get_json()

    product = Product.query.get_or_404(data["product_id"])

    exists = Wishlist.query.filter_by(
        user_id=1,
        product_id=product.id
    ).first()

    if exists:
        return jsonify({
            "message": "Product already in wishlist"
        }), 400

    item = Wishlist(
        user_id=1,
        product_id=product.id
    )

    db.session.add(item)
    db.session.commit()

    return jsonify({
        "message": "Added to wishlist",
        "wishlist": item.to_dict()
    }), 201


# ==========================================
# REMOVE FROM WISHLIST
# ==========================================
@wishlist_bp.route("/<int:id>", methods=["DELETE"])
def remove_from_wishlist(id):

    item = Wishlist.query.get_or_404(id)

    db.session.delete(item)
    db.session.commit()

    return jsonify({
        "message": "Removed from wishlist"
    })