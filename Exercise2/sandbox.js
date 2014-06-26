$( document ).ready(function() {

  //Q.1) Select all of the image elements on the page; log each image's alt attribute.
  
  $("img").css('border', '5px solid red').each(function() {
    console.log($(this).attr('alt'));
  });

  //Q.2) Select the search input text box, then traverse up to the form and add a class to the form.
  
  $("input[name = 'q']").css('border', '5px solid blue')
                            .parents("form#search").css('background-color', 'blue')
                            .addClass('search_form');
  
  //Q.3) Select the list item inside #myList that has a class of "current" and remove that class from it; add a class of "current" to the next list item.
         
  $("#myList li.current").css('border', '5px solid green')
                         .removeClass("current").next().css('background-color', 'green')
                         .addClass("current");

  //Q.4) Select the select element inside #specials; traverse your way to the submit button.
  $("#specials select").css('border', '5px solid yellow')
                       .closest('form').find(':input:submit').css('border', '5px solid yellow');

  //Q.5) Select the first list item in the #slideshow element; add the class "current" to it, and then add a class of "disabled" to its sibling elements.
  $("#slideshow li:first").css('border', '5px solid orange')
                          .addClass("current").css('border', '5px solid orange')
                          .siblings().css('background-color', 'orange')
                          .addClass("disabled");
});