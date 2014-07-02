/*Stack of Divs*/
var Stack = function ($addButton, $containerElement) {
  this.addButton = $addButton;
  this.containerElement = $containerElement;
};

Stack.prototype = {
  //method to bind create and add event on add button click
  bindEvents : function () {
    var that = this;
    this.addButton.click(function () {
      that.createAndAddDiv();
    });
    this.containerElement.on('click', 'div', function() {
      var $divElement = $(this);
      that.highlightDiv($divElement);
      that.removeDiv($divElement);
    });
  },

  //method to create a new div and then append it to the main container
  createAndAddDiv : function () {
    this.divCount = this.containerElement.children().length + 1;
    var $divElement = $("<div>").addClass('stackElement').text(this.divCount);
    $divElement.prependTo(this.containerElement);
  },

  //method to higlight div
  highlightDiv : function ($divElement) {
    $divElement.toggleClass('highlight');
  },

  //method to remove topmost div if clicked
  removeDiv : function ($divElement) {
    if (this.divCount == $divElement.text()) {
      $divElement.remove();
      this.divCount -= 1;
    }
  }
};

$(function () {
  stack = new Stack($("#add"), $("#container"));
  stack.bindEvents();
});