import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

const startButton = document.querySelector('button[data-start]');
startButton.disabled = true;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - Date.now() < 0) {
      Notify.warning('Please choose a date in the future', {
        width: '500px',
        position: 'center-center',
        fontSize: '24px',
      });
      return;
    }
    startButton.disabled = false;
  },
};

const input = flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  // console.log({ days, hours, minutes, seconds });
  return { days, hours, minutes, seconds };
}

startButton.addEventListener('click', () => {
  timerId = setInterval(timer, 1000);
});

function timer() {
  const delta = input.selectedDates[0] - Date.now();
  const dataObj = convertMs(delta);

  days.textContent =
    dataObj.days > 0 ? addLeadingZero(dataObj.days) : addLeadingZero(0);
  hours.textContent =
    dataObj.hours > 0 ? addLeadingZero(dataObj.hours) : addLeadingZero(0);
  minutes.textContent =
    dataObj.minutes > 0 ? addLeadingZero(dataObj.minutes) : addLeadingZero(0);
  seconds.textContent =
    dataObj.seconds > 0 ? addLeadingZero(dataObj.seconds) : removeTimer();
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function removeTimer() {
  clearInterval(timerId);
  return addLeadingZero(0);
}
