const timeBlockLabels = [
  { label: "9 AM", key: 9 },
  { label: "10 AM", key: 10 },
  { label: "11 AM", key: 11 },
  { label: "12 PM", key: 12 },
  { label: "1 PM", key: 13 },
  { label: "2 PM", key: 14 },
  { label: "3 PM", key: 15 },
  { label: "4 PM", key: 16 },
  { label: "5 AM", key: 17 },
];

const currentDay = $("#current-day");

const constructTimeBlock = function () {
  //get text from object
  //check if present
  //check if future
};

const renderTimeBlocks = function () {
  //map over the timeBlockLabels[] (constructTimeBlock)
};

const renderCurrentDay = function () {
  //get current date
  const date = moment();
  //
  const getCurrentDay = function () {
    currentDay.text(moment().format("dddd MMMM Do YYYY"));
  };
  currentDay.text(getCurrentDay);
};

const onReady = function () {
  renderCurrentDay();

  renderTimeBlocks();
};

$(document).ready(onReady);
console.log(currentDay);
