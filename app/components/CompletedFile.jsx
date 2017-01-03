const React = require('react');
const axios = require('axios');

class CompletedFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileobj: props.fileobj || null,
      filemetaobj: null
    };
    this.getFileMetaData = this.getFileMetaData.bind(this);
    this.getFileMetaData(props.fileobj.id);
  }

  componentWillReceiveProps(nextProps) {
    console.log('CF PROPS', nextProps);
    this.setState({
      fileobj: nextProps.fileobj
    });
    if(nextProps.fileobj.id !== this.props.fileobj.id) {
      this.getFileMetaData(nextProps.fileobj.id);
    }
  }

  getFileMetaData(fileid) {
    const context = this;
    axios.get('/data/' + fileid)
    .then(function(resp) {
      console.log(resp.data);
      context.setState({
        filemetaobj: resp.data
      });
    });
  }

  render() {
    return (
        <div>
          {!this.state.fileobj ? <div>No file selected</div> : null}
          {!this.state.filemetaobj ? null : 
            <div>
              File name: {this.state.fileobj.filename} <br/>
              File type: {this.state.fileobj.filetype} <br/>
              File size (bytes): {this.state.filemetaobj.filesize} <br/>
              Line count: {this.state.filemetaobj.linecount} <br/>
              Description: {this.state.fileobj.description} <br/>
              Tags: {this.state.fileobj.tags}
            </div>
          }
        </div>
      );
  }
}

module.exports = CompletedFile