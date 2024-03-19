from flask import request, jsonify
from config import app, db
from models import Product


@app.route("/products", methods=["GET"])
def get_products():
    products = Product.query.all()
    json_products = list(map(lambda x: x.to_json(), products))
    return jsonify({"products": json_products})

@app.route("/add_product", methods=["POST"])
def add_product():
    product_name = request.json.get("productName")
    product_link = request.json.get("productLink")
    current_price = request.json.get("currentPrice")

    if not product_name or not product_link or not current_price:
        return (
            jsonify(
                {
                    "message": "You must include a product name, product link and the product price"
                }
            ),
            400,
        )

    new_product = Product(
        product_name=product_name,
        product_link=product_link,
        current_price=current_price,
    )

    try:
        db.session.add(new_product)
        db.session.commit()
    except Exception as e:
        return (jsonify({"message": str(e)}), 400)

    return jsonify({"message": "Product created!"}), 201

@app.route("/update_product/<int:product_id>", methods=["PATCH"])
def update_product(product_id):
    product = Product.query.get(product_id)

    if not product:
        return jsonify({"message": "Product not found"}), 404

    data = request.json
    product.product_name = data.get("productName", product.product_name)
    product.product_link = data.get("productLink", product.product_link)
    product.current_price = data.get("currentPrice", product.current_price)

    db.session.commit()

    return jsonify({"message": "Product updated."}), 200

@app.route("/delete_product/<int:product_id>", methods=["DELETE"])
def delete_product(product_id):
    product = Product.query.get(product_id)

    if not product:
        return jsonify({"message": "Product not found"}), 404
    
    db.session.delete(product)
    db.session.commit()

    return jsonify({"message": "User deleted"}), 200



if __name__ == "__main__":
    with app.app_context():
        # Will create if we don't have yet
        db.create_all()

    app.run(debug=True)
