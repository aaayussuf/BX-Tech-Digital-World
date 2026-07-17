from flask import Blueprint, jsonify, request
from app.extensions import db
from app.models.address import Address

addresses_bp = Blueprint(
    "addresses",
    __name__,
    url_prefix="/api/addresses"
)


# =====================================================
# GET ALL ADDRESSES
# =====================================================
@addresses_bp.route("", methods=["GET"])
def get_addresses():

    # Temporary: user_id = 1
    addresses = Address.query.filter_by(user_id=1).all()

    return jsonify({
        "count": len(addresses),
        "addresses": [a.to_dict() for a in addresses]
    })


# =====================================================
# CREATE ADDRESS
# =====================================================
@addresses_bp.route("", methods=["POST"])
def create_address():

    data = request.get_json()

    address = Address(
        user_id=1,  # Temporary until JWT authentication
        full_name=data["full_name"],
        phone=data["phone"],
        county=data["county"],
        city=data["city"],
        address_line_1=data["address_line_1"],
        address_line_2=data.get("address_line_2"),
        postal_code=data.get("postal_code"),
        is_default=data.get("is_default", False)
    )

    db.session.add(address)
    db.session.commit()

    return jsonify({
        "message": "Address created successfully",
        "address": address.to_dict()
    }), 201


# =====================================================
# UPDATE ADDRESS
# =====================================================
@addresses_bp.route("/<int:id>", methods=["PUT"])
def update_address(id):

    address = Address.query.get_or_404(id)

    data = request.get_json()

    for key, value in data.items():
        if hasattr(address, key):
            setattr(address, key, value)

    db.session.commit()

    return jsonify({
        "message": "Address updated successfully",
        "address": address.to_dict()
    })


# =====================================================
# DELETE ADDRESS
# =====================================================
@addresses_bp.route("/<int:id>", methods=["DELETE"])
def delete_address(id):

    address = Address.query.get_or_404(id)

    db.session.delete(address)
    db.session.commit()

    return jsonify({
        "message": "Address deleted successfully"
    })


# =====================================================
# SET DEFAULT ADDRESS
# =====================================================
@addresses_bp.route("/<int:id>/default", methods=["PATCH"])
def set_default(id):

    Address.query.filter_by(user_id=1).update({
        "is_default": False
    })

    address = Address.query.get_or_404(id)

    address.is_default = True

    db.session.commit()

    return jsonify({
        "message": "Default address updated",
        "address": address.to_dict()
    })