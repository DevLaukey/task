//*App.js*//

import React, { useCallback, useState } from "react";
import cuid from "cuid";
import { useDropzone } from "react-dropzone";

function Dropzone({ open }) {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({});
  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <input className="input-zone" {...getInputProps()} />
      <div className="text-center">
        {isDragActive ? (
          <p className="dropzone-content">
            Release to drop the files here
          </p>
        ) : (
          <p className="dropzone-content">
            Drag’n’drop some files here, or click to select files
          </p>
        )}
        <button type="button" onClick={open} className="btn">
          Click to select files
        </button>
      </div>
      <aside>
        <ul>{files}</ul>
      </aside>
    </div>
  );
}

function MyDropzone() {
  const [images, setImages] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file) => {
      const reader = new FileReader();

      reader.onload = function (e) {
        setImages((prevState) => [
          ...prevState,
          { id: cuid(), src: e.target.result },
        ]);
      };

      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  return (
    <main className="App">
      <h1 className="text-center">Drag and Drop Test</h1>
      <Dropzone onDrop={onDrop} accept={"image/*"} />
      {/* <ImageGrid images={images} /> */}
    </main>
  );
}

export default MyDropzone;
