(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
/**
 * @jsx React.DOM
 */

var React = window.React || require('react'),
  Router = window.Router || require('react-router'),
  RouteHandler = Router.RouteHandler,
  mui = window.mui || require('material-ui'),
  AppBar = mui.AppBar,
  AppCanvas = mui.AppCanvas,
  IconButton = mui.IconButton;

var Master = React.createClass({displayName: 'Master',

  mixins: [Router.Navigation,Router.State],

  render: function() {
    return (
      React.createElement(AppCanvas, {predefinedLayout: 1}, 

        React.createElement(AppBar, {className: "mui-dark-theme", showMenuIconButton: false, zDepth: 0}, 
          React.createElement("div", {className: "logo", onClick: this._onHeaderClick}, "微信图文排版"), 
          React.createElement(IconButton, {className: "github-icon-button", icon: "mui-icon-github", onTouchTap: this._onGithubTouchTap})
        ), 

        React.createElement(RouteHandler, null), 

        React.createElement("div", {className: "footer full-width-section mui-dark-theme"}, 
          React.createElement("p", null, 
            "Copyright@2015 Macy Wong."
          ), 
          React.createElement(IconButton, {className: "github-icon-button", icon: "mui-icon-github", onTouchTap: this._onGithubTouchTap})
        )

      )
    );
  },

  _onGithubTouchTap: function() {
    document.location.href='https://github.com/macyzz';
  },

  _onMenuIconButtonTouchTap: function() {
    this.refs.leftNav.toggle();
  },

  _onHeaderClick: function() {
    this.transitionTo('root');
  }
  
});

module.exports = Master;


},{"material-ui":1,"react":1,"react-router":1}]},{},[2])