$(document).ready(function () {
  var date = new Date();
  var time = date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
  var container = $(".container");
  var row = $("<div class='row'>");
  var column = $("<div class='col-12'>");

  $("#currentDay").text(date);

  console.log(date);
  console.log(time);
  container.append(row.text(date));
  row.append(column.text(time));

})