/**
 * @jsx React.DOM
*/

var React = window.React || require('react'),
  mui = window.mui || require('material-ui'),
  Icon = mui.Icon,
  classSet = React.addons.classSet;

var DragButton = React.createClass({

  propTypes: {
    show: React.PropTypes.bool
  },
  
  render: function() {

    var delClasses = classSet({
      'drag-btn': true,
      'is-shown': this.props.show,
      'is-hidden': !this.props.show
    });

    return (
      <div className={delClasses} onClick={this.props.onClick}>
        <Icon icon="social-pages" />
      </div>
    );
  }

});


module.exports = DragButton;



