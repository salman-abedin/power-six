const pieces = {
   11: 'black_rook',
   12: 'black_knight',
   13: 'black_bishop',
   14: 'black_queen',
   15: 'black_king',
   18: 'black_rook',
   17: 'black_knight',
   16: 'black_bishop',
   20: 'black_pawn',

   81: 'white_rook',
   82: 'white_knight',
   83: 'white_bishop',
   84: 'white_queen',
   85: 'white_king',
   88: 'white_rook',
   87: 'white_knight',
   86: 'white_bishop',
   70: 'white_pawn',
};

var row, square, i, j, img, selected;
var whites_turn = true;

function _img_piece(name) {
   return '<img src=assets/' + name + '.png>';
}

function img_tag(i, j) {
   if (i === 2) tag = _img_piece(pieces[20]);
   else if (i === 7) tag = _img_piece(pieces[70]);
   else if (i === 1 || i === 8) tag = _img_piece(pieces[i * 10 + j]);
   else tag = '';
   return tag;
}

function handle_click() {
   // if (
   //    (whites_turn && $(this).html().includes('black')) ||
   //    (!whites_turn && $(this).html().includes('white'))
   // ) {
   //    return;
   // }
   if (selected) {
      if ($(this).html() === selected.html()) {
         selected.css('border', '');
         selected = null;
         return;
      }
      $(this).html(selected.html());
      $(this).css('border', '10px solid black');

      selected.empty();
      selected.css('border', '');
      selected = null;

      whites_turn ^= true;

      $('.square').css({
         transform: whites_turn ? 'rotate(0deg)' : 'rotate(180deg)',
      });
   } else {
      if (!$(this).html()) return;
      selected = $(this);
      $('.square').css('border', '');
      selected.css('border', '10px solid black');
   }
}

for (i = 1; i <= 8; ++i) {
   row = $('<div class="row">');
   for (j = 1; j <= 8; ++j) {
      square = $('<div class="square">');
      if ((j % 2 === 0 && i % 2 !== 0) || (j % 2 !== 0 && i % 2 === 0))
         square.css('background-color', '#666');
      square.append(img_tag(i, j));
      square.click(handle_click);
      row.append(square);
   }
   $('body').append(row);
}
