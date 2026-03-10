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

 const [errors, setErrors] = useState({});

 useEffect(() => {
  if (editProduct) {
   setForm(editProduct);
  }
 }, [editProduct]);

 const handleChange = (e) => {
  setForm({
   ...form,
   [e.target.name]: e.target.value
  });
 };

 const validate = () => {

  let newErrors = {};

  if (!form.name.trim())
   newErrors.name = "Product name is required";

  if (!form.sku.trim())
   newErrors.sku = "SKU is required";

  if (!form.price)
   newErrors.price = "Price is required";

  else if (isNaN(form.price))
   newErrors.price = "Price must be a number";

  if (!form.quantity)
   newErrors.quantity = "Quantity is required";

  else if (form.quantity < 0)
   newErrors.quantity = "Quantity must be positive";

  if (!form.category.trim())
   newErrors.category = "Category is required";

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
 };

 const submit = async (e) => {

  e.preventDefault();

  if (!validate()) return;

  try {

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

  } catch (err) {
   alert("Error saving product");
  }

 };

 return (

  <form className="form" onSubmit={submit}>

   <input
    name="name"
    placeholder="Product Name"
    value={form.name}
    onChange={handleChange}
   />
   {errors.name && <p className="error">{errors.name}</p>}

   <input
    name="sku"
    placeholder="SKU"
    value={form.sku}
    onChange={handleChange}
   />
   {errors.sku && <p className="error">{errors.sku}</p>}

   <input
    name="price"
    placeholder="Price"
    value={form.price}
    onChange={handleChange}
   />
   {errors.price && <p className="error">{errors.price}</p>}

   <input
    name="quantity"
    placeholder="Quantity"
    value={form.quantity}
    onChange={handleChange}
   />
   {errors.quantity && <p className="error">{errors.quantity}</p>}

    {/* Category Dropdown */}
   <select
    name="category"
    value={form.category}
    onChange={handleChange}
   >
    <option value="">Select Category</option>
    <option value="Electronics">Electronics</option>
    <option value="Accessories">Accessories</option>
   </select>
   {errors.category && <p className="error">{errors.category}</p>}

   <button className="btn-primary">
    {editProduct ? "Update Product" : "Add Product"}
   </button>

  </form>

 );

}

export default ProductForm;