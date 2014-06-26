$( document ).ready(function() {

  //Q.1) Add five new list items to the end of the unordered list #myList.
  var listLength = $("#myList li").size()
  for(var i = 1; i <= 5; i++) {
    var listElement = $("<li>").text("List Item " + (listLength + i) + ":");
    $("#myList").append(listElement);
  }

  //Q.2) Remove the odd list items
  $("#myList li:odd").remove();
  
  //Q.3) Add another h2 and another paragraph to the last div.module

  var headingElement = $('<h2>').text("Heading Element Added");
  var paragraphElement = $('<p>').text("Paragraph Element Added");
  $("div.module").last().append(headingElement).append(paragraphElement);

  //Q.4) Add another option to the select element; give the option the value "Wednesday"
  var optionElement = $("<option>").val("Wednesday").text("Wednesday");
  $("select[name = 'day']").append(optionElement);

  //Q.5) Add a new div.module to the page after the last one; put a copy of one of the existing images inside of it.
  var divElement = $("<div>").addClass("module")
                             .append($("img:first").clone()).insertAfter('div.module:last');

});