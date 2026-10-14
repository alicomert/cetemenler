// function initializeCountdown(elementId, endDate) {
//   const second = 1000,
//         minute = second * 60,
//         hour = minute * 60,
//         day = hour * 24;

//   const countDown = new Date(endDate).getTime();
  
//   const interval = setInterval(function() {
//       const now = new Date().getTime(),
//             distance = countDown - now;

//       const daysElement = document.querySelector(`#${elementId} .days`);
//       const hoursElement = document.querySelector(`#${elementId} .hours`);
//       const minutesElement = document.querySelector(`#${elementId} .minutes`);
//       const secondsElement = document.querySelector(`#${elementId} .seconds`);

//       if (daysElement && hoursElement && minutesElement && secondsElement) {
//         daysElement.innerText = Math.floor(distance / day);
//         hoursElement.innerText = Math.floor((distance % day) / hour);
//         minutesElement.innerText = Math.floor((distance % hour) / minute);
//         secondsElement.innerText = Math.floor((distance % minute) / second);
//       }

//       //do something later when date is reached
//       if (distance < 0) {
//           const countdownElement = document.querySelector(`#${elementId}`);
//           if (countdownElement) {
//               countdownElement.style.display = "none";
//           }
//           clearInterval(interval);
//       }
//   }, 1000);
// }

// // Initialize countdowns
// initializeCountdown('countdown1', '2027-12-30');



function initializeCountdown(elementId, endDate) {
  const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

  const countDown = new Date(endDate).getTime();

  const interval = setInterval(function () {
    const now = new Date().getTime(),
          distance = countDown - now;

    const container = document.getElementById(elementId);

    if (!container) return;

    const daysElement = container.querySelector(".days");
    const hoursElement = container.querySelector(".hours");
    const minutesElement = container.querySelector(".minutes");
    const secondsElement = container.querySelector(".seconds");

    // Calculate values
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    // ✅ Only update if element exists
    if (daysElement) daysElement.innerText = days;

    if (hoursElement) {
      // 👉 If days not present, show total hours
      hoursElement.innerText = daysElement ? hours : Math.floor(distance / hour);
    }

    if (minutesElement) minutesElement.innerText = minutes;
    if (secondsElement) secondsElement.innerText = seconds;

    // انتهاء (finish)
    if (distance < 0) {
      clearInterval(interval);
      container.style.display = "none";
    }
  }, 1000);
}

// Example
initializeCountdown('countdown1', '2026-12-30');