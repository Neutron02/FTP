// UploadPage.js
import React, { useState, useRef } from 'react';
import './UploadPage.css';  // We'll create this shortly for styles.

function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const dropRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if(!file){
        return;
    }

    setSelectedFile(file);
    setProgress(0);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onloadstart = () => {
      setProgress(0);
    };
    fileReader.onprogress = (event) => {
      if (event.lengthComputable) {
        setProgress((event.loaded / event.total) * 100);
      }
    };
    fileReader.onloadend = () => {
      setProgress(100);
    };
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedFile(file);
    dropRef.current.value = '';  // reset input value
    dropRef.current.files = event.dataTransfer.files;  // set input files
        handleFileChange({ target: {files: event.dataTransfer.files}});
    };

  return (
    <div className="upload-container">
      <h2>Upload a File</h2>
      <div
        className="dropzone"
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <input 
          type="file" 
          ref={dropRef} 
          onChange={handleFileChange} 
          className="file-input"
        />
        Drag & drop your file here or click to select
      </div>
      {progress > 0 && <progress value={progress} max="100"></progress>}
    </div>
  );
}

export default UploadPage;
