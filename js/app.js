(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
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
      React.createElement(Route, {name: "root", path: "/", handler: Master}, 
        React.createElement(Route, {name: "home", handler: Home}), 
        React.createElement(Route, {name: "edit", handler: EditNew}), 
        
        React.createElement(DefaultRoute, {handler: Home})
      )
    );

module.exports = AppRoutes;

},{"./pages/components/master.jsx":15,"./pages/edit.jsx":18,"./pages/home.jsx":19,"react":1,"react-router":1}],3:[function(require,module,exports){
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
      React.render(React.createElement(Handler, null), document.body);
    });

})();

},{"./app-routes.jsx":2,"react":1,"react-router":1,"react-tap-event-plugin":1}],4:[function(require,module,exports){
/**
 * @jsx React.DOM
*/

var React = window.React || require('react'),
  mui = window.mui || require('material-ui'),
  ColorPickerUtil = require('../utils/colorpicker.js'),
  Paper = mui.Paper,
  RaisedButton = mui.RaisedButton

var ColorPicker = React.createClass({displayName: 'ColorPicker',

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
        React.createElement(Paper, {className: "color-picker-container", innerClassName: "color-picker-inner-container", zDepth: 2, style: style}, 
          React.createElement("div", {id: "color-picker", ref: "colorPicker", className: "color-picker"}
          ), 
          React.createElement(RaisedButton, {className: "mini-btn", label: "确定", primary: true, onTouchTap: this._onTouchTap, style: {backgroundColor:this.state.color}}), 
          React.createElement(RaisedButton, {className: "mini-btn pull-right", label: "取消", onTouchTap: this.dismiss})
        )
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


},{"../utils/colorpicker.js":20,"material-ui":1,"react":1}],5:[function(require,module,exports){
/**
 * @jsx React.DOM
*/

var React = window.React || require('react'),
  mui = window.mui || require('material-ui'),
  EnhancedButton = mui.EnhancedButton,
  Icon = mui.Icon,
  Ripple = mui.Ripple;

var MyIconButton = React.createClass({displayName: 'MyIconButton',

  propTypes: {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    icon: React.PropTypes.string.isRequired,
    onTouchTap: React.PropTypes.func
  },

  render: function() {

    return (
      React.createElement(EnhancedButton, {className: "specific-icon-button mui-icon-button", onTouchTap: this._onTouchTap, style: this.props.style}, 
        React.createElement(Ripple, {className: "mui-icon-button-ripple", ref: "ripple"}), 
        React.createElement(Ripple, {className: "mui-icon-button-focus-ripple"}), 
        React.createElement(Icon, {icon: this.props.icon})
      )
    );
  },

  _onTouchTap: function(e) {
    e.stopPropagation();
    if (!this.props.disabled) this.refs.ripple.animateFromCenter();
    if (this.props.onTouchTap) this.props.onTouchTap(e);
  }

});

module.exports = MyIconButton;


},{"material-ui":1,"react":1}],6:[function(require,module,exports){
/**
 * @jsx React.DOM
*/

var React = window.React || require('react'),
  Router = window.Router || require('react-router'),
  Link = Router.Link,
  mui = window.mui || require('material-ui'),
  Paper = mui.Paper;

var PaperFeature = React.createClass({displayName: 'PaperFeature',

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
        React.createElement(Paper, {className: "paper-feature", zDepth: this.state.zDepth, onMouseOver: this._onMouseOver, onMouseOut: this._onMouseOut}, 
          React.createElement("h3", {className: "paper-feature-title"}, this.props.title), 
          React.createElement(Link, {to: this.props.route}, React.createElement("img", {className: "paper-feature-image", src: this.props.img}))
        )
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



},{"material-ui":1,"react":1,"react-router":1}],7:[function(require,module,exports){

var StyleModel = function(obj){
  this.obj = Object.create(obj);
};

StyleModel.prototype = {
  constructor: StyleModel,
  
  on: function(fn) {
    Object.observe(this.obj, fn);
  },
  off: function(fn) {
    Object.unobserve(this.obj, fn);
  }
}

module.exports = StyleModel;


},{}],8:[function(require,module,exports){
/**
 * @jsx React.DOM
*/

var React = window.React || require('react'),
  mui = window.mui || require('material-ui'),
  ItemContainer = require('./item-container.jsx'),
  MakeupItems = require('./makeup-items.jsx');

var AllItemsList = React.createClass({displayName: 'AllItemsList',

  propTypes: {
    allList: React.PropTypes.array
  },

  render: function() {

    var items = this.props.allList.map((function(item) {
      return (
        React.createElement(ItemContainer, {key: item.id}, 
          MakeupItems[item.name]({
            id: item.id,
            options: item.options,
            onClick: this.props.onHandler,
            isEdit: this.props.isEdit,
            colorScheme: this.props.colorScheme
          })
        )
      )
    }).bind(this));

    return (
        React.createElement("div", {className: "all-items-list"}, 
          items
        )
    );
  }

});


module.exports = AllItemsList;




},{"./item-container.jsx":13,"./makeup-items.jsx":14,"material-ui":1,"react":1}],9:[function(require,module,exports){
/**
 * @jsx React.DOM
*/

var React = window.React || require('react'),
  mui = window.mui || require('material-ui'),
  MyIconButton = require('../../components/my-icon-button.jsx'),
  ColorPicker = require('../../components/color-picker.jsx'),
  Paper = mui.Paper;

var ColorSchemePanel = React.createClass({displayName: 'ColorSchemePanel',

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
        React.createElement(MyIconButton, {
          key: index, 
          icon: "action-grade", 
          style: {color:item}, 
          primary: true, 
          onTouchTap: this.props.onHandler}))  
    }).bind(this))

    return (
        React.createElement(Paper, {className: this.props.className, zDepth: this.props.zDepth, style: style}, 
          items, 
          React.createElement(MyIconButton, {icon: "content-add", ref: "addButton", style: {color:"#878787"}, primary: true, onTouchTap: this._showColorPicker}), 
          React.createElement(ColorPicker, {ref: "colorPicker", zDepth: 2, onHandler: this._addColor})
        )
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





},{"../../components/color-picker.jsx":4,"../../components/my-icon-button.jsx":5,"material-ui":1,"react":1}],10:[function(require,module,exports){
/**
 * @jsx React.DOM
*/

var React = window.React || require('react'),
  mui = window.mui || require('material-ui'),
  Icon = mui.Icon,
  classSet = React.addons.classSet;

var DelButton = React.createClass({displayName: 'DelButton',

  propTypes: {
    show: React.PropTypes.bool
  },
  
  render: function() {

    var delClasses = classSet({
      'del-btn': true,
      'is-shown': this.props.show,
      'is-hidden': !this.props.show
    });

    return (
      React.createElement("div", {className: delClasses, onClick: this.props.onClick}, 
        React.createElement(Icon, {icon: "action-delete"})
      )
    );
  }

});


module.exports = DelButton;



},{"material-ui":1,"react":1}],11:[function(require,module,exports){
/**
 * @jsx React.DOM
*/

var React = window.React || require('react'),
  mui = window.mui || require('material-ui'),
  Icon = mui.Icon,
  classSet = React.addons.classSet;

var DragButton = React.createClass({displayName: 'DragButton',

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
      React.createElement("div", {className: delClasses, onClick: this.props.onClick}, 
        React.createElement(Icon, {icon: "social-pages"})
      )
    );
  }

});


module.exports = DragButton;




},{"material-ui":1,"react":1}],12:[function(require,module,exports){
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

var EditorPanel = React.createClass({displayName: 'EditorPanel',

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
          colorItems.push(React.createElement(FloatingActionButton, {
              className: "editor-button", 
              key: i, 
              icon: "none", 
              style: {backgroundColor: this.state.styleObj[key]}, 
              mini: true, 
              onTouchTap: this._showColorScheme.bind(this,key)}));
          i++;
        }
      }
    }


    return (
        React.createElement(Paper, {className: "editor-panel"}, 
          React.createElement(DropDownMenu, {menuItems: menuItems, autoWidth: true, selectedIndex: selectedIndex, onChange: this._onFontSizeChange}), 
          colorItems, 
          React.createElement(ColorSchemePanel, {className: "specific-color-schemes", zDepth: 1, ref: "colorSchemePanel", onHandler: this._setColor})
        )
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


},{"../../components/my-icon-button.jsx":5,"./color-schemes.jsx":9,"material-ui":1,"react":1}],13:[function(require,module,exports){
/**
 * @jsx React.DOM
*/

var React = window.React || require('react'),
  mui = window.mui || require('material-ui'),
  Paper = mui.Paper;

var ItemsContainer = React.createClass({displayName: 'ItemsContainer',
  
  getInitialState: function(){
    return {zDepth: 0}
  },

  render: function() {
    var dialogActions = [
      { text: 'CANCEL' },
      { text: 'TEST' },
      { text: 'SUBMIT', onClick: this._showMessage }
    ];

    return (
        React.createElement(Paper, {className: "item-container", zDepth: this.state.zDepth, onMouseOver: this._onMouseOver, onMouseOut: this._onMouseOut}, 
          React.createElement("div", {className: "item-container-content"}, 
            this.props.children
          )
        )
    );
  },

  _onMouseOver: function() {
    this.setState({zDepth: 1});
  },

  _onMouseOut: function() {
    this.setState({zDepth: 0});
  }

});


module.exports = ItemsContainer;





},{"material-ui":1,"react":1}],14:[function(require,module,exports){
/**
 * @jsx React.DOM
*/

var React = window.React || require('react'),
  mui = window.mui || require('material-ui'),
  StyleModel = require('../../models/style.js');

var mixinClick = {
  _onClick: function() {
    node = this.getDOMNode();
    if (this.props.onClick) {
      this.props.onClick(node);
    } else {
      if (this.model) {
        this.props.onEditClick(this.model);
      }
    }
  }
}

var mixinEdit = {
            
  componentDidMount: function() {
    if (this.props.isEdit) {
      this.model = new StyleModel(this.state);
      this.model.on(this.updateState);
    }
  },
  
  updateState: function(changes) {
    this.setState(changes[0].object);
    if (this.props.ctrlParent) {
      this.props.ctrlParent(changes[0].object);
    }
  },
  
  //在元素解除挂载后解绑监听事件
  //若是直接在真实DOM中remove掉元素，
  //则应手动调用此方法解绑事件
  componentWillUnMount: function() {
    if (this.model) {
      this.model.off(this.updateState);
    }
  }
}

var mixinControlParent = {
  setParentState: function() {
    var nextState = this.state;
    for (prop in nextState) {
      if (prop === arguments[0]) {
        nextState[prop] = arguments[1][prop]
      }
    }
    this.setState(nextState);
  }
}

/**
 * Heading items
*/
var H1Item = React.createClass({displayName: 'H1Item',

  mixins: [mixinClick,mixinEdit],

  getInitialState: function() {
    return {
      fontSize: "16px",
      textColor: "#000"
    }
  },

  render: function() {
    var style = {
      fontSize: this.state.fontSize,
      fontWeight: "500",
      color: this.props.isEdit?this.state.textColor : "#000"
    },
    props = {
      onClick: this._onClick,
      contentEditable: this.props.isEdit,
      "data-name": "H1",
      "data-title": this.props.options.title,
      "data-id": this.props.id, 
      style: style
    }

    return (
      React.createElement("h1", React.__spread({},  props), 
        this.props.options.title
      )
    )
  }
  
});

var H2Item = React.createClass({displayName: 'H2Item',
  
  mixins: [mixinClick,mixinEdit],
    
  getInitialState: function() {
    return {
      fontSize: "14px",
      textColor: "#000"
    }
  },

  render: function() {
    
    var style = {
      fontSize: this.state.fontSize,
      fontWeight: "500",
      color: this.props.isEdit?this.state.textColor : "#000"
    },
    props = {
      onClick: this._onClick,
      contentEditable: this.props.isEdit,
      "data-name": "H2",
      "data-title": this.props.options.title,
      "data-id": this.props.id,
      style: style
    }

    return (
      React.createElement("h2", React.__spread({},  props), 
        this.props.options.title
      )  
    )
  }

});

var HeadingItem1 = React.createClass({displayName: 'HeadingItem1',

  mixins: [mixinClick,mixinEdit],
    
  getInitialState: function() {
    return {
      fontSize: "14px",
      textColor: this.props.colorScheme.balance,
      bgColor: this.props.colorScheme.normal
    }
  },

  render: function() {

    var style = {
      display: "inline-block",
      whiteSpace: "pre-wrap",
      padding: "4px 10px",
      fontSize: this.state.fontSize,
      fontWeight: "700",
      borderRadius: "6px",
      boxShadow: "0.2em 0.2em 0.1em rgba(99,99,99,.6)",
      backgroundColor: this.props.isEdit ? this.state.bgColor : this.props.colorScheme.normal,
      color: this.props.isEdit ? this.state.textColor : this.props.colorScheme.balance
    },
    props = {
      onClick: this._onClick,
      "data-name": "HI1",
      "data-title": this.props.options.title,
      "data-id": this.props.id
    }

    
    return (
      React.createElement("h2", React.__spread({},  props), 
        React.createElement("span", {style: style, contentEditable: this.props.isEdit}, 
          this.props.options.title
        )
      )
    );
  }
});


var HeadingItem2 = React.createClass({displayName: 'HeadingItem2',

  mixins: [mixinClick,mixinControlParent],
    
  getInitialState: function() {
    return {
      bgColor: this.props.colorScheme.normal
    }
  },

  render: function() {

    var style = {
      display:"inline-block",
      borderBottomWidth: "2px",
      borderBottomStyle: "solid",
      borderBottomColor: this.props.isEdit?this.state.bgColor:this.props.colorScheme.normal
    },
    props = {
      onClick: this._onClick,
      "data-name": "HI2",
      "data-title": this.props.options.title,
      "data-id": this.props.id,
      style: style
    }
    
    return (
      React.createElement("h2", React.__spread({},  props), 
        React.createElement(HI2Sequence, React.__spread({},  this.props, {ctrlParent: this.setParentState.bind(this,"bgColor")})), 
        React.createElement(HI2Title, React.__spread({},  this.props))
      )  
    );

  }

});

var HI2Sequence = React.createClass({displayName: 'HI2Sequence',
  
  mixins: [mixinClick,mixinEdit],

  getInitialState: function() {
    return {
      fontSize: "14px",
      textColor: this.props.colorScheme.balance,
      bgColor: this.props.colorScheme.normal,
    }
  },

  render: function() {

    var style = { 
      display: "inline-block",
      whiteSpace: "pre-wrap",
      padding: "0 2px 3px 0",
      fontWeight: "700",
      fontSize: this.state.fontSize,
      color: this.props.isEdit ? this.state.textColor : this.props.colorScheme.balance
    },
    innerStyle = {
      display: "inline-block",
      minHeight: "8px",
      minWidth: "20px",
      padding: "4px 10px",
      fontSize: "inherit",
      lineHeight: "150%",
      borderTopLeftRadius: "80%",
      borderTopRightRadius: "100%",
      borderBottomRightRadius: "90%",
      borderBottomLeftRadius: "20%",
      marginRight: "8px",
      backgroundColor: this.props.isEdit ? this.state.bgColor : this.props.colorScheme.normal
    }
    
    return (
      React.createElement("span", {onClick: this.props.isEdit?this._onClick:null, style: style, contentEditable: "true"}, 
        React.createElement("span", {style: innerStyle}, 
          React.createElement("section", null, "1")
        )
      )
    )
  }
  
});

var HI2Title = React.createClass({displayName: 'HI2Title',

  mixins: [mixinClick,mixinEdit],
    
  getInitialState: function() {
    return {
      fontSize: "14px",
      textColor: "#000"
    }
  },

  render: function() {

    var style = {
      fontSize: this.state.fontSize,
      color: this.state.textColor
    }
    
    return (
      React.createElement("span", {onClick: this.props.isEdit?this._onClick:null, style: style, contentEditable: "true"}, 
        this.props.options.title
      )
    )
  }
  
});



/**
 * Content
*/ 

var SectionItem = React.createClass({displayName: 'SectionItem',
 
  mixins: [mixinClick],

  render: function() {

    var props = {
      onClick: this._onClick,
      "data-name": "S1",
      "data-title": this.props.options.title,
      "data-text": this.props.options.text,
      "data-id": this.props.id
    }
  
    return (
      React.createElement("section", React.__spread({},  props), 
        React.createElement(H2, React.__spread({},  this.props)), 
        React.createElement(PA, React.__spread({},  this.props))
      )
    );
  }

});

var H2 = React.createClass({displayName: 'H2',
  
  mixins: [mixinClick,mixinEdit],
    
  getInitialState: function() {
    return {
      fontSize: "16px",
      textColor: this.props.colorScheme.normal
    }
  },

  
  render: function() {
    
    var props = {
      onClick: this.props.isEdit ? this._onClick : null,
      contentEditable: this.props.isEdit,
      style: {
        fontSize: this.state.fontSize,
        color: this.props.isEdit ? this.state.textColor : this.props.colorScheme.normal
      }
    }
  
    return (
      React.createElement("h2", React.__spread({},  props), 
        this.props.options.title
      )
    )
  }
});

var PA = React.createClass({displayName: 'PA',
  
  mixins: [mixinClick,mixinEdit],
    
  getInitialState: function() {
    return {
      fontSize: "14px",
      textColor: "#000",
    }
  },

  
  render: function() {
    
    var props = {
      onClick: this.props.isEdit ? this._onClick : null,
      contentEditable: this.props.isEdit,
      style: {
        fontSize: this.state.fontSize,
        color: this.state.textColor
      }
    }
    
    return (
      React.createElement("p", React.__spread({},  props), 
        this.props.options.text
      )
    )
  }
});

var BH1Title = React.createClass({displayName: 'BH1Title',

  mixins: [mixinClick,mixinEdit],
    
  getInitialState: function() {
    return {
      fontSize: "16px",
      textColor: this.props.colorScheme.normal,
      borderColor: this.props.colorScheme.normal
    }
  },

  render: function() {
    
    var style = {
      fontSize: this.state.fontSize,
      color: this.props.isEdit ? this.state.textColor : this.props.colorScheme.normal
    }
  
    return (
      React.createElement("h2", {onClick: this.props.isEdit?this._onClick:null, style: style}, 
        this.props.options.title
      )
    )
  }

});

var BhItem1 = React.createClass({displayName: 'BhItem1',

  mixins: [mixinClick,mixinControlParent],

  getInitialState: function() {
    return {
      borderColor: this.props.colorScheme.normal
    }
  },
  
  render: function() {
    var style = {
      borderLeftWidth: "3px",
      borderLeftStyle: "solid",
      borderColor: this.props.isEdit ? this.state.borderColor : this.props.colorScheme.normal,
      paddingLeft: "8px"
    },
    props = {
      onClick: this._onClick,
      contentEditable: this.props.isEdit,
      "data-name": "BH1",
      "data-title": this.props.options.title,
      "data-text": this.props.options.text,
      "data-id": this.props.id,
      style: style
    }

    return (
      React.createElement("blockquote", React.__spread({},  props), 
        React.createElement(BH1Title, React.__spread({},  this.props, {ctrlParent: this.setParentState.bind(this,"borderColor")})), 
        React.createElement(PA, React.__spread({},  this.props))
      )
    );
  }

});

var BpItem1 = React.createClass({displayName: 'BpItem1',

  mixins: [mixinClick,mixinEdit],
  
  getInitialState: function() {
    return {
      fontSize: "13px",
      textColor: "#000",
      borderColor: this.props.colorScheme.normal
    }
  },

  render: function() {
    var style = {
      fontSize: this.state.fontSize,
      paddingLeft: "8px",
      margin:"3px 0",
      borderLeftWidth: "3px",
      borderLeftStyle: "solid",
      borderColor: this.props.isEdit ? this.state.borderColor : this.props.colorScheme.normal,
      color: this.props.isEdit ? this.state.textColor : "#000"
    },
    props = {
      onClick: this._onClick,
      "data-name": "BP1",
      "data-title": this.props.options.title,
      "data-text": this.props.options.text,
      "data-id": this.props.id,
      style: style
    }
  
    return (
      React.createElement("blockquote", React.__spread({},  props), 
        React.createElement("p", {contentEditable: this.props.isEdit}, 
          this.props.options.text, 
          React.createElement("br", null), 
          this.props.options.text
        )
      )
    );
  }

});


var CardItem1 = React.createClass({displayName: 'CardItem1',
  
  mixins: [mixinClick,mixinEdit],

  getInitialState: function() {
    return {
      fontSize: "14px",
      textColor: "#000"
    }
  },

  render: function() {
    var style = {
      fontSize: this.state.fontSize,
      fontWeight: "500",
      color: this.props.isEdit?this.state.textColor : "#000",
      marginBottom: "3px",
      marginRight: "3px",
      padding: "6px",
      border: "1px solid #eee",
      boxShadow: "3px 3px 1px #a6a0a0",
    },
    props = {
      onClick: this._onClick,
      contentEditable: this.props.isEdit,
      "data-name": "C1",
      "data-text": this.props.options.text,
      "data-id": this.props.id,
      style: style
    }

    return (
      React.createElement("section", React.__spread({},  props), 
        this.props.options.text
      )
    );
  }

});

module.exports = {
  H1: H1Item, 
  H2: H2Item, 
  HI1: HeadingItem1, 
  HI2: HeadingItem2, 
  S1: SectionItem, 
  BH1: BhItem1,
  BP1: BpItem1,
  C1: CardItem1
};





},{"../../models/style.js":7,"material-ui":1,"react":1}],15:[function(require,module,exports){
/**
 * @jsx React.DOM
 */

var React = window.React || require('react'),
  Router = window.Router || require('react-router'),
  RouteHandler = Router.RouteHandler,
  mui = window.mui || require('material-ui'),
  AppBar = mui.AppBar,
  AppCanvas = mui.AppCanvas,
  IconButton = mui.IconButton;

var Master = React.createClass({displayName: 'Master',

  mixins: [Router.Navigation,Router.State],

  render: function() {
    return (
      React.createElement(AppCanvas, {predefinedLayout: 1}, 

        React.createElement(AppBar, {className: "mui-dark-theme", showMenuIconButton: false, zDepth: 0}, 
          React.createElement("div", {className: "logo", onClick: this._onHeaderClick}, "微信图文排版"), 
          React.createElement(IconButton, {className: "github-icon-button", icon: "mui-icon-github", onTouchTap: this._onGithubTouchTap})
        ), 

        React.createElement(RouteHandler, null), 

        React.createElement("div", {className: "footer full-width-section mui-dark-theme"}, 
          React.createElement("p", null, 
            "Copyright@2015 Macy Wong."
          ), 
          React.createElement(IconButton, {className: "github-icon-button", icon: "mui-icon-github", onTouchTap: this._onGithubTouchTap})
        )

      )
    );
  },

  _onGithubTouchTap: function() {
    document.location.href='https://github.com/macyzz';
  },

  _onMenuIconButtonTouchTap: function() {
    this.refs.leftNav.toggle();
  },

  _onHeaderClick: function() {
    this.transitionTo('root');
  }
  
});

module.exports = Master;


},{"material-ui":1,"react":1,"react-router":1}],16:[function(require,module,exports){
/**
 * @jsx React.DOM
*/

var React = window.React || require('react'),
  mui = window.mui || require('material-ui'),
  Paper = mui.Paper,
  DelButton = require('./del-btn.jsx');
  DragButton = require('./drag-btn.jsx');

var SelectedItemContainer = React.createClass({displayName: 'SelectedItemContainer',
  
  getInitialState: function(){
    return {zDepth: 0,show: false}
  },

  render: function() {
    var props = {
      className: "selected-item-container",
      innerClassName: "selected-item-parent-container",
      draggable: true,
      zDepth: this.state.zDepth,
      "data-id": this.props.id,
      "data-name": this.props.name,
      onDragStart: this._onDragStart,
      onMouseOver: this._onMouseOver,
      onMouseOut: this._onMouseOut
    }

    return (
      React.createElement(Paper, React.__spread({},  props), 
        this.props.children, 
        React.createElement(DelButton, {show: this.state.show, onClick: this._onDelClick}, "删除"), 
        React.createElement(DragButton, {show: this.state.show}, "移动")
      )
    );
  },

  _onDelClick: function() {
    node = this.getDOMNode();
    if(this.props.onDelClick) this.props.onDelClick(node);
  },

  _onDragStart: function(e) {
    e.dataTransfer.effectAllowed='move';
    node = this.getDOMNode();
    if(this.props.onDragStart) this.props.onDragStart(node);
  },

  _onMouseOver: function() {
    this.setState({show: true});
  },

  _onMouseOut: function() {
    this.setState({show: false});
  }

});


module.exports = SelectedItemContainer;


},{"./del-btn.jsx":10,"./drag-btn.jsx":11,"material-ui":1,"react":1}],17:[function(require,module,exports){
/**
 * @jsx React.DOM
*/

var React = window.React || require('react'),
  mui = window.mui || require('material-ui'),
  Paper = mui.Paper,
  SelectedItemContainer = require('./selected-item-container.jsx'),
  MakeupItems = require('./makeup-items.jsx');

var SelectedList = React.createClass({displayName: 'SelectedList',

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
        React.createElement(SelectedItemContainer, React.__spread({},  props), 
          MakeupItems[item.name]({
            id: item.id,
            options: item.options,
            isEdit: this.props.isEdit,
            onEditClick: this.props.onHandler,
            colorScheme: this.props.colorScheme,
            isEditColor: this.props.isEditColor
          })
        )
      )
    }).bind(this));

    return (
        React.createElement(Paper, {className: "selected-items-list", zDepth: 1}, 
          React.createElement("div", {className: "selected-inner-container", onDragEnter: this._onDragEnter, onDragOver: this._onDragOver, onDrop: this._onDragDrop}, 
            items
          )
        )
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


},{"./makeup-items.jsx":14,"./selected-item-container.jsx":16,"material-ui":1,"react":1}],18:[function(require,module,exports){
/**
 * @jsx React.DOM
*/

var React = window.React || require('react'),
  Router = window.Router || require('react-router'),
  mui = window.mui || require('material-ui'),
  RaisedButton = mui.RaisedButton,
  AllItemsList = require('./components/all-items-list.jsx'),
  SelectedList = require('./components/selected-list.jsx'),
  ColorSchemePanel = require('./components/color-schemes.jsx'),
  EditorPanel = require('./components/editor-panel.jsx');

var EditPage = React.createClass({displayName: 'EditPage',

  mixins: [Router.Navigation],

  statics: {
    /*
    willTransitionTo: function(transition, params) {
    },
    */

    willTransitionFrom: function(transition, component) {
      if(!confirm('正在编辑,确定离开页面？')) {
        transition.abort();
      }
    }
  },
      
  getInitialState: function(){
    return {
      
      allList: [
        {name: "H1", id: 0, options: {title: "1号标题"}}, 
        {name: "H2", id: 1, options: {title: "2号标题"}}, 
        {name: "HI1", id: 2, options: {title: "输入标题"}}, 
        {name: "HI2", id: 3, options: {title: "输入标题"}}, 
        {name: "S1", id: 4, options: {title: "请输入标题", text: "请输入内容"}},
        {name: "BH1", id: 5, options: {title: "输入标题", text: "输入内容"}},
        {name: "BP1", id: 6, options: {text: "输入内容"}},
        {name: "C1", id: 7, options: {text: "输入内容"}}
        
      ],

      selected: [
        {name: "H1", id: 0, options: {title: "输入标题"}}, 
      ],

      allColorScheme: {
        normal: "#00a3cf",
        balance: "#fff"
      }

    }
  },

  componentDidMount: function() {
    window.onbeforeunload = function(e) { return '正在编辑' }
  },

  componentWillUnmount: function() {
    window.onbeforeunload = null;
  },
  
  handlerCtrlItemsClick: function(node) {
    var name = node.dataset.name,
      title = node.dataset.title,
      text = node.dataset.text,
      style = node.dataset.style,
      len = this.state.selected.length,
      id = len?this.state.selected[len-1].id:0;
    
    var newItem = {
      name: name, 
      id: id+1, 
      options: {text: text, title: title}
    }
    this.state.selected.push(newItem);
    this.setState({selected: this.state.selected});
  },

  selectedItemsDelClick: function(node) {
    var name = node.dataset.name,
      id = node.dataset.id;

    var newList = this.state.selected.filter(function(item) {
      return !((item.name === name) && (item.id == id));
    });
    this.setState({selected: newList});
  },

  //TODO: 拖拽功能
  selectedItemsDragStart: function(node) {
    console.log(node);
    console.log('drag');
    this.dragnode = node;
  },

  selectedItemsDrop: function(e) {
    console.log('drop');
    console.log(this.dragnode);
    var node = this.dragnode;
    var name = node.dataset.name,
      id = node.dataset.id;
    console.log(e); 
    console.log("clientY"+e.clientY);
    
    var newList = this.state.selected.filter((function(item,index) {
      console.log(item.name,item.id,name,id);
      console.log(!((item.name === name) && (item.id == id)));
      bool = !((item.name === name) && (item.id == id));
      if(!bool) {
        this.dragItem = item;
        this.index = index;
      }
      return !((item.name === name) && (item.id == id));
    }).bind(this));
    console.log(this.dragItem);
    console.log(this.index);
    console.log(newList);
    newList.splice(this.index+1,0,this.dragItem);
    this.setState({selected: newList});

  },

  changeColorScheme: function(e) {
    target = e.target.classList.contains("mui-icon-button")? e.target : e.target.parentNode
    this.state.allColorScheme.normal = target.style.color;
    this.setState({allColorScheme:this.state.allColorScheme});
  },

  handlerSelectedItemsClick: function(model) {
    var position = this.lastTarget===event.target ? this.lastPosition : this.positionEditPanel(event);
    this.lastTarget = event.target;
    this.lastPosition = position;
    var node = this.refs.editorPanelContainer.getDOMNode();
    var com = React.createElement(EditorPanel, {position: position, model: model})
    React.render(com, node);
    document.body.addEventListener('click', this.dismissEditorPanel);
  },

  positionEditPanel: function(e) {
    return {
      top: e.pageY+5,
      left: e.pageX
    }
  },
  
  dismissEditorPanel: function(e) {
    var containerNode = this.refs.editorPanelContainer.getDOMNode();
    if (!containerNode.contains(e.target)) {
      React.unmountComponentAtNode(containerNode);
      document.body.removeEventListener('click', this.dismissEditorPanel);
    }
  },

  selectHtml: function(el) {
    var el = document.querySelector("."+el);

    if (window.getSelection) {
        var selection = window.getSelection();            
        var range = document.createRange();
        
        //设定包含el节点内容的range
        range.selectNodeContents(el);
        selection.removeAllRanges();

        //将制定的DOM范围添加到选区
        selection.addRange(range);
    }

  },
  
  render: function() {

    var allListProps = {
      allList: this.state.allList,
      colorScheme: this.state.allColorScheme,
      isEdit: false,
      onHandler: this.handlerCtrlItemsClick 
    },
    selectedListProps = {
      selected: this.state.selected,
      colorScheme: this.state.allColorScheme,
      isEdit: true,
      onHandler: this.handlerSelectedItemsClick,
      onDelHandler: this.selectedItemsDelClick,
      //onDragHandler: this.selectedItemsDragStart,
      //onDropHandler: this.selectedItemsDrop 
    }

    return (
        React.createElement("div", {className: "mui-app-content-canvas edit-page"}, 
          React.createElement("div", {className: "all-list-container"}, 
            React.createElement(ColorSchemePanel, {className: "all-color-schemes", zDepth: 0, onHandler: this.changeColorScheme, openImmediately: true}), 
            React.createElement(AllItemsList, React.__spread({},  allListProps))
          ), 
          React.createElement("div", {className: "selected-list-container"}, 
            React.createElement("div", {className: "editor-panel-container", ref: "editorPanelContainer"}), 
            React.createElement(RaisedButton, {className: "select-btn", label: "选中复制", onTouchTap: this.selectHtml.bind(this,"selected-inner-container")}), 
            React.createElement(SelectedList, React.__spread({},  selectedListProps))
          )
        )
    )
  } 

});

module.exports = EditPage;



},{"./components/all-items-list.jsx":8,"./components/color-schemes.jsx":9,"./components/editor-panel.jsx":12,"./components/selected-list.jsx":17,"material-ui":1,"react":1,"react-router":1}],19:[function(require,module,exports){
/**
 * @jsx React.DOM
*/

var React = window.React || require('react'),
  Router = window.Router || require('react-router'),
  mui = window.mui || require('material-ui'),
  PaperFeature = require('../components/paper-feature.jsx');

var HomePage = React.createClass({displayName: 'HomePage',

  mixins: [Router.Navigation],

  render: function() {

    return (
        React.createElement("div", {className: "mui-app-content-canvas home-page"}, 
          React.createElement("div", {className: "full-width-section home-page-hero"}, 
            React.createElement("div", {className: "tagline"}, 
              React.createElement("h1", null, "微信图文排版小助手"), 
              React.createElement("p", null, "使用React,Sass,根据Google Material Design捣鼓出的微信公共号图文排版小助手。")
            )
          ), 
          React.createElement("div", {className: "full-width-section home-features"}, 
            React.createElement("div", {className: "feature-container full-width-section-content"}, 
              React.createElement(PaperFeature, {title: "创建新图文", route: "edit", img: "img/newitem.png"})
            )
          )
        )
    );
  }
});

module.exports = HomePage;


},{"../components/paper-feature.jsx":6,"material-ui":1,"react":1,"react-router":1}],20:[function(require,module,exports){
/**
 * ColorPicker - pure JavaScript color picker without using images, external CSS or 1px divs.
 * Copyright © 2011 David Durman, All rights reserved.
 */
(function(window, document, undefined) {

    var type = (window.SVGAngle || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML"),
        picker, slide, hueOffset = 15, svgNS = 'http://www.w3.org/2000/svg';

    // This HTML snippet is inserted into the innerHTML property of the passed color picker element
    // when the no-hassle call to ColorPicker() is used, i.e. ColorPicker(function(hex, hsv, rgb) { ... });
    
    var colorpickerHTMLSnippet = [
        
        '<div class="picker-wrapper">',
                '<div class="picker"></div>',
                '<div class="picker-indicator"></div>',
        '</div>',
        '<div class="slide-wrapper">',
                '<div class="slide"></div>',
                '<div class="slide-indicator"></div>',
        '</div>'
        
    ].join('');

    /**
     * Return mouse position relative to the element el.
     */
    function mousePosition(evt) {
        // IE:
        if (window.event && window.event.contentOverflow !== undefined) {
            return { x: window.event.offsetX, y: window.event.offsetY };
        }
        // Webkit:
        if (evt.offsetX !== undefined && evt.offsetY !== undefined) {
            return { x: evt.offsetX, y: evt.offsetY };
        }
        // Firefox:
        var wrapper = evt.target.parentNode.parentNode;
        return { x: evt.layerX - wrapper.offsetLeft, y: evt.layerY - wrapper.offsetTop };
    }

    /**
     * Create SVG element.
     */
    function $(el, attrs, children) {
        el = document.createElementNS(svgNS, el);
        for (var key in attrs)
            el.setAttribute(key, attrs[key]);
        if (Object.prototype.toString.call(children) != '[object Array]') children = [children];
        var i = 0, len = (children[0] && children.length) || 0;
        for (; i < len; i++)
            el.appendChild(children[i]);
        return el;
    }

    /**
     * Create slide and picker markup depending on the supported technology.
     */
    if (type == 'SVG') {

        slide = $('svg', { xmlns: 'http://www.w3.org/2000/svg', version: '1.1', width: '100%', height: '100%' },
                  [
                      $('defs', {},
                        $('linearGradient', { id: 'gradient-hsv', x1: '0%', y1: '100%', x2: '0%', y2: '0%'},
                          [
                              $('stop', { offset: '0%', 'stop-color': '#FF0000', 'stop-opacity': '1' }),
                              $('stop', { offset: '13%', 'stop-color': '#FF00FF', 'stop-opacity': '1' }),
                              $('stop', { offset: '25%', 'stop-color': '#8000FF', 'stop-opacity': '1' }),
                              $('stop', { offset: '38%', 'stop-color': '#0040FF', 'stop-opacity': '1' }),
                              $('stop', { offset: '50%', 'stop-color': '#00FFFF', 'stop-opacity': '1' }),
                              $('stop', { offset: '63%', 'stop-color': '#00FF40', 'stop-opacity': '1' }),
                              $('stop', { offset: '75%', 'stop-color': '#0BED00', 'stop-opacity': '1' }),
                              $('stop', { offset: '88%', 'stop-color': '#FFFF00', 'stop-opacity': '1' }),
                              $('stop', { offset: '100%', 'stop-color': '#FF0000', 'stop-opacity': '1' })
                          ]
                         )
                       ),
                      $('rect', { x: '0', y: '0', width: '100%', height: '100%', fill: 'url(#gradient-hsv)'})
                  ]
                 );

        picker = $('svg', { xmlns: 'http://www.w3.org/2000/svg', version: '1.1', width: '100%', height: '100%' },
                   [
                       $('defs', {},
                         [
                             $('linearGradient', { id: 'gradient-black', x1: '0%', y1: '100%', x2: '0%', y2: '0%'},
                               [
                                   $('stop', { offset: '0%', 'stop-color': '#000000', 'stop-opacity': '1' }),
                                   $('stop', { offset: '100%', 'stop-color': '#CC9A81', 'stop-opacity': '0' })
                               ]
                              ),
                             $('linearGradient', { id: 'gradient-white', x1: '0%', y1: '100%', x2: '100%', y2: '100%'},
                               [
                                   $('stop', { offset: '0%', 'stop-color': '#FFFFFF', 'stop-opacity': '1' }),
                                   $('stop', { offset: '100%', 'stop-color': '#CC9A81', 'stop-opacity': '0' })
                               ]
                              )
                         ]
                        ),
                       $('rect', { x: '0', y: '0', width: '100%', height: '100%', fill: 'url(#gradient-white)'}),
                       $('rect', { x: '0', y: '0', width: '100%', height: '100%', fill: 'url(#gradient-black)'})
                   ]
                  );

    } else if (type == 'VML') {
        slide = [
            '<DIV style="position: relative; width: 100%; height: 100%">',
            '<v:rect style="position: absolute; top: 0; left: 0; width: 100%; height: 100%" stroked="f" filled="t">',
            '<v:fill type="gradient" method="none" angle="0" color="red" color2="red" colors="8519f fuchsia;.25 #8000ff;24903f #0040ff;.5 aqua;41287f #00ff40;.75 #0bed00;57671f yellow"></v:fill>',
            '</v:rect>',
            '</DIV>'
        ].join('');

        picker = [
            '<DIV style="position: relative; width: 100%; height: 100%">',
            '<v:rect style="position: absolute; left: -1px; top: -1px; width: 101%; height: 101%" stroked="f" filled="t">',
            '<v:fill type="gradient" method="none" angle="270" color="#FFFFFF" opacity="100%" color2="#CC9A81" o:opacity2="0%"></v:fill>',
            '</v:rect>',
            '<v:rect style="position: absolute; left: 0px; top: 0px; width: 100%; height: 101%" stroked="f" filled="t">',
            '<v:fill type="gradient" method="none" angle="0" color="#000000" opacity="100%" color2="#CC9A81" o:opacity2="0%"></v:fill>',
            '</v:rect>',
            '</DIV>'
        ].join('');
        
        if (!document.namespaces['v'])
            document.namespaces.add('v', 'urn:schemas-microsoft-com:vml', '#default#VML');
    }

    /**
     * Convert HSV representation to RGB HEX string.
     * Credits to http://www.raphaeljs.com
     */
    function hsv2rgb(hsv) {
        var R, G, B, X, C;
        var h = (hsv.h % 360) / 60;
        
        C = hsv.v * hsv.s;
        X = C * (1 - Math.abs(h % 2 - 1));
        R = G = B = hsv.v - C;

        h = ~~h;
        R += [C, X, 0, 0, X, C][h];
        G += [X, C, C, X, 0, 0][h];
        B += [0, 0, X, C, C, X][h];

        var r = Math.floor(R * 255);
        var g = Math.floor(G * 255);
        var b = Math.floor(B * 255);
        return { r: r, g: g, b: b, hex: "#" + (16777216 | b | (g << 8) | (r << 16)).toString(16).slice(1) };
    }

    /**
     * Convert RGB representation to HSV.
     * r, g, b can be either in <0,1> range or <0,255> range.
     * Credits to http://www.raphaeljs.com
     */
    function rgb2hsv(rgb) {

        var r = rgb.r;
        var g = rgb.g;
        var b = rgb.b;
        
        if (rgb.r > 1 || rgb.g > 1 || rgb.b > 1) {
            r /= 255;
            g /= 255;
            b /= 255;
        }

        var H, S, V, C;
        V = Math.max(r, g, b);
        C = V - Math.min(r, g, b);
        H = (C == 0 ? null :
             V == r ? (g - b) / C + (g < b ? 6 : 0) :
             V == g ? (b - r) / C + 2 :
                      (r - g) / C + 4);
        H = (H % 6) * 60;
        S = C == 0 ? 0 : C / V;
        return { h: H, s: S, v: V };
    }

    /**
     * Return click event handler for the slider.
     * Sets picker background color and calls ctx.callback if provided.
     */  
    function slideListener(ctx, slideElement, pickerElement) {
        return function(evt) {
            evt = evt || window.event;
            var mouse = mousePosition(evt);
            ctx.h = mouse.y / slideElement.offsetHeight * 360 + hueOffset;
            var pickerColor = hsv2rgb({ h: ctx.h, s: 1, v: 1 });
            var c = hsv2rgb({ h: ctx.h, s: ctx.s, v: ctx.v });
            pickerElement.style.backgroundColor = pickerColor.hex;
            ctx.callback && ctx.callback(c.hex, { h: ctx.h - hueOffset, s: ctx.s, v: ctx.v }, { r: c.r, g: c.g, b: c.b }, undefined, mouse);
        }
    };

    /**
     * Return click event handler for the picker.
     * Calls ctx.callback if provided.
     */  
    function pickerListener(ctx, pickerElement) {
        return function(evt) {
            evt = evt || window.event;
            var mouse = mousePosition(evt),
                width = pickerElement.offsetWidth,            
                height = pickerElement.offsetHeight;

            ctx.s = mouse.x / width;
            ctx.v = (height - mouse.y) / height;
            var c = hsv2rgb(ctx);
            ctx.callback && ctx.callback(c.hex, { h: ctx.h - hueOffset, s: ctx.s, v: ctx.v }, { r: c.r, g: c.g, b: c.b }, mouse);
        }
    };

    var uniqID = 0;
    
    /**
     * ColorPicker.
     * @param {DOMElement} slideElement HSV slide element.
     * @param {DOMElement} pickerElement HSV picker element.
     * @param {Function} callback Called whenever the color is changed provided chosen color in RGB HEX format as the only argument.
     */
    function ColorPicker(slideElement, pickerElement, callback) {
        
        if (!(this instanceof ColorPicker)) return new ColorPicker(slideElement, pickerElement, callback);

        this.h = 0;
        this.s = 1;
        this.v = 1;

        if (!callback) {
            // call of the form ColorPicker(element, funtion(hex, hsv, rgb) { ... }), i.e. the no-hassle call.

            var element = slideElement;
            element.innerHTML = colorpickerHTMLSnippet;
            
            this.slideElement = element.getElementsByClassName('slide')[0];
            this.pickerElement = element.getElementsByClassName('picker')[0];
            var slideIndicator = element.getElementsByClassName('slide-indicator')[0];
            var pickerIndicator = element.getElementsByClassName('picker-indicator')[0];
            
            ColorPicker.fixIndicators(slideIndicator, pickerIndicator);

            this.callback = function(hex, hsv, rgb, pickerCoordinate, slideCoordinate) {

                ColorPicker.positionIndicators(slideIndicator, pickerIndicator, slideCoordinate, pickerCoordinate);
                
                pickerElement(hex, hsv, rgb);
            };
            
        } else {
        
            this.callback = callback;
            this.pickerElement = pickerElement;
            this.slideElement = slideElement;
        }

        if (type == 'SVG') {

            // Generate uniq IDs for linearGradients so that we don't have the same IDs within one document.
            // Then reference those gradients in the associated rectangles.

            var slideClone = slide.cloneNode(true);
            var pickerClone = picker.cloneNode(true);
            
            var hsvGradient = slideClone.getElementById('gradient-hsv');
            
            var hsvRect = slideClone.getElementsByTagName('rect')[0];
            
            hsvGradient.id = 'gradient-hsv-' + uniqID;
            hsvRect.setAttribute('fill', 'url(#' + hsvGradient.id + ')');

            var blackAndWhiteGradients = [pickerClone.getElementById('gradient-black'), pickerClone.getElementById('gradient-white')];
            var whiteAndBlackRects = pickerClone.getElementsByTagName('rect');
            
            blackAndWhiteGradients[0].id = 'gradient-black-' + uniqID;
            blackAndWhiteGradients[1].id = 'gradient-white-' + uniqID;
            
            whiteAndBlackRects[0].setAttribute('fill', 'url(#' + blackAndWhiteGradients[1].id + ')');
            whiteAndBlackRects[1].setAttribute('fill', 'url(#' + blackAndWhiteGradients[0].id + ')');

            this.slideElement.appendChild(slideClone);
            this.pickerElement.appendChild(pickerClone);

            uniqID++;
            
        } else {
            
            this.slideElement.innerHTML = slide;
            this.pickerElement.innerHTML = picker;            
        }

        addEventListener(this.slideElement, 'click', slideListener(this, this.slideElement, this.pickerElement));
        addEventListener(this.pickerElement, 'click', pickerListener(this, this.pickerElement));

        enableDragging(this, this.slideElement, slideListener(this, this.slideElement, this.pickerElement));
        enableDragging(this, this.pickerElement, pickerListener(this, this.pickerElement));
    };

    function addEventListener(element, event, listener) {

        if (element.attachEvent) {
            
            element.attachEvent('on' + event, listener);
            
        } else if (element.addEventListener) {

            element.addEventListener(event, listener, false);
        }
    }

   /**
    * Enable drag&drop color selection.
    * @param {object} ctx ColorPicker instance.
    * @param {DOMElement} element HSV slide element or HSV picker element.
    * @param {Function} listener Function that will be called whenever mouse is dragged over the element with event object as argument.
    */
    function enableDragging(ctx, element, listener) {
        
        var mousedown = false;

        addEventListener(element, 'mousedown', function(evt) { mousedown = true;  });
        addEventListener(element, 'mouseup',   function(evt) { mousedown = false;  });
        addEventListener(element, 'mouseout',  function(evt) { mousedown = false;  });
        addEventListener(element, 'mousemove', function(evt) {

            if (mousedown) {
                
                listener(evt);
            }
        });
    }


    ColorPicker.hsv2rgb = function(hsv) {
        var rgbHex = hsv2rgb(hsv);
        delete rgbHex.hex;
        return rgbHex;
    };
    
    ColorPicker.hsv2hex = function(hsv) {
        return hsv2rgb(hsv).hex;
    };
    
    ColorPicker.rgb2hsv = rgb2hsv;

    ColorPicker.rgb2hex = function(rgb) {
        return hsv2rgb(rgb2hsv(rgb)).hex;
    };
    
    ColorPicker.hex2hsv = function(hex) {
        return rgb2hsv(ColorPicker.hex2rgb(hex));
    };
    
    ColorPicker.hex2rgb = function(hex) {
        return { r: parseInt(hex.substr(1, 2), 16), g: parseInt(hex.substr(3, 2), 16), b: parseInt(hex.substr(5, 2), 16) };
    };

    /**
     * Sets color of the picker in hsv/rgb/hex format.
     * @param {object} ctx ColorPicker instance.
     * @param {object} hsv Object of the form: { h: <hue>, s: <saturation>, v: <value> }.
     * @param {object} rgb Object of the form: { r: <red>, g: <green>, b: <blue> }.
     * @param {string} hex String of the form: #RRGGBB.
     */
     function setColor(ctx, hsv, rgb, hex) {
         ctx.h = hsv.h % 360;
         ctx.s = hsv.s;
         ctx.v = hsv.v;
         
         var c = hsv2rgb(ctx);
         
         var mouseSlide = {
             y: (ctx.h * ctx.slideElement.offsetHeight) / 360,
             x: 0    // not important
         };
         
         var pickerHeight = ctx.pickerElement.offsetHeight;
         
         var mousePicker = {
             x: ctx.s * ctx.pickerElement.offsetWidth,
             y: pickerHeight - ctx.v * pickerHeight
         };
         
         ctx.pickerElement.style.backgroundColor = hsv2rgb({ h: ctx.h, s: 1, v: 1 }).hex;
         ctx.callback && ctx.callback(hex || c.hex, { h: ctx.h, s: ctx.s, v: ctx.v }, rgb || { r: c.r, g: c.g, b: c.b }, mousePicker, mouseSlide);
         
         return ctx;
    };

    /**
     * Sets color of the picker in hsv format.
     * @param {object} hsv Object of the form: { h: <hue>, s: <saturation>, v: <value> }.
     */
    ColorPicker.prototype.setHsv = function(hsv) {
        return setColor(this, hsv);
    };
    
    /**
     * Sets color of the picker in rgb format.
     * @param {object} rgb Object of the form: { r: <red>, g: <green>, b: <blue> }.
     */
    ColorPicker.prototype.setRgb = function(rgb) {
        return setColor(this, rgb2hsv(rgb), rgb);
    };

    /**
     * Sets color of the picker in hex format.
     * @param {string} hex Hex color format #RRGGBB.
     */
    ColorPicker.prototype.setHex = function(hex) {
        return setColor(this, ColorPicker.hex2hsv(hex), undefined, hex);
    };

    /**
     * Helper to position indicators.
     * @param {HTMLElement} slideIndicator DOM element representing the indicator of the slide area.
     * @param {HTMLElement} pickerIndicator DOM element representing the indicator of the picker area.
     * @param {object} mouseSlide Coordinates of the mouse cursor in the slide area.
     * @param {object} mousePicker Coordinates of the mouse cursor in the picker area.
     */
    ColorPicker.positionIndicators = function(slideIndicator, pickerIndicator, mouseSlide, mousePicker) {
        
        if (mouseSlide) {
            slideIndicator.style.top = (mouseSlide.y - slideIndicator.offsetHeight/2) + 'px';
        }
        if (mousePicker) {
            pickerIndicator.style.top = (mousePicker.y - pickerIndicator.offsetHeight/2) + 'px';
            pickerIndicator.style.left = (mousePicker.x - pickerIndicator.offsetWidth/2) + 'px';
        } 
    };

    /**
     * Helper to fix indicators - this is recommended (and needed) for dragable color selection (see enabledDragging()).
     */
    ColorPicker.fixIndicators = function(slideIndicator, pickerIndicator) {

        pickerIndicator.style.pointerEvents = 'none';
        slideIndicator.style.pointerEvents = 'none';
    };

    //window.ColorPicker = ColorPicker;
    module.exports = ColorPicker;


})(window, window.document);

},{}]},{},[3])