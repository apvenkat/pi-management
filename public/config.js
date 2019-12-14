$(function() {
  $.getJSON("api", updateFeedback);

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
      updateFeedback
    );
  }); //feedback messages

  function updateFeedback(data) {
    console.log(data);
    var output = "";

    $.each(data, function(key, item) {
      console.log(key);
      output += '     <div class="feedback-item item-list media-list">';
      output += '       <div class="feedback-item media">';
      output +=
        '       <div class="media-left"><button class="feedback-delete btn btn-xs btn-danger"><span id="' +
        key +
        '" class="glyphicon glyphicon-remove"></span></button></div>';
      output += '         <div class="feedback-info media-body">';
      output += '           <div class="feedback-head">';
      output +=
        '             <div class="feedback-title">' +
        item.pin +
        ' <small class="feedback-name label label-info">' +
        item.name +
        "</small></div>";
      output += "           </div>";
      output += "<table>";
      output += "<tr>";
      output +=
        '<div><button class="btn btn-success btn-just-icon" id="' +
        key +
        '"  >On</button></div>';
      output +=
        '<div><button class="btn btn-danger btn-just-icon" id="' +
        key +
        '"  >Off</button></div>';
      output += "</tr>";
      output += "</table>";
      output += "         </div>";
      output += "       </div>";
      output += "     </div>";
    });
    $(".feedback-messages").html(output);
  }
});
