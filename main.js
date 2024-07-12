let sets = 0; // для рангов
let setsForRest = 0;
let minutes = 24;
let seconds = 59;
let zeroBeforeSecond = 0;
let ifRest = false;
let active = false;
let clicksNum = 0;
let ifLongRest = 0;
let allSets = [];
let max = 0;
let next = 0;
let numberOfVisits = 0;
let key = 0;
let forRanks = 0;
let checkForPictOfCreature = 1;
let deleteOrNot = false;
let randNumber = true;
let l = 0;
let position2 = 1;
let position3 = 1;
let i = 0;
let n = 0;
let launchGIF = false;
let position = 1;


function workingCreature(randNumber) {
  if (randNumber == 2 && deleteOrNot == false) { // = работа, цифра 2, не выключать
    if (ifRest == false) {
      if (launchGIF == false && position == 1) {
        document.getElementById("creature").src = "img/1.2.png";
        position++;
      }

      else if (launchGIF == false && position == 2) {
        document.getElementById("creature").src = "img/2.2.png";
        launchGIF = true;
      }

      else if (launchGIF == true) {
        if (seconds % 2 != 0) {
          document.getElementById("creature").src = "img/2.2.png";
        }

        else {
          document.getElementById("creature").src = "img/3.2.png";
        }
      }
    }
  }

  else if (randNumber != 2 && deleteOrNot == false) { // работа, цифра 1, не выключать
    if (ifRest == false) {
      if (launchGIF == false) {
        document.getElementById("creature").src = "img/1.1.png";
        launchGIF = true;
      }
      else if (launchGIF == true) {
        if (seconds % 2 != 0) {
          document.getElementById("creature").src = "img/2.1.png";
        }

        else {
          document.getElementById("creature").src = "img/3.1.png";
        }
      }
    }
  }

  else if (ifRest == false && deleteOrNot == true) { // не отдых, выход из работы
    let v = 0;
    let interval1 = setInterval(function() {
      if (v == 0) {
        console.log("Рандомное число: ", randNumber);
        if (randNumber == 1) {
          document.getElementById("creature").src = "img/1.1.png";
          console.log("выход из работы, число 1 = штанга");
        }
        console.log("Рандомное число: ", randNumber);
        if (randNumber != 1) {
          document.getElementById("creature").src = "img/1.2.png";
          console.log("выход из работы, число 2 = присед");
        }
        v++;
      }

      else if (v == 1) {
        document.getElementById("creature").src = "img/creature.png";
        clearInterval(interval1);
      }
    }, 1000);
    deleteOrNot = false;
  }


  if (ifRest == true && randNumber == 1) { // отдых, число 1, не выключать
    if (deleteOrNot == false) {
      if (position2 == 2) {
        document.getElementById("creature").src = "img/5.1.png";
      }

      else if (position2 == 1) {
        document.getElementById("creature").src = "img/4.png";
        console.log("Число1 ");
        position2++;
      }
    }
  }

  else if (ifRest == true && randNumber != 1) { // отдых, число 2, не выключать
    if (deleteOrNot == false) {
      if (position2 == 2) {
        document.getElementById("creature").src = "img/5.png";
      }

      else if (position2 == 1) {
        document.getElementById("creature").src = "img/4.png";
        console.log("Число2 ");
        position2++;
      }
    }
  }

  if (ifRest == true && deleteOrNot == true) { // отдых, выключать
    let interval2 = setInterval(function() {
      if (randNumber == 1 && position3 == 1) {
        document.getElementById("creature").src = "img/6.png";
        position3++;
      }

      else if (position3 == 2) {
        document.getElementById("creature").src = "img/creature.png";
        position3 = 1;
        clearInterval(interval2);
      }

      else if (randNumber != 1 && position3 == 1) {
        document.getElementById("creature").src = "img/4.png";
        position3++;
      }
    }, 1000);
  }
}

function recordingSets(sets) {
  let deleteArray = [];
  let date = new Date().toLocaleDateString();
  for (let i = 0; i < localStorage.length; i++) {
    key = localStorage.key(i);
    if (key == date) {
      sets += Number(localStorage.getItem(key));
      deleteArray.push(i);
    }
  }

  if (deleteArray.length != 0) {
    for (let j = 0; j < deleteArray.length; j++) {
      localStorage.removeItem(date);
      deleteArray.splice(0, deleteArray.length);
    }
  }
  localStorage.setItem(date, sets);
}

startCounting.addEventListener("mouseup", function(e) {
  randNumber = Math.round(Math.random() + 1);
  clicksNum++;
  deleteOrNot = false;
  if (clicksNum == 1) {
    active = true;
    if (ifRest == false) {
      sets++; // для рангов
      setsForRest++;
      numberOfVisits++;
    }
    seconds = 59;
    let interval = setInterval(function() {
      workingCreature(randNumber);
      if (seconds == 0 && minutes == 0) {
        time.innerHTML = `${minutes}:${zeroBeforeSecond}${seconds}`;
        if (ifRest == false) {
          recordingSets(sets);
        }
        deleteOrNot = true;
        workingCreature(randNumber);
        restOrWork();
        sets = 0;
        clicksNum = 0;
        clearInterval(interval);

        randNumber = 0;
        position = 1;
        position2 = 1;
        position3 = 1;
        launchGIF = false;
      }
      timeOutput();
    }, 1000);
    return 0;
  }
});


