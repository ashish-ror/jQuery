/*Input hint on search inputbox and add remove class on the basis of event*/
$(function() {
  var labelText = $('label[for = "q"]').text();
  
  // Set the value of the search input to the text of the label element
  // Add a class of "hint" to the search input
  $('.input_text').val(labelText).addClass("hint");
  
  // Remove the label element
  $('label[for = "q"]').remove();
  
  $('.input_text').on({
    // Bind a focus event to the search input that removes the hint text and the "hint" class
    focus: function () {
      if ($(this).val().trim() == labelText) {
        $(this).val("").removeClass("hint");
      }
    },
    // Bind a blur event to the search input that restores the hint text and "hint" class if no search text was entered
    blur: function () {
      if (!$(this).val().trim()) {
        $(this).val(labelText).addClass("hint");
      }
    }
  });
});






  

  

  

    
