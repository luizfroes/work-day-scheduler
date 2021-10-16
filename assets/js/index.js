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

let textareaClass = "";

const getFromLocalStorage = function (key, defaultValue) {
  const localStorageData = JSON.parse(localStorage.getItem(key));
  //console.log(localStorageData);

  if (!localStorageData) {
    return defaultValue;
  } else {
    return localStorageData;
  }
};

const checkIfPastPresentFuture = function (timeBlock) {
  const currentTime = moment().format("HH");

  const isPast = currentTime > timeBlock.key;
  const isFuture = currentTime < timeBlock.key;

  // check if is past, future or present
  if (isPast) {
    textareaClass = "textarea-container";
  } else if (isFuture) {
    textareaClass = "textarea-future";
  } else {
    textareaClass = "textarea-present";
  }
  return textareaClass;
};

const timeBlocks = function (timeBlock, textareaClass) {
  return `<div class="card-container" id="time-card-container">
<div class="hour-container">
  <h2 class="hour">${timeBlock.label}</h2>
</div>
<div class="${textareaClass}">
  <textarea class="textarea" id="textarea"></textarea>
</div>
<div id="btn-container" class="btn-container">
  <button id="save-btn" class="save-btn"><i class="far fa-save" data="${timeBlock.key}" onclick="onSave(${timeBlock.key})"></i></i></button>
  <button id="clear-btn" class="clear-btn"><i class="far fa-trash-alt" data="${timeBlock.key}" onclick="onDelete(${timeBlock.key})"></i></button>
</div>
</div>`;
};

const constructTimeBlock = function (timeBlock) {
  //get text from LS object
  getFromLocalStorage();

  // check if is past, future or present
  checkIfPastPresentFuture(timeBlock);

  //construct timeBlockDiv
  timeBlocks(timeBlock, textareaClass);
  console.log(timeBlock, textareaClass, $("#time-card-container"));
};

//iterate over the timeBlockLabels array
const renderTimeBlocks = function () {
  //iterate over the timeBlockLabels array
  const timeBlocks = timeBlockLabels.map((timeBlock) => {
    constructTimeBlock(timeBlock);
  });
  //console.log();

  //append to main
  $().append("#time-block-container");

  console.log($("#time-card-container"));
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

const onLoad = function () {
  renderCurrentDay();

  renderClock();

  renderTimeBlocks();
};

const onSave = function (event) {
  console.log(event);
};

const onDelete = function (event) {
  console.log(event);
};

//add a event listener click to save
//$("#time-block-container").on("click", onSave);

//add a event listener click to delete
//$("#time-block-container").on("click", onDelete);

window.addEventListener("load", onLoad);
