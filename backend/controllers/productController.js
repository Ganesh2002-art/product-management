const db = require("../config/db");
const fs = require("fs");
const csv = require("csv-parser");

exports.createProduct = (req, res) => {

 const { name, sku, price, quantity, category } = req.body;

 if (!name || !sku || !price || !quantity || !category) {
  return res.status(400).json({ message: "All fields required" });
 }

 const sql =
  "INSERT INTO products (name,sku,price,quantity,category) VALUES (?,?,?,?,?)";

 db.query(sql, [name, sku, price, quantity, category], (err, result) => {

  if (err) {
   return res.status(500).json(err);
  }

  res.json({ message: "Product created" });

 });

};

exports.getProducts = (req, res) => {

 db.query("SELECT * FROM products", (err, result) => {

  if (err) return res.status(500).json(err);

  res.json(result);

 });

};

exports.updateProduct = (req, res) => {

 const { id } = req.params;
 const { name, sku, price, quantity, category } = req.body;

 const sql =
  "UPDATE products SET name=?,sku=?,price=?,quantity=?,category=? WHERE id=?";

 db.query(sql, [name, sku, price, quantity, category, id], (err) => {

  if (err) return res.status(500).json(err);

  res.json({ message: "Product updated" });

 });

};

exports.deleteProduct = (req, res) => {

 const { id } = req.params;

 db.query("DELETE FROM products WHERE id=?", [id], (err) => {

  if (err) return res.status(500).json(err);

  res.json({ message: "Product deleted" });

 });

};

exports.bulkUpload = (req, res) => {

 const results = [];
 const errors = [];
 let inserted = 0;

 fs.createReadStream(req.file.path)
  .pipe(csv())
  .on("data", (row) => {

   results.push(row);

   if (!row.name) {
    errors.push({ row: row, reason: "Name empty" });
    return;
   }

   if (isNaN(row.price)) {
    errors.push({ row: row, reason: "Invalid price" });
    return;
   }

   const sql =
    "INSERT INTO products (name,sku,price,quantity,category) VALUES (?,?,?,?,?)";

   db.query(
    sql,
    [row.name, row.sku, row.price, row.quantity, row.category],
    (err) => {

     if (err) {
      errors.push({ row: row, reason: "SKU exists" });
     } else {
      inserted++;
     }

    }
   );

  })
  .on("end", () => {

   res.json({
    totalRows: results.length,
    inserted: inserted,
    failed: errors.length,
    errors: errors
   });

  });

};