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
      that.selectedDay = $(this).val();
      if(!that.jsonData) {
        that.loadData();
      } else {
        that.displayData();
      }
    });
  },

  //Add some HTML about the special to the target div you created.
  displayData : function (selectedDay) {
    if(this.selectedDay) {
      this.targetDiv.html("Title: " + this.jsonData[this.selectedDay].title + " <br>Text: " + this.jsonData[this.selectedDay].text);
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
    });
  }
};

$(function() {
  var jsonContent = new JsonContent("data/specials.json", $("#specials"));
  jsonContent.init();
  $(document).ajaxSuccess(function (event, xhr) {
    jsonContent.updateData(xhr.responseJSON);
    jsonContent.displayData();
  });
});