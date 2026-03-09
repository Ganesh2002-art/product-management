import React, { useEffect, useState } from "react";
import api from "../services/api";

function ProductTable({ refresh, setEditProduct, reload }) {

 const [products, setProducts] = useState([]);

 const fetchProducts = async () => {
  const res = await api.get("/products");
  setProducts(res.data);
 };

 useEffect(() => {
  fetchProducts();
 }, [refresh]);

 const deleteProduct = async (id) => {
  await api.delete(`/products/${id}`);
  reload();
 };

 return (

  <div className="table-container">

   <table className="table">

    <thead>
     <tr>
      <th>Name</th>
      <th>SKU</th>
      <th>Price</th>
      <th>Quantity</th>
      <th>Category</th>
      <th>Actions</th>
     </tr>
    </thead>

    <tbody>

     {products.map((p) => (
      <tr key={p.id}>

       <td>{p.name}</td>
       <td>{p.sku}</td>
       <td>₹{p.price}</td>
       <td>{p.quantity}</td>
       <td>{p.category}</td>

       <td>

        <button
         className="btn-edit"
         onClick={() => setEditProduct(p)}
        >
         Edit
        </button>

        <button
         className="btn-delete"
         onClick={() => deleteProduct(p.id)}
        >
         Delete
        </button>

       </td>

      </tr>
     ))}

    </tbody>

   </table>

  </div>
 );
}

export default ProductTable;