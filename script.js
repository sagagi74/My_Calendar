// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
//$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
//});

var currentDate = dayjs().format('dddd, MMMM D, YYYY');
$("#currentDay").text(currentDate);

//when page is loaded show data from local storage
rendering()

function rendering() {
  // Retrieve existing data from local storage

  var ScheduleData = JSON.parse(localStorage.getItem("ScheduleMaker")) || [];
  
  // loop and input value to each timeBlockContent
  var selectedData = null;
    for (var i = 0; i < ScheduleData.length; i++) {
  
            selectedData = ScheduleData[i];
            var classId = ScheduleData[i].timeContentID;
            var contents = ScheduleData[i].timeBlockContent;
            $("#" + classId + " textarea").val(contents);
          // console.log ("#"+classId+ " textarea")
          // console.log (classId)
            //console.log (contents)
      //  }
    }


}

$(function () {
  // Add a listener for click events on the save button
  $(".saveBtn").on("click", function() {

    var timeContentID = $(this).parent().attr("id");
    var timeBlockContent = $(this).siblings("textarea").val();
    
    // Retrieve existing data from local storage
    var ScheduleMakerData = JSON.parse(localStorage.getItem("ScheduleMaker")) || [];
    
    // Check if an item with the same timeContentID already exists
    var existingIndex = -1;
for (var i = 0; i < ScheduleMakerData.length; i++) {
    if (ScheduleMakerData[i].timeContentID === timeContentID) {
        existingIndex = i;
        break;
    }
}
    
    // If an item with the same timeContentID exists, update it
    if (existingIndex !== -1) {
      ScheduleMakerData[existingIndex].timeBlockContent = timeBlockContent;
    } else {
        // Otherwise, create a new record
        ScheduleMakerData.push({ timeContentID: timeContentID, timeBlockContent: timeBlockContent });
    }

    // Save updated data back to local storage
    localStorage.setItem("ScheduleMaker", JSON.stringify(ScheduleMakerData));

   // localStorage.removeItem("ScheduleMakerData");

   rendering();


  });

  

});