"use strict"; //strict

//1-1 クラスの定義

//1-2 変数・定数の定義
let message;

//1-3 関数の定義
function init() {
  //2-1 盤面の形成

  //2-2 ゲームの初期化
  message = '';

  //2-3 描画処理
  draw();

}

function draw() {
  //3-1 描画前の処理
  let html = '';
  //3-2 盤面の描画

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


