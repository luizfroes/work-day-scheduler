const timeBlockLabels = [
  { label: "9 AM", key: 9 },
  { label: "10 AM", key: 10 },
  { label: "11 AM", key: 11 },
  { label: "12 PM", key: 12 },
  { label: "1 PM", key: 13 },
  { label: "2 PM", key: 14 },
  { label: "3 PM", key: 15 },
  { label: "4 PM", key: 16 },
  { label: "5 PM", key: 17 },
];

const currentDay = $("#current-day");
const clockContainer = $("#clock");
const timeBlockContainer = $("#time-block-container");

const getFromLocalStorage = function (key, defaultValue) {
  const localStorageData = JSON.parse(localStorage.getItem(key));
  //console.log(localStorageData);

  if (!localStorageData) {
    return defaultValue;
  } else {
    return localStorageData;
  }
};

const constructTimeBlock = function (each) {
  const currentTime = 12;
  const isPresent = function () {
    each.key === currentTime;
  };

  const isFuture = function () {
    each.key > currentTime;
  };

  const timeBlock = `<div class="card-container" id="card-container">
  <div class="hour-container">
    <h2 class="hour">${each.label}</h2>
  </div>
  <div class="textarea-container">
    <textarea class="textarea" id="textarea"></textarea>
  </div>
  <div class="btn-container">
    <button class="save-btn"><i class="far fa-save"></i></i></button>
    <button class="clear-btn"><i class="far fa-trash-alt"></i></button>
  </div>
</div>`;

  //append to main
  $(timeBlock).appendTo(timeBlockContainer);

  //get text from LS object
  //getFromLocalStorage();

  //check if present
  if (isPresent) {
    $("#textarea-container").toggleClass("textarea-present");
  }

  //check if future
  if (isFuture) {
    $("#textarea-container").toggleClass("textarea-future");
  }
  return console.log(timeBlock);
};

const renderTimeBlocks = function () {
  //map over the timeBlockLabels[] (constructTimeBlock)
  timeBlockLabels.map(constructTimeBlock);
};

const renderCurrentDay = function () {
  //get current date
  const date = moment();
  //format the date
  const getCurrentDay = function () {
    currentDay.text(moment().format("dddd MMMM Do YYYY"));
  };
  currentDay.text(getCurrentDay);
};

const renderClock = function () {
  const setClock = function () {
    //get current time
    const hourTime = moment();
    const hourTimeFormatted = hourTime.format("kk:mm:ss");

    clockContainer.text(hourTimeFormatted);
  };
  const timer = setInterval(setClock, 1000);
};

const onReady = function () {
  renderCurrentDay();

  renderClock();

  renderTimeBlocks();
};

$(document).ready(onReady);
