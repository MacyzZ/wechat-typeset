
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

