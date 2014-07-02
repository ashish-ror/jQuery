/*Load Content using JSON*/
var JsonContent = function (sourceURL, $specialsDiv) {
  this.specialsDiv = $specialsDiv;
  this.selectElement = $specialsDiv.find('select');
  this.sourceURL = sourceURL;
  this.jsonData = "";
};

JsonContent.prototype = {
  init : function () {
    this.insertDiv();
    this.removeSubmitButton();
    this.bindEvent();
  },

  // Bind to the change event of the select element;
  bindEvent : function () {
    var that = this;
    this.selectElement.change(function () {
      if(!that.jsonData) {
        that.loadData();
      }
      that.displayData($(this).val());
    });
  },

  //Add some HTML about the special to the target div you created.
  displayData : function (selectedDay) {
    if(selectedDay) {
      this.targetDiv.html("Title: " + this.jsonData[selectedDay].title + " <br>Text: " + this.jsonData[selectedDay].text);
    } else {
      this.targetDiv.text("");
    }
  },

  updateData : function (responseJson) {
    this.jsonData = responseJson;
  },

  // Append a target div after the form that's inside the #specials element;
  insertDiv : function () {
    this.targetDiv = $("<div>").insertAfter(this.selectElement.closest("form"));
  },

  //Ajax-enabled, remove the submit button from the form.
  removeSubmitButton : function () {
    this.specialsDiv.find(".buttons").remove();
  },
  
  //Ajax request to /exercises/data/specials.json.
  loadData :function () {
    var that = this;
    $.ajax({
      type: "get",
      dataType: "json",
      url: this.sourceURL,
      async : false,
    });
  }
};

$(function() {
  var targetURL = 'data/specials.json',
    jsonContent = new JsonContent("data/specials.json", $("#specials"));
  jsonContent.init();
  $( document ).ajaxSuccess(function (event, xhr) {
    jsonContent.updateData(xhr.responseJSON);
  });
});