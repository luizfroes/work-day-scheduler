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

let textAreaContent = $("#textarea").val();

const getFromLocalStorage = function (key, defaultValue) {
  const localStorageData = JSON.parse(localStorage.getItem(key));

  if (!localStorageData) {
    return defaultValue;
  } else {
    return localStorageData;
  }
};

const onSave = function (event) {
  const target = $(event.target);

  if (target.is('button[name="save-btn"]', 'i[name="save-btn"]')) {
    const timeData = {
      key: target.attr("data-key"),
      textInput: $("#textarea").val(),
    };
    console.log(timeData);

    //add to LS
    const textInputArray = getFromLocalStorage("textInput", []);

    console.log(textInputArray);
    textInputArray.push(timeData);
    console.log(textInputArray);

    localStorage.setItem("textInput", JSON.stringify(textInputArray));
  }
};

const addTextInput = function (timeData) {
  if (timeData.key === $("#textarea").data()) {
    $("#textarea").text(timeData.textInput);
    console.log(timeData.key, $("#textarea").data());
    return textAreaContent;
  }
};

const constructTimeBlock = function (each, textInputArray, timeData) {
  //get text from LS object
  getFromLocalStorage("textInput", []);

  addTextInput(timeData);

  console.log(textInputArray);

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
    <textarea class="textarea" id="textarea" data-key="${each.key}"></textarea>
  </div>
  <div id="btn-container" class="btn-container">
    <button name="save-btn" id="save-btn" class="save-btn" data-key="${each.key}"><i name="save-icon" class="far fa-save" data="${each.key}"></i></i></button>
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
