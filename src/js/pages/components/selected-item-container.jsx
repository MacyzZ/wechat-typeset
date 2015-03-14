/**
 * @jsx React.DOM
*/

var React = window.React || require('react'),
  mui = window.mui || require('material-ui'),
  Paper = mui.Paper,
  DelButton = require('./del-btn.jsx');
  DragButton = require('./drag-btn.jsx');

var SelectedItemContainer = React.createClass({
  
  getInitialState: function(){
    return {zDepth: 0,show: false}
  },

  render: function() {
    var props = {
      className: "selected-item-container",
      innerClassName: "selected-item-parent-container",
      draggable: true,
      zDepth: this.state.zDepth,
      "data-id": this.props.id,
      "data-name": this.props.name,
      onDragStart: this._onDragStart,
      onMouseOver: this._onMouseOver,
      onMouseOut: this._onMouseOut
    }

    return (
      <Paper {...props}>
        {this.props.children}
        <DelButton show={this.state.show} onClick={this._onDelClick}>删除</DelButton>
        <DragButton show={this.state.show}>移动</DragButton>
      </Paper>
    );
  },

  _onDelClick: function() {
    node = this.getDOMNode();
    if(this.props.onDelClick) this.props.onDelClick(node);
  },

  _onDragStart: function(e) {
    e.dataTransfer.effectAllowed='move';
    node = this.getDOMNode();
    if(this.props.onDragStart) this.props.onDragStart(node);
  },

  _onMouseOver: function() {
    this.setState({show: true});
  },

  _onMouseOut: function() {
    this.setState({show: false});
  }

});


module.exports = SelectedItemContainer;

