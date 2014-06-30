/*SlideShow*/
var SlideShow = function($slideShowDiv, $listElements) {
  this.slideShowDiv = $slideShowDiv;
  this.listElements = $listElements;
  this.totalSlides = this.listElements.length;
  this.count = 0;
};

SlideShow.prototype = {
  start : function () {
    this.createNavigationArea();
    this.prependToBody();
    this.hideListElements();
    this.startSlideShow();
  },

  //method to hide images initially elements
  hideListElements : function () {
    this.listElements.hide();
  },

  // Move the #slideshow element to the top of the body.
  prependToBody : function () {
    $('body').prepend(this.slideShowDiv);
  },

  // Write code to cycle through the list items inside the element; fade one in, display it for a few seconds, then fade it out and fade in the next one.
  startSlideShow : function () {
    this.slide = this.listElements.eq(0);
    this.showSlide(this.slide);
  },

  //method to switch to next slide
  nextSlide : function () {
    if (this.count !== this.totalSlides) {
      this.slide = this.slide.next();
      this.showSlide(this.slide);
    } else {
      this.count = 0;
      this.startSlideShow();
    }
  },

  //method to display slide
  showSlide : function (slide) {
    var that = this;
    this.showSlideNumber();
    slide.fadeIn(1000)
         .delay(1500)
         .fadeOut(function() { 
           that.nextSlide(); 
          });
  },

  //method to display the slide number
  showSlideNumber : function () {
    this.count++;
    this.slideCount = "<< " + this.count + " / " + this.totalSlides + " >>";
    this.navigationArea.text(this.slideCount);
  },

  // For an extra challenge, 
  // Create a navigation area under the slideshow that shows how many images there are
  // And which image you're currently viewing.
  createNavigationArea : function () {
    this.navigationArea = $('<div/>');
    this.slideShowDiv.append(this.navigationArea);
  }
};

$(document).ready(function () {
  var $slideShowDiv = $('#slideshow'),
    $listElements = $('#slideshow li');
    slideShow = new SlideShow($slideShowDiv, $listElements);
  slideShow.start();
});