const startButton = document.querySelector("button[data-start]");
const stopButton = document.querySelector("button[data-stop]");
const body = document.querySelector("body");

let timerId = null;
stopButton.disabled = true;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

startButton.addEventListener("click", startColorizer);
stopButton.addEventListener("click", stopColorizer);

function startColorizer(){
    timerId = setInterval(() => {
        console.log("generate color");
        body.style.background = getRandomHexColor();
    }, 1000);
    startButton.disabled = true;
    stopButton.disabled = false;
}

function stopColorizer(){
    clearInterval(timerId);
    startButton.disabled = false;
    stopButton.disabled = true;
}