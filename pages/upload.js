import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file); // must match multer.single("file")

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setUrl(data.url); // Cloudinary URL of uploaded file
        alert("File uploaded successfully!");
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Upload failed, check console.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Upload File to Cloudinary</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {url && (
        <div>
          <p>Uploaded File:</p>
          <img src={url} alt="Uploaded file" style={{ maxWidth: "300px" }} />
        </div>
      )}
    </div>
  );
}
