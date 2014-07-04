/*Load Content using JSON*/
var DaysSpecial = function (sourceURL, $specialsDiv) {
  this.specialsDiv = $specialsDiv;
  this.selectElement = $specialsDiv.find('select');
  this.sourceURL = sourceURL;
};

DaysSpecial.prototype = {
  init : function () {
    this.bindEvent();
  },

  // Bind to the change event of the select element;
  bindEvent : function () {
    var _this = this;
    this.selectElement.change(function () {
      _this.selectedDay = $(this).val();
      if(!_this.jsonData) {
        _this.loadJsonData();
      } else {
        _this.displayData();
      }
    });
  },

  //Add some HTML about the special to the target div you created.
  displayData : function () {
    if(this.selectedDay) {
      var $image = $("<img>", { src : this.jsonData[this.selectedDay].image});
      this.targetDiv.html("Title: " + this.jsonData[this.selectedDay].title + " <br>Text: " + this.jsonData[this.selectedDay].text)
                    .attr('style', 'color:' + this.jsonData[this.selectedDay].color)
                    .append($image);
    } else {
      this.targetDiv.text("");
    }
  },

  // Append a target div after the form _this's inside the #specials element;
  insertDiv : function () {
    this.targetDiv = $("<div>").insertAfter(this.specialsDiv.find("form"));
  },

  //Ajax-enabled, remove the submit button from the form.
  removeSubmitButton : function () {
    this.specialsDiv.find(".buttons").remove();
  },
  
  //Ajax request to /exercises/data/specials.json.
  loadJsonData :function () {
    var _this = this;
    $.ajax({
      type: "get",
      dataType: "json",
      url: this.sourceURL,
    }).done(function(data, textStatus, jqXHR){
      _this.jsonData = jqXHR.responseJSON;
      _this.displayData();
    }).fail(function(data) {
      alert("Could not read JSON");
    });
  }
};

$(function() {
  var daysSpecial = new DaysSpecial("data/specials.json", $("#specials"));
  daysSpecial.insertDiv();
  daysSpecial.removeSubmitButton();
  daysSpecial.init();
});