from flask import request, jsonify
from config import app, db
from models import Product

@app.route("/products", methods=["GET"])
def get_products():
    products = Product.query.all()
    json_products = list(map(lambda x: x.to_json(), products))
    return jsonify({"products": json_products})

if __name__ == "__main__":
    with app.app_context():
        # Will create if we don't have yet
        db.create_all()

    app.run(debug=True)