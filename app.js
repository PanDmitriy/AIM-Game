const startBtn = document.querySelector('#start-game');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeCount = document.querySelector('#time');
const board = document.querySelector('#board');

let time = 10;
let count = 0


// Functions
const finishGame = () => {
  board.innerHTML = `<h1>Points: ${count}</h1>`
}
const setTime = (value) => {
  timeCount.innerHTML = `00:${value}`;
}

const getRandomNumber = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
}

const createRandomCircle = () => {
  const sizeCircle = getRandomNumber(8, 30);
  const {height, width} = board.getBoundingClientRect();
  const x = getRandomNumber(0, height - sizeCircle);
  const y = getRandomNumber(0, width - sizeCircle);
  
  const circle = document.createElement('div');
  circle.classList.add('circle');

  circle.style.width = `${sizeCircle}px`;
  circle.style.height = `${sizeCircle}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  board.append(circle);
}

const setSeconds = () => {
  console.log(time);
  if(time === 0) {
    finishGame()
  } else {
    let seconds = --time;
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    setTime(seconds);
  }
}
const startGame = () => {
  setInterval(setSeconds, 1000);
  createRandomCircle();
  setTime(time);
}

startBtn.addEventListener('click', () => {
  screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
  if(event.target.classList.contains('time-btn'))
  time = parseInt(event.target.getAttribute('data-time'));
  screens[1].classList.add('up');
  startGame()
})

board.addEventListener('click', e => {
  if(e.target.classList.contains('circle')) {
    count++;
    e.target.remove();
    createRandomCircle();
  }
})