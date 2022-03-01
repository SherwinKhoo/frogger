"use strict";
$(() => {
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
    $squares.eq(i).addClass("end");
  }

  // for (let i = 0; i < x; i++) {
  //   if (i % 2 === 1) {
  //     $squares.eq(i).addClass("end");
  //   }
  // }

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

  let whereIsFrog = x * (y - 1) + Math.floor(x / 2); //  index position in the $squares array, from 0 to (x * y)
  const movementFrog = (event) => {
    $squares.eq(whereIsFrog).removeClass("frog"); //  remove id from previous position, otherwise, might as well be playing Nokia Snake instead
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
    $squares.eq(whereIsFrog).addClass("frog");
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
    $(".lorry").eq(whereIsLorry1Front).removeClass("vehicleIsHere");
    $(".lorry").eq(whereIsLorry1Back).removeClass("vehicleIsHere");

    // remove lorry
    $(".lorry").eq(whereIsLorry2Front).removeClass("vehicleIsHere");
    $(".lorry").eq(whereIsLorry2Back).removeClass("vehicleIsHere");

    // remove cars
    $(".left").eq(whereIsCar1FromLeft).removeClass("vehicleIsHere");
    $(".left").eq(whereIsCar2FromLeft).removeClass("vehicleIsHere");
    $(".left").eq(whereIsCar3FromLeft).removeClass("vehicleIsHere");
    $(".left").eq(whereIsCar4FromLeft).removeClass("vehicleIsHere");
    $(".left").eq(whereIsCar5FromLeft).removeClass("vehicleIsHere");
    $(".left").eq(whereIsCar6FromLeft).removeClass("vehicleIsHere");

    $(".right").eq(whereIsCar1FromRight).removeClass("vehicleIsHere");
    $(".right").eq(whereIsCar2FromRight).removeClass("vehicleIsHere");
    $(".right").eq(whereIsCar3FromRight).removeClass("vehicleIsHere");
    $(".right").eq(whereIsCar4FromRight).removeClass("vehicleIsHere");
    $(".right").eq(whereIsCar5FromRight).removeClass("vehicleIsHere");
    $(".right").eq(whereIsCar6FromRight).removeClass("vehicleIsHere");

    // front of lorry 1
    if (whereIsLorry1Front > 0) {
      whereIsLorry1Front -= 1;
    } else {
      whereIsLorry1Front += 2 * x;
    }
    $(".lorry").eq(whereIsLorry1Front).addClass("vehicleIsHere");

    // back of lorry 1
    if (whereIsLorry1Back > 0) {
      whereIsLorry1Back -= 1;
    } else {
      whereIsLorry1Back += 2 * x;
    }
    $(".lorry").eq(whereIsLorry1Back).addClass("vehicleIsHere");

    // front of lorry 2
    if (whereIsLorry2Front > 0) {
      whereIsLorry2Front -= 1;
    } else {
      whereIsLorry2Front += 2 * x;
    }
    $(".lorry").eq(whereIsLorry2Front).addClass("vehicleIsHere");

    // back of lorry 2
    if (whereIsLorry2Back > 0) {
      whereIsLorry2Back -= 1;
    } else {
      whereIsLorry2Back += 2 * x;
    }
    $(".lorry").eq(whereIsLorry2Back).addClass("vehicleIsHere");

    // cars from the left
    if (whereIsCar1FromLeft < 4 * x) {
      whereIsCar1FromLeft += 1;
    } else {
      whereIsCar1FromLeft -= 4 * x;
    }
    $(".left").eq(whereIsCar1FromLeft).addClass("vehicleIsHere");

    if (whereIsCar2FromLeft < 4 * x) {
      whereIsCar2FromLeft += 1;
    } else {
      whereIsCar2FromLeft -= 4 * x;
    }
    $(".left").eq(whereIsCar2FromLeft).addClass("vehicleIsHere");

    if (whereIsCar3FromLeft < 4 * x) {
      whereIsCar3FromLeft += 1;
    } else {
      whereIsCar3FromLeft -= 4 * x;
    }
    $(".left").eq(whereIsCar3FromLeft).addClass("vehicleIsHere");

    if (whereIsCar4FromLeft < 4 * x) {
      whereIsCar4FromLeft += 1;
    } else {
      whereIsCar4FromLeft -= 4 * x;
    }
    $(".left").eq(whereIsCar4FromLeft).addClass("vehicleIsHere");

    if (whereIsCar5FromLeft < 4 * x) {
      whereIsCar5FromLeft += 1;
    } else {
      whereIsCar5FromLeft -= 4 * x;
    }
    $(".left").eq(whereIsCar5FromLeft).addClass("vehicleIsHere");

    if (whereIsCar6FromLeft < 4 * x) {
      whereIsCar6FromLeft += 1;
    } else {
      whereIsCar6FromLeft -= 4 * x;
    }
    $(".left").eq(whereIsCar6FromLeft).addClass("vehicleIsHere");

    // cars from the right
    if (whereIsCar1FromRight > 0) {
      whereIsCar1FromRight -= 1;
    } else {
      whereIsCar1FromRight += 4 * x;
    }
    $(".right").eq(whereIsCar1FromRight).addClass("vehicleIsHere");

    if (whereIsCar2FromRight > 0) {
      whereIsCar2FromRight -= 1;
    } else {
      whereIsCar2FromRight += 4 * x;
    }
    $(".right").eq(whereIsCar2FromRight).addClass("vehicleIsHere");

    if (whereIsCar3FromRight > 0) {
      whereIsCar3FromRight -= 1;
    } else {
      whereIsCar3FromRight += 4 * x;
    }
    $(".right").eq(whereIsCar3FromRight).addClass("vehicleIsHere");

    if (whereIsCar4FromRight > 0) {
      whereIsCar4FromRight -= 1;
    } else {
      whereIsCar4FromRight += 4 * x;
    }
    $(".right").eq(whereIsCar4FromRight).addClass("vehicleIsHere");

    if (whereIsCar5FromRight > 0) {
      whereIsCar5FromRight -= 1;
    } else {
      whereIsCar5FromRight += 4 * x;
    }
    $(".right").eq(whereIsCar5FromRight).addClass("vehicleIsHere");

    if (whereIsCar6FromRight > 0) {
      whereIsCar6FromRight -= 1;
    } else {
      whereIsCar6FromRight += 4 * x;
    }
    $(".right").eq(whereIsCar6FromRight).addClass("vehicleIsHere");
  };

  // const movementLorry = (index) => {
  //   if (index > 0) {
  //     $(".lorry").eq(index).removeClass("vehicleIsHere");
  //     index -= 1;
  //   } else {
  //     index += 2 * x;
  //   }
  //   $(".lorry").eq(index).addClass("vehicleIsHere");
  // };

  // const movementMOVE = () => {
  //   switch (zzz) {
  //     case whereIsLorry1Front:
  //     case whereIsLorry1Back:
  //     case whereIsLorry2Front:
  //     case whereIsLorry2Back:
  //       return movementLorry(zzz);
  //   }
  // };

  //////////////////////////////////////////////////
  //////////  timer  ///////////////////////////////
  //////////////////////////////////////////////////

  let timer = 30;
  const countdown = () => {
    if (timer > 0) {
      timer -= 1;
      $("span").text(timer);
    }
  };

  //////////////////////////////////////////////////
  //////////  collision  ///////////////////////////
  //////////////////////////////////////////////////

  // codes moved to win / loss conditions

  //////////////////////////////////////////////////
  //////////  win / loss conditions  ///////////////
  //////////////////////////////////////////////////

  // freeze everything
  const freeze = () => {
    clearInterval(moveNPC);
    clearInterval(ticktock);
    $("body").off("keyup", movementFrog);
  };

  // end game
  const endConditions = () => {
    if ($(".frog").hasClass("end")) {
      freeze();
      $("h4").text("Ooooof... Should have made the game harder!");
    } else if ($(".frog").hasClass("vehicleIsHere") === true) {
      freeze();
      $("h4").text("Ooooof... We're going to need a cleanup on isle 5!");
    } else if (timer === 0) {
      freeze();
      $("h4").text("Ooooof... Time's up!");
    }
  };

  //////////////////////////////////////////////////
  //////////  river  ///////////////////////////////
  //////////////////////////////////////////////////

  //////////////////////////////////////////////////
  //////////  tileset  /////////////////////////////
  //////////////////////////////////////////////////

  //////////////////////////////////////////////////
  //////////  window onload  ///////////////////////
  //////////////////////////////////////////////////

  $("body").on("keyup", movementFrog);
  let moveNPC = setInterval(movementNPC, 1000);
  let ticktock = setInterval(countdown, 1000);
  setInterval(() => {
    endConditions();
  }, 1);
});
