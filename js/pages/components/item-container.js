(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
/**
 * @jsx React.DOM
*/

var React = window.React || require('react'),
  mui = window.mui || require('material-ui'),
  Paper = mui.Paper;

var ItemsContainer = React.createClass({displayName: 'ItemsContainer',
  
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
        React.createElement(Paper, {className: "item-container", zDepth: this.state.zDepth, onMouseOver: this._onMouseOver, onMouseOut: this._onMouseOut}, 
          React.createElement("div", {className: "item-container-content"}, 
            this.props.children
          )
        )
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





},{"material-ui":1,"react":1}]},{},[2])