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
const saveBtn = $("#save-btn");

const getFromLocalStorage = function (key, defaultValue) {
  const localStorageData = JSON.parse(localStorage.getItem(key));
  //console.log(localStorageData);

  if (!localStorageData) {
    return defaultValue;
  } else {
    return localStorageData;
  }
};

const onSave = function (event) {
  console.log(event);
};
//console.log($(saveBtn).attr("data"));

const onDelete = function (event) {
  console.log(event);
};

const constructTimeBlock = function (each) {
  //get text from LS object
  //getFromLocalStorage();

  const currentTime = moment().format("HH");

  const isPast = currentTime > each.key;
  const isFuture = currentTime < each.key;

  let textareaClass;

  // check if is past, future or present
  if (isPast) {
    textareaClass = "textarea-container";
  } else if (isFuture) {
    textareaClass = "textarea-future";
  } else {
    textareaClass = "textarea-present";
  }

  const timeBlock = `<div class="card-container" id="card-container">
  <div class="hour-container">
    <h2 class="hour">${each.label}</h2>
  </div>
  <div class="${textareaClass}">
    <textarea class="textarea" id="textarea"></textarea>
  </div>
  <div id="btn-container" class="btn-container">
    <button id="save-btn" class="save-btn"><i class="far fa-save" data="${each.key}" onclick="onSave({each.key})"></i></i></button>
    <button id="clear-btn" class="clear-btn"><i class="far fa-trash-alt" data="${each.key}" onclick="onDelete({each.key})"></i></button>
  </div>
</div>`;

  //add a event listener click to save
  //$("#time-block-container").on("click", onSave);

  //add a event listener click to delete
  //$("#time-block-container").on("click", onDelete);

  //append to main
  $(timeBlock).appendTo("#time-block-container");

  //get text from LS object
  //getFromLocalStorage();

  return timeBlock;
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
