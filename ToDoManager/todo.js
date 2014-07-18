//Class for ToDo
var ToDoTask = function (toDoTask, selectedElementValue, $userElement, $toDoListDiv) {
  this.toDoTask = toDoTask;
  this.assignee = selectedElementValue;
  this.userReference = $userElement;
  this.toDoListDiv = $toDoListDiv;
};

ToDoTask.prototype.validate = function () {
  return this.toDoTask.trim();
};

ToDoTask.prototype.save = function () {
  var $div = $("<div>");
  this.element = $("<span>", {class : "toDo"}).html(" ToDoTask: " + this.toDoTask + " Assignee: " + this.assignee);
  this.checkbox = $("<input>", { class : "checkbox", type : "checkbox" }).data("reference", this.element)
                                                                         .data("userReference", this.userReference).appendTo($div);
  this.element.appendTo($div);
  $div.appendTo(this.toDoListDiv);
  return this;
};


var User = function (name, remainingToDoCount, $userListDiv) {
  this.name = name;
  this.remainingToDoCount = remainingToDoCount;
  this.userListDiv = $userListDiv;
};

User.prototype.add = function () {
  this.element = $('<div>', {class : 'name'}).html("Name: " + this.name + " (" + this.remainingToDoCount + ")")
                                             .data("remainingToDoCount", this.remainingToDoCount)
                                             .data("name", this.name);
  this.element.appendTo(this.userListDiv);
  return this;
};
  
  //method to validate the input in the name field
User.prototype.validateName = function () {
  return this.name.trim(); 
};


//Users Class
var ToDoManager = function (fetchedElementList) {
  this.nameBlock = fetchedElementList.nameBlock;
  this.nameElement = this.nameBlock.find('#name');
  this.addButton = this.nameBlock.find('#add');
  this.toDoBlock = fetchedElementList.toDoBlock;
  this.toDoElement = this.toDoBlock.find('#toDo');
  this.selectList = this.toDoBlock.find('#select');
  this.createToDo = fetchedElementList.createToDo;
  this.createUser = fetchedElementList.createUser;
  this.userListDiv = fetchedElementList.userList;
  this.toDoListDiv = fetchedElementList.toDoList;
  this.usersList = [];
  this.usersToDo = [];
  this.remainingToDoCount = 0;
};

//method to bind click on create user and create to-do button
ToDoManager.prototype.init = function () {
  this.createToDo.hide();
  this.nameBlock.hide();
  this.toDoBlock.hide();
  this.bindEvents();
};

ToDoManager.prototype.bindEvents = function () {
  var _this = this;
  this.createUser.on("click", function () {
    _this.display(_this.toDoBlock, _this.nameBlock, _this.createToDo);
  });

  this.createToDo.on("click", function () {
    _this.display(_this.nameBlock, _this.toDoBlock, _this.createUser);
  });

  this.bindSaveEvent();
  this.bindCheckboxEvent();
  this.bindAddUserEvent();
};

ToDoManager.prototype.display = function ($blockToHide, $blockToShow, $buttonElement) {
  $blockToHide.hide();
  $blockToShow.show();
  $buttonElement.hide();
};

//method to bind click on add user
ToDoManager.prototype.bindAddUserEvent = function () {
  var _this = this;
  this.nameBlock.on("click", "#add", function () {
    var user = new User(_this.nameElement.val(), _this.remainingToDoCount, _this.userListDiv);
    if (user.validateName() && _this.checkUserExistence()) {
      _this.usersList.push(user.add());
      _this.addUserToSelectList(user.element);
      _this.nameElement.val("");
      _this.nameBlock.hide();
      _this.createToDo.show();
    }
  });
};

//method to check whether user already exists or not
ToDoManager.prototype.checkUserExistence = function () {
  var _this = this,
    valid = true;
  $.each(this.usersList, function (i) {
    if (_this.nameElement.val() == _this.usersList[i].name) {
      valid = false;
    }
  });
  return valid;
};

ToDoManager.prototype.addUserToSelectList = function ($userElement) {
  $('<option>', {class : 'option'}).data("userReference", $userElement).html(this.nameElement.val()).appendTo(this.selectList);
};

//method to bind save To-Do click
ToDoManager.prototype.bindSaveEvent = function () {
  var _this = this;
  this.toDoBlock.on("click", "#saveButton", function () {
    var toDo = new ToDoTask(_this.toDoElement.val(), _this.selectList.val(), _this.selectList.find(":selected").data("userReference"), _this.toDoListDiv);
    if (toDo.validate()) {
      _this.toDoBlock.hide();
      _this.createUser.show();
      _this.usersToDo.push(toDo.save());
      _this.toDoElement.val("");
      _this.incrementToDoCount(_this.selectList.find(":selected").data("userReference"));
    }
  });
};

ToDoManager.prototype.incrementToDoCount = function ($userElement) {
  var remainingToDoCount = $userElement.data("remainingToDoCount");
  remainingToDoCount += 1;
  $userElement.data("remainingToDoCount", remainingToDoCount).html("Name: " + $userElement.data("name") + " (" + remainingToDoCount + ")");
};

//method to bind checkbox click
ToDoManager.prototype.bindCheckboxEvent = function () {
  var _this = this;
  this.toDoListDiv.on("click", ".checkbox", function () {
    var $checkboxElement = $(this);
    _this.strikethroughText($checkboxElement.data("reference"));
    _this.updateUsersToDoCount($checkboxElement.data("userReference"), $checkboxElement);
  });
};

ToDoManager.prototype.strikethroughText = function ($toDoTaskElement) {
  $toDoTaskElement.toggleClass("strikethrough");
};

//method to update the users to-do counts
ToDoManager.prototype.updateUsersToDoCount = function ($userElement, $checkboxElement) {
  var remainingToDoCount = $userElement.data("remainingToDoCount");
  if ($checkboxElement.is(":checked")) {
    remainingToDoCount -= 1;
  } else {
    remainingToDoCount += 1;
  }
  $userElement.data("remainingToDoCount", remainingToDoCount).html("Name: " + $userElement.data("name") + " (" + remainingToDoCount + ")");
};

$(function () {
  var fetchedElementList = {
    "nameBlock" : $('#name_block'),
    "toDoBlock" : $('#todo_block'),
    "createToDo" : $('#createToDo'),
    "createUser" : $('#createUser'),
    "userList" : $('#userList'),
    "toDoList" : $('#todoList')
  };
  new ToDoManager(fetchedElementList).init();
});