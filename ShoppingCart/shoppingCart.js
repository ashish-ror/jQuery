/*Shopping Cart*/
var ShoppingCart = function ($tableElement, $productsBlockElement, $totalPriceElement, $tabElement, $myCart) {
  "use strict";
  this.tableElement = $tableElement;
  this.productBlockElement = $productsBlockElement;
  this.totalPriceElement = $totalPriceElement;
  this.tabElement = $tabElement;
  this.myCartBlock = $myCart;
  this.jsonData = "";
};

ShoppingCart.prototype = {
  init : function () {
    "use strict";
    this.myCartBlock.hide();
    if (!this.jsonData) {
      this.getJson();
    }
  },

  getJson : function () {
    "use strict";
    var _this = this;
    $.getJSON("products.json").done(function (data) {
      _this.jsonData = data;
      _this.populateProductsTab();
      _this.bindTabEvent();
      _this.bindAddProductEvent();
    }).fail(function() {
      alert("Not able to load JSON");
    });
  },

  populateProductsTab : function () {
    "use strict";
    var _this = this;
      // creating a product block display
    $.each(this.jsonData, function(itemType) {
      var $div = $("<div/>", { class : "products"}),
        $span = $("<span>", { class: "details"});

      $("<img>", { class : "productImage", src : _this.jsonData[itemType]["image"]}).appendTo($div);
      $("<h2/>", { class : "productName"}).text(_this.jsonData[itemType]["name"]).appendTo($span);
      $("<p/>").text("Category : " + itemType).appendTo($span);
      $("<p/>").text(_this.jsonData[itemType]["text"]).appendTo($span);
      $("<h2/>", { class : "price"}).text(_this.jsonData[itemType]["price"])
                                  .data("price", _this.jsonData[itemType]["price"])
                                  .appendTo($span);
      $span.appendTo($div);
      $("<span>", { class : "quantity"}).text("Quantity : ").appendTo($div);
      $("<input>", { type : "text", val : "1"}).appendTo($div);
      $("<input>", { type : 'button', value : "Add to Cart", class : "addToCart" }).data("data", _this.jsonData[itemType])
                                                                                   .appendTo($div);
      $div.appendTo(_this.productBlockElement);
    });
  },

  bindAddProductEvent : function () {
    "use strict";
    var _this = this;
    $(".addToCart").click(function () {
      var $addElement = $(this),
        quantity = $addElement.siblings("input").val();
      _this.addProductToMyCart($addElement.data("data"), quantity);
      _this.updateQuantityBought();
    });
    this.bindRemoveEvent();
    this.bindQuantityChangeEvent();
  },

  addProductToMyCart : function (data, quantity) {
    "use strict";
    var $productRow = $("<tr>"),
      $productDetails = $("<td>"),
      $productRemoveButton = $("<td>");
    $("<img>", { src : data.image }).appendTo($productDetails);
    $productDetails.append($("<h4>", { text : data.name })).appendTo($productRow);
    $("<td>", { text : data.price }).data("price", data.price).appendTo($productRow);

    var $quantityElement = $("<td>").data("price", data.price).html($("<input>", { class : "productQuantity", type : "text", value : quantity })),
      subTotal = parseFloat((data.price * quantity)),
      $subTotalElement = $("<td>", { class : "subTotal", text : subTotal }).data("subTotal", subTotal);

    $quantityElement.data("subTotalReference", $subTotalElement);
    $quantityElement.appendTo($productRow);
    $subTotalElement.appendTo($productRow);

    $("<button>", { class : "remove", text : "remove" }).data("row", $productRow).appendTo($productRemoveButton);
    $productRemoveButton.appendTo($productRow);
    $productRow.appendTo(this.tableElement);
    this.updateTotalPrice();
  },

  updateTotalPrice : function () {
    "use strict";
    var totalPrice = 0;
    $(".subTotal").each(function () {
      totalPrice += $(this).data("subTotal");
    });
    this.totalPriceElement.val(totalPrice);
  },

  updateQuantityBought : function () {
    "use strict";
    var totalQuantity = 0;
    $(".productQuantity").each(function() {
      totalQuantity += parseInt($(this).val());
    });
    $("#myCartTab").text("My Cart (" + totalQuantity + ")");
  },

  bindRemoveEvent : function () {
    "use strict";
    var _this = this;
    this.tableElement.on("click", ".remove", function() {
      $(this).data("row").remove();
      _this.updateQuantityBought();
      _this.updateTotalPrice();
    });
  },

  bindTabEvent : function () {
    "use strict";
    var _this = this;
    this.tabElement.on("click", "#myCartTab", function() {
      _this.display(_this.myCartBlock, _this.productBlockElement);
    });
    this.tabElement.on("click", "#product", function() {
      _this.display(_this.productBlockElement, _this.myCartBlock);
    });
  },

  display : function (tabBlock1, tabBlock2) {
    "use strict";
    tabBlock1.show();
    tabBlock2.hide();
  },

  bindQuantityChangeEvent : function () {
    "use strict";
    var _this = this;
    $("table").on("change", ".productQuantity", function() {
      _this.updateQuantityBought();
      _this.updateSubTotal($(this));
    });
  },

  updateSubTotal : function ($quantityElement) {
    "use strict";
    var $subTotalElement = $quantityElement.parent("td"),
      price = $subTotalElement.data("price"),
      subTotal = parseFloat(price * $quantityElement.val());
    $subTotalElement.data("subTotalReference").data("subTotal", subTotal).text(subTotal);
    this.updateTotalPrice();
  }
};

$(function () {
  "use strict";
  new ShoppingCart($("table"), $("#productsBlock"), $("#totalPrice"), $("#tabs"), $("#myCart")).init();
});