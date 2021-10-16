const timeBlockLabels = [
  { label: "9 AM", key: 9, textInput: "" },
  { label: "10 AM", key: 10, textInput: "" },
  { label: "11 AM", key: 11, textInput: "" },
  { label: "12 PM", key: 12, textInput: "" },
  { label: "1 PM", key: 13, textInput: "" },
  { label: "2 PM", key: 14, textInput: "" },
  { label: "3 PM", key: 15, textInput: "" },
  { label: "4 PM", key: 16, textInput: "" },
  { label: "5 PM", key: 17, textInput: "" },
];

const currentDay = $("#current-day");
const clockContainer = $("#clock");
const saveBtn = $("#save-btn");

let textAreaContent = $("#textarea");

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
  const target = $(event.target);

  if (target.is('button[name="save-btn"]', 'i[name="save-btn"]')) {
    const timeData = { key: event, textInput: $("#textarea").val() };
    console.log(timeData);
  }
};

const onClear = function (event) {
  const target = $(event.target);

  if (target.is('button[name="clear-btn"]', 'i[name="save-btn"]')) {
    $("#textarea").val("");
  }
};

const constructTimeBlock = function (each) {
  //get text from LS object
  const textInput = getFromLocalStorage("textInput", []);

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
    <button name="save-btn" id="save-btn" class="save-btn" data="${each.key}"><i name="save-icon" class="far fa-save" data="${each.key}"></i></i></button>
    <button name="clear-btn" id="clear-btn" class="clear-btn" data="${each.key}"><i name="clear-icon" class="far fa-trash-alt" data="${each.key}"></i></button>
  </div>
</div>`;

  //append to main
  $(timeBlock).appendTo("#time-block-container");
};

const renderTimeBlocks = function () {
  //map over the timeBlockLabels[] (constructTimeBlock)
  timeBlockLabels.map(constructTimeBlock);
};

// add a event listener click to save
$("#time-block-container").on("click", onSave);

$("#time-block-container").on("click", onClear);

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

$(window).on("load", onLoad);
