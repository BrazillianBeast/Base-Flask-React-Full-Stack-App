/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react"

const ProductList = ({ products, updateProduct, updateCallback }) => {
    const onDelete = async (id) => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:5000/delete_product/${id}`, options)
            if (response.status === 200) {
                updateCallback()
            } else {
                console.error("Failed to delete")
            }
        }catch (error) {
            alert(error)
        }
    }
    return <div>
        <h2>Products</h2>
        <table>
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Product Link</th>
                    <th>Product Price</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.productName}</td>
                        <td>{product.productLink}</td>
                        <td>{product.currentPrice}</td>
                        <td>
                            <button onClick={() => updateProduct(product)}>Update</button>
                            <button onClick={() => onDelete(product.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default ProductList