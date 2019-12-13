$(function() {
  $(".login").submit(function(e) {
    e.preventDefault();
    $.post(
      "/LoginUser",
      {
        email: $("#email").val(),
        password: $("#password").val()
      },
      alert
    );
  }); //feedback messages

  function alert() {
    $.ajax({
      url: "/dashboard",
      headers: {
        "x-auth-token": $.cookie("token"),

        "Content-Type": "application/json"
      },
      method: "GET"
    });
  }
});
