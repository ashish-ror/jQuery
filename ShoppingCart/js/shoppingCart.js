/*Shopping Cart*/
//class product
var Product = function (productData) {
  "use strict";
  this.productData = productData;
};

Product.prototype = {
  //method to add product to product tab
  addToProductTab : function (itemType) {
    "use strict";
    //div and span element to append product data
    var $div = $("<div/>", { class : "products"}),
        $span = $("<span>", { class: "details"});

    //image tag for product image
    $("<img>", { class : "productImage", src : this.productData.image}).appendTo($div);

    //heading tag for product name 
    $("<h2/>", { class : "productName"}).text(this.productData.name).appendTo($span);

    //paragraph tag for the details of the products
    $("<p/>").text("Category : " + itemType).appendTo($span);
    $("<p/>").text(this.productData.text).appendTo($span);

    //heading tag for price of product
    $("<h2/>", { class : "price"}).text(this.productData.price)
                                  .data("price", this.productData.price)
                                  .appendTo($span);
    $span.appendTo($div);

    //span and input tag for quantity
    $("<span>", { class : "quantity"}).text("Quantity : ").appendTo($div);
    $("<input>", { type : "text", val : "1"}).appendTo($div);

    //input button tag for adding items to cart with whole product data in its data attribute
    $("<input>", { type : 'button', value : "Add to Cart", class : "addToCart" }).data("data", this.productData)
                                                                                   .appendTo($div);
    return $div;
  },

  //method to add product to myCart
  addToMyCart : function (quantity) {
    "use strict";
    var $productRow = $("<tr>"),
      $productDetails = $("<td>"),
      $productRemoveButton = $("<td>");

    //image tag for added product's image and product's details in first column
    $("<img>", { src : this.productData.image }).appendTo($productDetails);
    $productDetails.append($("<h4>", { text : this.productData.name })).appendTo($productRow);
    
    // second column Price
    $("<td>", { text : this.productData.price }).data("price", this.productData.price).appendTo($productRow);
    
    // third column quantity and fourth column for subtotal
    var $quantityElement = $("<td>").data("price", this.productData.price).html($("<input>", { class : "productQuantity", type : "text", value : quantity })),
      subTotal = parseFloat((this.productData.price * quantity)),
      $subTotalElement = $("<td>", { class : "subTotal", text : subTotal }).data("subTotal", subTotal);

    $quantityElement.data("subTotalReference", $subTotalElement);
    $quantityElement.appendTo($productRow);
    $subTotalElement.appendTo($productRow);

    //button tag for removing product from my cart with row reference in its data attribute
    $("<button>", { class : "remove", text : "remove" }).data("row", $productRow).appendTo($productRemoveButton);
    $productRemoveButton.appendTo($productRow);
    return $productRow;
  }
};

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

  //method to get json from the source
  getJson : function () {
    "use strict";
    var _this = this;
    $.getJSON("data/products.json").done(function (data) {
      _this.jsonData = data;
      _this.populateProductsTab();
      _this.bindTabEvent();
      _this.bindAddProductEvent();
    }).fail(function() {
      alert("Not able to load JSON");
    });
  },

  //method to set data on tab
  setDataOnTab : function (blockObject, blockId) {
    this.tabElement.find(blockId).data("BlockObject", blockObject);
  },

  //method to add products data to products tab
  populateProductsTab : function () {
    "use strict";
    var _this = this;
      // creating a product block display
    $.each(this.jsonData, function(itemType) {
      var $div = new Product(_this.jsonData[itemType]).addToProductTab(itemType);
      $div.appendTo(_this.productBlockElement);
    });
    this.setDataOnTab(this.productBlockElement, "#product");
    this.setDataOnTab(this.myCartBlock, "#myCartTab");
  },

  //method to bind event on Add To Cart Button
  bindAddProductEvent : function () {
    "use strict";
    var _this = this;
    $(".addToCart").click(function () {
      var $addElement = $(this),
        quantity = $addElement.siblings("input").val();
      _this.addProductToMyCart($addElement.data("data"), quantity);
      _this.updateTotalPrice();
      _this.updateQuantityBought();
    });
    this.bindRemoveEvent();
    this.bindQuantityChangeEvent();
  },

  //method to add product to my cart
  addProductToMyCart : function (productData, quantity) {
    "use strict";
    var $productRow = new Product(productData).addToMyCart(quantity);
    $productRow.appendTo(this.tableElement);
  },

  //method to get total price
  getTotalPrice : function () {
    "use strict";
    var totalPrice = 0;
    $(".subTotal").each(function () {
      totalPrice += $(this).data("subTotal");
    });
    return totalPrice;
  },

  //method to update total price
  updateTotalPrice : function () {
    "use strict";
    this.totalPriceElement.val(this.getTotalPrice());
  },

  //method to get total quantity
  getTotalQuantity : function () {
    "use strict";
    var totalQuantity = 0;
    $(".productQuantity").each(function() {
      totalQuantity += parseInt($(this).val());
    });
    return totalQuantity;
  },

  //method to update the quantity bought in the myCart
  updateQuantityBought : function () {
    "use strict";
    this.tabElement.find("#myCartTab").text("My Cart (" + this.getTotalQuantity() + ")");
  },

  //method to bind event on Remove Button
  bindRemoveEvent : function () {
    "use strict";
    var _this = this;
    this.tableElement.on("click", ".remove", function() {
      $(this).data("row").remove();
      _this.updateQuantityBought();
      _this.updateTotalPrice();
    });
  },

  //method to bind event on Tabs
  bindTabEvent : function () {
    "use strict";
    this.tabElement.on("click", ".tab", function() {
      $(this).data("BlockObject").show();
      $(this).siblings("li").data("BlockObject").hide();
    });
  },

  //method to bind event on quantity change in myCart Tab
  bindQuantityChangeEvent : function () {
    "use strict";
    var _this = this;
    this.tableElement.on("change", ".productQuantity", function() {
      _this.updateQuantityBought();
      _this.updateSubTotal($(this));
    });
  },

  //method to update subtotal on change of quantity
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
  var myShoppingCart = new ShoppingCart($("table"), $("#productsBlock"), $("#totalPrice"), $("#tabs"), $("#myCart"));
    myShoppingCart.init();  
});