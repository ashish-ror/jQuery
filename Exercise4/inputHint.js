/*Input hint on search inputbox and add remove class on the basis of event*/
$(function() {
  var labelText = $('label[for = "q"]').text();
  $('.input_text').val(labelText).addClass("hint");
  $('label[for = "q"]').remove();
  $('.input_text').on({
    focus: function () {
        $(this).val("").removeClass("hint");
    },
    blur: function () {
      if (!$(this).val().trim()) {
        $(this).val(labelText).addClass("hint");
      }
    }
  });
});