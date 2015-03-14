/**
 * @jsx React.DOM
*/

var React = window.React || require('react'),
  Router = window.Router || require('react-router'),
  mui = window.mui || require('material-ui'),
  PaperFeature = require('../components/paper-feature.jsx');

var HomePage = React.createClass({

  mixins: [Router.Navigation],

  render: function() {

    return (
        <div className="mui-app-content-canvas home-page">
          <div className="full-width-section home-page-hero">
            <div className="tagline">
              <h1>微信图文排版小助手</h1>
              <p>使用React,Sass,根据Google Material Design捣鼓出的微信公共号图文排版小助手。</p>
            </div>
          </div>
          <div className="full-width-section home-features">
            <div className="feature-container full-width-section-content">
              <PaperFeature title="创建新图文" route="edit" img="img/newitem.png" />
            </div>
          </div>
        </div>
    );
  }
});

module.exports = HomePage;

