var DragNDropManager = function ($countryList1, $countryList2) {
  this.countryList1 = $countryList1;
  this.countryList2 = $countryList2;
};

DragNDropManager.prototype = {
  bindEvents : function () {
    var that = this;
    this.countryList1.on("mouseenter", "li", function() {
      that.dragNDrop(that.countryList1, that.countryList2);
    });

    this.countryList2.on("mouseenter", "li", function() {
      that.dragNDrop(that.countryList2, that.countryList1);
    });
  },

  dragNDrop : function (list1, list2) {
    list1.find("li").draggable({
      cursor : "move",
    }).disableSelection();

    list2.droppable({
      drop : function(event, ui) {
        console.log($(this));
        ui.draggable.removeAttr("style").appendTo(list2);
      }
    });
  }

};

$(function($) {
  var country = new DragNDropManager($("#countryList1"), $("#countryList2"));
  country.bindEvents();
});