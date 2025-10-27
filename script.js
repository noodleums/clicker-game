const clickCount = document.getElementById("clickCount");
const cpsCount = document.getElementById("cpsCount");
const upg1 = document.getElementById("upgrade1");
const upg2 = document.getElementById("upgrade2");
const upg3 = document.getElementById("upgrade3");
const upg4 = document.getElementById("upgrade4");
const achievementsList = document.getElementById("achievements");
const debug1 = document.getElementById("debug1");

let upg1Cost = 25;
let upg2Cost = 50;
let upg3Cost = 100;
let upg4Cost = 500;

let upgCount = 0;

let achievementsArray = [];

const playerData = {
  clicks: 0,
  upg1Lvl: 1,
  upg2Lvl: 0,
  upg3Lvl: 0,
  upg4Lvl: 0,
  achievementsArray: [],
  achievement1: false,
  achievement2: false,
  achievement3: false,
  achievement4: false
}

achievementsList.innerHTML = "Achievements:<br>";

function initGame() {
  clickCount.innerHTML = `clicks: ${playerData.clicks}`;
  loadData();
  cpsCalc();
  update();
}
function saveData() {
  localStorage.setItem("playerData", JSON.stringify(playerData));
}
function loadData() {
  const saveData = localStorage.getItem("playerData");
  if (saveData) {
    const saved = JSON.parse(saveData);
    playerData.clicks = saved.clicks || 99;
    playerData.upg1Lvl = saved.upg1Lvl || 0;
    playerData.upg2Lvl = saved.upg2Lvl || 0;
    playerData.upg3Lvl = saved.upg3Lvl || 0;
    playerData.upg4Lvl = saved.upg4Lvl || 0;
    playerData.achievement1 = saved.achievement1 || false;
    playerData.achievement2 = saved.achievement2 || false;
    playerData.achievement3 = saved.achievement3 || false;
    playerData.achievement4 = saved.achievement4 || false;
    playerData.achievementsArray = saved.achievementsArray || [];
    upg1Cost = calcUpg1Cost(playerData.upg1Lvl);
    upg2Cost = calcUpg2Cost(playerData.upg2Lvl);
    upg3Cost = calcUpg3Cost(playerData.upg3Lvl);
    upg4Cost = calcUpg4Cost(playerData.upg4Lvl);
  }
}
function update() {
  upgCount = (playerData.upg1Lvl-1)+playerData.upg2Lvl+playerData.upg3Lvl+playerData.upg4Lvl;
  clickCount.innerHTML = `clicks: ${playerData.clicks}`;
  cpsCount.innerHTML = `clicks per second: ${playerData.upg2Lvl+(playerData.upg3Lvl*10)+(playerData.upg4Lvl*25)}`;
  upg1.innerHTML = `${playerData.upg1Lvl} clicks per click<br>cost to upgrade: ${upg1Cost}`;
  upg2.innerHTML = `${playerData.upg2Lvl} clicks/s<br>cost to upgrade: ${upg2Cost}`;
  upg3.innerHTML = `${playerData.upg3Lvl*10} clicks/s<br>cost to upgrade: ${upg3Cost}`;
  upg4.innerHTML = `${playerData.upg4Lvl*25} clicks/s<br>cost to upgrade: ${upg4Cost}`;
  achievements();
  saveData();
}
function achievements() {
  if (playerData.clicks >= 100 && !playerData.achievementsArray.includes("Get 100 clicks<br>")) {
    playerData.achievementsArray.push("Get 100 clicks<br>");
    redrawAchievements();
  }
  if (playerData.clicks >= 1000 && !playerData.achievementsArray.includes("Get 1,000 clicks<br>")) {
    playerData.achievementsArray.push("Get 1,000 clicks<br>");
    redrawAchievements();
  }
  if (upgCount >= 10 && !playerData.achievementsArray.includes("Buy 10 upgrades<br>")) {
    playerData.achievementsArray.push("Buy 10 upgrades<br>");
    redrawAchievements();
  }
  if (playerData.clicks >= 10000 && !playerData.achievementsArray.includes("Get 10,000 clicks<br>")) {
    playerData.achievementsArray.push("Get 10,000 clicks<br>");
    redrawAchievements();
  }
}
function redrawAchievements() {
  achievementsList.innerHTML = "Achievements:<br>";
  for (let i = 0; i < playerData.achievementsArray.length; i++) {
    achievementsList.innerHTML += playerData.achievementsArray[i];
  }
}
function onButtonClick() {
  playerData.clicks += playerData.upg1Lvl;
  saveData();
  update();
}
function calcUpg1Cost(lvl) {
  const calc = 25 * (1 + ((lvl-1) ** 2) / 10);
  return Number(calc.toFixed(2));
}
function calcUpg2Cost(lvl) {
  const calc = 50 * (1 + (lvl ** 2) / 10);
  return Number(calc.toFixed(2));
}
function calcUpg3Cost(lvl) {
  const calc = 100 * (1 + (lvl ** 2) / 10);
  return Number(calc.toFixed(2));
}
function calcUpg4Cost(lvl) {
  const calc = 500 * (1 + (lvl ** 2) / 10);
  return Number(calc.toFixed(2));
}
function upg1Button() {
  if (playerData.clicks >= upg1Cost){
    playerData.clicks -= upg1Cost;
    playerData.upg1Lvl += 1;
    upg1Cost = calcUpg1Cost(playerData.upg1Lvl);
    saveData();
    update();
  }
}
function upg2Button() {
  if (playerData.clicks >= upg2Cost){
    playerData.clicks -= upg2Cost;
    playerData.upg2Lvl += 1;
    upg2Cost = calcUpg2Cost(playerData.upg2Lvl);
    saveData();
    update();
  }
}

function upg3Button() {
  if (playerData.clicks >= upg3Cost){
    playerData.clicks -= upg3Cost;
    playerData.upg3Lvl += 1;
    upg3Cost = calcUpg3Cost(playerData.upg3Lvl);
    saveData();
    update();
  }
}
function upg4Button() {
  if (playerData.clicks >= upg4Cost){
    playerData.clicks -= upg4Cost;
    playerData.upg4Lvl += 1;
    upg4Cost = calcUpg4Cost(playerData.upg4Lvl);
    saveData();
    update();
  }
}
function cpsCalc() {
  setInterval(function() {
    playerData.clicks += playerData.upg2Lvl+(playerData.upg3Lvl*10)+(playerData.upg4Lvl*25);
    saveData();
    update();
  }, 1000);
}
function clearSaveData() {
  const clearData = prompt("Are you sure?\nIf so type \"yes\"");
  if (clearData.toLowerCase().trim() == "yes") {
    playerData.clicks = 99;
    playerData.upg1Lvl = 1;
    playerData.upg2Lvl = 0;
    playerData.upg3Lvl = 0;
    playerData.upg4Lvl = 0;
    upg1Cost = 25;
    upg2Cost = 50;
    upg3Cost = 100;
    upg4Cost = 500;
    playerData.achievement1 = false;
    playerData.achievement2 = false;
    playerData.achievement3 = false;
    playerData.achievement4 = false;
    playerData.achievementsArray = [];
    saveData();
    location.reload();
  }
}
document.addEventListener('DOMContentLoaded', initGame);
