/**
 * @jsx React.DOM
*/

var React = window.React || require('react'),
  Router = window.Router || require('react-router'),
  Link = Router.Link,
  mui = window.mui || require('material-ui'),
  Paper = mui.Paper;

var PaperFeature = React.createClass({

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
        <Paper className="paper-feature" zDepth={this.state.zDepth} onMouseOver={this._onMouseOver} onMouseOut={this._onMouseOut}>
          <h3 className="paper-feature-title">{this.props.title}</h3>
          <Link to={this.props.route}><img className="paper-feature-image" src={this.props.img} /></Link>
        </Paper>
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


