const React = require('react');
const ReactDOM = require('react-dom');
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phase1: true
    };

    this.handlePhase1 = this.handlePhase1.bind(this);
  }

  handlePhase1(e) {
    e.preventDefault();
    axios.post('/phase1', {stuff:'stuff'})
    .then(function(resp) {
      console.log(resp);
      alert(resp);
    });
  }

  render() {
    return (
        <div>
          Hello!

          <form onSubmit={this.handlePhase1}>
            <button type="submit">Submit Phase 1</button>
          </form>
        </div>
      )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
