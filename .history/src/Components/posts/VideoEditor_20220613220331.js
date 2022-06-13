import React, { useCallback } from "react";
import { FileDrop } from "react-file-drop";
import axios from "axios";
import "./posts.css";
class VideoEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUpload: true,
      videoUrl: "",
    };
  }
  render_editor = (e) => {
    console.log(this.state.videoUrl);
    // return (
    //   // Props:
    //   // videoUrl --> URL of uploaded video
    //   // saveVideo(<metadata of edited video>) --> gives the cut times and if video is muted or not
    //  console.log(e);
    // );
  };
  componentDidMount = () => {
    document.addEventListener("drop", function (e) {
      e.preventDefault();
      e.stopPropagation();
    });
  };

  render_uploader = () => {
    return (
      <div className={"wrapper"}>
        <input
          onChange={(e) => this.upload_file(e.target.files)}
          type="file"
          className="hidden"
          id="up_file"
        />
        <FileDrop
          onDrop={(e) => this.upload_file(e)}
          onTargetClick={() => document.getElementById("up_file").click()}
        >
          Click or drop your video here to edit!
        </FileDrop>
      </div>
    );
  };

  upload_file = () =>
  {
      const formData = new FormData();
      console.log(imageSent);
      formData.append("image",formData);
      formData.append("key", "Your Api key goes here");
      axios.post("https://api.imgbb.com/1/upload", formData).then(
        (response) => {
          console.log(response);
        }
      );
  }
  render = () => {
    return (
      <div>
        {this.state.isUpload ? this.render_uploader() : this.render_editor()}
      </div>
    );
  };
}

export default VideoEditor;
