/*Shopping Cart*/
var ShoppingCart = function () {
};

var Products = function (title, price, quantity, category, imgSource) {
  this.title = title;
  this.quantity = 1;
  this.price = quantity;
  this.imgSrc = imgSource;
};

ShoppingCart.prototype = {
  init : function () {
    if(!this.jsonData) {
      this.getJson();
    } else {
      this.displayData();
    }  
  },

  getJson : function () {
    var that = this;
    $.getJSON("products.json").done(function(data) {
      that.jsonData = data;
    }).fail(function() {
      alert("Not able to load JSON");
    });
  },

  populateProductsTab : function () {
  },
}

$(function () {
  var shoppingCart = new ShoppingCart();
  shoppingCart.init();
});