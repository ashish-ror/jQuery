/*Reveal Hidden Text*/
$(function() {
  var $blogHeadingElements = $('#blog ul li');
  $blogHeadingElements.click(function(event) {
    event.preventDefault();
    //Clicking on a headline in the #blog div should slide down the excerpt paragraph
    $(this).find('.excerpt').slideDown();
    //Clicking on another headline should slide down its excerpt paragraph, and slide up any other currently showing excerpt paragraphs.
    $(this).siblings('li').find('.excerpt:visible').slideUp();
  });
});