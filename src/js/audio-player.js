(function() {

function AudioPlayer(audioContainer){

	this.audio = audioContainer.querySelector('audio'),
	this.playPause = audioContainer.querySelector('.play-pause'),
	this.progressBar = audioContainer.querySelector('.progress-bar'),
	this.loadedBar = audioContainer.querySelector('.loaded'),
	this.playbackBar = audioContainer.querySelector('.played'),
	this.currentTime = audioContainer.querySelector('.current-time'),
	this.totalTime = audioContainer.querySelector('.total-time'),
	this.fullVolume = audioContainer.querySelector('.full-volume'),
	this.currentVolume = audioContainer.querySelector('.current-volume'),
	this.volumeIcon = audioContainer.querySelector('.volume-icon');
	this.playlist = audioContainer.querySelector('#playlist-items')
	this.playlistItems = audioContainer.querySelectorAll('#playlist-items > li');
	this.nowPlaying = audioContainer.querySelector('.now-playing-title');
	this.playPauseImg = audioContainer.querySelector('.play-pause > img');

	this.setVolume();
	this.setDuration();
	this.playlistItems[0].classList.add('playlist-item-active');
	this.assignEventListeners();
	// console.log(this.playlistItems);
}

AudioPlayer.prototype.assignEventListeners = function(){

	this.playPause.onclick = this.play.bind(this);
	this.audio.onprogress = this.updateLoadingProgress.bind(this);
	this.audio.addEventListener('timeupdate', this.updatePlayingProgress.bind(this), false);
	this.audio.ondurationchange = this.setDuration.bind(this);
	this.audio.addEventListener('timeupdate', this.updateCurrentTime.bind(this), false);
	this.progressBar.onclick = this.setCurrentPlayback.bind(this);
	this.fullVolume.onclick = this.adjustVolume.bind(this);
	this.audio.onvolumechange = this.setVolume.bind(this);
	this.volumeIcon.onclick = this.mute.bind(this);
	this.audio.onended = this.resetPlayer.bind(this);
	this.playlist.addEventListener('click', this.changeTrack.bind(this), false);
	this.playlist.addEventListener('click', this.changeActiveItem.bind(this), false);

}

AudioPlayer.prototype.play = function(e){
	if(this.audio.paused){
		this.audio.play();
		console.log(e.target.attributes.src);
		e.target.setAttribute('src', "img/pause.svg");
	} else {
		this.audio.pause();
		e.target.setAttribute('src', "img/play.svg");
	}
}

AudioPlayer.prototype.updateLoadingProgress = function(){

	if(this.audio.buffered.length > 0){
		var percentLoaded = (this.audio.buffered.end(0) / this.audio.duration) * 100;

		this.loadedBar.style.width = percentLoaded + "%";
	}

}

AudioPlayer.prototype.updatePlayingProgress = function(){

	var percentPlayed = (this.audio.currentTime / this.audio.duration) * 100;
	this.playbackBar.style.width = percentPlayed + "%";

}

AudioPlayer.prototype.formatTime = function(seconds){

	var seconds = Math.round(seconds),
		minutes = Math.floor(seconds / 60),
		remainingSeconds = seconds - minutes * 60;

	if(remainingSeconds == 0)
		remainingSeconds = "00";
	else if(remainingSeconds < 10)
		remainingSeconds = "0" + remainingSeconds;

	return minutes + ":" + remainingSeconds;

}

AudioPlayer.prototype.setDuration = function(){
	this.totalTime.innerHTML = this.formatTime(this.audio.duration);
}

AudioPlayer.prototype.updateCurrentTime = function(){
	this.currentTime.innerHTML = this.formatTime(this.audio.currentTime);
}

AudioPlayer.prototype.setCurrentPlayback = function(e){

	var leftPos = this.progressBar.getBoundingClientRect().left,
		clickPos = e.pageX,
		pixelsFromLeft = clickPos - leftPos,
		percent = (pixelsFromLeft / this.progressBar.offsetWidth);

	var newTime = this.audio.duration * percent;

	this.audio.currentTime = newTime;

}

AudioPlayer.prototype.adjustVolume = function(e){

	var leftPos = this.fullVolume.getBoundingClientRect().left,
		clickPos = e.pageX,
		pixelsFromLeft = clickPos - leftPos,
		percent = (pixelsFromLeft / this.fullVolume.offsetWidth);

	this.audio.volume = percent;

	this.setVolume();

}

AudioPlayer.prototype.setVolume = function(){

	var percent = this.audio.volume * 100;
	this.currentVolume.style.width = percent + "%";

}

AudioPlayer.prototype.resetPlayer = function(){
	this.playPauseImg.setAttribute('src', 'img/pause.svg');
	this.audio.currentTime = 0;
	this.updatePlayingProgress();
}

AudioPlayer.prototype.mute = function(e){

	if(this.audio.muted){
		e.target.style.backgroundImage = "url('img/speaker.svg')";
		this.audio.muted = false;
	} else{
		e.target.style.backgroundImage = "url('img/mute.svg')";
		this.audio.muted = true;
	}

}

AudioPlayer.prototype.changeTrack = function(e){

	if(e.target.nodeName != 'SPAN')
		return;
	else{
		this.resetPlayer();
		var track = e.target.dataset.track;
		var title = e.target.textContent;
		this.nowPlaying.textContent = title;

		this.audio.src = "audio/" + track + ".mp3";
		this.audio.play();
	}

}

AudioPlayer.prototype.changeActiveItem = function(e){

	if(e.target.nodeName != 'SPAN')
		return;
	else{
		Array.prototype.forEach.call(this.playlistItems, function(ind){
			ind.classList.remove('playlist-item-active');
		})
		e.target.parentElement.classList.add('playlist-item-active');
	}

}

var ap = new AudioPlayer(document.querySelector('#audio-player'));

})();

var tracks = {
	korale: {
		id: 1,
		title: "Czerwone korale",
		duration: "3:29"
	}
}