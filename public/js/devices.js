$(function() {
  $.getJSON('api', updateFeedback);


    $('.feedback-form').submit(function(e) {
      e.preventDefault();
      $.post('api', {
        name: $('#feedback-form-name').val(),
        description: $('#feedback-form-description').val(),
        pin: $('#feedback-form-title').val(),
        type: $('#feedback-form-message').val(),
        value: $('#feedback-form-value').val()
      }, updateFeedback);
    });

  // $('.feedback-messages').on('click', function(e) {
  //     if (e.target.className == 'glyphicon glyphicon-remove') {
  //       $.ajax({
  //         url: 'api/' + e.target.id,
  //         type: 'DELETE',
  //         success: updateFeedback
  //       }); //ajax
  //     } // the target is a delete button
  // }); //feedback messages



  function updateFeedback(data) {
   var output = '';
   $.each(data,function(key, item) {

    output += '<div class="card text-white bg-dark test m-3" style="width: 15rem;">';
      output += '<div class="card-header">GPI0'+item.pin +'</div>';
      output +=  '<div class="card-body">';
      output +=  '<h5 class="card-title">'+item.name+ '</h5>';
      output +=  '<p class="card-text"></p>';
      output +=  '</div>';
      output +=  '<div class="card-footer">';
      output +=  '<input type="checkbox" checked data-toggle="toggle" data-onstyle="success" data-offstyle="danger">';
    output +=   '</div>';
    output +=  '</div>';


        });
   $('#devices-dashboard').html(output);
  }
});
