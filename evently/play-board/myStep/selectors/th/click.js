function() {
    $.log('click th');
    var x = $(this).attr('data-x');
    var coords = Game.step(x);

    if (coords) {
      //var td = table.find('tr:eq('+ (coords['y'] + 1) +') td:eq('+ coords['x'] +')');
      //$(this).append($('<img>', {src: 'style/images/heart.png'}));
      //$(this).triger('update', coords);
    }
}
