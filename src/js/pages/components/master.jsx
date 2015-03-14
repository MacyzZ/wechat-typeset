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

var Master = React.createClass({

  mixins: [Router.Navigation,Router.State],

  render: function() {
    return (
      <AppCanvas predefinedLayout={1}>

        <AppBar className="mui-dark-theme" showMenuIconButton={false} zDepth={0}>
          <div className="logo" onClick={this._onHeaderClick}>微信图文排版</div>
          <IconButton className="github-icon-button" icon="mui-icon-github" onTouchTap={this._onGithubTouchTap} />
        </AppBar>

        <RouteHandler />

        <div className="footer full-width-section mui-dark-theme">
          <p>
            Copyright@2015 Macy Wong.
          </p>
          <IconButton className="github-icon-button" icon="mui-icon-github" onTouchTap={this._onGithubTouchTap} />
        </div>

      </AppCanvas>
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

