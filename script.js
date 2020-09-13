$(document).ready(function () {
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
    planTextArr[4] = "No plans for today!";
  }

  var planContainer = $('.container');
  // clear existing elements
  planContainer.empty();

  for (var hour = 9; hour <= 17; hour++) {

    // index for array use offset from hour
    var index = hour - 9;
    var rowDiv = $("<div class='row plannerRow'>");
    rowDiv.attr('hour-index', hour);

    var timeDivCol2 = $("<div class='col-2 hour'>");

    var timeBoxDiv = $("<div class='time-block'>");

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

    var planDiv = $("<textarea class='dailyPlan' type='text'>");
    planDiv.attr('id', `input-${index}`);
    planDiv.attr('hour-index', index);

    planDiv.val(planTextArr[index]);

    var inputDivCol8 = $("<div class='col-8'>");

    rowDiv.append(inputDivCol8);
    inputDivCol8.append(planDiv);

    var saveDivCol1 = $("<div class='col-2 saveBtn'>");

    var saveBtn = $("<i class='far fa-save saveIcon'>");
    saveBtn.attr('id', `saveid-${index}`);
    saveBtn.attr('save-id', index);

    rowDiv.append(saveDivCol1);
    saveDivCol1.append(saveBtn);

    updateRowColor(rowDiv, hour)

    planContainer.append(rowDiv);
  }

  // function to update row color
  function updateRowColor(hourRow, hour) {

    if (hour < dayHour24) {
      hourRow.addClass("past")
    } else if (hour > dayHour24) {
      hourRow.addClass("future")
    } else {
      hourRow.addClass("present")
    }
  };

  $(document).on('click', 'i', function (event) {
    event.preventDefault();

    let $index = $(this).attr('save-id');

    let inputId = '#input-' + $index;
    let $value = $(inputId).val();

    planTextArr[$index] = $value;


    // remove shawdow pulse class
    $(`#saveid-${$index}`).removeClass('shadowPulse');
    localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
  });
  
  // function to color save button on change of input
  $(document).on('change', 'input', function (event) {
    event.preventDefault();

    // neeed to check for save button

    let i = $(this).attr('hour-index');

    // add shawdow pulse class
    $(`#saveid-${i}`).addClass('shadowPulse');
  });
})