from datetime import datetime

from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

from app.extensions import db
from app.models.order import Order
from app.models.payment import Payment
from app.services.mpesa_service import get_access_token, stk_push

mpesa_bp = Blueprint(
    "mpesa",
    __name__,
    url_prefix="/api/mpesa",
)


@mpesa_bp.route("/token", methods=["GET"])
def test_token():
    try:
        token = get_access_token()

        return jsonify({
            "success": True,
            "token": token
        })

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@mpesa_bp.route("/stkpush", methods=["POST"])
@jwt_required()
def create_stk_push():

    data = request.get_json() or {}

    phone = data.get("phone")
    order_id = data.get("order_id")

    if not phone:
        return jsonify({"message": "Phone number required"}), 400

    if not order_id:
        return jsonify({"message": "Order id required"}), 400

    order = Order.query.get(order_id)

    if not order:
        return jsonify({"message": "Order not found"}), 404

    response = stk_push(
        phone=phone,
        amount=order.total,
        order_id=order.id,
    )

    payment = Payment(
        order_id=order.id,
        amount=order.total,
        provider="Mpesa",
        status="Pending",
        currency="KES",
        transaction_id=response.get("CheckoutRequestID")
    )

    db.session.add(payment)
    db.session.commit()

    return jsonify(response)


@mpesa_bp.route("/callback", methods=["POST"])
def mpesa_callback():

    payload = request.get_json()

    try:

        callback = payload["Body"]["stkCallback"]

        checkout_id = callback["CheckoutRequestID"]

        result_code = callback["ResultCode"]

        payment = Payment.query.filter_by(
            transaction_id=checkout_id
        ).first()

        if not payment:
            return jsonify({
                "message": "Payment not found"
            }), 404

        if result_code == 0:

            payment.status = "Completed"

            payment.verified_at = datetime.utcnow()

            payment.transaction_id = checkout_id

            order = Order.query.get(payment.order_id)

            order.status = "Paid"

        else:

            payment.status = "Failed"

        db.session.commit()

        return jsonify({
            "ResultCode": 0,
            "ResultDesc": "Success"
        })

    except Exception as e:

        print(e)

        return jsonify({
            "ResultCode": 1,
            "ResultDesc": str(e)
        })