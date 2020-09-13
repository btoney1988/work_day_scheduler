$(document).ready(function () {
  // Setting date from user browser
  var date = moment().format('MMMM Do');
  var currentDay = $("#currentDay");
  // Add Current date to header
  currentDay.text(date);
  // Variable to see what time it is
  var dayHour24 = moment().format('H');
  var storedPlans = JSON.parse(localStorage.getItem("storedPlans"));

  // If there are no stored plans on the 4th hour it will show 'No Plans For Today'
  if (storedPlans !== null) {
    planTextArr = storedPlans;
  } else {
    // This will only occur on first time the app is loaded in the browser to show all timeblocks
    planTextArr = new Array(9);
    planTextArr[4] = "No plans for today!";
  }

  // For each hour between 9-5 a row will be made with time, input, and save divs 
  for (var hour = 9; hour <= 17; hour++) {
    var planContainer = $('.container');
    // Index for array use offset from hour
    var index = hour - 9;
    var rowDiv = $("<div class='row plannerRow'>");
    rowDiv.attr('hour-index', hour);

    // Time div start
    var timeDivCol2 = $("<div class='col-2 hour'>");
    var timeBoxDiv = $("<div class='time-block'>");

    // Format hours for displaying am and pm
    var displayHour = "";
    var ampm = "";
    if (hour >= 12) {
      displayHour = hour - 12;
      ampm = "pm";
      // Show 12pm instead of 12am
      if (displayHour === 0) {
        displayHour = 12;
      }
    } else {
      displayHour = hour;
      ampm = "am";
    }

    timeBoxDiv.text(displayHour + ampm);
    // Append Time div
    rowDiv.append(timeDivCol2);
    timeDivCol2.append(timeBoxDiv);
    // Time div end

    // Plan div start
    var planDiv = $("<textarea class='dailyPlan' type='text'>");
    planDiv.attr('id', `input-${index}`);
    planDiv.attr('hour-index', index);

    planDiv.val(planTextArr[index]);
    var inputDivCol8 = $("<div class='col-8'>");

    // Append input div
    rowDiv.append(inputDivCol8);
    inputDivCol8.append(planDiv);
    // Plan div end

    // Save div start
    var saveDivCol2 = $("<div class='col-2 saveBtn'>");
    var saveBtn = $("<i class='far fa-save saveIcon'>");
    saveBtn.attr('id', `saveid-${index}`);
    saveBtn.attr('save-id', index);
    //  Append save div and button
    rowDiv.append(saveDivCol2);
    saveDivCol2.append(saveBtn);
    // Save div end

    // Updating row color
    updateRowColor(rowDiv, hour);

    // Append to container
    planContainer.append(rowDiv);
  };

  // Function to update row color based off if the time of day has past or not
  function updateRowColor(hourRow, hour) {
    // Class style pulled from 'style.css'
    if (hour < dayHour24) {
      hourRow.addClass("past");
    } else if (hour > dayHour24) {
      hourRow.addClass("future");
    } else {
      hourRow.addClass("present");
    }
  };

  // Function to save plans to local storage
  $(document).on('click', 'i', function (event) {
    event.preventDefault();

    var index = $(this).attr('save-id');

    var inputId = '#input-' + index;
    var value = $(inputId).val();

    planTextArr[index] = value;

    localStorage.setItem("storedPlans", JSON.stringify(planTextArr));
  });
});