
//current Time Clock Add code to display the current date in the header of the page.
function updateDateTime() {
  var currentDate = dayjs().format('dddd, MMMM D, YYYY, h:mm:ss A');
  $("#currentDay").text(currentDate);
  var currentHour = dayjs().hour();
  console.log (currentHour)
  //Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour
  $(document).ready(function() {
    var timeBlocks = $(".time-block");
    
    for (var i = 0; i < timeBlocks.length; i++) {
        var id = timeBlocks.eq(i).attr("id");
        var hour = id.split("-")[1];
        var timeElement =   $("#" + id );
        console.log (timeElement)
       
        if (currentHour > hour) {
          //console.log("ID:", id, "Hour:", hour,"Passed");

          timeElement.removeClass("time-block").addClass("time-block past");


      //  console.log (currentHour + "  " + hour) 
        } else if (currentHour == hour) {
     //     console.log("ID:", id, "Hour:", hour,"Current");
        timeElement.removeClass("time-block").addClass("time-block present");     
        } else if (currentHour < hour)  {
       //   console.log("ID:", id, "Hour:", hour,"Future");
       timeElement.removeClass("time-block").addClass("time-block future");
        }
      
    }
});
  var currentDate = dayjs().format('dddd, MMMM D, YYYY, h:mm:ss A');
  $("#currentDay").text(currentDate);
}
// Initial call to update date and time
updateDateTime();
// Update date and time every second
setInterval(updateDateTime, 100000);
//when page is loaded show saved data from local storage
rendering()
// Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements
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
  // Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage.
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