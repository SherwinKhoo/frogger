"use strict";
$(() => {
  //////////////////////////////////////////////////
  //////////  grid  ////////////////////////////////
  //////////////////////////////////////////////////

  let x = 11; // x-axis, reminder to always use odd number, between 3 to 11
  let y = 13; // y-axis, reminder to always use odd number, between 5 to 13

  let a = 50; // pixel width
  let b = 40; // pixel height

  for (let i = 0; i < x * y; i++) {
    $("#grid").append($("<div></div>"));
  }

  let $squares = $("#grid div");
  $squares.css({ width: a, height: b });

  $("#grid").css({ width: x * a, height: y * b });

  // give all the rows a class

  for (let i = 0; i < x; i++) {
    $squares.eq(i).addClass("end");
  }

  for (let i = 0; i < x; i++) {
    if (i % 2 === 0) {
      $squares.eq(i).addClass("endAlt");
    }
  }

  for (let i = x * Math.floor(y / 2); i < x * Math.ceil(y / 2); i++) {
    $squares.eq(i).addClass("central_divider");
  }

  for (let i = x * (y - 1); i < x * y; i++) {
    $squares.eq(i).addClass("start");
  }

  // define which rows are roads
  for (let i = x * Math.ceil(y / 2); i < x * (y - 2) + x; i++) {
    $squares.eq(i).addClass("road");
  }

  // define which rows are water
  for (let i = x; i < x * (Math.floor(y / 2) - 1) + x; i++) {
    $squares.eq(i).addClass("river");
  }

  // define rows which will have vehicles
  for (let i = 0; i < $(".road").length; i++) {
    if (i < x) {
      $(".road").eq(i).addClass("lorry"); // top row [0] has lorries moving from right
    } else if (Math.floor(i / x) % 2 === 1) {
      $(".road").eq(i).addClass("left"); // odd numbered rows [1] and [3] have cars moving from left
    } else {
      $(".road").eq(i).addClass("right"); // even numbered rows [2] and [4] have cars moving from right
    }
  }

  // define rows which will have water assets
  for (let i = 0; i < $(".river").length; i++) {
    if (Math.floor(i / x) % 3 === 0) {
      $(".river").eq(i).addClass("smallLog");
    } else if (Math.floor(i / x) % 3 === 1) {
      $(".river").eq(i).addClass("turtle");
    } else {
      $(".river").eq(i).addClass("bigLog");
    }
  }

  // label each square in the row to make them unique, for easier troubleshooting
  // too many repeat codes, i know...
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
  for (let i = 0; i < $(".bigLog").length; i++) {
    $(".bigLog")
      .eq(i)
      .addClass(`${i % x}`);
  }
  for (let i = 0; i < $(".smallLog").length; i++) {
    $(".smallLog")
      .eq(i)
      .addClass(`${i % x}`);
  }
  for (let i = 0; i < $(".turtle").length; i++) {
    $(".turtle")
      .eq(i)
      .addClass(`${i % x}`);
  }

  //////////////////////////////////////////////////
  //////////  movement  ////////////////////////////
  //////////////////////////////////////////////////
  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
  // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
  // https://www.w3schools.com/jquery/event_keypress.asp

  let whereIsFrog = x * (y - 1) + Math.floor(x / 2); //  index position in the $squares array, from 0 to (x * y)
  // let whereIsFrog = -6; //  glitch in the matrix
  $squares.eq(whereIsFrog).addClass("frog");
  const movementFrog = (event) => {
    $squares.removeClass("frog"); //  remove id from previous position, otherwise, might as well be playing Nokia Snake instead)

    switch (event.key) {
      case "ArrowUp":
        if (
          whereIsFrog > x &&
          whereIsFrog < 2 * x &&
          whereIsFrog % 2 === 0 &&
          !$(".end")
            .eq(whereIsFrog - x)
            .hasClass("endFrog")
        ) {
          whereIsFrog -= x;
          audioJump();
          console.log("UP");
        } else if (whereIsFrog >= 2 * x) {
          // cannot move up if on the top row of the grid
          whereIsFrog -= x;
          audioJump();
          console.log("UP");
        }
        break; // ALWAYS REMEMBER TO BREAK!!
      case "ArrowDown":
        if (whereIsFrog < x * (y - 1)) {
          // cannot move down if on the bottom row of the grid
          whereIsFrog += x;
          audioJump();
          console.log("DOWN");
        }
        break; // ALWAYS REMEMBER TO BREAK!!
      case "ArrowLeft":
        if (whereIsFrog % x !== 0) {
          // cannot move left if on the leftmost column of the grid
          whereIsFrog -= 1;
          audioJump();
          console.log("LEFT");
        }
        break; // ALWAYS REMEMBER TO BREAK!!
      case "ArrowRight":
        if ((whereIsFrog + 1) % x !== 0) {
          // cannot move right if on the rightmost column of the grid
          whereIsFrog += 1;
          audioJump();
          console.log("RIGHT");
        }
        break; // ALWAYS REMEMBER TO BREAK!!
    }
    $squares.eq(whereIsFrog).addClass("frog");
    console.log(whereIsFrog);
  };

  //////////////////////////////////////////////////
  //////////  assets  //////////////////////////////
  //////////////////////////////////////////////////

  let whereIsLorry1Front = x - 7;
  let whereIsLorry1Back = x - 6;
  let whereIsLorry2Front = x - 2;
  let whereIsLorry2Back = x - 1;

  let whereIsCar1FromLeft = 0;
  let whereIsCar2FromLeft = 4;
  let whereIsCar3FromLeft = 8;
  let whereIsCar4FromLeft = 0 + x;
  let whereIsCar5FromLeft = 4 + x;
  let whereIsCar6FromLeft = 8 + x;

  let whereIsCar1FromRight = 2 * x - 1;
  let whereIsCar2FromRight = 2 * x - 5;
  let whereIsCar3FromRight = 2 * x - 9;
  let whereIsCar4FromRight = 2 * x - 1 - x;
  let whereIsCar5FromRight = 2 * x - 5 - x;
  let whereIsCar6FromRight = 2 * x - 9 - x;

  let whereIsBigLog1Front = x - 1;
  let whereIsBigLog1Centre = x - 2;
  let whereIsBigLog1Back = x - 3;
  let whereIsBigLog2Front = x - 5;
  let whereIsBigLog2Centre = x - 6;
  let whereIsBigLog2Back = x - 7;
  let whereIsBigLog3Front = x - 9;
  let whereIsBigLog3Centre = x - 10;
  let whereIsBigLog3Back = x - 11;

  let whereIsSmallLog1Front = 1;
  let whereIsSmallLog1Back = 0;
  let whereIsSmallLog2Front = 6;
  let whereIsSmallLog2Back = 5;
  let whereIsSmallLog3Front = 1 + x;
  let whereIsSmallLog3Back = 0 + x;
  let whereIsSmallLog4Front = 6 + x;
  let whereIsSmallLog4Back = 5 + x;

  let whereIsTurtle1Front = 0;
  let whereIsTurtle1Centre = 1;
  let whereIsTurtle1Back = 2;
  let whereIsTurtle2Front = 5;
  let whereIsTurtle2Centre = 6;
  let whereIsTurtle2Back = 7;
  let whereIsTurtle3Front = 0 + x;
  let whereIsTurtle3Back = 1 + x;
  let whereIsTurtle4Front = 4 + x;
  let whereIsTurtle4Back = 5 + x;
  let whereIsTurtle5Front = 8 + x;
  let whereIsTurtle5Back = 9 + x;

  const movementNPC = () => {
    // remove vehicles
    $(".road").removeClass(
      "vehicleIsHere lorryFront lorryBack carA carB carC carD"
    );

    // remove river assets
    $(".river").removeClass(
      "logBigIsHere logSmallIsHere logFront logCentre logBack turtleIsHere float"
    );

    // front of lorry 1
    if (whereIsLorry1Front > 0) {
      whereIsLorry1Front -= 1;
    } else {
      whereIsLorry1Front += x;
    }
    $(".lorry").eq(whereIsLorry1Front).addClass("vehicleIsHere lorryFront");

    // back of lorry 1
    if (whereIsLorry1Back > 0) {
      whereIsLorry1Back -= 1;
    } else {
      whereIsLorry1Back += x;
    }
    $(".lorry").eq(whereIsLorry1Back).addClass("vehicleIsHere lorryBack");

    // front of lorry 2
    if (whereIsLorry2Front > 0) {
      whereIsLorry2Front -= 1;
    } else {
      whereIsLorry2Front += x;
    }
    $(".lorry").eq(whereIsLorry2Front).addClass("vehicleIsHere lorryFront");

    // back of lorry 2
    if (whereIsLorry2Back > 0) {
      whereIsLorry2Back -= 1;
    } else {
      whereIsLorry2Back += x;
    }
    $(".lorry").eq(whereIsLorry2Back).addClass("vehicleIsHere lorryBack");

    // cars from the left
    if (whereIsCar1FromLeft < 2 * x) {
      whereIsCar1FromLeft += 1;
    } else {
      whereIsCar1FromLeft -= 2 * x;
    }
    $(".left").eq(whereIsCar1FromLeft).addClass("vehicleIsHere carA");

    if (whereIsCar2FromLeft < 2 * x) {
      whereIsCar2FromLeft += 1;
    } else {
      whereIsCar2FromLeft -= 2 * x;
    }
    $(".left").eq(whereIsCar2FromLeft).addClass("vehicleIsHere carA");

    if (whereIsCar3FromLeft < 2 * x) {
      whereIsCar3FromLeft += 1;
    } else {
      whereIsCar3FromLeft -= 2 * x;
    }
    $(".left").eq(whereIsCar3FromLeft).addClass("vehicleIsHere carA");

    if (whereIsCar4FromLeft < 2 * x) {
      whereIsCar4FromLeft += 1;
    } else {
      whereIsCar4FromLeft -= 2 * x;
    }
    $(".left").eq(whereIsCar4FromLeft).addClass("vehicleIsHere carC");

    if (whereIsCar5FromLeft < 2 * x) {
      whereIsCar5FromLeft += 1;
    } else {
      whereIsCar5FromLeft -= 2 * x;
    }
    $(".left").eq(whereIsCar5FromLeft).addClass("vehicleIsHere carC");

    if (whereIsCar6FromLeft < 2 * x) {
      whereIsCar6FromLeft += 1;
    } else {
      whereIsCar6FromLeft -= 2 * x;
    }
    $(".left").eq(whereIsCar6FromLeft).addClass("vehicleIsHere carC");

    // cars from the right
    if (whereIsCar1FromRight > 0) {
      whereIsCar1FromRight -= 1;
    } else {
      whereIsCar1FromRight += 2 * x;
    }
    $(".right").eq(whereIsCar1FromRight).addClass("vehicleIsHere carB");

    if (whereIsCar2FromRight > 0) {
      whereIsCar2FromRight -= 1;
    } else {
      whereIsCar2FromRight += 2 * x;
    }
    $(".right").eq(whereIsCar2FromRight).addClass("vehicleIsHere carB");

    if (whereIsCar3FromRight > 0) {
      whereIsCar3FromRight -= 1;
    } else {
      whereIsCar3FromRight += 2 * x;
    }
    $(".right").eq(whereIsCar3FromRight).addClass("vehicleIsHere carB");

    if (whereIsCar4FromRight > 0) {
      whereIsCar4FromRight -= 1;
    } else {
      whereIsCar4FromRight += 2 * x;
    }
    $(".right").eq(whereIsCar4FromRight).addClass("vehicleIsHere carD");

    if (whereIsCar5FromRight > 0) {
      whereIsCar5FromRight -= 1;
    } else {
      whereIsCar5FromRight += 2 * x;
    }
    $(".right").eq(whereIsCar5FromRight).addClass("vehicleIsHere carD");

    if (whereIsCar6FromRight > 0) {
      whereIsCar6FromRight -= 1;
    } else {
      whereIsCar6FromRight += 2 * x;
    }
    $(".right").eq(whereIsCar6FromRight).addClass("vehicleIsHere carD");

    // big logs
    if (whereIsBigLog1Front < x) {
      whereIsBigLog1Front += 1;
    } else {
      whereIsBigLog1Front -= x;
    }
    $(".bigLog")
      .eq(whereIsBigLog1Front)
      .addClass("logBigIsHere float logFront");

    if (whereIsBigLog1Centre < x) {
      whereIsBigLog1Centre += 1;
    } else {
      whereIsBigLog1Centre -= x;
    }
    $(".bigLog")
      .eq(whereIsBigLog1Centre)
      .addClass("logBigIsHere float logCentre");

    if (whereIsBigLog1Back < x) {
      whereIsBigLog1Back += 1;
    } else {
      whereIsBigLog1Back -= x;
    }
    $(".bigLog").eq(whereIsBigLog1Back).addClass("logBigIsHere float logBack");

    if (whereIsBigLog2Front < x) {
      whereIsBigLog2Front += 1;
    } else {
      whereIsBigLog2Front -= x;
    }
    $(".bigLog")
      .eq(whereIsBigLog2Front)
      .addClass("logBigIsHere float logFront");

    if (whereIsBigLog2Centre < x) {
      whereIsBigLog2Centre += 1;
    } else {
      whereIsBigLog2Centre -= x;
    }
    $(".bigLog")
      .eq(whereIsBigLog2Centre)
      .addClass("logBigIsHere float logCentre");

    if (whereIsBigLog2Back < x) {
      whereIsBigLog2Back += 1;
    } else {
      whereIsBigLog2Back -= x;
    }
    $(".bigLog").eq(whereIsBigLog2Back).addClass("logBigIsHere float logBack");

    if (whereIsBigLog3Front < x) {
      whereIsBigLog3Front += 1;
    } else {
      whereIsBigLog3Front -= x;
    }
    $(".bigLog")
      .eq(whereIsBigLog3Front)
      .addClass("logBigIsHere float logFront");

    if (whereIsBigLog3Centre < x) {
      whereIsBigLog3Centre += 1;
    } else {
      whereIsBigLog3Centre -= x;
    }
    $(".bigLog")
      .eq(whereIsBigLog3Centre)
      .addClass("logBigIsHere float logCentre");

    if (whereIsBigLog3Back < x) {
      whereIsBigLog3Back += 1;
    } else {
      whereIsBigLog3Back -= x;
    }
    $(".bigLog").eq(whereIsBigLog3Back).addClass("logBigIsHere float logBack");

    // small logs
    if (whereIsSmallLog1Front < 2 * x) {
      whereIsSmallLog1Front += 1;
    } else {
      whereIsSmallLog1Front -= 2 * x;
    }
    $(".smallLog")
      .eq(whereIsSmallLog1Front)
      .addClass("logSmallIsHere float logFront");

    if (whereIsSmallLog1Back < 2 * x) {
      whereIsSmallLog1Back += 1;
    } else {
      whereIsSmallLog1Back -= 2 * x;
    }
    $(".smallLog")
      .eq(whereIsSmallLog1Back)
      .addClass("logSmallIsHere float logBack");

    if (whereIsSmallLog2Front < 2 * x) {
      whereIsSmallLog2Front += 1;
    } else {
      whereIsSmallLog2Front -= 2 * x;
    }
    $(".smallLog")
      .eq(whereIsSmallLog2Front)
      .addClass("logSmallIsHere float logFront");

    if (whereIsSmallLog2Back < 2 * x) {
      whereIsSmallLog2Back += 1;
    } else {
      whereIsSmallLog2Back -= 2 * x;
    }
    $(".smallLog")
      .eq(whereIsSmallLog2Back)
      .addClass("logSmallIsHere float logBack");

    if (whereIsSmallLog3Front < 2 * x) {
      whereIsSmallLog3Front += 1;
    } else {
      whereIsSmallLog3Front -= 2 * x;
    }
    $(".smallLog")
      .eq(whereIsSmallLog3Front)
      .addClass("logSmallIsHere float logFront");

    if (whereIsSmallLog3Back < 2 * x) {
      whereIsSmallLog3Back += 1;
    } else {
      whereIsSmallLog3Back -= 2 * x;
    }
    $(".smallLog")
      .eq(whereIsSmallLog3Back)
      .addClass("logSmallIsHere float logBack");

    if (whereIsSmallLog4Front < 2 * x) {
      whereIsSmallLog4Front += 1;
    } else {
      whereIsSmallLog4Front -= 2 * x;
    }
    $(".smallLog")
      .eq(whereIsSmallLog4Front)
      .addClass("logSmallIsHere float logFront");

    if (whereIsSmallLog4Back < 2 * x) {
      whereIsSmallLog4Back += 1;
    } else {
      whereIsSmallLog4Back -= 2 * x;
    }
    $(".smallLog")
      .eq(whereIsSmallLog4Back)
      .addClass("logSmallIsHere float logBack");

    // turtles
    if (whereIsTurtle1Front > 0) {
      whereIsTurtle1Front -= 1;
    } else {
      whereIsTurtle1Front += 2 * x;
    }
    $(".turtle").eq(whereIsTurtle1Front).addClass("turtleIsHere float");

    if (whereIsTurtle1Centre > 0) {
      whereIsTurtle1Centre -= 1;
    } else {
      whereIsTurtle1Centre += 2 * x;
    }
    $(".turtle").eq(whereIsTurtle1Centre).addClass("turtleIsHere float");

    if (whereIsTurtle1Back > 0) {
      whereIsTurtle1Back -= 1;
    } else {
      whereIsTurtle1Back += 2 * x;
    }
    $(".turtle").eq(whereIsTurtle1Back).addClass("turtleIsHere float");

    if (whereIsTurtle2Front > 0) {
      whereIsTurtle2Front -= 1;
    } else {
      whereIsTurtle2Front += 2 * x;
    }
    $(".turtle").eq(whereIsTurtle2Front).addClass("turtleIsHere float");

    if (whereIsTurtle2Centre > 0) {
      whereIsTurtle2Centre -= 1;
    } else {
      whereIsTurtle2Centre += 2 * x;
    }
    $(".turtle").eq(whereIsTurtle2Centre).addClass("turtleIsHere float");

    if (whereIsTurtle2Back > 0) {
      whereIsTurtle2Back -= 1;
    } else {
      whereIsTurtle2Back += 2 * x;
    }
    $(".turtle").eq(whereIsTurtle2Back).addClass("turtleIsHere float");

    if (whereIsTurtle3Front > 0) {
      whereIsTurtle3Front -= 1;
    } else {
      whereIsTurtle3Front += 2 * x;
    }
    $(".turtle").eq(whereIsTurtle3Front).addClass("turtleIsHere float");

    if (whereIsTurtle3Back > 0) {
      whereIsTurtle3Back -= 1;
    } else {
      whereIsTurtle3Back += 2 * x;
    }
    $(".turtle").eq(whereIsTurtle3Back).addClass("turtleIsHere float");

    if (whereIsTurtle4Front > 0) {
      whereIsTurtle4Front -= 1;
    } else {
      whereIsTurtle4Front += 2 * x;
    }
    $(".turtle").eq(whereIsTurtle4Front).addClass("turtleIsHere float");

    if (whereIsTurtle4Back > 0) {
      whereIsTurtle4Back -= 1;
    } else {
      whereIsTurtle4Back += 2 * x;
    }
    $(".turtle").eq(whereIsTurtle4Back).addClass("turtleIsHere float");

    if (whereIsTurtle5Front > 0) {
      whereIsTurtle5Front -= 1;
    } else {
      whereIsTurtle5Front += 2 * x;
    }
    $(".turtle").eq(whereIsTurtle5Front).addClass("turtleIsHere float");

    if (whereIsTurtle5Back > 0) {
      whereIsTurtle5Back -= 1;
    } else {
      whereIsTurtle5Back += 2 * x;
    }
    $(".turtle").eq(whereIsTurtle5Back).addClass("turtleIsHere float");
  };

  //////////////////////////////////////////////////
  //////////  timer  ///////////////////////////////
  //////////////////////////////////////////////////

  let timer = 30;
  $("#timer").text(timer);
  const countdown = () => {
    if (timer > 0) {
      timer -= 1;
      $("#timer").text(timer);
    }
  };

  //////////////////////////////////////////////////
  //////////  lives  ///////////////////////////////
  //////////////////////////////////////////////////

  let lives = 5;
  $("#lives").text(`${lives}`);

  //////////////////////////////////////////////////
  //////////  audio  ///////////////////////////////
  //////////////////////////////////////////////////

  const audioJump = () => {
    let soundJump = new Audio("audio/jump.wav");
    soundJump.play();
  };

  const audioPancake = () => {
    let soundPancake = new Audio("audio/pancake.wav");
    soundPancake.play();
  };

  const audioDrown = () => {
    let soundDrown = new Audio("audio/drown.wav");
    soundDrown.play();
  };

  const audioTime = () => {
    let soundTime = new Audio("audio/time.wav");
    soundTime.play();
  };

  const audioSide = () => {
    let soundSide = new Audio("audio/side.mp3");
    soundSide.play();
  };

  const audioHome = () => {
    let soundHome = new Audio("audio/home.mp3");
    soundHome.play();
  };

  const audioWin = () => {
    let soundWin = new Audio("audio/win.mp3");
    soundWin.play();
  };

  const audioGameOver = () => {
    let soundGameOver = new Audio("audio/game_over.mp3");
    soundGameOver.play();
  };

  //////////////////////////////////////////////////
  //////////  win / loss conditions  ///////////////
  //////////////////////////////////////////////////

  // freeze everything
  const freeze = () => {
    clearInterval(moveNPC);
    clearInterval(ticktock);
    clearInterval(followLog);
    clearInterval(followTurtle);
    clearInterval(itsTheEnd);
    $("body").off("keyup", movementFrog);
    $("body").removeClass(".deadFrog");
    $(".life").empty();
  };

  // riding turtles
  const withTurtle = () => {
    if ($(".frog").hasClass("turtleIsHere")) {
      if (Math.floor(whereIsFrog / x) !== Math.floor((whereIsFrog - 1) / x)) {
        if (lives > 0) {
          lives -= 1;
          audioSide();
          $("#lives").text(`${lives}`);
          $(".frog").addClass("deadFrog");
          $(".deadFrog").removeClass("frog");
          $squares.eq(x * (y - 1) + Math.floor(x / 2)).addClass("frog");
          whereIsFrog = x * (y - 1) + Math.floor(x / 2);
          $("body").removeClass(".deadFrog");
          timer = 30;
          $("#timer").text(timer);
        } else {
          freeze();
          audioGameOver();
          $("h4").text("Ooooof... Feeling shellshocked?");
        }
        console.log(`Lives = ${lives}`);
        console.log(`Home = ${$("body .endFrog").length}`);
      } else {
        $squares.removeClass("frog");
        whereIsFrog -= 1;
        $squares.eq(whereIsFrog).addClass("frog");
      }
    }
    $(".life").empty();
    if (lives > 0) {
      for (let i = 1; i <= lives; i++) {
        $(".life").append(`<img src="images/frog.png" />`);
      }
    } else {
      $(".life").empty();
    }
  };

  // sitting on logs
  const withLog = () => {
    if (
      $(".frog").hasClass("logSmallIsHere") ||
      $(".frog").hasClass("logBigIsHere")
    ) {
      if (Math.floor(whereIsFrog / x) !== Math.floor((whereIsFrog + 1) / x)) {
        if (lives > 0) {
          lives -= 1;
          audioSide();
          $("#lives").text(`${lives}`);
          $(".frog").addClass("deadFrog");
          $(".deadFrog").removeClass("frog");
          $squares.eq(x * (y - 1) + Math.floor(x / 2)).addClass("frog");
          whereIsFrog = x * (y - 1) + Math.floor(x / 2);
          $("body").removeClass(".deadFrog");
          timer = 30;
          $("#timer").text(timer);
        } else {
          freeze();
          audioGameOver();
          $("h4").text("Ooooof... The console has logged your demise!");
        }
        console.log(`Lives = ${lives}`);
        console.log(`Home = ${$("body .endFrog").length}`);
      } else {
        $squares.removeClass("frog");
        whereIsFrog += 1;
        $squares.eq(whereIsFrog).addClass("frog");
      }
    }
    $(".life").empty();
    if (lives > 0) {
      for (let i = 1; i <= lives; i++) {
        $(".life").append(`<img src="images/frog.png" />`);
      }
    } else {
      $(".life").empty();
    }
  };

  // end game
  const endConditions = () => {
    if ($(".frog").hasClass("end")) {
      // reach the end zone
      if (lives > 0) {
        $(".frog").addClass("endFrog");
        $(".endFrog").removeClass("frog");
        $squares.eq(x * (y - 1) + Math.floor(x / 2)).addClass("frog");
        whereIsFrog = x * (y - 1) + Math.floor(x / 2);
        audioHome();
        timer = 30;
        $("#timer").text(timer);
        if ($(".endFrog").length === $(".end").length - $(".endAlt").length) {
          freeze();
          audioWin();
          $("h4").text("Ooooof... Should have made the game harder!");
          console.log(`Lives = ${lives}`);
          console.log(`Home = ${$("body .endFrog").length}`);
        }
      } else {
        freeze();
        audioWin();
        $("h4").text("Ooooof... Should have made the game harder!");
        console.log(`Lives = ${lives}`);
        console.log(`Home = ${$("body .endFrog").length}`);
      }
    } else if ($(".frog").hasClass("vehicleIsHere") === true) {
      // hit by vehicle
      lives -= 1;
      audioPancake();
      $("#lives").text(`${lives}`);
      if (lives > 0) {
        $(".frog").addClass("deadFrog");
        $(".deadFrog").removeClass("frog");
        $squares.eq(x * (y - 1) + Math.floor(x / 2)).addClass("frog");
        whereIsFrog = x * (y - 1) + Math.floor(x / 2);
        $("body").removeClass(".deadFrog");
        timer = 30;
        $("#timer").text(timer);
      } else {
        freeze();
        audioGameOver();
        $("h4").text("Ooooof... We're going to need a cleanup on aisle 5!");
      }
      console.log(`Lives = ${lives}`);
      console.log(`Home = ${$("body .endFrog").length}`);
    } else if (timer === 0) {
      // run out of time
      lives -= 1;
      audioTime();
      $("#lives").text(`${lives}`);
      if (lives > 0) {
        $(".frog").addClass("deadFrog");
        $(".deadFrog").removeClass("frog");
        $squares.eq(x * (y - 1) + Math.floor(x / 2)).addClass("frog");
        whereIsFrog = x * (y - 1) + Math.floor(x / 2);
        $("body").removeClass(".deadFrog");
        timer = 30;
        $("#timer").text(timer);
      } else {
        freeze();
        audioGameOver();
        $("h4").text("Ooooof... Time's up!");
      }
      console.log(`Lives = ${lives}`);
      console.log(`Home = ${$("body .endFrog").length}`);
    } else if ($(".frog").hasClass("river") && !$(".frog").hasClass("float")) {
      // stepping into water
      lives -= 1;
      audioDrown();
      $("#lives").text(`${lives}`);
      if (lives > 0) {
        $(".frog").addClass("deadFrog");
        $(".deadFrog").removeClass("frog");
        $squares.eq(x * (y - 1) + Math.floor(x / 2)).addClass("frog");
        whereIsFrog = x * (y - 1) + Math.floor(x / 2);
        $("body").removeClass(".deadFrog");
        timer = 30;
        $("#timer").text(timer);
      } else {
        freeze();
        audioGameOver();
        $("h4").text("Ooooof... Apparently, this frog cannot swim!");
      }
      console.log(`Lives = ${lives}`);
      console.log(`Home = ${$("body .endFrog").length}`);
    }
    $(".life").empty();
    if (lives > 0) {
      for (let i = 1; i <= lives; i++) {
        $(".life").append(`<img src="images/frog.png" />`);
      }
    } else {
      $(".life").empty();
    }
  };

  $("body").on("keyup", movementFrog);
  let moveNPC = setInterval(movementNPC, 1000);
  let ticktock = setInterval(countdown, 1000);
  let followLog = setInterval(withLog, 1000);
  let followTurtle = setInterval(withTurtle, 1000);
  let itsTheEnd = setInterval(() => {
    endConditions();
  }, 1);
});
