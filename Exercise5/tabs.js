/*Tabbed Navigation*/
$(function() {
  
  // Q.1) Hide all of the modules.
  var $modules = $('.module').hide();
  
  // // Q.2) Create an unordered list element before the first module.
  var $unorderedListElement = $("<ul>").insertBefore($modules.eq(0));
    
  // Q.3) Iterate over the modules using $.fn.each. For each module, use the text of the h2 element as the text for a list item that you add to the unordered list element.
  $modules.each(function() {
    var $that = $(this),
      headerText = $(this).find('h2').text(),
      $listElement = $('<li>').text(headerText).appendTo($unorderedListElement);

    //Q.4) Bind a click event to the list item that:
    $listElement.click(function() {
      // Shows the related module, and hides any other modules
      $that.show().siblings('.module').hide();

      // Adds a class of "current" to the clicked list item
      // Removes the class "current" from the other list item
      $listElement.addClass('current').siblings().removeClass('current');
    });
  });

  // Finally, show the first tab.
  $modules.eq(0).show();
  $unorderedListElement.find('li').eq(0).addClass('current');
});