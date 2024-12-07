let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;

// DOM Elements
const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsList = document.getElementById('laps-list');

// Format Time Function
function formatTime(time) {
  const ms = Math.floor((time % 1000) / 10);
  const s = Math.floor((time / 1000) % 60);
  const m = Math.floor((time / 60000) % 60);
  const h = Math.floor(time / 3600000);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
}

// Start Stopwatch
startBtn.addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      timeDisplay.textContent = formatTime(elapsedTime);
    }, 10);
  }
});

// Pause Stopwatch
pauseBtn.addEventListener('click', () => {
  if (isRunning) {
    isRunning = false;
    clearInterval(intervalId);
  }
});

// Reset Stopwatch
resetBtn.addEventListener('click', () => {
  isRunning = false;
  clearInterval(intervalId);
  elapsedTime = 0;
  timeDisplay.textContent = '00:00:00.00';
  lapsList.innerHTML = '';
});

// Record Lap
lapBtn.addEventListener('click', () => {
  if (isRunning) {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
    lapsList.appendChild(lapItem);
  }
});
