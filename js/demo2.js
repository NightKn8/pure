/*
Global variables:
let itIsStoarge     | iterator for 'isStoarge' generator
let allowStoarge    | checks if user allowed for localStorage
const body          | just a short call for: document.body 
const menuBody      | holds body of menu 
const gameBody      | holds body of game
const scoreBody     | holds body of scoreboard
const path          | stores path to images in case I will change my mind...
const gameElements  | as object defines core elements of rock–paper–scissors game
const players       | stores user and CPU information
const scoreBoard    | stores up to 100 round information.
*/

let itIsStoarge,
  allowStoarge = (localStorage.allowance === undefined) ? false : localStorage.allowance;
const body = document.body,
  menuBody = document.getElementById("mainMenu"),
  gameBody = document.getElementById("gameBody"),
  scoreBody = document.getElementById("scoreBody"),
  path = "../img/demo2/",
  gameElements = {
    rock: {
      element: "ROCK",
      src: [path + "rock01.jpg", path + "rock02.jpg", path + "rock03.jpg", path + "rock04.jpg"]
    },
    paper: {
      element: "PAPER",
      src: [path + "paper01.jpg", path + "paper02.jpg", path + "paper03.jpg", path + "paper04.jpg"]
    },
    scissors: {
      element: "SCISSORS",
      src: [path + "scissors01.jpg", path + "scissors02.jpg", path + "scissors03.jpg", path + "scissors04.jpg"]
    }
  },
  players = {
    cpu: {
      name: "CPU",
      win: 0,
      loss: 0
    },
    player: {
      name:``,
      win: 0,
      loss: 0
    }
  },
  scoreBoard = {
    round: [1],
    winner: {},
    loser: {}
  };

/* Functions:
const showMenu      | controls display of user menu
const gamePlay      | responsible for user gameplay 
const game          | Main loop of the game, switch between showMenu and gamePlay
const isStoarge     | is a generator that displays message asking user for localStoarge approval
*/


const showMenu = () => {


document.getElementById("newGame").addEventListener("click", () => {
   gameBody.classList.remove("hide");
   menuBody.classList.add("hide");



  game("gameRunning");
    }, false);

document.getElementById("scoreBoard").addEventListener("click", () => {
   scoreBody.classList.remove("hide");
    menuBody.classList.add("hide");
    document.getElementById("scores").innerHTML= scoreBoard.round.join();
    }, false);


  console.log('menu');

},
  gamePlay = () => {

    scoreBoard.round.push([...scoreBoard.round].pop()+1);


document.getElementById("rockImg").src=gameElements.rock.src[Math.floor(Math.random()*(gameElements.rock.src.length))];
document.getElementById("paperImg").src=gameElements.paper.src[Math.floor(Math.random()*(gameElements.paper.src.length))];
document.getElementById("scissorsImg").src=gameElements.scissors.src[Math.floor(Math.random()*(gameElements.scissors.src.length))];




//console.log([...scoreBoard.round].pop(),gameElements.rock.src[Math.floor(Math.random()*gameElements.rock.src.length-1)]);

    console.log('game');
  },
  game = (status) => {
    switch (status) {
      case "gameRunning":
        gamePlay();
        break;
      default:
        showMenu();
        break;
    }
  },
  /*
showTopScore = (round, winner, winEl, loser, losEl) => {

scoreBoard.round.push(round);

  scoreBoard = {
    round: [1,2,3],
    winner: {},
    loser: {}
  };
 },
*/



 loadDefaultProfile = (username)=>{
players.player.name=username;
 },
 loadExtendedProfile = (username)=>{
   (localStorage.username === undefined) ? localStorage.username=players.player.name=username : players.player.name=localStorage.username;
 },
  isStoarge = function* () {
    // Create DOM elements for intro message
    const msgDiv = document.createElement("div"),
      msgBody = document.createElement("div");
    msgDiv.setAttribute("id", "message");
    msgDiv.setAttribute("class", "curtain");
    msgBody.setAttribute("id", "messageBody");
    body.insertBefore(msgDiv, body.firstChild).appendChild(msgBody);
    // generate intro message 
    try {
      // check if localStorage can be used
      if (!allowStoarge) {
        // if not than ask user if game can use localStorage
        msgBody.innerHTML = `Hello stranger, This game uses \
      <a href="http://www.w3.org/TR/webstorage/#the-localstorage-attribute"target="_blank">localStoarge</a> \
      to store your ID and latest score\
      <button type="button" id="allow">Allow</button><button type="button" id="deny">Deny</button>`;
        // Create click events for buttons allowing or not localStorage
        document.getElementById('allow').addEventListener("click", () => {
          allowStoarge = true;
          itIsStoarge.next();
        }, false);
        document.getElementById('deny').addEventListener("click", () => {
          itIsStoarge.next();
        }, false);
        // pause generator (await next() from click event)
        yield;
      }
      if (allowStoarge) {
        // if localStorage allowed check if it is supported
        if (typeof (Storage) !== "undefined") {
          // if yes then use it's power! 
          localStorage.allowance = allowStoarge;
        } else {
          // if not then display not supported message
          allowStoarge = false;
          throw "localStoarge not supported on this device";
        }
      } else {
        // if user did not agree to localStoarge display this:
        throw "localStoarge dissallowed by user";
      }
    } catch (err) {
      // all throws will end here
      msgBody.innerHTML = err;
    } finally {
      //ask user for game nick
 let usernameInput;
 if  (localStorage.username === undefined){
      msgBody.innerHTML=`Just a sec. Before we will start. I need to know your InGame username\
      <input type="text" id="iD" name="iD" placeholder="your ID">\
      <button id="go">GO! GO! GO!</button>`;
        document.getElementById('go').addEventListener("click", () => {
          usernameInput= document.getElementById("iD").value;
          (usernameInput=="") ? usernameInput ="N0_N4M3_4V4LIBL3": (/^\s+$/.test(usernameInput)) ? usernameInput = "S P A C E  M A N" : usernameInput;
          itIsStoarge.next();
        }, false);
        yield;
 } 
      
        //set profile type
        if (allowStoarge){
           loadExtendedProfile(usernameInput);
    
        } else {
               loadDefaultProfile(usernameInput);
        }
      // no matter what welcome user
      msgBody.innerHTML = `Hello ` + players.player.name + ` !`;
      // Return promise after everything is done and load game.
      return new Promise((res) => {
        setTimeout(() => {
          body.removeChild(body.firstChild);
          res();
        }, 3000);
      }).then(() => game());
    }
  }

/*
 
 roundResults = (round, winner, winEl, loser, losEl) => {

 };
*/




window.onload = () => {
  itIsStoarge = isStoarge();
  itIsStoarge.next();



  Array.from(document.getElementsByClassName("back")).map((bck) => {
    bck.addEventListener("click", () => {
       menuBody.classList.remove("hide");
    bck.parentNode.classList.add("hide");
    }, false);
  });

  //scoreBoard.round = scoreBoard.round.push(1);
  //scoreBoard.winner = JSON.parse(JSON.stringify(players.player.name));
  //scoreBoard.loser = JSON.parse(JSON.stringify(players.cpu.name));
};