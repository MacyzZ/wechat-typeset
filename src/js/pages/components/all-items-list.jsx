/**
 * @jsx React.DOM
*/

var React = window.React || require('react'),
  mui = window.mui || require('material-ui'),
  ItemContainer = require('./item-container.jsx'),
  MakeupItems = require('./makeup-items.jsx');

var AllItemsList = React.createClass({

  propTypes: {
    allList: React.PropTypes.array
  },

  render: function() {

    var items = this.props.allList.map((function(item) {
      return (
        <ItemContainer key={item.id}>
          {MakeupItems[item.name]({
            id: item.id,
            options: item.options,
            onClick: this.props.onHandler,
            isEdit: this.props.isEdit,
            colorScheme: this.props.colorScheme
          })}
        </ItemContainer>
      )
    }).bind(this));

    return (
        <div className="all-items-list">
          {items}
        </div>
    );
  }

});


module.exports = AllItemsList;



