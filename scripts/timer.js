function getTime() {
    var current = new Date();

    var currentH = current.getHours();

    var currentM = current.getMinutes();

    var currentS = current.getSeconds();

    var currentTime = [currentH, currentM, currentS];

    return currentTime;
}

function calculateCountDown(currentTime) {
    var countdownH = "0" + Math.abs(23 - currentTime[0]);

    var countdownM = "0" + Math.abs(59 - currentTime[1]);

    var countdownS = "0" + Math.abs(60 - currentTime[2]);

    var countdownTime = countdownH.slice(-2) + "-" + countdownM.slice(-2) + "-" + countdownS.slice(-2);

    return countdownTime;
}

var timer = document.getElementById("timer");

function updateTimer() {
    time =  calculateCountDown(getTime())

    timer.textContent = time;

    if (!isNewYear()) {
        setInterval(updateTimer, 1000);
    }
}

function isNewYear() {
    newYear = new Date(2021, 0, 1, 0, 0, 0, 0)

    now = new Date()

    if (+newYear === +now) {
        return ture;
    } else {
        return false;
    }
}

updateTimer();