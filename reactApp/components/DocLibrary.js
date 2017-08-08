import React from 'react';
import ReactDOM from 'react-dom';
import DocEditor from './Editor.js';
import Modal from 'react-modal';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

class DocLibrary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      owned: [],
      collab: [],
      modalIsOpen: false,
      title: '',
      password: '',
      redirect: false,
    }
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.createDocument = this.createDocument.bind(this);
    this.inputChangeTitle = this.inputChangeTitle.bind(this);
    this.inputChangePassword = this.inputChangePassword.bind(this);
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'http://localhost:3000/getdocs'
    })
    .then(response => {
      var owned = [];
      var collab = [];
      response.data.docs.forEach(doc => {
        if (doc.owner === response.data.id) {
          owned = owned.concat(doc)
        } else if (doc.collaborators.includes(response.data.id)) {
          collab = collab.concat(doc)
        }
      })
      this.setState({owned: owned, collab: collab})
    })
    .catch(err => {
      console.log("Error fetching docs", err)
    })
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    this.subtitle.style.color = 'black';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  inputChangeTitle(e) {
    this.setState({title: e.target.value})
  }

  inputChangePassword(e) {
    this.setState({password: e.target.value})
  }

  createDocument(e) {
    e.preventDefault()
    axios({
      method: 'post',
      url: 'http://localhost:3000/newdoc',
      data: {
        title: this.state.title,
        password: this.state.password
      }
    })
    .then(response => {
      this.setState({modalIsOpen: false, redirect: true})
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="editor"/>
    }
    return (
      <div style={{ margin: "20px" }} className="body">
        <p className="docHeader">Your Document Library</p>
        <form className="form-group" onSubmit={(e) => this.props.handleSubmit(e)}>
          <button
            type="button"
            className="saveButton"
            onClick={this.openModal}>
            Create New Document
          </button>
        </form>
        <ul className="docList">
          <p className="libraryHeader">Docs you own</p>
          {this.state.owned.map(doc => {
            return (<li key={doc._id} className="doc">{doc.title}</li>)
          })}
        </ul>
        <ul className="docList">
          <p className="libraryHeader">Docs you collaborate on</p>
          {this.state.collab.map(doc => {
            return (<li key={doc._id} className="doc">{doc.title}</li>)
          })}
        </ul>
        <form className="form-group" onSubmit={(e) => this.props.handleSubmit(e)}>
          <button
            type="button"
            className="saveButton">
            Add Shared Document
          </button>
        </form>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
          className={{
            afterOpen: 'modalBody',
          }}
          >
            <h2 className="docHeader" ref={subtitle => this.subtitle = subtitle}>Create a new Document</h2>
            <form onSubmit={(e) => this.createDocument(e)}>
              <h2 className="modalText ">Give it a name:</h2><input type="text" onChange={(e) => this.inputChangeTitle(e)} className="form-control registerInput" placeholder="Document Title"></input><br></br>
              <h2 className="modalText">Password:</h2><input type="password" onChange={(e) => this.inputChangePassword(e)} className="form-control registerInput" placeholder="Password"></input><br></br>
              <input className="saveButton" type="submit" value="Create Document" />
              <button className="saveButton" onClick={this.closeModal}>cancel</button>
            </form>
          </Modal>
        </div>
      )
    }
  }

  export default DocLibrary;
