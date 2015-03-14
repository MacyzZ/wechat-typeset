/**
 * @jsx React.DOM
*/

var React = window.React || require('react'),
  mui = window.mui || require('material-ui'),
  MyIconButton = require('../../components/my-icon-button.jsx'),
  ColorSchemePanel = require('./color-schemes.jsx'),
  DropDownMenu = mui.DropDownMenu,
  FloatingActionButton = mui.FloatingActionButton,
  Paper = mui.Paper;

var EditorPanel = React.createClass({

  propTypes: {
    onTouchTap: React.PropTypes.func
  },

  getInitialState: function() {
    return  {
      styleObj:this.props.model.obj
    }
  },

  componentDidMount: function() {
    this._positionPanel();
  },

  componentWillUnmount: function() {
    document.body.removeEventListener('click', this.refs.colorSchemePanel._dismissColorPicker);
  },

  render: function() {
    var menuItems = [
      { payload: '1', text: '10'},
      { payload: '2', text: '11'},
      { payload: '3', text: '12'},
      { payload: '4', text: '13'},
      { payload: '5', text: '14'},
      { payload: '6', text: '15'},
      { payload: '7', text: '16'},
      { payload: '8', text: '17'},
      { payload: '9', text: '18'},
    ];
    var selectedIndex = parseInt(this.state.styleObj.fontSize) - 10,
      colorItems = [],
      i = 0,
      colorOrder = ["textColor","bgColor","borderColor"],
      len = colorOrder.length;

    for(var j=0;j<len;j++) {
      for (var key in this.state.styleObj) {
        if (key == colorOrder[j]) {
          colorItems.push(<FloatingActionButton 
              className="editor-button" 
              key={i} 
              icon="none" 
              style={{backgroundColor: this.state.styleObj[key]}} 
              mini={true} 
              onTouchTap={this._showColorScheme.bind(this,key)} />);
          i++;
        }
      }
    }


    return (
        <Paper className="editor-panel">
          <DropDownMenu menuItems={menuItems} autoWidth={true} selectedIndex={selectedIndex} onChange={this._onFontSizeChange} />
          {colorItems}
          <ColorSchemePanel className="specific-color-schemes" zDepth={1} ref="colorSchemePanel" onHandler={this._setColor} />
        </Paper>
    );
  },


  _positionPanel: function() {
    var node = this.getDOMNode();
    if (this.props.position) {
      node.style.position = "absolute";
      node.style.top = this.props.position.top + "px";
      node.style.left = this.props.position.left + "px";
    }
  },

  _showColorScheme: function(key) {
    key === this.key?this.refs.colorSchemePanel.toggle():this.refs.colorSchemePanel.show();
    this.key = key;
  },

  _onFontSizeChange: function(e,selectedIndex,menuItem) {
    this.props.model.obj.fontSize = menuItem.text + "px";
  },

  _setColor: function(e) {
    target = e.target.classList.contains("mui-icon-button")? e.target : e.target.parentNode;
    this.props.model.obj[this.key] = target.style.color;
    this.setState({styleObj:this.props.model.obj});
    this.refs.colorSchemePanel.dismiss();
  }


});


module.exports = EditorPanel;

