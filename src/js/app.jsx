/**
 * @jsx React.DOM
 */
 
(function () {

  var React = window.React || require('react'),
    Router = window.Router || require('react-router'),
    AppRoutes = require('./app-routes.jsx'),
    injectTapEventPlugin = window.injectTapEventPlugin || require("react-tap-event-plugin");

  injectTapEventPlugin();

  Router
    .create({
      routes: AppRoutes,
      scrollBehavior: Router.ScrollToTopBehavior
    })
    .run(function (Handler) {
      React.render(<Handler/>, document.body);
    });

})();
