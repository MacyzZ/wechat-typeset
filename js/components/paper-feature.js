(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
/**
 * @jsx React.DOM
*/

var React = window.React || require('react'),
  Router = window.Router || require('react-router'),
  Link = Router.Link,
  mui = window.mui || require('material-ui'),
  Paper = mui.Paper;

var PaperFeature = React.createClass({displayName: 'PaperFeature',

  propTypes: {
    title: React.PropTypes.string,
    route: React.PropTypes.string,
    img: React.PropTypes.string
  },

  getInitialState: function() {
    return {zDepth: 0};
  },

  render: function() {

    return (
        React.createElement(Paper, {className: "paper-feature", zDepth: this.state.zDepth, onMouseOver: this._onMouseOver, onMouseOut: this._onMouseOut}, 
          React.createElement("h3", {className: "paper-feature-title"}, this.props.title), 
          React.createElement(Link, {to: this.props.route}, React.createElement("img", {className: "paper-feature-image", src: this.props.img}))
        )
    );
  },

  _onMouseOver: function() {
    this.setState({zDepth: 4});
  },

  _onMouseOut: function() {
    this.setState({zDepth: 0});
  }

});

module.exports = PaperFeature;



},{"material-ui":1,"react":1,"react-router":1}]},{},[2])