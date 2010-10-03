function(e, tool) {
  $.log('in board td update');
  $(this).append($('<img>', {src: 'style/images/' + tool + '.png'}));
}

