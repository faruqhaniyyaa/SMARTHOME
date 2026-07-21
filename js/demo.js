// codingan's Smart Home Demo Logic

// 1. Smart Lighting Logic
const lightBtn = document.getElementById('light-btn');
const lightCard = document.getElementById('light-card');
const lightStatus = document.getElementById('light-status');

lightBtn.addEventListener('click', () => {
  lightCard.classList.toggle('active');
  
  if (lightCard.classList.contains('active')) {
    lightBtn.textContent = 'Turn OFF';
    lightBtn.classList.add('active');
    lightStatus.textContent = 'Status: ON (Brightness 80%)';
  } else {
    lightBtn.textContent = 'Turn ON';
    lightBtn.classList.remove('active');
    lightStatus.textContent = 'Status: OFF';
  }
});

// 2. Smart Door Lock Logic
const doorBtn = document.getElementById('door-btn');
const doorCard = document.getElementById('door-card');
const doorIcon = document.getElementById('door-icon');
const doorStatus = document.getElementById('door-status');

doorBtn.addEventListener('click', () => {
  doorCard.classList.toggle('active');
  
  if (doorCard.classList.contains('active')) {
    doorIcon.classList.remove('fa-lock');
    doorIcon.classList.add('fa-lock-open');
    doorBtn.textContent = 'Lock Door';
    doorBtn.classList.add('danger'); // Warna merah saat terbuka (warning)
    doorStatus.textContent = 'Status: UNLOCKED';
    doorStatus.style.color = '#ef4444';
  } else {
    doorIcon.classList.remove('fa-lock-open');
    doorIcon.classList.add('fa-lock');
    doorBtn.textContent = 'Unlock Door';
    doorBtn.classList.remove('danger');
    doorStatus.textContent = 'Status: LOCKED';
    doorStatus.style.color = '#94a3b8';
  }
});

// 3. Smart Thermostat Logic
const tempUp = document.getElementById('temp-up');
const tempDown = document.getElementById('temp-down');
const tempValue = document.getElementById('temp-value');
let currentTemp = 22;

tempUp.addEventListener('click', () => {
  if (currentTemp < 30) {
    currentTemp++;
    tempValue.textContent = currentTemp;
  }
});

tempDown.addEventListener('click', () => {
  if (currentTemp > 16) {
    currentTemp--;
    tempValue.textContent = currentTemp;
  }
});

// 4. Smart Speaker Logic
const speakerBtn = document.getElementById('speaker-btn');
const speakerCard = document.getElementById('speaker-card');

speakerBtn.addEventListener('click', () => {
  speakerCard.classList.toggle('active');
  
  if (speakerCard.classList.contains('active')) {
    speakerBtn.textContent = 'Pause Music';
    speakerBtn.classList.add('active');
  } else {
    speakerBtn.textContent = 'Play Music';
    speakerBtn.classList.remove('active');
  }
});
