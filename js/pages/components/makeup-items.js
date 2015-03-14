(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){

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


},{}],3:[function(require,module,exports){
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
      contentEditable: this.props.isEdit,
      "data-name": "HI1",
      "data-title": this.props.options.title,
      "data-id": this.props.id
    }

    
    return (
      React.createElement("h2", React.__spread({},  props), 
        React.createElement("span", {style: style}, 
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
      contentEditable: this.props.isEdit,
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
      React.createElement("span", {onClick: this.props.isEdit?this._onClick:null, style: style}, 
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
      React.createElement("span", {onClick: this.props.isEdit?this._onClick:null, style: style}, 
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




},{"../../models/style.js":2,"material-ui":1,"react":1}]},{},[3])