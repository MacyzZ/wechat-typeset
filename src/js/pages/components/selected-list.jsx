/**
 * @jsx React.DOM
*/

var React = window.React || require('react'),
  mui = window.mui || require('material-ui'),
  Paper = mui.Paper,
  SelectedItemContainer = require('./selected-item-container.jsx'),
  MakeupItems = require('./makeup-items.jsx');

var SelectedList = React.createClass({

  propTypes: {
    selected: React.PropTypes.array
  },

  render: function() {

    var props = null;

    items = this.props.selected.map((function(item) {

      props = {
        key: item.id,
        id: item.id,
        name: item.name,
        onDelClick: this.props.onDelHandler,
        onDragStart: this.props.onDragHandler
      }

      return (
        <SelectedItemContainer {...props}>
          {MakeupItems[item.name]({
            id: item.id,
            options: item.options,
            isEdit: this.props.isEdit,
            onEditClick: this.props.onHandler,
            colorScheme: this.props.colorScheme,
            isEditColor: this.props.isEditColor
          })}
        </SelectedItemContainer>
      )
    }).bind(this));

    return (
        <Paper className="selected-items-list" zDepth={1}>
          <div className="selected-inner-container" onDragEnter={this._onDragEnter} onDragOver={this._onDragOver} onDrop={this._onDragDrop} >
            {items}
          </div>
        </Paper>
    );
  },


  _onDragEnter: function(e) {
    console.log('enter');
    e.preventDefault();
  },

  _onDragOver: function(e) {
    console.log('over');
    e.preventDefault();
  },

  _onDragDrop: function(e) {
    console.log('drop');
    node = e.target;
    if(this.props.onDropHandler) this.props.onDropHandler(e);
  }

});


module.exports = SelectedList;

