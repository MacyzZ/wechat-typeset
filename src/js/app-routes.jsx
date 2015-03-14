/**
 * @jsx React.DOM
 */
 
var React = window.React || require('react'), 
  Router = window.Router || require('react-router'),
  Route = Router.Route,
  DefaultRoute = Router.DefaultRoute,

  Master = require('./pages/components/master.jsx'),
  Home = require('./pages/home.jsx');
  EditNew = require('./pages/edit.jsx');

  var AppRoutes = (
      <Route name="root" path="/" handler={Master}>
        <Route name="home" handler={Home} />
        <Route name="edit" handler={EditNew} />
        
        <DefaultRoute handler={Home}/>
      </Route>
    );

module.exports = AppRoutes;
