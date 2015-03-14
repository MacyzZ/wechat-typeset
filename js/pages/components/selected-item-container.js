(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
/**
 * @jsx React.DOM
*/

var React = window.React || require('react'),
  mui = window.mui || require('material-ui'),
  Icon = mui.Icon,
  classSet = React.addons.classSet;

var DelButton = React.createClass({displayName: 'DelButton',

  propTypes: {
    show: React.PropTypes.bool
  },
  
  render: function() {

    var delClasses = classSet({
      'del-btn': true,
      'is-shown': this.props.show,
      'is-hidden': !this.props.show
    });

    return (
      React.createElement("div", {className: delClasses, onClick: this.props.onClick}, 
        React.createElement(Icon, {icon: "action-delete"})
      )
    );
  }

});


module.exports = DelButton;



},{"material-ui":1,"react":1}],3:[function(require,module,exports){
/**
 * @jsx React.DOM
*/

var React = window.React || require('react'),
  mui = window.mui || require('material-ui'),
  Icon = mui.Icon,
  classSet = React.addons.classSet;

var DragButton = React.createClass({displayName: 'DragButton',

  propTypes: {
    show: React.PropTypes.bool
  },
  
  render: function() {

    var delClasses = classSet({
      'drag-btn': true,
      'is-shown': this.props.show,
      'is-hidden': !this.props.show
    });

    return (
      React.createElement("div", {className: delClasses, onClick: this.props.onClick}, 
        React.createElement(Icon, {icon: "social-pages"})
      )
    );
  }

});


module.exports = DragButton;




},{"material-ui":1,"react":1}],4:[function(require,module,exports){
/**
 * @jsx React.DOM
*/

var React = window.React || require('react'),
  mui = window.mui || require('material-ui'),
  Paper = mui.Paper,
  DelButton = require('./del-btn.jsx');
  DragButton = require('./drag-btn.jsx');

var SelectedItemContainer = React.createClass({displayName: 'SelectedItemContainer',
  
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
      React.createElement(Paper, React.__spread({},  props), 
        this.props.children, 
        React.createElement(DelButton, {show: this.state.show, onClick: this._onDelClick}, "删除"), 
        React.createElement(DragButton, {show: this.state.show}, "移动")
      )
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


},{"./del-btn.jsx":2,"./drag-btn.jsx":3,"material-ui":1,"react":1}]},{},[4])