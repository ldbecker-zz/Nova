const React = require('react');
const ReactDOM = require('react-dom');
const axios = require('axios');
const Dropzone = require('./Dropzone.jsx');
const CompletedFile = require('./CompletedFile.jsx');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pendingFiles: [],
      curPending: null,
      curPendingID: null,
      uploadedFiles: [],
      curCompleted: null,
      curCompletedID: null
    };

    this.handlePhase1 = this.handlePhase1.bind(this);
    this.getPendingFiles = this.getPendingFiles.bind(this);
    this.pendingChange = this.pendingChange.bind(this);
    this.getUploadedFiles = this.getUploadedFiles.bind(this);
    this.uploadedChange = this.uploadedChange.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.getPendingFiles();
    this.getUploadedFiles();
  }

  uploadedChange(e) {
    this.setState({
      curCompleted: JSON.parse(e.target.value)
    });
  }

  getUploadedFiles() {
    const context = this;
    axios.get('/uploaded')
    .then(function(resp) {
      context.setState({
        uploadedFiles: resp.data,
        curCompleted: resp.data[0] || null
      });
    });
  }

  pendingChange(e) {
    this.setState({
      curPending: JSON.parse(e.target.value).filename,
      curPendingID: JSON.parse(e.target.value).fileid
    });
  }

  getPendingFiles() {
    const context = this;
    axios.get('/pending')
    .then(function(resp) {
      context.setState({
        pendingFiles: resp.data,
        curPending: resp.data[0] ? resp.data[0].filename + resp.data[0].filetype : null,
        curPendingID: resp.data[0] ? resp.data[0].id : null
      });
    });
  }

  handlePhase1(e) {
    e.preventDefault();
    const context = this;
    var filename = document.getElementById('filename').value;
    if(filename === '') {
      alert('Please enter a filename.');
      return;
    }
    var filetype = document.getElementById('filetype').value;
    var description = document.getElementById('description').value;
    if(description === '') {
      alert('Please enter a description.');
      return;
    }
    var tags = document.getElementById('tags').value;
    if(tags === '') {
      alert('Please enter tags.');
      return;
    }


    axios.post('/phase1', {
      filename: filename,
      filetype: filetype,
      description: description,
      tags: tags
    })
    .then(function(resp) {
      context.getPendingFiles();
      alert('Phase 1 complete. Select your file below to complete Phase 2.');
    });
  }

  handleRefresh(e) {
    e.preventDefault();
    this.getPendingFiles();
    this.getUploadedFiles();
  }

  render() {
    return (
        <div>
          <form onSubmit={this.handleRefresh}>
            <button type="submit">Refresh</button>
          </form><br/>
          Phase 1:<br/>
          <form onSubmit={this.handlePhase1}>
            Filename: <input id="filename" type="text"></input><br/>
            Filetype: <select id="filetype">
              <option value=".txt">.txt</option>
              <option value=".js">.js</option>
              <option value=".jsx">.jsx</option>
              <option value=".json">.json</option>
            </select><br/>
            Description: <input id="description" type="text"></input><br/>
            Tags: <input id="tags" type="text"></input><br/>
            <button type="submit">Submit Phase 1</button>
          </form><br/>

          Phase 2:
          Choose a pending file: <select id="pending" onChange={this.pendingChange}>
            {this.state.pendingFiles.map(function(pendingFile) {
              return (
                  <option value={JSON.stringify({filename: pendingFile.filename + pendingFile.filetype, fileid: pendingFile.id})}>{pendingFile.filename + pendingFile.filetype}</option>
                );
            })}
          </select><br/>
          {this.state.curPending === null ? null : 
            <form onSubmit={this.handlePhase2}>
              <Dropzone filename={this.state.curPending} fileid={this.state.curPendingID}/>
            </form>
          }
          <br/>
          Uploaded Files:
          Choose an uploaded file: <select id="uploaded" onChange={this.uploadedChange}>
            {this.state.uploadedFiles.map(function(uploadedFile) {
              return (
                  <option value={JSON.stringify(uploadedFile)}>{uploadedFile.filename + uploadedFile.filetype}</option>
                );
            })}
          </select><br/>
          {this.state.curCompleted === null ? null :
            <CompletedFile fileobj={this.state.curCompleted}/>
          }
        </div>
      )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
