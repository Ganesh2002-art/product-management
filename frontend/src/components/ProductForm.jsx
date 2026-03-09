import React, { useState, useEffect } from "react";
import api from "../services/api";

function ProductForm({ editProduct, setEditProduct, reload }) {

 const [form, setForm] = useState({
  name: "",
  sku: "",
  price: "",
  quantity: "",
  category: ""
 });

 useEffect(() => {
  if (editProduct) {
   setForm(editProduct);
  }
 }, [editProduct]);

 const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value });
 };

 const submit = async (e) => {
  e.preventDefault();

  if (editProduct) {
   await api.put(`/products/${editProduct.id}`, form);
   setEditProduct(null);
  } else {
   await api.post("/products", form);
  }

  setForm({
   name: "",
   sku: "",
   price: "",
   quantity: "",
   category: ""
  });

  reload();
 };

 return (
  <form className="form" onSubmit={submit}>

   <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />

   <input name="sku" placeholder="SKU" value={form.sku} onChange={handleChange} />

   <input name="price" placeholder="Price" value={form.price} onChange={handleChange} />

   <input name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} />

   <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />

   <button className="btn-primary">
     {editProduct ? "Update Product" : "Add Product"}
   </button>

  </form>
 );
}

export default ProductForm;