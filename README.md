# Product Management System

A full-stack **Product Management Module** built with **React, Node.js, Express, and MySQL**.
This application allows users to manage products through **CRUD operations** and perform **bulk product uploads using CSV files**.

---

## 🚀 Features

* Create a new product
* View all products in a table
* Update product information
* Delete products
* Bulk upload products using CSV
* CSV validation and error reporting
* Responsive UI
* REST API integration
* MySQL database storage

---

## 🛠 Tech Stack

**Frontend**

* React (Vite)
* JavaScript
* CSS

**Backend**

* Node.js
* Express.js

**Database**

* MySQL

**Other Tools**

* Axios
* Multer (file upload)
* csv-parser

---

## 📂 Project Structure

```
product-management
│
├── backend
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   └── productController.js
│   ├── routes
│   │   └── productRoutes.js
│   ├── uploads
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── components
│   │   │   ├── ProductForm.jsx
│   │   │   ├── ProductTable.jsx
│   │   │   └── CsvUpload.jsx
│   │   ├── services
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
└── README.md
```

---

## 📊 Product Data Structure

Each product contains the following fields:

| Field     | Type     |
| --------- | -------- |
| id        | number   |
| name      | string   |
| sku       | string   |
| price     | number   |
| quantity  | number   |
| category  | string   |
| createdAt | datetime |

Example:

```
{
 "name": "Laptop",
 "sku": "LAP001",
 "price": 55000,
 "quantity": 10,
 "category": "Electronics"
}
```

---

## 📥 CSV Upload Format

Example CSV file:

```
name,sku,price,quantity,category
Laptop,LAP001,55000,10,Electronics
Mouse,MOU001,500,50,Accessories
Keyboard,KEY001,1500,20,Accessories
Monitor,MON001,12000,15,Electronics
```

---

## 📊 CSV Upload Response

```
{
 "totalRows": 4,
 "inserted": 3,
 "failed": 1,
 "errors": [
   {
     "row": 3,
     "reason": "SKU already exists"
   }
 ]
}
```

---

## 🔌 API Endpoints

### Product CRUD APIs

| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| POST   | /api/products     | Create product   |
| GET    | /api/products     | Get all products |
| PUT    | /api/products/:id | Update product   |
| DELETE | /api/products/:id | Delete product   |

---

### CSV Upload API

```
POST /api/products/bulk-upload
```

Upload a CSV file to insert multiple products into the database.

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```
git clone https://github.com/Ganesh2002-art/product-management.git
```

```
cd product-management
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
node server.js
```

Backend runs on:

```
http://localhost:5000
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🗄 Database Setup

Create MySQL database:

```
CREATE DATABASE product_management;
```

Create table:

```
CREATE TABLE products (
 id INT AUTO_INCREMENT PRIMARY KEY,
 name VARCHAR(255),
 sku VARCHAR(100) UNIQUE,
 price DECIMAL(10,2),
 quantity INT,
 category VARCHAR(255),
 createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🧪 Testing the Application

1. Add a product using the form
2. Upload products using a CSV file
3. Edit existing products
4. Delete products
5. Verify records in MySQL

---

## 📌 Future Improvements

* Search products
* Pagination
* CSV preview before upload
* Authentication
* Product categories management

---

## 👨‍💻 Author

Ganesh
GitHub: https://github.com/Ganesh2002-art

---

## 📄 License

This project is for learning and technical assessment purposes.
