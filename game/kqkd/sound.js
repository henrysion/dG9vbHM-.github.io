// Fix up prefixing
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();


var wasStarted = false;
window.addEventListener("touchstart", function(){
	if (!wasStarted){
		wasStarted = true;
		var osc = context.createOscillator();
		var silent = context.createGain();
		silent.gain.value = 0;
		osc.connect(silent);
		silent.connect(context.destination);
		var now = context.currentTime;
		osc.start(now);
		osc.stop(now+1);
	}
});

var chariotPlayer = null;
var chariotBuffer = null;
var chariotGain = context.createGain();

function loadSong(url) {
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'arraybuffer';

	// Decode asynchronously
	request.onload = function() {
		context.decodeAudioData(request.response, function(buffer) {
			chariotBuffer = buffer;
			chariotPlayer = context.createBufferSource();
			chariotPlayer.buffer = chariotBuffer;
			chariotPlayer.loop = true;
			chariotPlayer.connect(chariotGain);
			chariotGain.connect(context.destination);
			chariotPlayer.start(0);
			chariotPlayer.playbackRate.value = 0.001;
		});
	};
	request.send();
}

loadSong("assets/鸡你太美.mp3");

setInterval(function(){
	if (chariotPlayer !== null){
		if (joggingRate > 0){
			var speed = joggingRate / 10 + 0.5;
			if (speed > 0.9 && speed < 1.1){
				chariotPlayer.playbackRate.value = 1;
			} else {
				chariotPlayer.playbackRate.value = speed;
			}
			chariotGain.gain.value = 1;
		} else {
			chariotPlayer.playbackRate.value = 0.001;
			chariotGain.gain.value = 0;
		}
	}
}, 100);