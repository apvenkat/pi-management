$(function() {
  $(".signup").submit(function(e) {
    e.preventDefault();
    $.post(
      "/api/AddUser",
      {
        name: $("#name").val(),
        gpio: $("#email").val(),
        value: $("#password").val()
      },
      alert("success")
    );
  }); //feedback messages
});
