var React = require('react');
var ReactDOM = require('react-dom');
import {Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap} from 'draft-js';
import Immutable from 'immutable'


/* This can check if your electron app can communicate with your backend */
// fetch('http://localhost:3000')
// .then(resp => resp.text())
// .then(text => console.log(text))
// .catch(err => {throw err})

const styleMap = {
  'SIZE_10': {
    fontSize: 10
  },
  'SIZE_12': {
    fontSize: 12
  },
  'SIZE_16': {
    fontSize: 16
  },
  'SIZE_20': {
    fontSize: 20
  },
  'SIZE_24': {
    fontSize: 24
  },
  'RED': {
    color: 'red'
  }
}

const blockRenderMap = Immutable.Map({
  'ALIGN_LEFT': {
    wrapper: <div className='left' />
  },
  'ALIGN_CENTER': {
    wrapper: <div className='center' />
  },
  'ALIGN_RIGHT': {
    wrapper: <div className='right' />
  }
})

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.toggleBlockType = (type) => this._toggleBlockType(type);
  }

  _onFontSizeClick() {
    var newSize = document.getElementById('textSizePicker').value;
    console.log(newSize)
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'SIZE_16'
    ));
  }

  _onStrikeClick() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'STRIKETHROUGH'
    ));
  }


  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      "BOLD"
    ));
  }


  _onUnderlineClick() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      "UNDERLINE"
    ));
  }

  _onItalicClick() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      "ITALIC"
    ));
  }

  _onLeftAlignClick() {
    this.onChange(RichUtils.toggleBlockType(
      this.state.editorState,
      "ALIGN_LEFT"
    ));
  }

  _onCenterAlignClick() {
    this.onChange(RichUtils.toggleBlockType(
      this.state.editorState,
      "ALIGN_CENTER"
    ));
  }

  _onRightAlignClick() {
    this.onChange(RichUtils.toggleBlockType(
      this.state.editorState,
      "ALIGN_RIGHT"
    ));
  }

  _onULClick() {
    this.onChange(RichUtils.toggleBlockType(
      this.state.editorState,
      'unordered-list-item'
    ));
  }

  _onOLClick() {
    this.onChange(RichUtils.toggleBlockType(
      this.state.editorState,
      'ordered-list-item'
    ));
  }

  blockRenderer(block) {
    console.log('type: ', block.getType())
  }


  render() {
    return (
      <div style={{ margin: "20px" }}>
        <p className="docHeader">Edit your docs:</p>
        <p>Document ID: testID</p>
        <button type="button" className="saveButton">Save Changes</button>
        <div className="toolbar">
          <span title="Change Text Size">
            <button
              className="styleButton glyphicon glyphicon-text-size"
              type="button"
              onChange={this._onFontSizeClick.bind(this)}>
              <select className="textSizePicker">
                <option value="10">10</option>
                <option value="12">12</option>
                <option value="14">16</option>
                <option value="20">20</option>
                <option value="24">24</option>
              </select>
            </button>
          </span>
          <span title="Change Text Color">
            <button
              className="styleButton glyphicon glyphicon-tint"
              type="button"
              onChange={this._onFontSizeClick.bind(this)}>
              <select className="textColorPicker" defaultValue="black">
                <option value="black">black</option>
                <option value="red">red</option>
                <option value="orange">orange</option>
                <option value="yellow">yellow</option>
                <option value="green">green</option>
                <option value="blue">blue</option>
                <option value="purple">purple</option>
              </select>
            </button>
          </span>
          <span title="Bold"><button className="styleButton" type="button" onClick={this._onBoldClick.bind(this)}><span className="glyphicon glyphicon-bold"></span></button></span>
          <span title="Italicize"><button className="styleButton" type="button" onClick={this._onItalicClick.bind(this)}><span className="glyphicon glyphicon-italic"></span></button></span>
          <span title="Underline"><button className="styleButton" type="button" onClick={this._onUnderlineClick.bind(this)}><span className="glyphicon glyphicon-text-color"></span></button></span>
          <span title="Align Left"><button className="styleButton" type="button" onClick={this._onLeftAlignClick.bind(this)}><span className="glyphicon glyphicon-align-left"></span></button></span>
          <span title="Align Center"><button className="styleButton" type="button" onClick={this._onCenterAlignClick.bind(this)}><span className="glyphicon glyphicon-align-center"></span></button></span>
          <span title="Align Right"><button className="styleButton" type="button" onClick={this._onRightAlignClick.bind(this)}><span className="glyphicon glyphicon-align-right"></span></button></span>
          <span title="Bullet List"><button className="styleButton" type="button" onClick={this._onULClick.bind(this)}><span className="glyphicon glyphicon-list"></span></button></span>
          <span title="Numbered List"><button className="styleButton" type="button" onClick={this._onOLClick.bind(this)}><span className="glyphicon glyphicon-sort-by-order"></span></button></span>
        </div>
        <div className="editor">
          <Editor
            customStyleMap={styleMap}
            editorState={this.state.editorState}
            onChange={this.onChange}
            placeholder="Enter your text below"
            blockRenderMap={extendedBlockRenderMap}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <MyEditor />,
  document.getElementById('root')
);
