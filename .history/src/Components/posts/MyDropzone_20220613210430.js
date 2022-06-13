import React from "react";
import Dropzone from "react-dropzone";

function MyDropzone() {
  return (
    // Note that there will be nothing logged when files are dropped
    <Dropzone onDrop={(files) => console.log(files)}>
      {({ getRootProps, getInputProps }) => (
        <div className="container">
          <div
            {...getRootProps({
              className: "dropzone",
              onDrop: (event) => event.stopPropagation(),
            })}
          >
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        </div>
      )}
    </Dropzone>
  );
}

export default MyDropzone;
