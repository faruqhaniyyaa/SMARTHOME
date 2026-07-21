// codingan's Smart Home Demo Logic

// ============================
// VIEW TOGGLE
// ============================
const viewFloorplanBtn = document.getElementById("viewFloorplanBtn");
const viewCardsBtn = document.getElementById("viewCardsBtn");
const floorplanView = document.getElementById("floorplanView");
const cardsView = document.getElementById("cardsView");

viewFloorplanBtn.addEventListener("click", () => {
  floorplanView.classList.remove("hidden");
  cardsView.classList.add("hidden");
  viewFloorplanBtn.classList.add("active");
  viewCardsBtn.classList.remove("active");
});

viewCardsBtn.addEventListener("click", () => {
  cardsView.classList.remove("hidden");
  floorplanView.classList.add("hidden");
  viewCardsBtn.classList.add("active");
  viewFloorplanBtn.classList.remove("active");
});

// ============================
// 1. SMART LIGHTING (card + floor plan, shared state)
// ============================
const lightBtn = document.getElementById("light-btn");
const lightCard = document.getElementById("light-card");
const lightStatus = document.getElementById("light-status");
const fpLightBtn = document.getElementById("fpLightBtn");
const livingGlow = document.getElementById("livingGlow");
const livingRoom = document.querySelector(".room-living");

let lightOn = false;

function setLight(on) {
  lightOn = on;

  lightCard.classList.toggle("active", on);
  lightBtn.textContent = on ? "Turn OFF" : "Turn ON";
  lightBtn.classList.toggle("active", on);
  lightStatus.textContent = on ? "Status: ON (Brightness 80%)" : "Status: OFF";

  fpLightBtn.classList.toggle("on", on);
  livingGlow.classList.toggle("on", on);
  livingRoom.classList.toggle("lit", on);
}

lightBtn.addEventListener("click", () => setLight(!lightOn));
fpLightBtn.addEventListener("click", () => setLight(!lightOn));

// ============================
// 2. SMART DOOR LOCK (card + floor plan)
// ============================
const doorBtn = document.getElementById("door-btn");
const doorCard = document.getElementById("door-card");
const doorIcon = document.getElementById("door-icon");
const doorStatus = document.getElementById("door-status");
const fpDoorBtn = document.getElementById("fpDoorBtn");
const fpDoorIcon = document.getElementById("fpDoorIcon");

let doorUnlocked = false;

function setDoor(unlocked) {
  doorUnlocked = unlocked;

  doorCard.classList.toggle("active", unlocked);
  doorBtn.textContent = unlocked ? "Lock Door" : "Unlock Door";
  doorBtn.classList.toggle("danger", unlocked);
  doorStatus.textContent = unlocked ? "Status: UNLOCKED" : "Status: LOCKED";
  doorStatus.style.color = unlocked ? "#ef4444" : "#94a3b8";

  doorIcon.classList.toggle("fa-lock-open", unlocked);
  doorIcon.classList.toggle("fa-lock", !unlocked);

  fpDoorBtn.classList.toggle("unlocked", unlocked);
  fpDoorIcon.classList.toggle("fa-lock-open", unlocked);
  fpDoorIcon.classList.toggle("fa-lock", !unlocked);
}

doorBtn.addEventListener("click", () => setDoor(!doorUnlocked));
fpDoorBtn.addEventListener("click", () => setDoor(!doorUnlocked));

// ============================
// 3. SMART THERMOSTAT (card + floor plan)
// ============================
const tempUp = document.getElementById("temp-up");
const tempDown = document.getElementById("temp-down");
const tempValue = document.getElementById("temp-value");
const fpTempUp = document.getElementById("fpTempUp");
const fpTempDown = document.getElementById("fpTempDown");
const fpTempValue = document.getElementById("fpTempValue");

let currentTemp = 22;

function setTemp(t) {
  currentTemp = t;
  tempValue.textContent = currentTemp;
  fpTempValue.textContent = currentTemp;
}

function tempStep(delta) {
  const next = currentTemp + delta;
  if (next >= 16 && next <= 30) setTemp(next);
}

tempUp.addEventListener("click", () => tempStep(1));
tempDown.addEventListener("click", () => tempStep(-1));
fpTempUp.addEventListener("click", () => tempStep(1));
fpTempDown.addEventListener("click", () => tempStep(-1));

// ============================
// 4. SMART SPEAKER (card + floor plan)
// ============================
const speakerBtn = document.getElementById("speaker-btn");
const speakerCard = document.getElementById("speaker-card");
const fpSpeakerBtn = document.getElementById("fpSpeakerBtn");

let speakerPlaying = false;

function setSpeaker(playing) {
  speakerPlaying = playing;

  speakerCard.classList.toggle("active", playing);
  speakerBtn.textContent = playing ? "Pause Music" : "Play Music";
  speakerBtn.classList.toggle("active", playing);

  fpSpeakerBtn.classList.toggle("on", playing);
}

speakerBtn.addEventListener("click", () => setSpeaker(!speakerPlaying));
fpSpeakerBtn.addEventListener("click", () => setSpeaker(!speakerPlaying));

// ============================
// 5. SMART CAMERA (floor plan popup preview)
// ============================
const fpCameraBtn = document.getElementById("fpCameraBtn");
const fpCameraPopup = document.getElementById("fpCameraPopup");

fpCameraBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  fpCameraPopup.classList.toggle("show");
});

document.addEventListener("click", (e) => {
  if (!fpCameraBtn.contains(e.target) && !fpCameraPopup.contains(e.target)) {
    fpCameraPopup.classList.remove("show");
  }
});
