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


  //2-3 描画処理
  draw();

}

function draw() {
  //3-1 描画前の処理
  let html = '';
  //3-2 盤面の描画
  for (let i = 0; i < boardSize.y; i++) {
    for (let j = 0; j < boardSize.x; j++)
      html += diskAA[board[i][j]];
    html += '<br>';
  }

  //3-3 メッセージ処理
  if (true) {
    message += `<br>
      [w, s, a, d]:カーソル移動<br>
      [その他のキー]:石を置く`;
  } else;

  //3-4 HTMLファイルへ出力
  html += '<br>' + message;
  let div = document.querySelector('div');
  div.innerHTML = html;
}

//4 関数の呼び出し
init();


