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



},{"material-ui":1,"react":1}]},{},[2])