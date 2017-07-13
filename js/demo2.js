let itIsStoarge,
  isGame = false,
  round = 0,
  allowStoarge = (localStorage.allowance === undefined) ? false : localStorage.allowance,
  path = "../img/demo2/";
class player {
  constructor(name) {
    this.name = name;
    this.score = [];
    this.emblem = [];
    this.wins = 0;
    this.losses = 0;
    this.draw = 0
  };
  updateStats(status) {
    if (status == 1) {
      this.wins++;
    } else if (status == 0) {
      this.losses++;
    } else {
      this.draw++;
    };
  };
  updateScore(status) {
    this.updateStats(status);
    if (this.score.length <= 100) {
      return this.score.unshift(status);
    } else {
      this.score.pop();
      return this.score.unshift(status);
    };
  };
  updateEmblem(element) {
    if (this.emblem.length <= 100) {
      return this.emblem.unshift(element);
    } else {
      this.emblem.pop();
      return this.emblem.unshift(element);
    };
  };
  presonalWidget() {
    return `<div class="widget"><div class="widgetPlayer">Player: ${this.name}</div>
    <span class="widgetStats">Wins: ${this.wins} / Losses: ${this.losses} / Draw: ${this.draw}</span></div>`;
  };
};
class gameElement {
  constructor(element) {
    this.element = element;
    this.path = path;
  };
  src() {
    return [`${this.path}${this.element.toLowerCase()}0${this.rand()}.jpg`]
  };
  rand(min = 1, max = 4) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
};
class showMenu {
  constructor(dom) {
    this.dom = document.getElementById(dom);
  };
  eventBind() {
    document.getElementById("newGame").addEventListener("click", gameLoop.bind(null, "gameRunning"), false);
    document.getElementById("scoreBoard").addEventListener("click", gameLoop.bind(null, "scoreBoard"), false);
  };
  render() {
    this.nGame = (round > 0 || isGame) ? "<h1>Continue</h1>" : "<h1>New Game</h1>";
    this.dom.innerHTML = `
   <section id="mainMenu">
      <ol>
        <li id="newGame">
          ${this.nGame}
        </li>
        <li id="scoreBoard">
          <h1>Scoreboard</h1>
        </li>
      </ol>
    </section>`;
    this.eventBind();
  };
};
class scoreBoard {
  constructor(dom) {
    this.dom = document.getElementById(dom);
  }
  setScores() {
    this.round = round;
    let winner, winnerElement, loser, loserElement;
    const arrScore = ppl.score.map((el, i) => {
      if (el == 1) {
        winner = ppl.name;
        winnerElement = ppl.emblem[i];
        loser = cpu.name;
        loserElement = cpu.emblem[i];
      } else if (el == 0) {
        winner = cpu.name;
        winnerElement = cpu.emblem[i];
        loser = ppl.name;
        loserElement = ppl.emblem[i];
      } else {
        winner = loser = "-";
        winnerElement = loserElement = ppl.emblem[i];
      }
      return `
      <div>
        <span>${this.round--}</span>
        <span>${winner}</span>
        <span>${loser}</span>
        <span><img class='embImg' src='${path}${winnerElement.toLowerCase()}Small.png' alt='${winnerElement}'></span>
        <span><img class='embImg' src='${path}${loserElement.toLowerCase()}Small.png' alt='${loserElement}'></span>
      </div>`;
    }),
      scoreHeader = `
      <div>
        <span>Round</span>
        <span>Winer</span>
        <span>Loser</span>
        <span>Won by</span>
        <span>Lost by</span>
      </div>`;
    return `${scoreHeader}${arrScore.join("")}`;
  }
  eventBind() {
    document.getElementsByClassName("back")[0].addEventListener("click", gameLoop.bind(null, ""), false);
  };
  render() {
    this.dom.innerHTML = `<section id="scoreBody">
      <h1>ScoreBoard</h1>
      <section id="scores">
        ${this.setScores()}
      </section>
      <span class="back"><i class="material-icons">chevron_left</i> Back to menu</span>
    </section>`
    this.eventBind();
  };
};
class gamePlay {
  constructor(dom) {
    this.dom = document.getElementById(dom);
  };
  eventBind() {
    document.getElementsByClassName("back")[0].addEventListener("click", () => {
      clearTimeout(this.timer);
      this.gameTable.classList.remove("avoid-clicks");
      gameLoop("");
    }, false);
  };
  makeGame() {
    const rockPick = document.getElementById("rockImg"),
      paperPick = document.getElementById("paperImg"),
      scissorsPick = document.getElementById("scissorsImg"),
      cpuImage = document.getElementById("cpuImg");
    this.gameTable = document.getElementById("gameTable");
    let cpuPick,
      prank = 0;
    if (!isGame) {
      isGame = true;
    };
    rockPick.src = rock.src();
    paperPick.src = paper.src();
    scissorsPick.src = scissors.src();
    [rockPick, paperPick, scissorsPick].map((pick) => {
      pick.addEventListener("click", () => {
        gameTable.classList.add("avoid-clicks");
        round++;
        cpuPick = cpuLogic();
        gameLogic(cpuPick, pick.alt);
        cpuImage.src = `${path}${cpuPick.toLowerCase()}0${rock.rand()}.jpg`;
        document.getElementsByClassName("playerId")[0].innerHTML = cpu.presonalWidget();
        document.getElementsByClassName("playerId")[1].innerHTML = ppl.presonalWidget();
        if (scissorsPick.getAttribute("src") == `${path}${pick.alt.toLowerCase()}01.jpg` && prank == 0) {
          scissorsPick.src = `${path}scissors01alt.jpg`;
          prank = 1;
        };
        this.timer = setTimeout(() => {
          gameTable.classList.remove("avoid-clicks");
          document.getElementById("inside").innerHTML = `Round: ${round}`;
          rockPick.src = rock.src();
          paperPick.src = paper.src();
          scissorsPick.src = scissors.src();
          cpuImage.src = `${path}cpuquestion.jpg`
        }, 2000);
      }, false);
    });
  };
  render() {
    this.dom.innerHTML = ` 
    <section id="gameBody">
      <section id="gameTable">
        <aside class="side">
          <div class='playerId'>${cpu.presonalWidget()}</div>
          <figure><img id="cpuImg" src="../img/demo2/cpuquestion.jpg" alt="CPU img">
            <figcaption id="cpuFigcaption"></figcaption>
          </figure>
        </aside>
        <aside id="inside">
        Round: ${round}
        </aside>
        <aside class="side">
          <span id="images">
            <figure><img id="rockImg" alt="ROCK">
              <figcaption>ROCK</figcaption>
            </figure>
            <figure><img id="paperImg"  alt="PAPER">
              <figcaption>PAPER</figcaption>
            </figure>
            <figure><img id="scissorsImg"  alt="SCISSORS">
              <figcaption>SCISSORS</figcaption>
            </figure>
          </span>
          <div class='playerId'>${ppl.presonalWidget()}</div>
        </aside>
      </section>
      <span class="back"><i class="material-icons">chevron_left</i> Back to menu</span>
    </section>`;
    this.makeGame();
    this.eventBind();
  };
};
const rock = new gameElement("ROCK"),
  paper = new gameElement("PAPER"),
  scissors = new gameElement("SCISSORS"),
  cpu = new player("CPU"),
  ppl = new player("player"),
  menu = new showMenu("displayBox"),
  board = new scoreBoard("displayBox"),
  game = new gamePlay("displayBox"),
  body = document.body,
  globalFooter = document.getElementsByTagName("footer")[0];
