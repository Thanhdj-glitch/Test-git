const images = [
  "images/bau.png",
  "images/cua.png",
  "images/tom.png",
  "images/ca.png",
  "images/huou.png",
  "images/ga.png",
];

const imageNames = {
  "images/bau.png": "bầu",
  "images/cua.png": "cua",
  "images/tom.png": "tôm",
  "images/ca.png": "cá",
  "images/huou.png": "hươu",
  "images/ga.png": "gà",
};

const random = [
  document.getElementById("zet1"),
  document.getElementById("zet2"),
  document.getElementById("zet3"),
];
const point = [
  document.getElementById("det1"),
  document.getElementById("det2"),
  document.getElementById("det3"),
  document.getElementById("det4"),
  document.getElementById("det5"),
  document.getElementById("det6"),
];
let countDet1 = Array(6).fill(0);
let ponitTotal = 0;
let spinGame = false;
const spiGameButton = document.getElementById("spinGameButton");
const resetGameButton = document.getElementById("resetGameButton");
function spin() {
  if (spinGame) return;
  spinGame = true;
  spiGameButton.disabled = true;
  resetGameButton.disabled = true;
  point.forEach((det1) => (det1.style.pointerEvents = "none"));

  let spins = 100;
  const interval = setInterval(() => {
    random.forEach((slot) => {
      const randomImage = images[Math.floor(Math.random() * images.length)];
      slot.style.backgroundImage = `url(${randomImage})`;
    });
    spins--;
    if (spins === 0) {
      clearInterval(interval);
      spinGame = false;
      spiGameButton.disabled = false;
      resetGameButton.disabled = false;
      point.forEach((det1) => (det1.style.pointerEvents = "auto"));
      checkResult();
    }
  }, 50);
}
function checkResult() {
  const slotResults = random.map((det) =>
    det.style.backgroundImage.slice(5, -2)
  );
  let resultString = "Bạn đã đoán ";
  let betString = "với kết quả: ";
  let betSummary = {};
  let slotCounts = {};
  slotResults.forEach((url) => {
    if (slotCounts[url]) {
      slotCounts[url]++;
    } else {
      slotCounts[url] = 1;
    }
  });
  countDet1.forEach((count, index) => {
    let imageName = imageNames[index];
    betSummary[imageName] = count;
    if (count > 0) {
      let imageName = imageNames[index];
      betSummary[imageName] = count;
    }
  });
  let slotDetails = Object.entries(slotCounts)
    .map(([url, count]) => `${imageNames[url]} ${count}`)
    .join(" ");

  if (
    Object.keys(betSummary).some(
      (hisname) =>
        slotCounts[images[Object.keys(betSummary).indexOf(hisname)]] > 0
    )
  ) {
    console.log(`Bạn đã đoán đúng với kết quả: ${slotDetails}`);
  } else {
    console.log(`Bạn đã đoán sai với kết quả: ${slotDetails}`);
  }
}

function resetBets() {
  if (spinGame) return;
  countDet1.fill(0);
  ponitTotal = 0;
  point.forEach((det1) => det1.removeAttribute("data-bet"));
}

spiGameButton.addEventListener("click", spin);
resetGameButton.addEventListener("click", resetBets);

point.forEach((det1, index) => {
  det1.addEventListener("click", () => {
    if (!spinGame && ponitTotal < 3 && countDet1[index] < 3) {
      countDet1[index]++;
      ponitTotal++;
      det1.setAttribute("data-bet", countDet1[index]);
      det1.style.backgroundImage = `url(${images[index]})`;
    }
  });
});

window.onload = function () {
  point.forEach((det1, index) => {
    det1.style.backgroundImage = `url(${images[index]})`;
  });
};
