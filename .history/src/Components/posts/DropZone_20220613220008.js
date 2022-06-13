import React from 'react'
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import DropBox from './Dropbox';
import ShowImage from './ShowImage';

function DropZone(props) {
  const [images, setImages] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.map((file, index) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImages((prevState) => [
          ...prevState,
          { id: index, src: e.target.result },
        ]);
      };
      reader.readAsDataURL(file);
      return file;
    });
  }, []);
    return (
      <div className="App">
        <DropBox onDrop={onDrop} />
        <ShowImage images={images} />
      </div>
    );
}
export default DropZone