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

var row,
   square,
   i,
   j,
   img,
   position_old,
   position_new,
   is_piece,
   reply,
   piece_image;

var whites_turn = true;
var can_castle_white = true;
var can_castle_black = true;

function _img_piece(name) {
   piece_image = document.createElement('img');
   piece_image.setAttribute('src', 'assets/' + name + '.png');
   return piece_image;
}

function img_tag(i, j) {
   if (i === 2) tag = _img_piece(pieces[20]);
   else if (i === 7) tag = _img_piece(pieces[70]);
   else if (i === 1 || i === 8) tag = _img_piece(pieces[i * 10 + j]);
   else return;
   return tag;
}

function rotate() {
   whites_turn = !whites_turn;
   document.querySelectorAll('.square').forEach((square) => {
      square.style.transform = whites_turn ? 'rotate(0deg)' : 'rotate(180deg)';
   });
}

function swap(position_selected) {
   position_selected.innerHTML = position_old.innerHTML;
   position_selected.style.border = '10px solid black';
   position_new = position_selected;

   position_old.innerHTML = '';
   position_old.style.border = '';
   position_old = null;
}

function select(position_selected) {
   if (position_new) position_new.style.border = '';
   if (position_old) position_old.style.border = '';
   position_selected.style.border = '10px solid black';
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
   is_piece = this.innerHTML;
   if (position_old) {
      if (
         (whites_turn && is_piece.indexOf('white') !== -1) ||
         (!whites_turn && is_piece.indexOf('black') !== -1)
      )
         select(this);
      else {
         if (
            position_old.innerHTML.indexOf('king') !== -1 &&
            (can_castle_white || can_castle_black)
         )
            prompt_caste(this);
         else {
            swap(this);
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
      select(this);
   }
}

for (i = 1; i <= 8; ++i) {
   row = document.createElement('div');
   row.className = 'row';
   for (j = 1; j <= 8; ++j) {
      square = document.createElement('div');
      square.className = 'square';
      if ((j % 2 === 0 && i % 2 !== 0) || (j % 2 !== 0 && i % 2 === 0))
         square.style.backgroundColor = '#666';
      piece_image = img_tag(i, j);
      if (piece_image) square.appendChild(piece_image);
      square.addEventListener('click', handle_click);
      row.appendChild(square);
   }
   document.body.appendChild(row);
}
