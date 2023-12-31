// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  $(".saveBtn").on("click", function () {
    var hourBlockId = $(this).closest(".time-block").attr("id");
    var userDescription = $(this).siblings(".description").val();
    localStorage.setItem(hourBlockId, userDescription);
  });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  function updateTimeBlocks() {
    // Get the current hour in 24-hour format using Day.js
    let currentHour = dayjs().hour();

    // Loops through each time-block div
    let timeBlocks = document.querySelectorAll(".time-block");
    timeBlocks.forEach((timeBlock) => {
      // Extracts the hour from the time-block ID
      let hour = parseInt(timeBlock.id.split('-')[1]);

      // Compares hour with current hour
      if (hour < currentHour) {
        timeBlock.classList.add(".past");
        timeBlock.classList.remove(".present", ".future");
      } else if (hour === currentHour) {
        timeBlock.classList.add("present");
        timeBlock.classList.remove(".past" , ".future");
      } else {
        timeBlock.classList.add("future");
        timeBlock.classList.remove(".past" , ".present");
      }
    });
  }
  
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  function displaySavedDescriptions() {
    $(".time-block").each(function () {
      var hourBlockId = $(this).attr("id");
      var savedDescription = localStorage.getItem(hourBlockId);
      if (savedDescription) {
        $(this).find(".description").val(savedDescription);
      }
    });
  }

  //displays date in header of page
  function displayCurrentDate() {
    var currentDate = dayjs().format("dddd, MMMM D, YYYY");
    $("#currentDay").text(currentDate);
  
  }

  // TODO: Add code to display the current date in the header of the page.
  function displayCurrentDate() {
    var currentDate = dayjs().format("dddd, MMMM D, YYYY");
    $("#currentDay").text(currentDate);
    console.log("Current date displayed.");
  }

    //calling the functions
    displayCurrentDate();
    updateTimeBlocks();
    displaySavedDescriptions();
  });
