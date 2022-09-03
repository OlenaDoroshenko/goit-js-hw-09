import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', submitForm);

let timerId = null;

function submitForm(e) {
  e.preventDefault();
  let delay = Number(form.elements.delay.value);

  for (
    let position = 1;
    position <= form.elements.amount.value;
    position += 1
  ) {
    let promise = createPromise(position, delay);

    promise
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

      delay += Number(form.elements.step.value);
  }
}

function createPromise(position, delay) {

  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolved, rejected) => {

    timerId = setTimeout(() => {
      if (shouldResolve) {
        resolved({ position, delay });
      } else {
      rejected({ position, delay });
      }      
    }, delay); 
  });
}
