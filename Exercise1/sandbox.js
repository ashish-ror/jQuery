$( document ).ready(function() {
// 1.) Select all of the div elements that have a class of "module".
  
  $("div.module").css("background-color", "red");

// 2.) Come up with three selectors that you could use to get the third item in the #myList unordered list. Which is the best to use? Why?
  
  $("#myList:nth-child(3)").css("background-color", "green");
  $("#myList li:eq(2)").css("background-color", "green");
  //best because selection based on the specific id
  $("#myListItem").css("background-color", "green");

// 3.) Select the label for the search input using an attribute selector.
  
  $("label[for]").css("background-color", "blue");  

// Figure out how many elements on the page are hidden
  
  alert("Number of elements on the page that are hidden are: " + $("hidden").length);

// Figure out how many image elements on the page have an alt attribute.
  
  alert("Number of image elements on the page that have an alt attribute " + $("img[alt]").length) ;

// Select all of the odd table rows in the table body.
  
  $("tbody tr:odd").css("background-color", "yellow");

});