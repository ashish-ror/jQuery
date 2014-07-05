var Contact = function (name, email, $displayBlock) {
  this.name = name;
  this.email = email;
  this.displayBlock = $displayBlock;
  this.emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
};

var ContactManager = function ($contactBlock, $searchBlock, $displayBlock) {
  this.nameElement = $contactBlock.find('#name');
  this.emailElement = $contactBlock.find('#email');
  this.saveButton = $contactBlock.find('#saveButton');
  this.searchElement = $searchBlock.find('#search');
  this.displayBlock = $displayBlock;
  this.contacts = [];
};

Contact.prototype = {
  create : function () {
    this.element = $('<div>', {class : 'contact'}).html("Name: " + this.name + "<br>Email:  " + this.email + "<br>");
    this.removeButton = $("<input>", { type : 'button', value : "Remove", class : "remove" }).data("contact", this.element).appendTo(this.element);
    this.element.appendTo(this.displayBlock);
    return this;
  },

  validate : function () {
    if(this.name.trim() && this.email.match(this.emailRegex)) {
      return true;
    }
    return false;
  },
};

ContactManager.prototype = {
  search : function () {
    var _this = this;
    $.each(this.contacts, function (i) {
      if (!(_this.contacts[i].name.toLowerCase().match(_this.searchElement.val().toLowerCase()))) {
        _this.contacts[i].element.hide();
      } else {
        _this.contacts[i].element.show();
      }
    });
  },

  createNewContact : function () {
    var contact = new Contact(this.nameElement.val(), this.emailElement.val(), this.displayBlock);
    if (contact.validate()) {
      this.contacts.push(contact.create());
    }
  },

  bindEvents : function () {
    var _this = this;
    this.saveButton.click(function () {
      _this.createNewContact();
    });

    this.searchElement.on('keyup',function () {
      _this.search();
    });

    this.displayBlock.on('click', ".remove", function () {
      $(this).data("contact").remove();
    });
  }
};

$(function () {
  new ContactManager($('#contact_block'), $('#search_block'), $('#display_block')).bindEvents();
});