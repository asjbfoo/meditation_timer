function countdown(minutes){
    var timeRemainingMinutes = minutes;
    var timeRemainingSeconds = 0;
    document.querySelector("#timeRemainingMinutes").innerHTML = timeRemainingMinutes;
    document.querySelector("#timeRemainingSeconds").innerHTML = pad(timeRemainingSeconds,2,0);
    let intervalId = setInterval(advanceTimer, 1000);
    
    function advanceTimer(){

    	if(timeRemainingSeconds === 0){
        	--timeRemainingMinutes;
            timeRemainingSeconds = 59;
        } else{
        	--timeRemainingSeconds;
        }
        document.querySelector("#timeRemainingMinutes").innerHTML = timeRemainingMinutes;
        document.querySelector("#timeRemainingSeconds").innerHTML = pad(timeRemainingSeconds,2,0);
        if(timeRemainingMinutes==0 && timeRemainingSeconds==0)
            clearInterval(intervalId);
    }
    function pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
      }

}

document.getElementById("startButton").onclick = function(){
    
var howMuchTime = parseInt(document.getElementById("timerMinutes").value);
    countdown(howMuchTime);
};

//window.onload = clickSetup;