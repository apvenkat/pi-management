$(function() {
  $(".login").submit(function(e) {
    e.preventDefault();
    $.post(
      "/LoginUser",
      {
        email: $("#email").val(),
        password: $("#password").val()
      },
      redirect
    );
  }); //feedback messages

  function redirect() {
    $.ajax({
      type: "GET",
      url: "",
      headers: {
        "X-Auth-Token": $.cookie("token")
      },
      success: function() {
        window.location = "/dashboard";
      }
    });
  }
});