function timeOutput() {
  if (minutes == -1 && seconds > 0) {
    minutes++;
    if (seconds > 9) {
      time.innerHTML = `${minutes}:${seconds}`;
      seconds--;
    }

    else {
      time.innerHTML = `${minutes}:0${seconds}`;
      seconds--;
    }
  }

  else if (seconds == 0 && minutes > 0) {
    time.innerHTML = `${minutes}:0${seconds}`;
    seconds = 59;
    minutes--;
  }

  else if (seconds >= 10) {
    time.innerHTML = `${minutes}:${seconds}`;
    seconds--;
  }

  else if (seconds <= 9) {
    time.innerHTML = `${minutes}:0${seconds}`;
    seconds--;
  }
}

stopCounting.addEventListener("mouseup", function(e) {
  if (ifRest == true && active == false) {
    clicksNum = 0;
  }

  else if (ifRest == false && active == false) {
    clicksNum = 0;
  }

  else {
    seconds = 0;
    minutes = 0;
    clicksNum = 0;
  }
});

moreTime.addEventListener("mousedown", function(e) {
  minutes++;
  if (seconds < 10) {
    time.innerHTML = `${minutes}:0${seconds}`;
  }
  else { time.innerHTML = `${minutes}:${seconds}`; }
});

lessTime.addEventListener("mousedown", function(e) {
  minutes--;
  if (minutes < 0) {
    minutes++;
  }
  if (seconds < 10) {
    time.innerHTML = `${minutes}:0${seconds}`;
  }
  else {
    time.innerHTML = `${minutes}:${seconds}`;
  }
});

function restOrWork() {
  ifLongRest = setsForRest % 4;

  let tableSets = document.getElementById("space");
  if (ifRest == false && ifLongRest == 0) {
    ifRest = true;
    document.body.style.background = "lightgreen";
    tableSets.style.background = "lightgreen";
    minutes = 15;
    seconds = 0;
    clicksNum = 0;
    active = false;
  }

  else if (ifRest == false && ifLongRest != 0) {
    ifRest = true;
    document.body.style.background = "lightgreen";
    tableSets.style.background = "lightgreen";
    minutes = 5;
    seconds = 0;
    clicksNum = 0;
    active = false;
  }

  else {
    ifRest = false;
    document.body.style.background = "#F08080";
    tableSets.style.background = "#F08080";
    minutes = 25;
    seconds = 0;
    active = false;
    return 0;
  }
}

creature.addEventListener("mouseup", function() {
  document.getElementById("creature").src = "ops.png";
  let i = 0;
  let interval = setInterval(function() {
    i++;
    if (i == 2) {
      document.getElementById("creature").src = "creature.png";
      clearInterval(interval);
    }
  }, 1000);

})

// лучшие сеты
// let  = 0;
let [bestKey, maxSets]  = theBestResult();
console.log(bestKey, maxSets)
greatestDate.innerHTML = `${bestKey}`;
greatestSets.innerHTML = `${maxSets}`;

function theBestResult() {
  let bestKey = localStorage.key(0);
  let maxSets = +localStorage.getItem(localStorage.key(bestKey));
  for (let i = 0; i < localStorage.length; i++) {
    key = localStorage.key(i);
    if (localStorage.getItem(key) > +maxSets) {
      console.log("max = ", maxSets);
      maxSets = +localStorage.getItem(key);
      console.log("Лучший результат: ", maxSets);
      bestKey = key;
    }
  }
  return [bestKey,maxSets];
}

// табл все резы
let tableSets = document.getElementById("table");
let row = 0;
let td1 = 0;
let td2 = 0;

for (let i = 0; i < localStorage.length; i++) {
  row = document.createElement("tr");
  td1 = document.createElement("td");
  td2 = document.createElement("td");

  key = localStorage.key(i);
  td1.appendChild(document.createTextNode(key));
  td2.appendChild(document.createTextNode(localStorage.getItem(key)));
  row.appendChild(td1);
  row.appendChild(td2);
  tableSets.appendChild(row);
}


// ранги:
for (let i = 0; i < localStorage.length; i++) {
  key = localStorage.key(i);
  forRanks += Number(localStorage.getItem(key));

  if (forRanks < 20) {
    rank.innerHTML = `Your rank: preschooler`;
  }

  else if (forRanks >= 20 && forRanks < 100) {
    rank.innerHTML = `Your rank: first grader`;
  }

  else if (forRanks >= 100 && forRanks < 200) {
    rank.innerHTML = `Your rank: schoolchild`;
  }

  else if (forRanks >= 200 && forRanks < 300) {
    rank.innerHTML = `Your rank: student`;
  }

  else if (forRanks >= 300 && forRanks < 400) {
    rank.innerHTML = `Your rank: bachelor`;
  }

  else if (forRanks >= 400 && forRanks < 500) {
    rank.innerHTML = `Your rank: master`;
  }

  else if (forRanks >= 500 && forRanks < 600) {
    rank.innerHTML = `Your rank: graduate student`;
  }

  else if (forRanks >= 500 && forRanks < 600) {
    rank.innerHTML = `Your rank: assistant professor`;
  }

  else if (forRanks >= 600 && forRanks < 700) {
    rank.innerHTML = `Your rank: professor`;
  }

  else if (forRanks >= 700 && forRanks < 800) {
    rank.innerHTML = `Your rank: academician`;
  }

  else if (forRanks >= 800 && forRanks < 900) {
    rank.innerHTML = `Your rank: Катя`;
  }

  else if (forRanks >= 900) {
    rank.innerHTML = `Your rank: Батя`;
  }
}