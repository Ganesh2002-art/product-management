const express = require("express");
const router = express.Router();
const multer = require("multer");

const productController = require("../controllers/productController");

const upload = multer({ dest: "uploads/" });

router.post("/products", productController.createProduct);

router.get("/products", productController.getProducts);

router.put("/products/:id", productController.updateProduct);

router.delete("/products/:id", productController.deleteProduct);

router.post(
 "/products/bulk-upload",
 upload.single("file"),
 productController.bulkUpload
);

module.exports = router;