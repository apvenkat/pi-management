$(function() {
  $(".signup").submit(function(e) {
    e.preventDefault();
    $.ajax({
      url: "/api/AddUser",
      dataType: "json",
      type: "POST",
      success: function() {
        alert("success");
      }
    }); //ajax
  }); //feedback messages
});
