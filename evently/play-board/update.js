function(e, x, y, tool) {
  $.log('in update board');
  $(this).find('tr:eq('+ (y + 1) +') td:eq('+ (x - 1) +')').trigger('update', [tool]);
}