pushToLocalStorage = () => {
  localStorage.cpuScore = JSON.stringify(cpu.score);
  localStorage.cpuEmblem = JSON.stringify(cpu.emblem);
  localStorage.cpuWins = cpu.wins;
  localStorage.cpuLosses = cpu.losses;
  localStorage.cpuDraw = cpu.draw;
  localStorage.pplScore = JSON.stringify(ppl.score);
  localStorage.pplEmblem = JSON.stringify(ppl.emblem);
  localStorage.pplWins = ppl.wins;
  localStorage.pplLosses = ppl.losses;
  localStorage.pplDraw = ppl.draw;
  localStorage.round = round;
},
  popFromLocalStorage = () => {
    ppl.name = localStorage.username;
    cpu.score = JSON.parse(localStorage.cpuScore);
    cpu.emblem = JSON.parse(localStorage.cpuEmblem);
    cpu.wins = localStorage.cpuWins;
    cpu.losses = localStorage.cpuLosses;
    cpu.draw = localStorage.cpuDraw;
    ppl.score = JSON.parse(localStorage.pplScore);
    ppl.emblem = JSON.parse(localStorage.pplEmblem);
    ppl.wins = localStorage.pplWins;
    ppl.losses = localStorage.pplLosses;
    ppl.draw = localStorage.pplDraw;
    round = localStorage.round;
  },
  cpuLogic = () => {
    let finalPick = "NONE";
    const inArr = ppl.emblem,
      r = {
        name: rock.element,
        cnt: 0,
        ten: 0
      },
      p = {
        name: paper.element,
        cnt: 0,
        ten: 0
      },
      s = {
        name: scissors.element,
        cnt: 0,
        ten: 0
      },
      pick = {
        ROCK: 0,
        PAPER: 0,
        SCISSORS: 0,
      },
      k = inArr.length;
    if (inArr.length <= 0) {
      return finalPick = [r.name, p.name, s.name][Math.floor(Math.random() * 3)];
    } else {
      inArr.map((el, i) => {
        (el == r.name) ? r.cnt++ : (el == p.name) ? p.cnt++ : (el == s.name) ? s.cnt++ : false;
        if (i <= 0 && i >= 10) {
          (el == r.name) ? r.ten++ : (el == p.name) ? p.ten++ : (el == s.name) ? s.ten++ : false;
        }
      });
      pick.ROCK = (r.cnt / k) + r.ten / 10;
      pick.PAPER = (p.cnt / k) + p.ten / 10;
      pick.SCISSORS = (s.cnt / k) + s.ten / 10;
      finalPick = Object.keys(pick).reduce(function (a, b) { return pick[a] > pick[b] ? a : b });
      if (finalPick == r.name) {
        return finalPick = p.name;
      } else if (finalPick == p.name) {
        return finalPick = s.name;
      } else {
        return finalPick = r.name;
      }
    }
  },
  gameLogic = (cpuPick, pplPick) => {
    const roundResult = document.getElementById("inside");
    if (pplPick == "PAPER" && cpuPick == "ROCK") {
      cpu.updateScore(0);
      ppl.updateScore(1);
      roundResult.innerHTML = `YOU WON`;
    } else if (pplPick == "ROCK" && cpuPick == "SCISSORS") {
      cpu.updateScore(0);
      ppl.updateScore(1);
      roundResult.innerHTML = `YOU WON`;
    } else if (pplPick == "SCISSORS" && cpuPick == "PAPER") {
      cpu.updateScore(0);
      ppl.updateScore(1);
      roundResult.innerHTML = `YOU WON`;
    } else if (pplPick == cpuPick) {
      cpu.updateScore(-1);
      ppl.updateScore(-1);
      roundResult.innerHTML = `DRAW!`;
    } else {
      cpu.updateScore(1);
      ppl.updateScore(0);
      roundResult.innerHTML = `CPU WON`;
    };
    cpu.updateEmblem(cpuPick);
    ppl.updateEmblem(pplPick);
    if (allowStoarge) {
      pushToLocalStorage();
    }
  },
  loadDefaultProfile = (username) => {
    ppl.name = username;
    globalFooter.innerHTML = `${ppl.name} in da game`;
  },
  loadExtendedProfile = (username) => {
    if (localStorage.username === undefined) {
      pushToLocalStorage();
      localStorage.username = username;
    }
    popFromLocalStorage();
    globalFooter.innerHTML = `${ppl.name} in da game`;
  },
  gameLoop = (status) => {
    switch (status) {
      case "gameRunning":
        game.render();
        break;
      case "scoreBoard":
        board.render();
        break;
      default:
        menu.render();
        break;
    }
  };
