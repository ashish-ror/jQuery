/*Shopping Cart*/
var ShoppingCart = function ($tableElement, $productsBlockElement, $totalPriceElement, $myCartElement) {
  this.tableElement = $tableElement;
  this.productBlockElement = $productsBlockElement;
  this.totalPriceElement = $totalPriceElement;
  this.myCartElement = $myCartElement;
  this.jsonData = "";
};

ShoppingCart.prototype = {
  init : function () {
    if(!this.jsonData) {
      this.getJson();
    }
  },

  getJson : function () {
    var _this = this;
    $.getJSON("products.json").done(function(data) {
      _this.jsonData = data;
      _this.populateProductsTab();
      _this.bindTabEvent();
      _this.bindEvent();
    }).fail(function() {
      alert("Not able to load JSON");
    });
  },

  populateProductsTab : function () {
    for(var itemType in this.jsonData) {
      // creating a display element
      var $div = $("<div/>", { class : "products"}),
        $span = $("<span>", { class: "details"});
   
      $("<img>", { class : "productImage", src : this.jsonData[itemType]["image"]}).appendTo($div);
      $("<h2/>", { class : "productName"}).text(this.jsonData[itemType]["name"]).appendTo($span);
      $("<p/>").text("Category : " + itemType).appendTo($span);
      $("<p/>").text(this.jsonData[itemType]["text"]).appendTo($span);

      $("<h2/>", { class : "price"}).text(this.jsonData[itemType]["price"])
                                  .data("price", this.jsonData[itemType]["price"])
                                  .appendTo($span);
      
      $("<span>", { class : "quantity"}).text("Quantity : ").appendTo($div);
      $("<input>" , { type : "text", val : "1", class : "quantity" }).appendTo($div);
      $("<input>", { type : 'button', value : "Add to Cart", class : "addToCart" }).data("data", this.jsonData[itemType])
                                                                                   .appendTo($div);
      $span.appendTo($div);
      $div.appendTo(this.productBlockElement);
    }
  },

  bindEvent : function () {
    var _this = this;
    $(".addToCart").click(function () {
      var quantity =$(this).siblings("input").val();
      _this.addProductToMyCart($(this).data("data"), quantity);
      _this.updateQuantityBought();
    });
    this.bindRemoveEvent();
  },

  addProductToMyCart : function (data, quantity) {
    var $productRow = $ ("<td>"),
      $productDetails = $("<td>"),
      $productImage = $("<img>", { src : data.image }),
      productName = data.name;
    
    $productDetails.append($("<h4>", { text : productName })).appendTo($productRow);
    var price = data.price;
    $("<td>", { text : price }).data("price", price).appendTo($productRow);
    $("<td>").html($("<input>", { class : "productQuantity", type : "text", value : quantity })).appendTo($productRow);
    
    var subTotal = parseFloat((price * quantity).toFixed(2));
    $("<td>", { class : "subtotal", text : subTotal }).data("subtotal", subTotal).appendTo($productRow);
    $("<button>", { class : "remove", text : "remove" }).data("row", $productRow).appendTo($productRow);
    $productRow.appendTo(this.tableElement);
    this.updateTotalPrice();
  },

  updateTotalPrice : function () {
    var totalPrice = 0;
    $(".subtotal").each(function () {
      totalPrice += $(this).data("subtotal");
    });
    this.totalPriceElement.val(totalPrice.toFixed(2));
  },

  updateQuantityBought : function () {
    var totalQuantity = 0;
    $(".productQuantity").each(function() {
      totalQuantity += parseInt($(this).val());
    });
    $("#myCartTab").text("My Cart (" + totalQuantity + ")" );
  },

  bindRemoveEvent : function () {
    var _this = this;
    this.tableElement.on("click", ".remove", function() {
      $(this).data("row").remove();
      _this.updateQuantityBought();
      _this.updateTotalPrice();
    });
  },

  bindTabEvent : function () {
    var _this = this;
    $("#myCartTab").on("click",function() {
      _this.myCartElement.show()
      $(".products").hide();
    });
  }
};

$(function () {
  var shoppingCart = new ShoppingCart($("table"), $("#productsBlock"), $("totalPrice"), $("#myCart"));
  shoppingCart.init();
});