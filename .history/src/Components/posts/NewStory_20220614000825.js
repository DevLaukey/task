import React, { Component } from "react";
import uuidv1 from "uuid/v1";
import { Editor,EditorState, RichUtils, getDefaultKeyBinding } from "draft-js";
import axios from "axios";
import { stateToHTML } from "draft-js-export-html";
import BlockStyleControls from "../RichText/BlockStyleControls";
import InlineStyleControls from "../RichText/InlineStyleControls";
import "./posts.css";
import "../../RichText.css";



export default class NewStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      title: "",
      body: "",
      name: "",
      path: "",
      preview: null,
      data: null,
      done: "no",
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = this.onChange.bind(this);
    this.handleKeyCommand = this._handleKeyCommand.bind(this);
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
    this.toggleBlockType = this._toggleBlockType.bind(this);
    this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(editorState) {
    this.setState({ editorState });
    const contentState = this.state.editorState.getCurrentContent();
    const html = stateToHTML(contentState);
    this.state.title && this.state.body && this.state.data
      ? this.setState({ done: "done" })
      : console.log("waiting");
    this.setState({ body: html });
  }

  _handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _mapKeyToEditorCommand(e) {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        this.state.editorState,
        4 /* maxDepth */
      );
      if (newEditorState !== this.state.editorState) {
        this.onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  }

  changePath = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    let src,
      preview,
      type = file.type;

    if (/^image\//.test(type)) {
      src = URL.createObjectURL(file);
      preview = <img src={src} alt="" />;
    } else if (/^video\//.test(type)) {
      src = URL.createObjectURL(file);
      preview = <video src={src} autoPlay loop controls />;
    } else {
      return;
    }
    this.setState({
      path: file.name,
      data: file,
      preview: preview,
    });
  };

  upload = () => {
    
    const data = this.state.data;
    const form = new FormData();
    form.append("file", data);
console.log(form)
    return axios({
      method: "post",
      url: "https://api.imgbb.com/1/upload?expiration=600&key=b15c96df3b17b6e4f51d9ecd39d8edc5",
      form: btoa(form)
    }).then((res) => {
      console.log(res.body);
    });
  };

  handleSubmit() {
    const { title, body } = this.state;
    if (title && body) {
      let newStory = { id: uuidv1(), title, body, bookmark: false };
      this.props.handleSubmission(newStory);
      this.setState({
        editorState: EditorState.createEmpty(),
        title: "",
        body: "",
        done: "submitted",
      });
    }
  }

  render() {
    const { editorState } = this.state;
    let className = "RichEditor-editor";
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== "unstyled") {
        className += " RichEditor-hidePlaceholder";
      }
    }

    const { title, done } = this.state;

    const { path, preview } = this.state;
    console.log(this.state.data)
    return (

      <div className="richtext-editor">
        <input
          type="text"
          className="input-title"
          value={title}
          onChange={(e) => this.setState({ title: e.target.value })}
          placeholder="Title"
        />
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        {/* <FBEditor /> */}
        <div className={className} onClick={this.focus}>
          {/* <Editor
            toolbarStyle={{ display: "flex", justifyContent: "space-around" }}
            editorState={editorState}
            onEditorStateChange={this.onEditorStateChange}
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
            }}
            /> */}
          {/* <VideoEditor /> */}
          <div>
            <div className="row">
              <label>Upload</label>
              <div className="row-input">
                <span>{path ? path : "Upload Image /Video"}</span>
                <input
                  type="file"
                  accept="image/*, video/*"
                  multiple
                  onChange={this.changePath}
                />
              </div>
            </div>
            <div className="media">{preview}</div>
            <button className="primary upload" onClick={this.upload}>
              Upload
            </button>
          </div>
          <Editor
            getBlockStyleFn={getBlockStyle}
            editorState={editorState}
            handleDrop={() => {
              console.log("drop");
            }}
            handleKeyCommand={this.handleKeyCommand}
            keyBindingFn={this.mapKeyToEditorCommand}
            onChange={this.onChange}
            placeholder="Tell your story..."
            ref="editor"
            spellCheck={true}
          />
        </div>
        {done === "done" ? (
          <button onClick={this.handleSubmit} className="btn btn-submit">
            Submit
          </button>
        ) : done === "submitted" ? (
          <span className="msg-success">
            Your post has been added successfully
          </span>
        ) : (
          <span className="msg-error">
            You havent finished writing your post
          </span>
        )}
      </div>
    );

    function getBlockStyle(block) {
      switch (block.getType()) {
        case "blockquote":
          return "RichEditor-blockquote";
        default:
          return null;
      }
    }
  }
}