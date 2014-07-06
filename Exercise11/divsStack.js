/*Stack of Divs*/
var Stack = function ($addButton, $containerElement) {
  this.addButton = $addButton;
  this.containerElement = $containerElement;
  this.elementCount = 0;
};

var Element = function (count) {
  this.count = count;
  this.html = $('<div>').addClass('stackElement').text(this.count);
};

Stack.prototype = {
  //method to bind create and add event on add button click
  bindEvents : function () {
    var _this = this;
    this.addButton.click(function () {
      _this.elementCount++;
      _this.addElement(new Element(_this.elementCount).html);
    });

    this.containerElement.on('click', '.stackElement', function () {
      var $element = $(this);
      if ($element.is(':first-child')) {
        _this.removeElement($element);
      } else {
        _this.highlightElement($element);
      }
    });
  },

  //method to create a new div and then append it to the main container
  addElement : function ($newElement) {
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
  new Stack($('#add'), $('#container')).bindEvents();
});
