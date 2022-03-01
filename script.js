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
// $squares.eq(-Math.ceil(x / 2)).addClass("start"); // don't need this

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
  $squares.eq(whereIsFrog).removeAttr("id"); //  remove class from previous position, otherwise, might as well be playing Nokia Snake instead
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
      if (whereIsFrog < x * (y - 1)) {
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
  $squares.eq(whereIsFrog).attr("id", "frog");
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

let whereIsCar1FromLeft = 0 + 2 * x;
let whereIsCar2FromLeft = 4 + 2 * x;
let whereIsCar3FromLeft = 8 + 2 * x;
let whereIsCar4FromLeft = 0 + 3 * x;
let whereIsCar5FromLeft = 4 + 3 * x;
let whereIsCar6FromLeft = 8 + 3 * x;

let whereIsCar1FromRight = 4 * x - 1;
let whereIsCar2FromRight = 4 * x - 5;
let whereIsCar3FromRight = 4 * x - 9;
let whereIsCar4FromRight = 4 * x - 1 - x;
let whereIsCar5FromRight = 4 * x - 5 - x;
let whereIsCar6FromRight = 4 * x - 9 - x;

const movementNPC = () => {
  // remove lorry
  $(".lorry").eq(whereIsLorry1Front).removeClass("frontIsHere");
  $(".lorry").eq(whereIsLorry1Back).removeClass("backIsHere");

  // remove lorry
  $(".lorry").eq(whereIsLorry2Front).removeClass("frontIsHere");
  $(".lorry").eq(whereIsLorry2Back).removeClass("backIsHere");

  // remove cars
  $(".left").eq(whereIsCar1FromLeft).removeClass("carIsHere");
  $(".left").eq(whereIsCar2FromLeft).removeClass("carIsHere");
  $(".left").eq(whereIsCar3FromLeft).removeClass("carIsHere");
  $(".left").eq(whereIsCar4FromLeft).removeClass("carIsHere");
  $(".left").eq(whereIsCar5FromLeft).removeClass("carIsHere");
  $(".left").eq(whereIsCar6FromLeft).removeClass("carIsHere");

  $(".right").eq(whereIsCar1FromRight).removeClass("carIsHere");
  $(".right").eq(whereIsCar2FromRight).removeClass("carIsHere");
  $(".right").eq(whereIsCar3FromRight).removeClass("carIsHere");
  $(".right").eq(whereIsCar4FromRight).removeClass("carIsHere");
  $(".right").eq(whereIsCar5FromRight).removeClass("carIsHere");
  $(".right").eq(whereIsCar6FromRight).removeClass("carIsHere");

  // front of lorry 1
  if (whereIsLorry1Front > 0) {
    whereIsLorry1Front -= 1;
  } else {
    whereIsLorry1Front += 2 * x;
  }
  $(".lorry").eq(whereIsLorry1Front).addClass("frontIsHere");

  // back of lorry 1
  if (whereIsLorry1Back > 0) {
    whereIsLorry1Back -= 1;
  } else {
    whereIsLorry1Back += 2 * x;
  }
  $(".lorry").eq(whereIsLorry1Back).addClass("backIsHere");

  // front of lorry 2
  if (whereIsLorry2Front > 0) {
    whereIsLorry2Front -= 1;
  } else {
    whereIsLorry2Front += 2 * x;
  }
  $(".lorry").eq(whereIsLorry2Front).addClass("frontIsHere");

  // back of lorry 2
  if (whereIsLorry2Back > 0) {
    whereIsLorry2Back -= 1;
  } else {
    whereIsLorry2Back += 2 * x;
  }
  $(".lorry").eq(whereIsLorry2Back).addClass("backIsHere");

  // cars from the left
  if (whereIsCar1FromLeft < 4 * x) {
    whereIsCar1FromLeft += 1;
  } else {
    whereIsCar1FromLeft -= 4 * x;
  }
  $(".left").eq(whereIsCar1FromLeft).addClass("carIsHere");

  if (whereIsCar2FromLeft < 4 * x) {
    whereIsCar2FromLeft += 1;
  } else {
    whereIsCar2FromLeft -= 4 * x;
  }
  $(".left").eq(whereIsCar2FromLeft).addClass("carIsHere");

  if (whereIsCar3FromLeft < 4 * x) {
    whereIsCar3FromLeft += 1;
  } else {
    whereIsCar3FromLeft -= 4 * x;
  }
  $(".left").eq(whereIsCar3FromLeft).addClass("carIsHere");

  if (whereIsCar4FromLeft < 4 * x) {
    whereIsCar4FromLeft += 1;
  } else {
    whereIsCar4FromLeft -= 4 * x;
  }
  $(".left").eq(whereIsCar4FromLeft).addClass("carIsHere");

  if (whereIsCar5FromLeft < 4 * x) {
    whereIsCar5FromLeft += 1;
  } else {
    whereIsCar5FromLeft -= 4 * x;
  }
  $(".left").eq(whereIsCar5FromLeft).addClass("carIsHere");

  if (whereIsCar6FromLeft < 4 * x) {
    whereIsCar6FromLeft += 1;
  } else {
    whereIsCar6FromLeft -= 4 * x;
  }
  $(".left").eq(whereIsCar6FromLeft).addClass("carIsHere");

  // cars from the right
  if (whereIsCar1FromRight > 0) {
    whereIsCar1FromRight -= 1;
  } else {
    whereIsCar1FromRight += 4 * x;
  }
  $(".right").eq(whereIsCar1FromRight).addClass("carIsHere");

  if (whereIsCar2FromRight > 0) {
    whereIsCar2FromRight -= 1;
  } else {
    whereIsCar2FromRight += 4 * x;
  }
  $(".right").eq(whereIsCar2FromRight).addClass("carIsHere");

  if (whereIsCar3FromRight > 0) {
    whereIsCar3FromRight -= 1;
  } else {
    whereIsCar3FromRight += 4 * x;
  }
  $(".right").eq(whereIsCar3FromRight).addClass("carIsHere");

  if (whereIsCar4FromRight > 0) {
    whereIsCar4FromRight -= 1;
  } else {
    whereIsCar4FromRight += 4 * x;
  }
  $(".right").eq(whereIsCar4FromRight).addClass("carIsHere");

  if (whereIsCar5FromRight > 0) {
    whereIsCar5FromRight -= 1;
  } else {
    whereIsCar5FromRight += 4 * x;
  }
  $(".right").eq(whereIsCar5FromRight).addClass("carIsHere");

  if (whereIsCar6FromRight > 0) {
    whereIsCar6FromRight -= 1;
  } else {
    whereIsCar6FromRight += 4 * x;
  }
  $(".right").eq(whereIsCar6FromRight).addClass("carIsHere");
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
