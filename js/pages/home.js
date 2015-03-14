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



},{"material-ui":1,"react":1,"react-router":1}],3:[function(require,module,exports){
/**
 * @jsx React.DOM
*/

var React = window.React || require('react'),
  Router = window.Router || require('react-router'),
  mui = window.mui || require('material-ui'),
  PaperFeature = require('../components/paper-feature.jsx');

var HomePage = React.createClass({displayName: 'HomePage',

  mixins: [Router.Navigation],

  render: function() {

    return (
        React.createElement("div", {className: "mui-app-content-canvas home-page"}, 
          React.createElement("div", {className: "full-width-section home-page-hero"}, 
            React.createElement("div", {className: "tagline"}, 
              React.createElement("h1", null, "微信图文排版小助手"), 
              React.createElement("p", null, "使用React,Sass,根据Google Material Design捣鼓出的微信公共号图文排版小助手。")
            )
          ), 
          React.createElement("div", {className: "full-width-section home-features"}, 
            React.createElement("div", {className: "feature-container full-width-section-content"}, 
              React.createElement(PaperFeature, {title: "创建新图文", route: "edit", img: "img/newitem.png"})
            )
          )
        )
    );
  }
});

module.exports = HomePage;


},{"../components/paper-feature.jsx":2,"material-ui":1,"react":1,"react-router":1}]},{},[3])