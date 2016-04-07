/*
  webSocket client
  context: P5.js
  A webSocket client that draws a ball on the screen
  that's moved around with data from the server. The server
  is sending data received serially from an Arduino.
  The server is sending:
    x, y, buttonValue\n
    created 10 June 2015
    by Tom Igoe
*/

var socket = io.connect('http://localhost:8080');          // socket.io instance. Connects back to the server
// var x, y;           // readings from the server
var x = 0;
var y = 0;
var oldx = 0;

var oldy = 0;

var p1service = true;

var p2service = false;

// function setup() {
//   createCanvas(400, 300);   // set up the canvas
//   x = width/2;              // set X and Y in the middle of the screen
//   y = width/2;
// }

// function draw() {
//   background(255);          // make the screen white
//   var fillColor = 127;      // set the fill color to black
//   noStroke();
//   if (button == 1) {        // if the button is not pressed
//     fillColor = color(0x44, 0x33, 0xAF);  // blue fill color
//   }
//   fill(fillColor);          // set the fill color
//   ellipse(x, y, 30, 30);    // draw the ellipse
// }

function readData (data) {


   // animate("#p1", 'bounce');

 //  var results = data.split(' ');  // split the data on the commas
 //  // console.log(results);
 //  p = results[0];                 // x is the first value

 // console.log("p is" + p);



 
  console.log(data);


  var p = data.toString();

  console.log("p is " + p);

  if (p == 1) {

    console.log("red pressed");

    x = x + 1;

    console.log("x is" + x);

  } else 


  if (p == 0) {

    console.log("blue pressed");

    y = y + 1;

    console.log("y is" + y);

  } else

  if (p == 2) {

console.log("reset");

resetGame();


  };






if (x != oldx) {





$('#p1').removeClass('flipInX');
    setTimeout(function(){
          $('#p1').addClass('flipInX');
          $('#p1').text(x);

    }, 50);


};


  // document.getElementById('p1').innerHTML = x;
  // button = results[2];            // button is the third value
  // document.getElementById('serverdata').innerHTML += data;
  // document.getElementById('p1').innerHTML += x;

  if (y != oldy) {

$('#p2').removeClass('flipInX');
    setTimeout(function(){
          $('#p2').addClass('flipInX');
          $('#p2').text(y);

    }, 50);

  };

  // document.getElementById('p2').innerHTML = y;

  

    //do animation stuff
// $("#p2").Morphext({
//     // The [in] animation type. Refer to Animate.css for a list of available animations.
//     animation: "bounceIn",
//     // An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
//     speed: 2000,
//     complete: function () {
//         // Called after the entrance animation is executed.
//     }
// });
//end animation stuff

if (p1service == true) {


// console.log("voice1 =" + x);

// console.log("voice2 =" + y);


  responsiveVoice.speak("" + x + "" + "" + " " + "" + y + "");


   // responsiveVoice.speak("" + y + "");


 } else

 if (p2service ==true) {


  responsiveVoice.speak("" + y + "" + "" + " " + "" + x + "");

  // responsiveVoice.speak("" + y + "");

  //  responsiveVoice.speak("" + x + "");

 };



//match point


var difference = Math.abs(x - y);

console.log("difference =" + difference);

// if (difference > 5){

// responsiveVoice.speak("time to catch up");

// };

if (difference > 10){

responsiveVoice.speak("you're getting crushed");

};


//wingifs





//endwingifs


  var totalscore = (x + y);

  console.log ("totalscore=" + totalscore);


  if (totalscore < 40 && x == 20 || y == 20) {

responsiveVoice.speak("match point");

  };


  if (totalscore < 40 && x == 21) {
    // if (x == 1) {

responsiveVoice.speak("Player 1 Wins!");

// $('#playerblock1').css('background', 'green');

var rando = (_.random(1, 12));

var loserando = (_.random(1, 12));

$('#playerblock1').css('background-image', 'url(wingifs/wingif' + rando + '.gif)');

$('#playerblock2').css('background-image', 'url(wingifs/losegif' + loserando + '.gif)');






  };

   if (totalscore < 40 && y == 21) {

responsiveVoice.speak("Player 2 Wins!");

var rando = (_.random(1, 12));

var loserando = (_.random(1, 12));

$('#playerblock2').css('background-image', 'url(wingifs/wingif' + rando + '.gif)');

$('#playerblock1').css('background-image', 'url(wingifs/losegif' + loserando + '.gif)');

  };


  if (totalscore % 5 === 0 && totalscore > 0 && totalscore < 40) {

responsiveVoice.speak("change service");


//change service graphic

if( $("#paddle1").css('visibility') == 'hidden') {

  $('#paddle1').removeClass('bounceInDown');
    setTimeout(function(){
          $('#paddle1').addClass('bounceInDown');
          $("#paddle1").css('visibility', 'visible');
          p1service = true;
          p2service = false;
         }, 50);




$("#paddle2").css('visibility', 'hidden');

} else if ( $("#paddle1").css('visibility') == 'visible') {


   $('#paddle2').removeClass('bounceInDown');
    setTimeout(function(){
          $('#paddle2').addClass('bounceInDown');
          $("#paddle2").css('visibility', 'visible');
          p1service = false;
          p2service = true;
           }, 50);

  $("#paddle1").css('visibility', 'hidden');

  

};

//end service graphic changes

  };



oldx = x;

oldy = y;


}



function makeSpeak() {

  responsiveVoice.speak("a new game begins...");

}

// when new data comes in the websocket, read it:
socket.on('message', readData);



$( document ).ready(function() {


responsiveVoice.setDefaultVoice("UK English Male");

  // responsiveVoice.speak("new game");

  setTimeout(
  function() 
  {

//  var totalscore = 0;

//   if (totalscore % 5 === 0 && totalscore > 0) {

// responsiveVoice.speak("change service");

//  };

    makeSpeak();
  }, 1000);

    
});


function resetGame () {

  responsiveVoice.speak("a new game begins...");
  x = 0;
  y = 0;
  oldx = 0;
  oldy = 0;
    $('#p1').text(x);
      $('#p2').text(y);

      $("#paddle1").css('visibility', 'visible');
      $("#paddle2").css('visibility', 'hidden');

      p1service = true;
          p2service = false;

      $('#playerblock2').css('background-image', 'none');

$('#playerblock1').css('background-image', 'none');


};

        
 