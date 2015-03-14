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

var EditPage = React.createClass({

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
    var com = <EditorPanel position={position} model={model} />
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
        <div className="mui-app-content-canvas edit-page">
          <div className="all-list-container">
            <ColorSchemePanel className="all-color-schemes" zDepth={0} onHandler={this.changeColorScheme} openImmediately={true} />
            <AllItemsList {...allListProps} />
          </div>
          <div className="selected-list-container">
            <div className='editor-panel-container' ref="editorPanelContainer"></div>
            <RaisedButton className="select-btn" label="选中复制" onTouchTap={this.selectHtml.bind(this,"selected-inner-container")} />
            <SelectedList {...selectedListProps} />
          </div>
        </div>
    )
  } 

});

module.exports = EditPage;


