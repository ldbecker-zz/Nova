const React = require('react');
const ReactDOM = require('react-dom');
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pendingFiles: []
    };

    this.handlePhase1 = this.handlePhase1.bind(this);
  }

  getPendingFiles() {
    
  }

  handlePhase1(e) {
    e.preventDefault();
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
      console.log(resp);
      alert(resp);
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
          </form>

          Phase 2:
        </div>
      )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
