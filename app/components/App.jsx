const React = require('react');
const ReactDOM = require('react-dom');
const axios = require('axios');
const Dropzone = require('./Dropzone.jsx');
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pendingFiles: [],
      curPending: null
    };

    this.handlePhase1 = this.handlePhase1.bind(this);
    this.getPendingFiles = this.getPendingFiles.bind(this);
    this.pendingChange = this.pendingChange.bind(this);
    this.getPendingFiles();
  }

  pendingChange(e) {
    console.log(e.target.value);
    this.setState({
      curPending: e.target.value
    });
  }

  getPendingFiles() {
    const context = this;
    axios.get('/pending')
    .then(function(resp) {
      context.setState({
        pendingFiles: resp.data,
        curPending: resp.data[0].filename || null
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

  render() {
    return (
        <div>

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
                  <option value={pendingFile.filename + pendingFile.filetype}>{pendingFile.filename + pendingFile.filetype}</option>
                );
            })}
          </select><br/>
          {this.state.curPending === null ? null : 
            <form onSubmit={this.handlePhase2}>
              <Dropzone filename={this.state.curPending}/>
            </form>
          }
        </div>
      )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
