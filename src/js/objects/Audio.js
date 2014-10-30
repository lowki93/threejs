var Audio = (function() {

	function Audio(){
		this.audio = document.createElement('audio');
		this.source = document.createElement('source');

		this.source.src = 'assets/audio/Flood.mp3';

		this.audio.appendChild(this.source);
	};

	Audio.prototype.play = function() {

		this.audio.play();
	}

	return Audio;

})();