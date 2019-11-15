$(function() {
  $.getJSON("api", updateFeedback);

  $(".feedback-form").submit(function(e) {
    e.preventDefault();
    $.post(
      "api",
      {
        name: $("#feedback-form-name").val(),
        gpio: $("#feedback-form-gpio").val(),
        value: $("#feedback-form-value").val()
      },
      updateFeedback
    );
  });
});
