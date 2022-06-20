var speelwoord = document.getElementById("speelwoord");
speelwoord.style.color = "red";


// const fs = require('fs');
// const array = fs.readFileSync('woorden2.txt').toString().split("\n");
// for (const woordenlijst of array) {
  // console.log(woordenlijst);
// }

const woordenlijst = ["pannenkoek", "automobiel", "bureaustoel"; "televisietoestel"];
lengtewoordenlijst = woordenlijst.length;

var woord = "";
lengtewoord = 0;
var teller2 = 0;
var teller3 = 0;
var game = true;
var teller = 0;

var container = document.getElementById("container");
var innerheight = innerHeight;

container.style.height = innerheight + "px";

function woordBepalen(){

  randomwoordgetal = Math.round(Math.random() * (lengtewoordenlijst- 1));

  console.log(randomwoordgetal);


  woord = woordenlijst[randomwoordgetal];
  lengtewoord = woord.length;

}

function randomGetal(){
  randomgetal = 40 + Math.round(Math.random() * (innerHeight- 130));
  speelwoord.style.top = randomgetal + "px";
}



function wachten(ms) {

  return new Promise( resolve => {

  setTimeout(()=> {resolve('')}, ms );

  })
}

function schuifOp(){
  var plek = teller2 + "px";
  speelwoord.style.right = plek;
  speelwoord.innerHTML = woord;

  teller2++;
}

async function beweegWoord() {

while(teller <= 500){
  if (teller < 500){
    schuifOp();
    await wachten(20);
    teller++;
  } else if (teller = 500) {
    document.write("GAME OVER");
    teller++;
  }
}

  //
  // for(teller = 0; teller <500; teller++){
  //   schuifOp();
  //   await wachten(20);
  // }
}

function  woordMeten() {
  const text = woord;
  const font = "20px Arial";
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = font;
  const lengte = context.measureText(text);
  lengtewoord = lengte.width;

  teller2 = 0-lengtewoord;

}

while(game){
  randomGetal();
  woordBepalen();
  woordMeten();
  beweegWoord();
  game = false;
}


document.onkeydown = function(key){

  keypressed = key.key;
  lengtewoord = woord.length;

  var woord2 = woord.substring(0,1);

  if (woord2 == keypressed  && lengtewoord > 1){
    woord = woord.substring(1,lengtewoord);
    speelwoord.innerHTML = woord;
  } else if (woord2 == keypressed && lengtewoord == 1) {
    speelwoord.innerHTML = "";
      randomGetal();
      woord = "tweedewoord";
      woordMeten();
      teller = 0;
  }
}
