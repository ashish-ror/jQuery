var DragAndDropManager = function($countryList1, $countryList2) {
  "use strict";
  this.countryList1 = $countryList1;
  this.countryList2 = $countryList2;
};

DragAndDropManager.prototype = {
  bindEvents : function() {
    "use strict";
    var that = this;
    this.countryList1.on("mouseenter", "li", function() {
      that.dragAndDrop(that.countryList1, that.countryList2);
    });

    this.countryList2.on("mouseenter", "li", function() {
      that.dragAndDrop(that.countryList2, that.countryList1);
    });
  },

  dragAndDrop : function($list1, $list2) {
    "use strict";
    $list1.find("li").draggable({
      revert: "invalid",
      helper: "clone",
      cursor: "move"
    }).disableSelection();

    $list2.droppable({
      accept: "li",
      activeClass: "ui-state-highlight",
      drop: function(event, ui) {
        ui.draggable.removeAttr("style").appendTo($list2);
      }
    });
  }
};

$(function($) {
  "use strict";
  new DragAndDropManager($("#countryList1"), $("#countryList2")).bindEvents();
});