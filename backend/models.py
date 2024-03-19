from config import db

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(80), unique=False, nullable=False)
    product_link = db.Column(db.Integer, unique=True, nullable=False)
    current_price = db.Column(db.Float, unique=False, nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "productName": self.product_name,
            "productLink": self.product_link,
            "currentPrice": self.current_price
        }