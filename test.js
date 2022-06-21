var speelwoord = document.getElementById("speelwoord");
speelwoord.style.color = "red";

var container = document.getElementById("container");
var innerheight = innerHeight;
container.style.height = innerheight + "px";

var score = document.getElementById("score");
score.style.top = "10px";
score.style.left = "10px";

var gameover = document.getElementById("gameover");
gameover.style.top = innerHeight/2 + "px";
gameover.style.left = innerWidth/2 + "px";

var beam = document.getElementById("beam");
var beamright = 1000;


var teller = 0;
var nieuwwoord = false;
var punten = 0;
var puntenbeam = 0;
var beamteller = 1000;
var eindgame = false;

async function woordendownload(){
  var woorden = [];
  const url1 = 'https://pwjchristoph.github.io/TempoTypen/woorden2.txt';
  return fetch(url1)
  .then(response => response.text())
};

woordendownload().then(data =>{
  const woorden = data.split("\n");
  woordafbeelden(woorden);
})

function woordafbeelden(downloadlijst){

  woordenlijst = downloadlijst;

  randomhoogte = 40 + Math.round(Math.random() * (innerHeight- 130));
  speelwoord.style.top = randomhoogte + "px";

  lengtewoordenlijst = woordenlijst.length;
  randomwoord = Math.round(Math.random() * (lengtewoordenlijst- 1));

  huidigwoord = woordenlijst[randomwoord];

  woordMeten(huidigwoord);

  beweegWoord();


};

function  woordMeten(huidigwoord) {
  const text = huidigwoord;
  const font = "20px Arial";
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = font;
  const lengte = context.measureText(text);
  lengtestring = lengte.width;
  teller2 = 0-lengtestring;
};

function  restwoordMeten(huidigwoord) {
  const text2 = huidigwoord;
  const font2 = "20px Arial";
  const canvas = document.createElement("canvas");
  const context2 = canvas.getContext("2d");
  context2.font = font2;
  const lengte2 = context2.measureText(text2);
  lengtestring2 = lengte2.width;
};

async function beweegWoord() {

while(teller <= beamteller){
  puntenbeam += 1;

  if (teller < beamteller && !nieuwwoord){
    var plek = teller2 + "px";
    speelwoord.style.right = plek;
    speelwoord.innerHTML = huidigwoord;
    teller2+=1;

    await wachten(5);
    teller +=1;
    console.log(teller);

    beamverschuiven(puntenbeam);
  } else if (teller < beamteller && nieuwwoord){
    randomhoogte = 40 + Math.round(Math.random() * (innerHeight- 130));
    speelwoord.style.top = randomhoogte + "px";

    lengtewoordenlijst = woordenlijst.length;
    randomwoord = Math.round(Math.random() * (lengtewoordenlijst- 1));

    huidigwoord = woordenlijst[randomwoord];

    woordMeten(huidigwoord);

    teller = 0;
    beamverschuiven(puntenbeam);
    nieuwwoord = false;
  } else if (teller = beamteller) {
    // document.write("GAME OVER");
    eindgame = true;
    teller++;
  }
  }
eindgame = true;
speelwoord.innerHTML = "";
gameover.innerHTML = "GAME OVER";
score.style.color = "red";


// gameover.innerHTML = "DIT GAAT FOUT";
}

function wachten(ms) {
  return new Promise( resolve => {
  setTimeout(()=> {resolve('')}, ms );
  })
}

function beamverschuiven(pbeam) {
  if (pbeam > 6){
    beamright -= 1;
    beamteller -=1;
    beam.style.right = beamright + "px";
    puntenbeam = 0;
  }
}


document.onkeydown = function(key){

  keypressed = key.key;
  lengtewoord = huidigwoord.length;


  var letter = huidigwoord.substring(0,1);



  if (letter == keypressed  && lengtewoord > 1 && !eindgame){
    huidigwoord = huidigwoord.substring(1,lengtewoord);
    speelwoord.innerHTML = huidigwoord;
    punten++;
    score.innerHTML = "score: " + punten;

    restwoordMeten(huidigwoord);

    restlengte = lengtestring - lengtestring2;
    teller = teller - restlengte;
    lengtestring = lengtestring2;
    console.log(teller);
    console.log(restlengte);

  } else if (letter == keypressed && lengtewoord == 1 && !eindgame) {

    speelwoord.innerHTML = "";
    punten++;
    score.innerHTML = "score: " + punten;
    nieuwwoord = true;

  }
}
