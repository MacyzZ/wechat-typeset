/**
 * @jsx React.DOM
*/

var React = window.React || require('react'),
  mui = window.mui || require('material-ui'),
  Paper = mui.Paper;

var ItemsContainer = React.createClass({
  
  getInitialState: function(){
    return {zDepth: 0}
  },

  render: function() {
    var dialogActions = [
      { text: 'CANCEL' },
      { text: 'TEST' },
      { text: 'SUBMIT', onClick: this._showMessage }
    ];

    return (
        <Paper className="item-container" zDepth={this.state.zDepth} onMouseOver={this._onMouseOver} onMouseOut={this._onMouseOut}>
          <div className="item-container-content">
            {this.props.children}
          </div>
        </Paper>
    );
  },

  _onMouseOver: function() {
    this.setState({zDepth: 1});
  },

  _onMouseOut: function() {
    this.setState({zDepth: 0});
  }

});


module.exports = ItemsContainer;




