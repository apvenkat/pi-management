$(function() {
  $(".login").submit(function(e) {
    e.preventDefault();
    $.ajax({
      url: "LoginUser",
      dataType: "json",
      type: "POST",
      success: function() {
        $.ajax({
          url: "dashboard",
          header: {
            "X-Auth-Token": $.cookie("token")
          },
          dataType: "json",
          type: "GET",
          success: (window.location = "dashboard")
        });
      }
    }); //feedback messages

    // function alert() {
    //     var output = "";
    //     output +=
    //         '<div class="alert alert-success" role="alert"> Data Inserted Successfully !!</div>';
    //     $(".alert-messages").html(output);
    // }
  });
});
