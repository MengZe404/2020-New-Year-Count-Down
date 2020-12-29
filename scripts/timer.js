// Select the timer element
const timer =  document.getElementById("timer"); 

// Set the date we're counting down to
const newYear = new Date("January 1, 2021 00:00:00");

// Calculate the time for count down
function getCountDown() {
    // Get today's date and time
    let now = new Date().getTime();
    
    // Find the distance between now and the count down date
    let distance = newYear.getTime() - now;
    
    // Time calculations for days, hours, minutes and seconds
    var days =  Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = "0" + Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = "0" + Math.floor((distance % (1000 * 60)) / 1000);
    
    // Output the result in an element with id="countdown"
    timer.textContent = `To 2021: ${+hours + (+days * 24)} Hours ${minutes.slice(-2)} Minutes ${seconds.slice(-2)} Seconds`

    updateTimer()
}

// Update the timer to display the newly calculated count down
function updateTimer() {
    // Update the count down every 1 second
    let countdownInterval = setInterval(getCountDown, 1000);
    
    if (isNewYear()) {
        clearInterval(countdownInterval);
        timer.style.animationName = "newYear";
        timer.style.animationDuration = "4s"
        timer.style.color = "red";
        timer.textContent = "Happy New Year!";
        year.style.animationName = "year";
        year.style.animationDuration = "4s";
        year.style.color = "red";
        year.textContent = "2021";
    }
    
}

function isNewYear() {
    let now = new Date().getYear();

    // Check if the date is 2021
    if (+newYear.getYear() <= +now) {
        return true
    } else {
        return false;
    }
}

getCountDown();