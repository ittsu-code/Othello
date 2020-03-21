"use strict"; //strict

//1-1 クラスの定義
class Vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

//1-2 変数・定数の定義
let message;
let board;
const boardSize = new Vec2(8, 8)
const diskColor = {
  dark: 0,
  light: 1,
  none: 2,
  max: 3
};
const diskAA = [
  '●',
  '○',
  '・'
];

let cursorPos;

let turn;

const diskNames = [
  '黒',
  '白'
];

//1-3 関数の定義
function init() {
  //2-1 盤面の形成
  board = [];
  for (let i = 0; i < boardSize.y; i++) {
    board[i] = [];
    for (let j = 0; j < boardSize.x; j++)
      board[i][j] = diskColor.none;
  }

  //2-2 ゲームの初期化
  message = '';
  board[3][4] = diskColor.dark;
  board[4][3] = diskColor.dark;
  board[3][3] = diskColor.light;
  board[4][4] = diskColor.light;

  cursorPos = new Vec2(0, 0);

  turn = diskColor.dark;

  //2-3 描画処理
  draw();
  window.onkeydown = onKeyDown

}

function draw() {
  //3-1 描画前の処理
  let html = '';
  //3-2 盤面の描画
  for (let i = 0; i < boardSize.y; i++) {
    for (let j = 0; j < boardSize.x; j++)
      html += diskAA[board[i][j]];
    if (i === cursorPos.y)
      html += '←';

    html += '<br>';
  }

  for (let i = 0; i < boardSize.x; i++)
    html += (i === cursorPos.x)
      ? '↑'
      : '　';
  html += '<br>';

  //3-3 メッセージ処理
  if (true) {
    message +=
      `${diskNames[turn]}のターンです。<br>`

    message += `<br>
      [w, s, a, d]:カーソル移動<br>
      [その他のキー]:石を置く`;
  } else;

  //3-4 HTMLファイルへ出力
  html += '<br>' + message;
  let div = document.querySelector('div');
  div.innerHTML = html;
}

function onKeyDown(e) {
  message = '';

  switch (e.key) {
    case 'w': cursorPos.y--; break;
    case 's': cursorPos.y++; break;
    case 'a': cursorPos.x--; break;
    case 'd': cursorPos.x++; break;
    default: onOtherKeyDown();
  }

  if (cursorPos.x < 0) cursorPos.x += boardSize.x;
  if (cursorPos.x >= boardSize.x) cursorPos.x -= boardSize.x;
  if (cursorPos.y < 0) cursorPos.y += boardSize.y;
  if (cursorPos.y >= boardSize.y) cursorPos.y -= boardSize.y;

  draw();
}

function onOtherKeyDown() {
  if (checkCanPlace(turn, cursorPos, false)) {
    board[cursorPos.y][cursorPos.x] = turn;
    takeTurn();
  } else
    message += 'そこには置けません<br>';
}

function takeTurn() {
  if (turn === diskColor.dark)
    turn = diskColor.light;
  else
    turn = diskColor.dark;
}

function checkCanPlace(
  color,
  pos,
  reverse,
) {
  let result = false;
  if (board[pos.y][pos.x] !== diskColor.none)
    return false;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let dir = new Vec2(j, i);
      if ((dir.x === 0) && (dir.y === 0))
        continue;
      let checkPos = new Vec2(
        pos.x + dir.x,
        pos.y + dir.y
      );
      if (!isInBoard(checkPos))
        continue;
      let opponent;
      if (color === diskColor.dark)
        opponent = diskColor.light;
      else
        opponent = diskColor.dark;
      if (board[checkPos.y][checkPos.x] !== opponent)
        continue;

      while (true) {
        checkPos.x += dir.x;
        checkPos.y += dir.y;

        if (!isInBoard(checkPos)) break;
        if (board[checkPos.y][checkPos.x] === diskColor.none)
          break;

        if (board[checkPos.y][checkPos.x] === color) {
          result = true;
          //ひっくり返すことが特定
          if (reverse) {
            //ひっくり返すかどうかの分岐
          }
        }
      }
    }
  }

  return result;
}

function isInBoard(v) {
  return v.x >= 0
    && v.x < boardSize.x
    && v.y >= 0
    && v.y < boardSize.y;
}

//4 関数の呼び出し
init();