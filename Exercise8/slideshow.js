/*SlideShow*/
var SlideShow = function($slideShowDiv) {
  this.slideShowDiv = $slideShowDiv;
  this.listElements = this.slideShowDiv.find("li");
  this.totalSlides = this.listElements.length;
  this.count = 0;
};

SlideShow.prototype.start = function() {
    this.createNavigationArea();
    this.prependToBody();
    this.hideListElements();
  this.startSlideShow();
};

//method to hide images initially elements
SlideShow.prototype.hideListElements = function() {
  this.listElements.hide();
};

// Move the #slideshow element to the top of the body.
SlideShow.prototype.prependToBody = function() {
  $('body').prepend(this.slideShowDiv);
};

// Write code to cycle through the list items inside the element; fade one in, display it for a few seconds, then fade it out and fade in the next one.
SlideShow.prototype.startSlideShow = function() {
  this.slide = this.listElements.eq(0);
  this.showSlide(this.slide);
},

  //method to switch to next slide
SlideShow.prototype.nextSlide = function() {
  if (this.count !== this.totalSlides) {
    this.slide = this.slide.next();
    this.showSlide(this.slide);
  } else {
    this.count = 0;
    this.startSlideShow();
  }
};

//method to display slide
SlideShow.prototype.showSlide = function(slide) {
  var _this = this;
  this.showSlideNumber();
  slide.fadeIn(1000)
       .delay(1500)
       .fadeOut(function() {
    _this.nextSlide();
  });
};

//method to display the slide number
SlideShow.prototype.showSlideNumber = function() {
  this.count++;
  this.slideCount = "<< " + this.count + " / " + this.totalSlides + " >>";
  this.navigationArea.text(this.slideCount);
};

// For an extra challenge, 
// Create a navigation area under the slideshow that shows how many images there are
// And which image you're currently viewing.
SlideShow.prototype.createNavigationArea = function() {
  this.navigationArea = $('<div/>');
  this.slideShowDiv.append(this.navigationArea);
};

$(function() {
  new SlideShow($('#slideshow')).start();
});