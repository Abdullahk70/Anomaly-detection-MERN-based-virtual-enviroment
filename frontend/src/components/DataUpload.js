import React, { useState } from "react";
import * as XLSX from "xlsx";

const DataUpload = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileDetails, setFileDetails] = useState(null);
  const [datasetPreview, setDatasetPreview] = useState([]);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [anomalyResult, setAnomalyResult] = useState(null); // To store anomaly detection result

  const allowedFormats = [".csv", ".xlsx", ".xls"];

  // Handle File Upload and Validation
  const handleFileUpload = (file) => {
    const fileExtension = file.name
      .slice(file.name.lastIndexOf("."))
      .toLowerCase();
    if (!allowedFormats.includes(fileExtension)) {
      setError("Unsupported file format. Please upload a CSV or Excel file.");
      return;
    }

    setError("");
    setUploadProgress(0);
    setAnomalyResult(null);

    const formData = new FormData();
    formData.append("file", file);

    // Simulate file upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + 10;
      });
    }, 300);

    // Send File to Backend
    fetch("http://localhost:5000/ml/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        clearInterval(interval);
        setUploadProgress(100);
        if (!response.ok) {
          throw new Error("Failed to upload the file");
        }
        return response.json();
      })
      .then((data) => {
        setFileDetails(data.fileDetails);
        setDatasetPreview(data.preview);
        // Simulate anomaly detection result (replace with actual API response)
        setAnomalyResult({
          anomaly: data.anomaly, // Boolean: true/false
          attack_type: data.attack_type, // String: Type of attack
        });
      })
      .catch((err) => {
        setError("File upload failed. Please try again.");
        console.error(err);
      });
  };

  // Drag and Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = () => setDragOver(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFileUpload(file);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black p-4">
      <div
        className="w-full max-w-4xl p-8 bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-105"
        style={{ animation: "fadeIn 1.5s ease" }}
      >
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-6 animate-pulse">
          🚀 Upload Your Dataset
        </h1>

        {/* Upload Section */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
            dragOver
              ? "border-cyan-500 bg-cyan-900/20"
              : "border-gray-600 bg-gray-700/20"
          }`}
        >
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            className="hidden"
            id="fileUpload"
            onChange={handleInputChange}
          />
          <label
            htmlFor="fileUpload"
            className="block cursor-pointer hover:scale-105 transform transition-all"
          >
            <div className="text-7xl mb-4 animate-bounce">📂</div>
            <p className="text-lg text-gray-300">
              Drag & Drop your file here, or{" "}
              <span className="text-cyan-400 font-semibold hover:underline">
                click to browse
              </span>
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Supported formats: <strong>.csv, .xlsx, .xls</strong>
            </p>
          </label>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 text-center text-red-400 font-semibold animate-shake">
            ⚠️ {error}
          </div>
        )}

        {/* Progress Bar */}
        {uploadProgress > 0 && !anomalyResult && (
          <div className="mt-6">
            <p className="text-gray-300 mb-2">Uploading...</p>
            <div className="w-full bg-gray-700 rounded-full h-3 shadow-inner">
              <div
                className="bg-gradient-to-r from-cyan-500 to-blue-600 h-3 rounded-full transition-all"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Anomaly Detection Result */}
        {anomalyResult && (
          <div
            className={`mt-8 p-8 rounded-xl border ${
              anomalyResult.anomaly
                ? "border-red-500 bg-red-900/20 animate-pulse"
                : "border-green-500 bg-green-900/20"
            } transition-all duration-500`}
          >
            <h2
              className={`text-3xl font-bold text-center mb-6 ${
                anomalyResult.anomaly
                  ? "text-red-400"
                  : "text-green-400"
              }`}
            >
              {anomalyResult.anomaly ? "🚨 Anomaly Detected!" : "✅ No Anomaly Found"}
            </h2>
            <p className="text-lg text-gray-300 text-center mb-4">
              {anomalyResult.anomaly
                ? `Attack Type: ${anomalyResult.attack_type}`
                : "Your data is safe and secure."}
            </p>
            <div
              className={`text-7xl text-center mb-6 ${
                anomalyResult.anomaly ? "animate-bounce" : "animate-spin-slow"
              }`}
            >
              {anomalyResult.anomaly ? "🔥" : "🛡️"}
            </div>
            <p className="text-sm text-gray-400 text-center">
              {anomalyResult.anomaly
                ? "Immediate action is recommended."
                : "No further action is required."}
            </p>
          </div>
        )}

        {/* File Details */}
        {fileDetails && !anomalyResult && (
          <div className="mt-8 text-gray-300">
            <h3 className="font-bold text-lg mb-2 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              📊 Dataset Overview
            </h3>
            <ul className="list-disc pl-6">
              <li>
                <strong>File Name:</strong> {fileDetails.name}
              </li>
              <li>
                <strong>File Size:</strong> {fileDetails.size} KB
              </li>
              <li>
                <strong>Rows:</strong> {fileDetails.rows}
              </li>
              <li>
                <strong>Columns:</strong> {fileDetails.columns}
              </li>
            </ul>
          </div>
        )}

        {/* Dataset Preview */}
        {datasetPreview && datasetPreview.length > 0 && !anomalyResult && (
          <div className="mt-8">
            <h3 className="font-bold text-lg mb-4 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              🔍 Dataset Preview
            </h3>
            <div className="overflow-x-auto rounded-lg border border-gray-700">
              <table className="table-auto border-collapse w-full text-sm text-left text-gray-300">
                <thead>
                  <tr className="bg-gray-700">
                    {datasetPreview[0]?.map((_, idx) => (
                      <th
                        key={idx}
                        className="border border-gray-600 p-3"
                      >
                        Column {idx + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {datasetPreview.slice(1)?.map((row, idx) => (
                    <tr
                      key={idx}
                      className="even:bg-gray-700/50 hover:bg-cyan-900/20 transition-all"
                    >
                      {row?.map((cell, idy) => (
                        <td
                          key={idy}
                          className="border border-gray-600 p-3"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataUpload;








// import React, { useState } from "react";
// import * as XLSX from "xlsx";

// const DataUpload = () => {
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [fileDetails, setFileDetails] = useState(null);
//   const [datasetPreview, setDatasetPreview] = useState([]);
//   const [error, setError] = useState("");
//   const [dragOver, setDragOver] = useState(false);

//   const allowedFormats = [".csv", ".xlsx", ".xls"];

//   // Handle File Upload and Validation
//   const handleFileUpload = (file) => {
//     const fileExtension = file.name
//       .slice(file.name.lastIndexOf("."))
//       .toLowerCase();
//     if (!allowedFormats.includes(fileExtension)) {
//       setError("Unsupported file format. Please upload a CSV or Excel file.");
//       return;
//     }

//     setError("");
//     setUploadProgress(0);
//     setUploadSuccess(false);

//     const formData = new FormData();
//     formData.append("file", file);

//     // Simulate file upload progress
//     const interval = setInterval(() => {
//       setUploadProgress((prev) => {
//         if (prev >= 90) {
//           clearInterval(interval);
//           return prev;
//         }
//         return prev + 10;
//       });
//     }, 300);

//     // Send File to Backend
//     fetch("http://localhost:5000/ml/upload", {
//       method: "POST",
//       body: formData,
//     })
//       .then((response) => {
//         clearInterval(interval);
//         setUploadProgress(100);
//         if (!response.ok) {
//           throw new Error("Failed to upload the file");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setUploadSuccess(true);
//         setFileDetails(data.fileDetails);
//         setDatasetPreview(data.preview);
//       })
//       .catch((err) => {
//         setError("File upload failed. Please try again.");
//         console.error(err);
//       });
//   };

//   // Drag and Drop Handlers
//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setDragOver(true);
//   };
//   const handleDragLeave = () => setDragOver(false);
//   const handleDrop = (e) => {
//     e.preventDefault();
//     setDragOver(false);
//     const file = e.dataTransfer.files[0];
//     if (file) handleFileUpload(file);
//   };

//   const handleInputChange = (e) => {
//     const file = e.target.files[0];
//     if (file) handleFileUpload(file);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black p-4">
//       <div
//         className="w-full max-w-4xl p-8 bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-105"
//         style={{ animation: "fadeIn 1.5s ease" }}
//       >
//         {/* Title */}
//         <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-6 animate-pulse">
//           🚀 Upload Your Dataset
//         </h1>

//         {/* Upload Section */}
//         <div
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           onDrop={handleDrop}
//           className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
//             dragOver
//               ? "border-cyan-500 bg-cyan-900/20"
//               : "border-gray-600 bg-gray-700/20"
//           }`}
//         >
//           <input
//             type="file"
//             accept=".csv,.xlsx,.xls"
//             className="hidden"
//             id="fileUpload"
//             onChange={handleInputChange}
//           />
//           <label
//             htmlFor="fileUpload"
//             className="block cursor-pointer hover:scale-105 transform transition-all"
//           >
//             <div className="text-7xl mb-4 animate-bounce">📂</div>
//             <p className="text-lg text-gray-300">
//               Drag & Drop your file here, or{" "}
//               <span className="text-cyan-400 font-semibold hover:underline">
//                 click to browse
//               </span>
//             </p>
//             <p className="text-sm text-gray-400 mt-2">
//               Supported formats: <strong>.csv, .xlsx, .xls</strong>
//             </p>
//           </label>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mt-4 text-center text-red-400 font-semibold animate-shake">
//             ⚠️ {error}
//           </div>
//         )}

