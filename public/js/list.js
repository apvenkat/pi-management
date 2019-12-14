$(function() {
  $.getJSON('api', updateFeedback);

  // $('.feedback-form').submit(function(e) {
  //   e.preventDefault();
  //   $.post('api', {
  //     name: $('#feedback-form-name').val(),
  //     pin: $('#feedback-form-title').val(),
  //     type: $('#feedback-form-message').val(),
  //     value: $('#feedback-form-value').val()
  //   }, updateFeedback);
  // });

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

     output += '<tr>';
       output +=  '<td class="pt-3-half" contenteditable="true">'+ item.name + '</td>';
       output +=  '<td class="pt-3-half" contenteditable="true">'+ item.pin +'</td>';
       output +=  '<td class="pt-3-half" contenteditable="true">'+ item.type +'</td>';
       output +=  '<td class="pt-3-half" contenteditable="true">'+ item.value +'</td>';
       output +=  '<td>';
       output +=      '<span class="table-remove"><button type="button" class="btn btn-success btn-rounded btn-sm my-0">Edit</button></span>';
       output +=      '<span class="table-remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0">Remove</button></span>';

       output +=  '</td>';
   output +=  '</tr>';




   });
   $('.device-list').html(output);
  }
});
