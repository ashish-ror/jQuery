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
    var that = this,
      newDiv;
    this.addButton.click(function () {
      that.divCount = that.containerElement.children().length + 1;
      newDiv = new Div(that.divCount);
      newDiv.createDiv();
      that.addDivToStack(newDiv.divElement);
    });
    this.containerElement.on('click', '.stackElement', function () {
      var $divElement = $(this);
      that.highlightDiv($divElement);
      that.removeDiv($divElement);
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