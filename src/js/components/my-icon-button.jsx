/**
 * @jsx React.DOM
*/

var React = window.React || require('react'),
  mui = window.mui || require('material-ui'),
  EnhancedButton = mui.EnhancedButton,
  Icon = mui.Icon,
  Ripple = mui.Ripple;

var MyIconButton = React.createClass({

  propTypes: {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    icon: React.PropTypes.string.isRequired,
    onTouchTap: React.PropTypes.func
  },

  render: function() {

    return (
      <EnhancedButton className="specific-icon-button mui-icon-button" onTouchTap={this._onTouchTap} style={this.props.style}>
        <Ripple className="mui-icon-button-ripple" ref="ripple" />
        <Ripple className="mui-icon-button-focus-ripple" />
        <Icon icon={this.props.icon} />
      </EnhancedButton>
    );
  },

  _onTouchTap: function(e) {
    e.stopPropagation();
    if (!this.props.disabled) this.refs.ripple.animateFromCenter();
    if (this.props.onTouchTap) this.props.onTouchTap(e);
  }

});

module.exports = MyIconButton;

