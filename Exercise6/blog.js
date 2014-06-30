/*Reveal Hidden Text*/
$(document).ready(function() {
  var $blogHeadingElements = $('#blog ul li');
  $blogHeadingElements.click(function(event) {
  	var $blogHeading = $(this);
    event.preventDefault();
    //Clicking on a headline in the #blog div should slide down the excerpt paragraph
    $blogHeading.find('.excerpt').slideDown();
    //Clicking on another headline should slide down its excerpt paragraph, and slide up any other currently showing excerpt paragraphs.
    $blogHeading.siblings('li').find('.excerpt:visible').slideUp();
  });
});