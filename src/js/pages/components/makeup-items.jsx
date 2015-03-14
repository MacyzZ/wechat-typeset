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
var H1Item = React.createClass({

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
      <h1 {...props}>
        {this.props.options.title}
      </h1>
    )
  }
  
});

var H2Item = React.createClass({
  
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
      <h2 {...props}>
        {this.props.options.title}
      </h2>  
    )
  }

});

var HeadingItem1 = React.createClass({

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
      <h2 {...props}>
        <span style={style}>
          {this.props.options.title}
        </span>
      </h2>
    );
  }
});


var HeadingItem2 = React.createClass({

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
      <h2 {...props}>
        <HI2Sequence {...this.props} ctrlParent={this.setParentState.bind(this,"bgColor")} />
        <HI2Title {...this.props} />
      </h2>  
    );

  }

});

var HI2Sequence = React.createClass({
  
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
      <span onClick={this.props.isEdit?this._onClick:null} style={style}>
        <span style={innerStyle}>
          <section>1</section>
        </span>
      </span>
    )
  }
  
});

var HI2Title = React.createClass({

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
      <span onClick={this.props.isEdit?this._onClick:null} style={style}>
        {this.props.options.title}
      </span>
    )
  }
  
});



/**
 * Content
*/ 

var SectionItem = React.createClass({
 
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
      <section {...props}>
        <H2 {...this.props} />
        <PA {...this.props} />
      </section>
    );
  }

});

var H2 = React.createClass({
  
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
      <h2 {...props}>
        {this.props.options.title}
      </h2>
    )
  }
});

var PA = React.createClass({
  
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
      <p {...props}>
        {this.props.options.text}
      </p>
    )
  }
});

var BH1Title = React.createClass({

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
      <h2 onClick={this.props.isEdit?this._onClick:null} style={style}>
        {this.props.options.title}
      </h2>
    )
  }

});

var BhItem1 = React.createClass({

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
      <blockquote {...props}>
        <BH1Title {...this.props} ctrlParent={this.setParentState.bind(this,"borderColor")} /> 
        <PA {...this.props} />
      </blockquote>
    );
  }

});

var BpItem1 = React.createClass({

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
      <blockquote {...props}>
        <p contentEditable={this.props.isEdit}>
          {this.props.options.text}
          <br/>
          {this.props.options.text}
        </p>
      </blockquote>
    );
  }

});


var CardItem1 = React.createClass({
  
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
      <section {...props}>
        {this.props.options.text}
      </section>
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



