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
    planText = storedPlans;
  } else {
    // This will only occur on first time the app is loaded in the browser to show all timeblocks
    planText = new Array(9);
    planText[4] = "No plans for today!";
  }

  // For each hour between 9-5 a row will be made with time, input, and save divs 
  for (var hour = 9; hour <= 17; hour++) {
    var container = $('.container');
    // Index for array use offset from hour
    var index = hour - 9;
    var row = $("<div class='row plannerRow'>");
    row.attr('hour-index', hour);

    // Time div start
    var timeBlockCol = $("<div class='col-2 hour'>");
    var timeBlock = $("<div class='time-block'>");

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

    timeBlock.text(displayHour + ampm);
    // Append Time div
    row.append(timeBlockCol);
    timeBlockCol.append(timeBlock);
    // Time div end

    // Plan text area start
    var textArea = $("<textarea class='dailyPlan' type='text'>");
    textArea.attr('id', `input-${index}`);
    textArea.attr('hour-index', index);

    textArea.val(planText[index]);
    var inputArea = $("<div class='col-8'>");

    // Append input div
    row.append(inputArea);
    inputArea.append(textArea);
    // Plan text area div end

    // Save div start
    var saveBtnCol = $("<div class='col-2 saveBtn'>");
    var saveBtn = $("<i class='far fa-save saveIcon'>");
    saveBtn.attr('id', `saveid-${index}`);
    saveBtn.attr('save-id', index);
    //  Append save div and button
    row.append(saveBtnCol);
    saveBtnCol.append(saveBtn);
    // Save div end

    // Updating row color
    updateRowColor(row, hour);

    // Append to container
    container.append(row);
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

    planText[index] = value;

    localStorage.setItem("storedPlans", JSON.stringify(planText));
  });
});