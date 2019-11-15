$(function() {
  $(".signup").submit(function(e) {
    e.preventDefault();
    $.post(
      "/api/AddUser",
      {
        name: $("#name").val(),
        email: $("#email").val(),
        password: $("#password").val()
      },
      alert("success")
    );
  }); //feedback messages
});
