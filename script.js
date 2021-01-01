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

var row, square, i, j, img, position_old, position_new, is_piece, reply;
var whites_turn = true;
var can_castle_white = true;
var can_castle_black = true;

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

function rotate() {
   whites_turn = !whites_turn;
   $('.square').css({
      transform: whites_turn ? 'rotate(0deg)' : 'rotate(180deg)',
   });
}

function swap(position_selected) {
   position_selected.html(position_old.html());
   position_selected.css('border', '10px solid black');
   position_new = position_selected;

   position_old.empty();
   position_old.css('border', '');
   position_old = null;
}

function select(position_selected) {
   if (position_new) position_new.css('border', '');
   if (position_old) position_old.css('border', '');
   position_selected.css('border', '10px solid black');
   position_old = position_selected;
}

function prompt_caste(position_selected) {
   swap(position_selected);
   reply = confirm('Wanna castle?');
   if (!reply) rotate();
   if (whites_turn) can_castle_white = !can_castle_white;
   else can_castle_black = !can_castle_black;
}

function handle_click() {
   is_piece = $(this).html();
   if (position_old) {
      if (
         (whites_turn && is_piece.indexOf('white') !== -1) ||
         (!whites_turn && is_piece.indexOf('black') !== -1)
      )
         select($(this));
      else {
         if (
            position_old.html().indexOf('king') !== -1 &&
            (can_castle_white || can_castle_black)
         )
            prompt_caste($(this));
         else {
            swap($(this));
            rotate();
         }
      }
   } else {
      if (
         !is_piece ||
         (whites_turn && is_piece.indexOf('black') !== -1) ||
         (!whites_turn && is_piece.indexOf('white') !== -1)
      )
         return;
      select($(this));
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
