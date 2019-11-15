$(function() {
  $(".signup").submit(function(e) {
    e.preventDefault();
    $.ajax({
      url: "/api/AddUser",
      type: "POST",
      success: function() {
        alert("success");
      }
    }); //ajax
  }); //feedback messages
});
