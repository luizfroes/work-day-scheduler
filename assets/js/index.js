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

const getDataFromLS = function () {
  return JSON.parse(localStorage.getItem("textInput")) || {};
};

const onSave = function (event) {
  const target = $(event.target);

  if (
    target.is('button[name="save-btn"]') ||
    target.is('i[name="save-icon"]')
  ) {
    const data = getDataFromLS();
    const key = target.attr("id");

    data[key] = $(`textarea[id="${key}"]`).val();

    localStorage.setItem("textInput", JSON.stringify(data));
  }
};

const getTextAreaValue = function (key) {
  // get all data from LS
  const data = getDataFromLS();

  return data[key];
};

const getClassName = function (key) {
  const currentTime = moment().hour();

  const isPast = currentTime > key;
  const isFuture = currentTime < key;

  // check if it is past, future or present
  if (isPast) {
    return "textarea-container";
  } else if (isFuture) {
    return "textarea-future";
  } else {
    return "textarea-present";
  }
};

const constructTimeBlocks = function (each) {
  //render timeBlock
  const timeBlock = `<div class="card-container" id="card-container">
    <div class="hour-container">
      <h2 class="hour">${each.label}</h2>
    </div>
    <div class="${getClassName(each.key)}">
      <textarea class="textarea" id=${each.key} data="${each.key}">${
    getTextAreaValue(each.key) || ""
  }</textarea>
    </div>
    <div id="btn-container" class="btn-container">
      <button name="save-btn" id=${
        each.key
      } class="save-btn"><i name="save-icon" id=${
    each.key
  } class="far fa-save"></i></i></button>
    </div>
  </div>`;

  return timeBlock;
};

const renderTimeBlocks = function () {
  //map over the timeBlockLabels to construct each TimeBlock
  const timeBlocks = timeBlockLabels.map(constructTimeBlocks).join("");

  //append to main
  $("#time-block-container").append(timeBlocks);
};

const renderCurrentDay = function () {
  currentDay.text(moment().format("dddd MMMM Do YYYY"));
};

const setClock = function () {
  clockContainer.text(moment().format("kk:mm:ss"));
};

const renderClock = function () {
  setInterval(setClock, 1000);
};

const onLoad = function () {
  renderCurrentDay();

  setClock();

  renderClock();

  renderTimeBlocks();
};

const onClear = function () {
  localStorage.clear();

  $("#time-block-container").empty();

  renderTimeBlocks();
};

// add a event listener click to save button
$("#time-block-container").on("click", onSave);

// add a event listener click to clear all button
$("#clear-all-btn").on("click", onClear);

$(document).ready(onLoad);
