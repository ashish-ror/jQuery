/*Stack of Divs*/
var Stack = function ($addButton, $containerElement) {
  "use strict";
  this.addButton = $addButton;
  this.containerElement = $containerElement;
};

Stack.prototype = {
  //method to bind create and add event on add button click
  bindEvents : function () {
    "use strict";
    var that = this;
    this.addButton.click(function () {
      that.createAndAddDiv();
    });
    this.containerElement.on('click', 'div', function () {
      var $divElement = $(this);
      that.highlightDiv($divElement);
      that.removeDiv($divElement);
    });
  },

  //method to create a new div and then append it to the main container
  createAndAddDiv : function () {
    "use strict";
    this.divCount = this.containerElement.children().length + 1;
    var $divElement = $("<div>").addClass('stackElement').text(this.divCount);
    $divElement.prependTo(this.containerElement);
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