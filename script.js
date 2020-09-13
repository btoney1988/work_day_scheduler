$(document).ready(function () {
  const test = true;
  // Setting date from user browser
  var date = moment().format('MMMM Do');
  var currentDay = $("#currentDay");
  currentDay.text(date)
  var dayHour24 = moment().format('H');
  var dayHour12 = moment().format('h');
  var saveIcon = "./images/save-regular.svg";

  var storedPlans = JSON.parse(localStorage.getItem("storedPlans"));

  if (storedPlans !== null) {
    planTextArr = storedPlans;
  } else {
    // this should only occur on first time the app is loaded in the browser
    planTextArr = new Array(9);
    planTextArr[4] = "No Plans";
  }
  if (test) { console.log("full array of plned text", planTextArr); }




  for (var hour = 9; hour <= 17; hour++) {
    var planContainer = $('#plannerContainer');
    // clear existing elements
    planContainer.empty();
    // index for array use offset from hour
    var index = hour - 9;
    var rowDiv = $("<div class='row plannerRow'>");
    rowDiv.attr('hour-index', hour);

    var timeDivCol2 = $("<div class='col-2'>");

    var timeBoxDiv = $("<span class='timeBox'>");

    // format hours for display
    var displayHour = 0;
    var ampm = "";
    if (hour > 12) {
      displayHour = hour - 12;
      ampm = "pm";
    } else {
      displayHour = hour;
      ampm = "am";
    }

    timeBoxDiv.text(displayHour + ampm);

    rowDiv.append(timeDivCol2);
    timeDivCol2.append(timeBoxDiv);

    var planDiv = $("<input>");
    planDiv.attr('id', `input-${index}`);
    planDiv.attr('hour-index', index);
    planDiv.attr('type', 'text');
    planDiv.attr('class', 'dailyPlan');

    planDiv.val(planTextArr[index]);

    var inputDivCol9 = $("<div class='col-9'>");

    rowDiv.append(inputDivCol9);
    inputDivCol9.append(planDiv);

    var saveDivCol1 = $("<div class='col-1'>");

    var saveBtn = $("<i>");
    saveBtn.attr('id', `saveid-${index}`);
    saveBtn.attr('save-id', index);
    saveBtn.attr('class', "far fa-save saveIcon");

    rowDiv.append(saveDivCol1);
    saveDivCol1.append(saveBtn);
    console.log(rowDiv[0]);

    updateRowColor(rowDiv, hour)

    planContainer.append(rowDiv[0]);
    console.log(planContainer)
  }

})