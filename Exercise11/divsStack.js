/*Stack of Divs*/
var Stack = function ($addButton, $containerElement) {
  "use strict";
  this.addButton = $addButton;
  this.containerElement = $containerElement;
  this.elementCount = 0;
  this.lastElementCount = 0;
};

var Element = function (elementCount) {
  "use strict";
  this.elementCount = elementCount;
};

Element.prototype = {
  create : function () {
    "use strict";
    this.element = $("<div>").addClass('stackElement').data("highlight", false).text(this.elementCount);
    return this.element;
  }
};

Stack.prototype = {
  //method to bind create and add event on add button click
  bindEvents : function () {
    "use strict";
    var _this = this;
    this.addButton.click(function () {
      _this.elementCount++;
      _this.lastElementValue = _this.elementCount;
      _this.addElementToStack(new Element(_this.elementCount).create());
    });
    this.containerElement.on('click', '.stackElement', function () {
      var $element = $(this),
        isElementRemoved = _this.removeElement($element);
      if (!isElementRemoved && !$element.data("highlight")) {
        _this.highlightElement($element);
      }
    });
  },

  //method to create a new div and then append it to the main container
  addElementToStack : function ($newElement) {
    "use strict";
    $newElement.prependTo(this.containerElement);
  },

  //method to higlight div
  highlightElement : function ($element) {
    "use strict";
    $element.addClass('highlight').data("highlight", true);
  },

  //method to remove topmost div if clicked
  removeElement : function ($element) {
    "use strict";
    if (this.lastElementValue === $element.text()) {
      $element.remove();
      this.lastElementValue = this.containerElement.children().first().text();
      return true;
    }
    return false;
  }
};

$(function () {
  "use strict";
  new Stack($("#add"), $("#container")).bindEvents();
});
