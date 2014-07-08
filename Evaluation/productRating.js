/*Product Rating*/
var Product = function(name) {
  this.name = name;
};

var Rating = function(criteriaName) {
  this.criteriaName = criteriaName;
};

var ProductRatingManager =  function(sourceURL) {
  this.productList = [];
  this.ratingList = [];
  this.ratingListElement = [];
  this.sourceURL = sourceURL;
};

ProductRatingManager.prototype.init = function() {
  this.loadJsonData();
};

ProductRatingManager.prototype.loadJsonData = function() {
  var _this = this;
  $.ajax({
    type: "get",
    dataType: "json",
    url: this.sourceURL,
  }).done(function(data){
    _this.productList = data["drinks"];
    _this.ratingsList = data["ratings"]
    _this.createTable();
  }).fail(function() {
    alert("Could not read JSON");
  });
};

ProductRatingManager.prototype.createTable = function() {
  this.table = $("<table/>");
  this.createFirstRow();
  this.createRestTable();
  this.table.appendTo("body");
  this.bindEvents();
};

ProductRatingManager.prototype.createRestTable = function() {
  var _this = this;
  $.each(this.productList, function(key, productName) {
    var name = new Product(productName).name,
      $row = $("<tr/>"),
      $cell = $("<td/>").html(name)
                        .addClass("products")
                        .data("name", productName)
                        .data("rowElement", $row)
                        .data("index", key)
                        .appendTo($row);
    for (var i = 0; i < _this.ratingsList.length; i++) {
      var $checkBoxCell = $("<td/>"),
        $radioButton = $('<input />', { type : "radio", class : "radio" + " " + i}).data("ratings", _this.ratingListElement[i])
                                                                         .data("drinks", $cell)
                                                                         .appendTo($checkBoxCell);
      $checkBoxCell.appendTo($row);
    }
    $row.appendTo(_this.table);
  });
};

ProductRatingManager.prototype.createFirstRow = function() {
  var $row = $("<tr/>"),
    _this = this,
    $cell1 = $("<td/>").html("").appendTo($row);
  $.each (this.ratingsList, function(key, value) {
    var criteriaName = new Rating(value).criteriaName,
      $cell = $("<td/>").html(criteriaName)
                         .addClass("ratings")
                         .data("criteriaName", value)
                         .data("index", key)
                         .appendTo($row);
    _this.ratingListElement.push($cell);
  });
  $row.appendTo(this.table);
};

ProductRatingManager.prototype.bindEvents = function() {
  this.bindRadioButtonEvent();
  this.bindProductsEvent();
  this.bindRatingsEvent();
};

ProductRatingManager.prototype.highlightRatingElement = function($ratingElement) {
  if (typeof $ratingElement != 'undefined') {
    $("td.ratings").removeClass("highlight");
    $ratingElement.addClass("highlight");
  }
};

ProductRatingManager.prototype.highlightProductElement = function($productElement, $selectedElement) {
  if (typeof $productElement != 'undefined') {
    this.deSelectSameRowRadioButtons($productElement.data("rowElement").find(".radio:checked").not($selectedElement));
    $("td.products").removeClass("highlight");
    $productElement.addClass("highlight");
  }
};

ProductRatingManager.prototype.deSelectSameRowRadioButtons = function($alreadySelectedElement) {
  $alreadySelectedElement.attr('checked', false);
};

ProductRatingManager.prototype.bindRadioButtonEvent = function() {
  var _this = this;
  $(".radio").on("change", function() {
    var $this = $(this);
    _this.highlightRatingElement($this.data("ratings"));
    _this.highlightProductElement($this.data("drinks"), $this);
  });
};

ProductRatingManager.prototype.bindProductsEvent = function() {
  var _this = this;
  $(".products").on("click", function() {
    var $this = $(this);
    $(".products, .ratings").removeClass("highlight");
    $this.addClass("highlight");
    _this.highlightRatingElement($this.data("rowElement").find(".radio:checked").data("ratings"));
  });
}

ProductRatingManager.prototype.bindRatingsEvent = function() {
  var _this = this;
  $(".ratings").on("click", function() {
    var $this = $(this)
    $(".products, .ratings").removeClass("highlight");
    $this.addClass("highlight");
    if (typeof $this.data("rowElement") != 'undefined') {
      _this.highlightProductElement($this.data("rowElement").find(".radio:checked").data("drinks"), $this);
    } else {
      $checkedElement =$("." + $this.data("index") + ":checked");
      _this.highlightProductElement($checkedElement.data("drinks"),$checkedElement);
    }
  });
}

$(function() {
  new ProductRatingManager("productRating.json").init();
});