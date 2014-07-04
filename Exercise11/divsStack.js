/*Stack of Divs*/
var Stack = function ($addButton, $containerElement) {
  this.addButton = $addButton;
  this.containerElement = $containerElement;
  this.elementCount = 0;
  this.lastElementCount = 0;
};

var Element = function (elementCount) {
  this.elementCount = elementCount;
  this.element = $("<div>").addClass('stackElement').text(this.elementCount);
};

Stack.prototype = {
  //method to bind create and add event on add button click
  bindEvents : function () {
    var _this = this;
    this.addButton.click(function () {
      _this.elementCount++;
      _this.addElementToStack(new Element(_this.elementCount).element);
    });
    this.containerElement.on('click', '.stackElement', function () {
      var $element = $(this);
      if ($element.is(":first-child")) {  
        _this.removeElement($element);
      } else {
        _this.highlightElement($element);
      }
    });
  },

  //method to create a new div and then append it to the main container
  addElementToStack : function ($newElement) {
    $newElement.prependTo(this.containerElement);
  },

  //method to higlight div
  highlightElement : function ($element) {
    $element.addClass('highlight');
  },

  //method to remove topmost div if clicked
  removeElement : function ($element) {
    $element.remove();
  }
};

$(function () {
  "use strict";
  new Stack($("#add"), $("#container")).bindEvents();
});