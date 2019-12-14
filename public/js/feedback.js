$(function() {
  $.getJSON('api', updateFeedback);

  $('.feedback-form').submit(function(e) {
    e.preventDefault();
 //ajax

    $.post('api', {
      name: $('#feedback-form-name').val(),
      pin: $('#feedback-form-title').val(),
      type: $('#feedback-form-message').val(),
      value: $('#feedback-form-value').val()
    },updateFeedback);
  });

  $('.feedback-messages').on('click', function(e) {
      if (e.target.className == 'glyphicon glyphicon-remove') {
        $.ajax({
          url: 'api/' + e.target.id,
          type: 'DELETE',

        }); //ajax
      } // the target is a delete button
  }); //feedback messages

  function updateFeedback(data) {
   var output = '';
   $.each(data,function(key, item) {
     output += '     <div class="feedback-item item-list media-list">';
     output += '       <div class="feedback-item media">';
     output += '       <div class="media-left"><button class="feedback-delete btn btn-xs btn-danger"><span id="' + key + '" class="glyphicon glyphicon-remove"></span></button></div>';
     output += '         <div class="feedback-info media-body">';
     output += '           <div class="feedback-head">';
     output += '             <div class="feedback-title">' + item.name + ' <small class="feedback-name label label-info">' + item.pin + '</small></div>';
     output += '           </div>';
     output += '           <div class="feedback-message">' + item.type + '</div>';
     output += '         </div>';
     output += '       </div>';
     output += '     </div>';
   });
   $('.feedback-messages').html(output);
  }
});
