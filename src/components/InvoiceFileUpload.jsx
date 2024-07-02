import { useState } from "react";
import { useCreateInvoiceWithXLSXMutation } from "../redux/api/invoiceApi";
import toast from "react-hot-toast";

const InvoiceFileUpload = () => {
  const [createInvoiceWithXLSX] = useCreateInvoiceWithXLSXMutation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [data, setData] = useState();


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFileUploaded(false); // Reset upload status when file changes
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      console.error("No file selected.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const res = await createInvoiceWithXLSX(formData);
      console.log(res);

      if (res.error) {
        toast.error("File upload failed!");
      } else {
        toast.success("File uploaded successfully!");
        setData(res.data);
        setIsFileUploaded(true);
      }
    } catch (error) {
      console.error("Error uploading file: ", error);
      toast.error("File upload failed!");
    }
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
