(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
/**
 * @jsx React.DOM
*/

var React = window.React || require('react'),
  mui = window.mui || require('material-ui'),
  EnhancedButton = mui.EnhancedButton,
  Icon = mui.Icon,
  Ripple = mui.Ripple;

var MyIconButton = React.createClass({displayName: 'MyIconButton',

  propTypes: {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    icon: React.PropTypes.string.isRequired,
    onTouchTap: React.PropTypes.func
  },

  render: function() {

    return (
      React.createElement(EnhancedButton, {className: "specific-icon-button mui-icon-button", onTouchTap: this._onTouchTap, style: this.props.style}, 
        React.createElement(Ripple, {className: "mui-icon-button-ripple", ref: "ripple"}), 
        React.createElement(Ripple, {className: "mui-icon-button-focus-ripple"}), 
        React.createElement(Icon, {icon: this.props.icon})
      )
    );
  },

  _onTouchTap: function(e) {
    e.stopPropagation();
    if (!this.props.disabled) this.refs.ripple.animateFromCenter();
    if (this.props.onTouchTap) this.props.onTouchTap(e);
  }

});

module.exports = MyIconButton;


},{"material-ui":1,"react":1}]},{},[2])