//         {/* Progress Bar */}
//         {uploadProgress > 0 && (
//           <div className="mt-6">
//             <p className="text-gray-300 mb-2">Uploading...</p>
//             <div className="w-full bg-gray-700 rounded-full h-3 shadow-inner">
//               <div
//                 className="bg-gradient-to-r from-cyan-500 to-blue-600 h-3 rounded-full transition-all"
//                 style={{ width: `${uploadProgress}%` }}
//               ></div>
//             </div>
//           </div>
//         )}

//         {/* Success Message */}
//         {uploadSuccess && (
//           <div className="mt-6 text-center animate-fadeIn">
//             <div className="text-5xl mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
//               ✅
//             </div>
//             <p className="text-xl font-semibold text-gray-300">
//               Upload Successful!
//             </p>
//           </div>
//         )}

//         {/* File Details */}
//         {fileDetails && (
//           <div className="mt-8 text-gray-300">
//             <h3 className="font-bold text-lg mb-2 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
//               📊 Dataset Overview
//             </h3>
//             <ul className="list-disc pl-6">
//               <li>
//                 <strong>File Name:</strong> {fileDetails.name}
//               </li>
//               <li>
//                 <strong>File Size:</strong> {fileDetails.size} KB
//               </li>
//               <li>
//                 <strong>Rows:</strong> {fileDetails.rows}
//               </li>
//               <li>
//                 <strong>Columns:</strong> {fileDetails.columns}
//               </li>
//             </ul>
//           </div>
//         )}

//         {/* Dataset Preview */}
//         {datasetPreview && datasetPreview.length > 0 && (
//           <div className="mt-8">
//             <h3 className="font-bold text-lg mb-4 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
//               🔍 Dataset Preview
//             </h3>
//             <div className="overflow-x-auto rounded-lg border border-gray-700">
//               <table className="table-auto border-collapse w-full text-sm text-left text-gray-300">
//                 <thead>
//                   <tr className="bg-gray-700">
//                     {datasetPreview[0]?.map((_, idx) => (
//                       <th
//                         key={idx}
//                         className="border border-gray-600 p-3"
//                       >
//                         Column {idx + 1}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {datasetPreview.slice(1)?.map((row, idx) => (
//                     <tr
//                       key={idx}
//                       className="even:bg-gray-700/50 hover:bg-cyan-900/20 transition-all"
//                     >
//                       {row?.map((cell, idy) => (
//                         <td
//                           key={idy}
//                           className="border border-gray-600 p-3"
//                         >
//                           {cell}
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DataUpload;