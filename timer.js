function segment(newSegmentMinutes = 0, newSegmentSeconds = 0, newSegmentSound = "370507__craigmaloney__bell.wav") {
    let newSegment = {
        minutes: newSegmentMinutes,
        seconds: newSegmentSeconds,
        sound: newSegmentSound
    };
    return newSegment;
}

function addSegmentToPage(segmentToAdd) {
    let segmentNodes = document.querySelectorAll("[id^=meditationSegment]");
    let segmentArray = Array.from(segmentNodes);

    let segmentDiv = document.createElement("div");
    segmentDiv.setAttribute("id", "meditationSegment"+(segmentArray.length+1));
    let segmentMinutesSpan = document.createElement("span");
    segmentMinutesSpan.setAttribute("class", "segmentMinutes");
    segmentMinutesSpan.appendChild(document.createTextNode("Minutes: "));
    let minutesInput = document.createElement("input");
    minutesInput.setAttribute("id","segmentMinutes"+(segmentArray.length+1));
    segmentMinutesSpan.appendChild(minutesInput);
    segmentDiv.appendChild(segmentMinutesSpan);

    let segmentSecondsSpan = document.createElement("span");
    segmentSecondsSpan.appendChild(document.createTextNode("Seconds: "));
    segmentSecondsSpan.setAttribute("class", "segmentSeconds");
    let secondsInput = document.createElement("input");
    secondsInput.setAttribute("id","segmentSeconds"+(segmentArray.length+1));
    segmentSecondsSpan.appendChild(secondsInput);
    segmentDiv.appendChild(segmentSecondsSpan);

    let segmentListNode = document.getElementById("segmentsList");
    let lastSegment = segmentArray[segmentArray.length-1];
    segmentListNode.insertBefore(segmentDiv, lastSegment.nextSibling);
}
function removeLastSegment(){
    let segmentNodes = document.querySelectorAll("[id^=meditationSegment]");
    let segmentArray = Array.from(segmentNodes);

    var lastSegment = document.getElementById("meditationSegment"+(segmentArray.length));
    lastSegment.parentNode.removeChild(lastSegment);
}

function countdown(minutes, seconds, audio, segmentNumber) {
    var bellAudio = new Audio(audio);

    var timeRemainingMinutes = minutes;
    var timeRemainingSeconds = seconds;
    document.querySelector("#timeRemainingMinutes").innerHTML = timeRemainingMinutes;
    document.querySelector("#timeRemainingSeconds").innerHTML = pad(timeRemainingSeconds, 2, 0);
    let intervalId = setInterval(advanceTimer, 1000);

    function advanceTimer() {

        if (timeRemainingSeconds === 0) {
            --timeRemainingMinutes;
            timeRemainingSeconds = 59;
        } else {
            --timeRemainingSeconds;
        }
        document.querySelector("#timeRemainingMinutes").innerHTML = timeRemainingMinutes;
        document.querySelector("#timeRemainingSeconds").innerHTML = pad(timeRemainingSeconds, 2, 0);
        if (timeRemainingMinutes === 0 && timeRemainingSeconds === 0) {
            clearInterval(intervalId);
            bellAudio.play();
            if(document.querySelectorAll("[id^=meditationSegment]").length === segmentNumber){
                setTimeout(function(){
                    bellAudio.currentTime = 0;
                }, 250);
            }
            if(document.querySelectorAll("[id^=meditationSegment]").length > segmentNumber)
                startSegment(++segmentNumber);
        }
    }

    function pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

}

function startSegment(segmentNumber){
    let segmentMinutes = document.getElementById("segmentMinutes"+segmentNumber).value ? parseInt(document.getElementById("segmentMinutes"+segmentNumber).value) : 0;
    let segmentSeconds = document.getElementById("segmentSeconds"+segmentNumber).value ? parseInt(document.getElementById("segmentSeconds"+segmentNumber).value) : 0;
    let segmentAudio = "370507__craigmaloney__bell.wav";
    countdown(segmentMinutes, segmentSeconds, segmentAudio, segmentNumber);
}


document.getElementById("startButton").onclick = function () {
    startSegment(1);
    //let howMuchTime = parseInt(document.getElementById("timerMinutes").value);
    //countdown(howMuchTime);
};
document.getElementById("addSegment").onclick = function(){
    addSegmentToPage(new segment());
};
document.getElementById("removeSegment").onclick = function(){
    removeLastSegment();
};

//window.onload = clickSetup;