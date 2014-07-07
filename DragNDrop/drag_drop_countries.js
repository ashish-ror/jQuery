var DragAndDropManager = function($countryList1, $countryList2) {
  "use strict";
  this.countryList1 = $countryList1;
  this.countryList2 = $countryList2;
};

DragAndDropManager.prototype.bindEvents = function() {
  "use strict";
  var _this = this;
  this.countryList1.on("mouseenter", "li", function() {
    _this.dragAndDrop(_this.countryList1, _this.countryList2);
  });

  this.countryList2.on("mouseenter", "li", function() {
    _this.dragAndDrop(_this.countryList2, _this.countryList1);
  });
},

DragAndDropManager.prototype.dragAndDrop = function($list1, $list2) {
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
};

$(function($) {
  "use strict";
  new DragAndDropManager($("#countryList1"), $("#countryList2")).bindEvents();
});