var Audio = (function() {

	function Audio(){
		this.audio = document.createElement('audio');
		this.source = document.createElement('source');

		this.source.src = 'http://www.mariomayhem.com/downloads/sounds/mario_bros/smb_die.wav';

		this.audio.appendChild(this.source);
	};

	Audio.prototype.play = function() {

		this.audio.play();
	}

	return Audio;

})();