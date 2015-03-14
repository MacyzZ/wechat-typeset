(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
/**
 * @jsx React.DOM
*/

var React = window.React || require('react'),
  mui = window.mui || require('material-ui'),
  RaisedButton = mui.RaisedButton,
  IconButton = mui.IconButton,
  Dialog = mui.Dialog,
  injectTapEventPlugin = window.injectTapEventPlugin || require("react-tap-event-plugin");

var CheckLink = React.createClass({displayName: 'CheckLink',
  render: function() {
    return React.createElement("a", React.__spread({},  this.props), '√ ', this.props.children);
  }
});

var LikeButton = React.createClass({displayName: 'LikeButton',

  getInitialState: function(){
    return {like: false};
  },

  handleClick: function() {
    this.setState({like: !this.state.like});
  },

  render: function() {
    var text = this.state.like ? 'like' : 'haven\'t like';
    return (
      React.createElement("p", {onClick: this.handleClick}, 
          "You ", text, " this. Click to toggle"
      )
    );
  }
});

var ButtonsComponent = React.createClass({displayName: 'ButtonsComponent',
//var ButtonsComponent = React.createElement({

  render: function() {
    var dialogActions = [
      { text: 'CANCEL' },
      { text: 'TEST' },
      { text: 'SUBMIT', onClick: this._showMessage }
    ];

    return (
        React.createElement("div", null, 
          React.createElement(RaisedButton, {label: this.props.btnmsg, onTouchTap: this._showDialog}), 
          React.createElement(RaisedButton, {label: "Disabled", disabled: true}), 
          React.createElement(RaisedButton, {label: "Primary", primary: true}), 
          React.createElement(IconButton, {icon: "action-grade"}), 
          React.createElement(mui.Paper, null, "test"), 
          React.createElement(Dialog, {ref: "dialogExample", title: "Title", actions: dialogActions}, 
            "This is an example.aexample"
          ), 
          React.createElement(CheckLink, {href: "/checked.html"}, "Click here!"), 
          React.createElement(LikeButton, null)
        )
    );
  },
  _showMessage: function() {
    alert('got it!');
  },
  _showDialog: function() {
    this.refs.dialogExample.show();
  }

});

window.React = React;
window.mui = mui;
window.ButtonsComponent = ButtonsComponent;
injectTapEventPlugin();
React.render(React.createElement(ButtonsComponent, {btnmsg: "test"}), document.body)
// module.exports = ButtonsComponent;

},{"material-ui":1,"react":1,"react-tap-event-plugin":1}]},{},[2])