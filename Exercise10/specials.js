/*Load Content using JSON*/
var JsonContentLoader = function (sourceURL, $specialsDiv) {
  this.specialsDiv = $specialsDiv;
  this.selectElement = $specialsDiv.find('select');
  this.sourceURL = sourceURL;
};

JsonContentLoader.prototype = {
  init : function () {
    this.bindEvent();
  },

  // Bind to the change event of the select element;
  bindEvent : function () {
    var that = this;
    this.selectElement.change(function () {
      that.selectedDay = $(this).val();
      if(!that.jsonData) {
        that.loadJsonData();
      } else {
        that.displayData();
      } 
    });
  },

  //Add some HTML about the special to the target div you created.
  displayData : function () {
    if(this.selectedDay) {
      this.targetDiv.html("Title: " + this.jsonData[this.selectedDay].title + " <br>Text: " + this.jsonData[this.selectedDay].text)
                    .attr('style', 'color:' + this.jsonData[this.selectedDay].color)
                    .append('<br/><img src="' + this.replaceFirstCharacterOfString(this.jsonData[this.selectedDay].image) + '" />');
    } else {
      this.targetDiv.text("");
    }
  },

  //replace first character of string to get an appropriate format for image source
  replaceFirstCharacterOfString : function (str) {
    return str.substring(0, 0) + "" + str.substring(1);
  },

  // Append a target div after the form that's inside the #specials element;
  insertDiv : function () {
    this.targetDiv = $("<div>").insertAfter(this.specialsDiv.find("form"));
  },

  //Ajax-enabled, remove the submit button from the form.
  removeSubmitButton : function () {
    this.specialsDiv.find(".buttons").remove();
  },
  
  //Ajax request to /exercises/data/specials.json.
  loadJsonData :function () {
    var that = this;
    $.ajax({
      type: "get",
      dataType: "json",
      url: this.sourceURL,
    }).done(function(data, textStatus, jqXHR){
      that.jsonData = jqXHR.responseJSON;
      that.displayData();
    }).fail(function(data) {
      alert("Could not read JSON");
    });
  }
};

$(function() {
  var jsonContentLoader = new JsonContentLoader("data/specials.json", $("#specials"));
  jsonContentLoader.removeSubmitButton();
  jsonContentLoader.init();
});