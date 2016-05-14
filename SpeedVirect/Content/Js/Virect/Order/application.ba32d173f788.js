'use strict';
(function() {
  // Focus state for append/prepend inputs
  $('.input-group').on('focus', '.form-control', function () {
    $(this).closest('.input-group, .form-group').addClass('focus');
  }).on('blur', '.form-control', function () {
    $(this).closest('.input-group, .form-group').removeClass('focus');
  });

  // AJAX forms
  $('form[data-remote=true]').submit(function(e) {
    var $form = $(this);
    var postData = $form.serializeArray();
    var postUrl = $form.attr('action');

    $.post(postUrl, postData, function(data, textStatus, jqXHR) {
      if ($form.attr('class') == 'js-toggler-form') {
        // Then toggle ths closest container
        $form.closest('.js-toggler-container').toggleClass('on');
      }
    });
    e.preventDefault();
  });
})();
