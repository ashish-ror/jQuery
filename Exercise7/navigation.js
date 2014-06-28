/*Create Dropdown Menu*/
$(function() { 
  var $navigationElements = $('#nav li');
  // Hovering over an item in the main menu should show that item's submenu items, if any.
  $navigationElements.hover(function() {
    $(this).find('ul').show();
    }, function() {
      // Exiting an item should hide any submenu items.
      $(this).find('ul').hide();
  });
});