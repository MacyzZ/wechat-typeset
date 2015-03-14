/**
 * @jsx React.DOM
*/

var React = window.React || require('react'),
  mui = window.mui || require('material-ui'),
  MyIconButton = require('../../components/my-icon-button.jsx'),
  ColorPicker = require('../../components/color-picker.jsx'),
  Paper = mui.Paper;

var ColorSchemePanel = React.createClass({

  propTypes: {
    openImmediately: React.PropTypes.bool,
    onTouchTap: React.PropTypes.func
  },

  getInitialState: function() {
    return  {
      open: this.props.openImmediately || false,
      colors: ["#fff","#8e24aa","#b388ff","#ec407a","#283593","#5cb85c","#33bbed","#cddc39","#00bcd4","#ff8140","#795548","#607d8b"]
    }
  },
    
  componentWillUnMount: function() {
    document.body.removeEventListener('click', this._dismissColorPicker);
  },

  render: function() {

    var style = this.state.open? {display:"block"}:{display:"none"}

    items = this.state.colors.map((function(item,index) {
      return (
        <MyIconButton 
          key={index} 
          icon="action-grade" 
          style={{color:item}} 
          primary={true} 
          onTouchTap={this.props.onHandler}/>)  
    }).bind(this))

    return (
        <Paper className={this.props.className} zDepth={this.props.zDepth} style={style}>
          {items}
          <MyIconButton icon="content-add" ref="addButton" style={{color:"#878787"}} primary={true} onTouchTap={this._showColorPicker} />
          <ColorPicker ref="colorPicker" zDepth={2} onHandler={this._addColor}/>
        </Paper>
    );
  },

  dismiss: function() {
    this.setState({ open: false });
  },

  show: function() {
    this.setState({ open: true});
  },

  toggle: function() {
    this.state.open? this.setState({ open: false }) : this.setState({ open: true });
  },

  _showColorPicker: function() {
    this.refs.colorPicker.toggle();
    document.body.addEventListener('click', this._dismissColorPicker);
  },

  _dismissColorPicker: function() {
    var containerNode = this.refs.colorPicker.getDOMNode();
    var addNode = this.refs.addButton.getDOMNode();
    if (!containerNode.contains(event.target) && !addNode.contains(event.target)) {
      this.refs.colorPicker.dismiss();
      document.body.removeEventListener('click', this._dismissColorPicker);
    }
  },
  
  _addColor: function(color) {
    this.state.colors.push(color);
    this.setState({ colors:this.state.colors });
  }


});


module.exports = ColorSchemePanel;




