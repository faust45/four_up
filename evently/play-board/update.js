function(e, x, y, tool) {
  $(this).find('tr:eq('+ (y + 1) +') td:eq('+ (x - 1) +')').trigger('update', [tool]);
}
