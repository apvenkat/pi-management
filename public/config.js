$(function() {
  $(".gpio-form").submit(function(e) {
    e.preventDefault();
    $.post(
      "/api",
      {
        name: $("#name").val(),
        pin: $("#pin").val(),
        type: $("#type").val(),
        description: $("#description").val(),
        value: $("#value").val()
      },
      alert
    );
  }); //feedback messages

  function alert() {
    var output = "";
    output +=
      '<div class="alert alert-success" role="alert"> Data Inserted Successfully !!</div>';
    $(".alert-messages").html(output);
  }
});
