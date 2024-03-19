import { useState } from "react";

// eslint-disable-next-line react/prop-types
const ProductForm = ({ existingProduct = {}, updateCallback }) => {
    const [productName, setProductName] = useState(existingProduct.productName || "")
    const [productLink, setProductLink] = useState(existingProduct.productLink || "")
    const [currentPrice, setCurrentPrice] = useState(existingProduct.currentPrice || "")

    const updating = Object.entries(existingProduct).length !== 0

    const onSubmit = async (e) => {
        // #Will not refresh the page on submit
        e.preventDefault()

        const data = {
            productName,
            productLink,
            currentPrice
        }

        const url = "http://127.0.0.1:5000/" + (updating ? `update_product/${existingProduct.id}` : "add_product")
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200){
            const message = await response.json()
            alert(message.message)
        } else {
            // sucessful
            updateCallback()
        }
    }

    return (
    <form onSubmit={onSubmit}>
        <div>
            <label htmlFor="productName">Product Name:</label>
            <input
                type="text"
                id="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="productLink">Product Link:</label>
            <input
                type="text"
                id="productLink"
                value={productLink}
                onChange={(e) => setProductLink(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="currentPrice">Product Current Price:</label>
            <input
                type="text"
                id="currentPrice"
                value={currentPrice}
                onChange={(e) => setCurrentPrice(e.target.value)}
            />
        </div>
        <button type="submit">{updating ? "Update" : "Create"}</button>
    </form>
    )
};

export default ProductForm