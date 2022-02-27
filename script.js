"use strict";

$(() => {
  //////////////////////////////////////////////////
  //////////  grid  ////////////////////////////////
  //////////////////////////////////////////////////

  let x = 11; // x-axis, reminder to always use odd number
  let y = 13; // y-axis, reminder to always use odd number

  let a = 50; // pixel width
  let b = 50; // pixel height

  $("body").append(`<div id="grid"></div>`);

  for (let i = 0; i < x * y; i++) {
    $("#grid").append($("<div></div>"));
  }

  let $squares = $("#grid div");
  $squares.css({ width: a, height: b });

  $("#grid").css({ width: x * a, height: y * b });

  // end x-position always alternate and never on the border tile, y-position is always top row
  for (let i = 0; i < x; i++) {
    if (i % 2 === 1) {
      $squares.eq(i).addClass("end");
    }
  }

  // frog start x-position is always central, y-position is always bottom row
  $squares.eq(-Math.ceil(x / 2)).addClass("start");

  // draw road
  for (let i = x * Math.ceil(y / 2); i < x * (y - 2) + x; i++) {
    $squares.eq(i).addClass("road");
  }

  // draw river
  for (let i = x; i < x * (Math.floor(y / 2) - 1) + x; i++) {
    $squares.eq(i).addClass("river");
  }

  //////////////////////////////////////////////////
  //////////  movement  ////////////////////////////
  //////////////////////////////////////////////////
  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values

  let whereIsFrog = 0; //  index position in the $squares array, from 0 to (x * y)
  $squares.eq(whereIsFrog).addClass("frogIsHere");

  const movement = (move) => {
    switch (move.key) {
      case "ArrowUp":
        whereIsFrog = whereIsFrog - x;
      case "ArrowDown":
        whereIsFrog = whereIsFrog + x;
      case "ArrowLeft":
        whereIsFrog = whereIsFrog - 1;
      case "ArrowRight":
        whereIsFrog = whereIsFrog + 1;
    }
  };
});
