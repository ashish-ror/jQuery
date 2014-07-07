/*Contact Manager*/
var Contact = function (name, email) {
  this.name = name;
  this.email = email;
  this.emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
};

Contact.prototype.create = function () {
  this.element = $('<div>', {class : 'contact'}).html("Name: " + this.name + "<br>Email:  " + this.email + "<br>");
  this.removeButton = $("<input>", { type : 'button', value : "Remove", class : "remove" }).data("contactObject", this.element)
                                                                                           .appendTo(this.element);
  return this;
};

Contact.prototype.validate = function () {
  if(this.name.trim() && this.email.match(this.emailRegex)) {
    return true;
  }
  return false;
};

var ContactManager = function ($contactBlock, $searchBlock, $displayBlock) {
  this.nameElement = $contactBlock.find('#name');
  this.emailElement = $contactBlock.find('#email');
  this.saveButton = $contactBlock.find('#saveButton');
  this.searchElement = $searchBlock.find('#search');
  this.displayBlock = $displayBlock;
  this.contacts = [];
};

ContactManager.prototype.search = function () {
  var _this = this;
  $.each(this.contacts, function (i) {
    if (!_this.matchSearchInput(_this.contacts[i].name, _this.searchElement.val())) {
      _this.contacts[i].element.hide();
    } else {
      _this.contacts[i].element.show();
    }
  });
};

ContactManager.prototype.matchSearchInput = function (name, searchInput) {
  var name = this.convertToLowerCase(name),
    searchInput = this.convertToLowerCase(searchInput);
  return(name.match(searchInput));
};

ContactManager.prototype.convertToLowerCase = function (inputText) {
  return inputText.toLowerCase();
};

ContactManager.prototype.createNewContact = function () {
  var contact = new Contact(this.nameElement.val(), this.emailElement.val());
  if (contact.validate()) {
    newContact = contact.create();
    this.contacts.push(newContact);
    this.appendElementToDisplay(newContact.element);
  }
};

ContactManager.prototype.appendElementToDisplay = function ($contactElement) {
  $contactElement.appendTo(this.displayBlock);
};

ContactManager.prototype.bindEvents = function () {
  var _this = this;
  this.saveButton.click(function () {
    _this.createNewContact();
  });

  this.searchElement.on('keyup',function () {
    _this.search();
  });

  this.displayBlock.on('click', ".remove", function () {
    $(this).data("contactObject").remove();
  });
};

$(function () {
  new ContactManager($('#contact_block'), $('#search_block'), $('#display_block')).bindEvents();
});