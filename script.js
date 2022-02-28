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

const movementFrog = (event) => {
  $squares.eq(whereIsFrog).removeClass("frogIsHere"); //  remove class from previous position, otherwise, might as well be playing Nokia Snake instead
  switch (event.key) {
    case "ArrowUp":
      console.log("UP");
      if (whereIsFrog >= x) {
        // cannot move up if on the top row of the grid
        whereIsFrog -= x;
      }
      break; // ALWAYS REMEMBER TO BREAK!!
    case "ArrowDown":
      console.log("DOWN");
      if (whereIsFrog < x * y - x) {
        // cannot move down if on the bottom row of the grid
        whereIsFrog += x;
      }
      break; // ALWAYS REMEMBER TO BREAK!!
    case "ArrowLeft":
      console.log("LEFT");
      if (whereIsFrog % x !== 0) {
        // cannot move left if on the leftmost column of the grid
        whereIsFrog -= 1;
      }
      break; // ALWAYS REMEMBER TO BREAK!!
    case "ArrowRight":
      console.log("RIGHT");
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

for (let i = 0; i < $(".road").length; i++) {
  if (i < x) {
    $(".road").eq(i).addClass("lorry"); // top row has lorries moving from right
  } else if (Math.floor(i / x) % 2 === 1) {
    $(".road").eq(i).addClass("left"); // odd numbered rows have cars moving from left
  } else {
    $(".road").eq(i).addClass("right"); // even numbered rows have cars moving from right
  }
}

for (let i = 0; i < $(".river").length; i++) {
  if (i < x) {
    $(".river").eq(i).addClass("lorry"); // top row has lorries moving from right
  } else if (Math.floor(i / x) % 2 === 1) {
    $(".river").eq(i).addClass("left"); // odd numbered rows have cars moving from left
  } else {
    $(".river").eq(i).addClass("right"); // even numbered rows have cars moving from right
  }
}

for (let i = 0; i < $(".lorry").length; i++) {
  $(".lorry")
    .eq(i)
    .addClass(`${i % x}`);
}
for (let i = 0; i < $(".left").length; i++) {
  $(".left")
    .eq(i)
    .addClass(`${i % x}`);
}
for (let i = 0; i < $(".right").length; i++) {
  $(".right")
    .eq(i)
    .addClass(`${i % x}`);
}

let whereIsLorry1Front = 2 * x - 7;
let whereIsLorry1Back = 2 * x - 6;

let whereIsLorry2Front = 2 * x - 2;
let whereIsLorry2Back = 2 * x - 1;

const movementNPC = () => {
  $(".lorry").eq(whereIsLorry1Front).removeClass("frontIsHere");
  $(".lorry").eq(whereIsLorry1Back).removeClass("backIsHere");

  $(".lorry").eq(whereIsLorry2Front).removeClass("frontIsHere");
  $(".lorry").eq(whereIsLorry2Back).removeClass("backIsHere");

  // front of lorry
  if (whereIsLorry1Front > 0) {
    whereIsLorry1Front -= 1;
  } else {
    whereIsLorry1Front += 2 * x;
  }
  $(".lorry").eq(whereIsLorry1Front).addClass("frontIsHere");

  // back of lorry
  if (whereIsLorry1Back > 0) {
    whereIsLorry1Back -= 1;
  } else {
    whereIsLorry1Back += 2 * x;
  }
  $(".lorry").eq(whereIsLorry1Back).addClass("backIsHere");

  // front of lorry
  if (whereIsLorry2Front > 0) {
    whereIsLorry2Front -= 1;
  } else {
    whereIsLorry2Front += 2 * x;
  }
  $(".lorry").eq(whereIsLorry2Front).addClass("frontIsHere");

  // back of lorry
  if (whereIsLorry2Back > 0) {
    whereIsLorry2Back -= 1;
  } else {
    whereIsLorry2Back += 2 * x;
  }
  $(".lorry").eq(whereIsLorry2Back).addClass("backIsHere");

  // cars from the left

  // cars from the right
};

//////////////////////////////////////////////////
//////////  timer  ///////////////////////////////
//////////////////////////////////////////////////

//////////////////////////////////////////////////
//////////  river  ///////////////////////////////
//////////////////////////////////////////////////

//////////////////////////////////////////////////
//////////  window onload  ///////////////////////
//////////////////////////////////////////////////

$(() => {
  $("body").keyup(movementFrog);
  setInterval(() => {
    movementNPC();
  }, 1000);
});
