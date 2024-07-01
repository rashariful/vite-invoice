import { useState } from "react";

const InvoiceFileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [data, setData] = useState();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFileUploaded(false); // Reset upload status when file changes
  };

  const handleFileUpload = () => {
    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    console.log(formData);

    fetch("http://localhost:4000/api/v1/xltjson", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("File uploaded successfully:", data?.data);
        setData(data);
      })
      .catch((error) => console.error("Error uploading file:", error));
  };

  return (
    <div>
      <h2>Upload Excel File</h2>
      <input
        type="file"
        name="file"
        onChange={handleFileChange}
        accept=".xls,.xlsx"
      />
      <br />
      <button
        className="border border-solid p-2 m-5 rounded-md bg-zinc-400"
        onClick={handleFileUpload}
      >
        Upload
      </button>
      {isFileUploaded && <p>File uploaded successfully!</p>}
      <div id="jsonContainer">
        <pre>
          <code>{JSON.stringify(data?.data, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
};

export default InvoiceFileUpload;
