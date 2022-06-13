import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  EditorState,
  Modifier,
  ContentState,
  convertFromHTML,
  DefaultDraftBlockRenderMap,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import Immutable from "immutable";
import ColorPic from "./ColorPic";
import "./posts.css";
class CustomOption extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object,
  };

  addStar = () => {
    const { editorState, onChange } = this.props;
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      "⭐",
      editorState.getCurrentInlineStyle()
    );
    onChange(EditorState.push(editorState, contentState, "insert-characters"));
  };

  render() {
    return (
      <div
        class="rdw-option-wrapper"
        aria-selected="false"
        role="button"
        title="Star"
        onClick={this.addStar}
      >
        *
      </div>
    );
  }
}

class CustomTable extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object,
  };

  addTable = () => {
    let { editorState, onChange } = this.props;
    let contentState;
    // contentState = Modifier.replaceText(
    //   editorState.getCurrentContent(),
    //   editorState.getSelection(),
    //   "TTT",
    //   editorState.getCurrentInlineStyle()
    // );

    let html = `<table>
        <tr>
          <td><strong>A1</strong></td>
          <td><em>B1</em></td>
        </tr>
        <tr>
          <td>A2</td>
          <td>B2</td>
        </tr>
      </table>`;

    // const blocksFromHTML = htmlToDraft(html);
    const blocksFromHTML = convertFromHTML(html);
    const { contentBlocks, entityMap } = blocksFromHTML;
    contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);

    contentState = Modifier.replaceWithFragment(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      contentState.getBlockMap()
    );

    onChange(EditorState.push(editorState, contentState, "insert-characters"));
  };

  render() {
    return (
      <div
        class="rdw-option-wrapper"
        aria-selected="false"
        title="Table"
        onClick={this.addTable}
      >
        T
      </div>
    );
  }
}

export default class FBEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  blockRenderMap = Immutable.Map({
    section: {
      element: "section",
    },
    table: {
      element: "table",
    },
    tr: {
      element: "tr",
    },
    td: {
      element: "td",
    },
    th: {
      element: "th",
    },
  });
  extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(
    this.blockRenderMap
  );

  render() {
    const { editorState } = this.state;
    return (
      <Editor
        editorState={editorState}
        wrapperClassName="wrapper"
        editorClassName="editor"
        toolbarClassName="toolbar"
        onEditorStateChange={this.onEditorStateChange}
        // toolbarCustomButtons={[<CustomOption />, <CustomTable />]}
        blockRenderMap={this.extendedBlockRenderMap}
        toolbar={{
          inline: { inDropdown: true },
          list: { display: false},
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          colorPicker: { component: ColorPic },
        }}
      />
    );
  }
}
