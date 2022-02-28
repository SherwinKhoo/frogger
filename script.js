"use strict";

//////////////////////////////////////////////////
//////////  grid  ////////////////////////////////
//////////////////////////////////////////////////

let x = 11; // x-axis, reminder to always use odd number
let y = 13; // y-axis, reminder to always use odd number

let a = 50; // pixel width
let b = 40; // pixel height

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
// https://www.w3schools.com/jquery/event_keypress.asp

let whereIsFrog = -Math.ceil(x / 2); //  index position in the $squares array, from 0 to (x * y)

const movement = (event) => {
  $squares.eq(whereIsFrog).removeClass("frogIsHere"); //  remove class from previous position, otherwise, might as well be playing Nokia Snake instead
  switch (event.key) {
    case "ArrowUp":
      if (whereIsFrog >= x) {
        // cannot move up if on the top row of the grid
        whereIsFrog -= x;
      }
      break; // ALWAYS REMEMBER TO BREAK!!
    case "ArrowDown":
      if (whereIsFrog < x * y - x) {
        // cannot move down if on the bottom row of the grid
        whereIsFrog += x;
      }
      break; // ALWAYS REMEMBER TO BREAK!!
    case "ArrowLeft":
      if (whereIsFrog % x !== 0) {
        // cannot move left if on the leftmost column of the grid
        whereIsFrog -= 1;
      }
      break; // ALWAYS REMEMBER TO BREAK!!
    case "ArrowRight":
      if ((whereIsFrog + 1) % x !== 0) {
        // cannot move right if on the rightmost column of the grid
        whereIsFrog += 1;
      }
      break; // ALWAYS REMEMBER TO BREAK!!
  }
  $squares.eq(whereIsFrog).addClass("frogIsHere");
};

//////////////////////////////////////////////////
//////////  cars  ////////////////////////////////
//////////////////////////////////////////////////

//////////////////////////////////////////////////
//////////  window onload  ///////////////////////
//////////////////////////////////////////////////

$(() => {
  $("body").keyup(movement);
});