isStoarge = function* () {
  const msgDiv = document.createElement("div"),
    msgBody = document.createElement("div");
  msgDiv.setAttribute("id", "message");
  msgDiv.setAttribute("spellcheck", "false");
  ["autocomplete", "autocorrect", "autocapitalize"].map((auto) => msgDiv.setAttribute(auto, "off"));
  msgDiv.setAttribute("class", "curtain");
  msgBody.setAttribute("id", "messageBody");
  body.insertBefore(msgDiv, body.firstChild).appendChild(msgBody);
  try {
    if (!allowStoarge) {
      msgBody.innerHTML = `<span>Hello stranger! This game uses 
      <a href="http://www.w3.org/TR/webstorage/#the-localstorage-attribute"target="_blank">localStoarge</a> 
      to store your ID and latest score</span>
      <button type="button" id="allow">Allow</button><button type="button" id="deny">Deny</button>`;
      document.getElementById('allow').addEventListener("click", () => {
        allowStoarge = true;
        itIsStoarge.next();
      }, false);
      document.getElementById('deny').addEventListener("click", () => {
        itIsStoarge.next();
      }, false);
      yield;
    }
    let usernameInput;
    if (localStorage.username === undefined) {
      msgBody.innerHTML = `Just a sec. Before we will start I need to know your InGame username
      <input type="text" id="iD" name="iD" placeholder="your ID">
      <button id="go">GO! GO! GO!</button>`;
      document.getElementById('go').addEventListener("click", () => {
        usernameInput = document.getElementById("iD").value;
        (usernameInput == "") ? usernameInput = "N0_N4M3_4V4LIBL3" : (/^\s+$/.test(usernameInput)) ? usernameInput = "S P A C E  M A N" : (usernameInput.length >= 20) ? usernameInput = "ToLongNick" : usernameInput;
        itIsStoarge.next();
      }, false);
      yield;
    }
    if (allowStoarge) {
      if (typeof (Storage) !== "undefined") {
        localStorage.allowance = allowStoarge;
        loadExtendedProfile(usernameInput);
      } else {
        allowStoarge = false;
        loadDefaultProfile(usernameInput);
        throw "localStoarge not supported on this device";
      }
    } else {
      loadDefaultProfile(usernameInput);
      throw "localStoarge dissallowed by user";
    }
  } catch (err) {
    msgBody.innerHTML = err;
  } finally {
    msgBody.innerHTML = `Hello ` + ppl.name + ` !`;
    return new Promise((res) => {
      setTimeout(() => {
        body.removeChild(body.firstChild);
        res();
      }, 3000);
    }).then(() => gameLoop(""));
  }
};
window.onload = () => {
  itIsStoarge = isStoarge();
  itIsStoarge.next();
};