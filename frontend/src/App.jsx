import React, { useState } from "react";
import ProductTable from "./components/ProductTable.jsx";
import ProductForm from "./components/ProductForm.jsx";
import CsvUpload from "./components/CsvUpload.jsx";

function App() {

  const [editProduct, setEditProduct] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const reload = () => setRefresh(!refresh);

  return (
    <div className="container">

      <h2 className="title">Product Management</h2>

      <ProductForm
        editProduct={editProduct}
        setEditProduct={setEditProduct}
        reload={reload}
      />

      <CsvUpload reload={reload} />

      <ProductTable
        refresh={refresh}
        setEditProduct={setEditProduct}
        reload={reload}
      />

    </div>
  );
}

export default App;