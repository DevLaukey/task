import React, { Component } from "react";
import uuidv1 from "uuid/v1";
import { EditorState, RichUtils, getDefaultKeyBinding } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import { stateToHTML } from "draft-js-export-html";
import BlockStyleControls from "../RichText/BlockStyleControls";
import InlineStyleControls from "../RichText/InlineStyleControls";
import "./posts.css";
import "../../RichText.css";
import FBEditor from "./FBEditor";


function uploadImageCallBack(file) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.imgur.com/3/image");
    xhr.setRequestHeader("Authorization", "Client-ID ##clientid###");
    const data = new FormData();
    data.append("image", file);
    xhr.send(data);
    xhr.addEventListener("load", () => {
      const response = JSON.parse(xhr.responseText);
      console.log(response);
      resolve(response);
    });
    xhr.addEventListener("error", () => {
      const error = JSON.parse(xhr.responseText);
      console.log(error);
      reject(error);
    }); 
  });
}

export default class NewStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      title: "",
      body: "",
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
    this.state.title && this.state.body
      ? this.setState({ done: "done" })
      : console.log(
        "DevLaukey"
        );
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
          <Editor
            getBlockStyleFn={getBlockStyle} 
            editorState={editorState}
            image= {
            uploadCallback= uploadImageCallBack,
            alt= { present: true, mandatory: true },
            }
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
