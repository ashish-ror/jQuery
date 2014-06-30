/*Load External Content*/
$(document).ready(function () {
  var $targetURL = '';
  //Create a target div after the headline for each blog post
  //store a reference to it on the headline element using $.fn.data.
  var $blogHeadingElement = $('#blog h3');
  $blogHeadingElement.each(function (index) {
    var $blogHeading = $(this),
      $targetDiv = $('<div>').insertAfter($blogHeading);
    $blogHeading.data('reference', $targetDiv);
  })
  //Bind a click event to the headline that will use the $.fn.load
  //method to load the appropriate content from /exercises/data/blog.html into the target div.
  $blogHeadingElement.click(function (event) {
    var $blogHeading = $(this);
    event.preventDefault();
    $targetURL = $blogHeading.find('a').attr('href');
    $targetURL = 'data/' + $targetURL.replace('#', " #");
    $blogHeading.data('reference').load($targetURL);
  });
});




