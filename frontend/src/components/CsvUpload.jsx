import React, { useState } from "react";
import api from "../services/api";

function CsvUpload({ reload }) {

 const [file, setFile] = useState(null);
 const [result, setResult] = useState(null);

 const upload = async () => {

  if (!file) {
   alert("Please select CSV file");
   return;
  }

  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/products/bulk-upload", formData);

  setResult(res.data);
  reload();
 };

 return (

  <div className="upload">

   <input
    type="file"
    onChange={(e) => setFile(e.target.files[0])}
   />

   <button className="btn-upload" onClick={upload}>
    Upload CSV
   </button>

   {result && (
    <div className="upload-result">
     <p>Total Rows: {result.totalRows}</p>
     <p>Inserted: {result.inserted}</p>
     <p>Failed: {result.failed}</p>
    </div>
   )}

  </div>

 );

}

export default CsvUpload;