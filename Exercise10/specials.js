/*Load Content using JSON*/
var JsonContent = function (targetURL, $selectElement, $specialsDivElement) {
  this.selectElement = $selectElement;
  this.specialsDivElement = $specialsDivElement;
  this.targetURL = targetURL;
  this.data = "";
};

JsonContent.prototype = {
  load : function () {
    this.insertDiv();
    this.removeSubmitButton();
    var isDataNotCached = this.isCachedData();
    if (isDataNotCached) {
      this.loadData();
    }
    this.bindEvent();
  },

  // Bind to the change event of the select element;
  bindEvent : function () {
    var that = this;
    this.selectElement.change(function () {
      this.selectedDay = $(this).val();
      that.displayData(this.selectedDay);
    });
  },

  //Add some HTML about the special to the target div you created.
  displayData : function (selectedDay) {
    if(selectedDay) {
        this.targetDiv.html("Title: " + this.data[selectedDay].title + " <br>Text: " + this.data[selectedDay].text);
    } else {
        this.targetDiv.text('');
    }
  },

  updateData : function (data) {
    this.data = data;
  },

  // Append a target div after the form that's inside the #specials element;
  insertDiv : function () {
    this.targetDiv = $('<div>').insertAfter(this.selectElement.closest('form'));
  },

  //Ajax-enabled, remove the submit button from the form.
  removeSubmitButton : function () {
    this.specialsDivElement.find('.buttons').remove();
  },
  
  isCachedData :function () {
    if(!this.data) {
      return true;
    }
    return false;
  },

  //Ajax request to /exercises/data/specials.json.
  loadData :function () {
    var that = this;
    $.ajax({
      type: 'get',
      dataType: 'json',
      url: this.targetURL,
      success: function (data) {
        that.updateData(data);
      }
    });
  }
};

$(function() {
  var targetURL = 'data/specials.json',
    $specialsDivElement = $('#specials');
    $selectElement = $specialsDivElement.find('select'),
    jsonContent = new JsonContent(targetURL, $selectElement, $specialsDivElement);
  jsonContent.load();
});