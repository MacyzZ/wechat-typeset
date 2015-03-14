/**
 * @jsx React.DOM
*/

var React = window.React || require('react'),
  mui = window.mui || require('material-ui'),
  ColorPickerUtil = require('../utils/colorpicker.js'),
  Paper = mui.Paper,
  RaisedButton = mui.RaisedButton

var ColorPicker = React.createClass({

  propTypes: {
    openImmediately: React.PropTypes.bool,
    onHandler: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return  {
      open: this.props.openImmediately || false,
      color: ""
    }
  },

  componentDidMount: function() {
    ColorPickerUtil(this.refs.colorPicker.getDOMNode(),this._setColor)
  },
    
  render: function() {

    var style = this.state.open? {display:"block"}:{display:"none"}

    return (
        <Paper className="color-picker-container" innerClassName="color-picker-inner-container" zDepth={2} style={style}>
          <div id="color-picker" ref="colorPicker" className="color-picker">
          </div>
          <RaisedButton className="mini-btn" label="确定" primary={true} onTouchTap={this._onTouchTap} style={{backgroundColor:this.state.color}} />
          <RaisedButton className="mini-btn pull-right" label="取消" onTouchTap={this.dismiss} />
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

  _setColor: function(hex, hsv, rgb) {
    this.setState({color:hex});
  },

  _onTouchTap: function() {
    if (this.props.onHandler) {this.props.onHandler(this.state.color)};
    this.setState({open:false});
  }

});


module.exports = ColorPicker;

