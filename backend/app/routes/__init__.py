from flask import Flask

from .auth import auth_bp
from .products import products_bp
from .pages import pages_bp
from .cart import cart_bp


def init_routes(app: Flask):
    app.register_blueprint(auth_bp)
    app.register_blueprint(products_bp)
    app.register_blueprint(pages_bp)
    app.register_blueprint(cart_bp)

