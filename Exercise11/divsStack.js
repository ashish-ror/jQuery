/*Stack of Divs*/
var Stack = function ($addButton, $containerElement) {
  "use strict";
  this.addButton = $addButton;
  this.containerElement = $containerElement;
};

var Div = function (divCount) {
  "use strict";
  this.divCount = divCount;
};

Div.prototype = {
  createDiv : function () {
    "use strict";
    this.divElement = $("<div>").addClass('stackElement').text(this.divCount);
  }
};

Stack.prototype = {
  //method to bind create and add event on add button click
  bindEvents : function () {
    "use strict";
    var _this = this,
      newDiv;
    this.addButton.click(function () {
      _this.divCount = _this.containerElement.children().length + 1;
      newDiv = new Div(_this.divCount);
      newDiv.createDiv();
      _this.addDivToStack(newDiv.divElement);
    });
    this.containerElement.on('click', '.stackElement', function () {
      var $divElement = $(this);
      _this.highlightDiv($divElement);
      _this.removeDiv($divElement);
    });
  },

  //method to create a new div and then append it to the main container
  addDivToStack : function (newDivElement) {
    "use strict";
    newDivElement.prependTo(this.containerElement);
  },

  //method to higlight div
  highlightDiv : function ($divElement) {
    "use strict";
    $divElement.toggleClass('highlight');
  },

  //method to remove topmost div if clicked
  removeDiv : function ($divElement) {
    "use strict";
    if (this.divCount == $divElement.text()) {
      $divElement.remove();
      this.divCount -= 1;
    }
  }
};

$(function () {
  "use strict";
  var stack = new Stack($("#add"), $("#container"));
  stack.bindEvents();
});