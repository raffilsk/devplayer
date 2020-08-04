import audios from "./data.js";
import elements from "./playerElements.js";
import { path, secondsToMinutes } from "./utils.js";
export default {
  
  audioData: audios,
  currentAudio: {},
  currentPlaying: 0,
  isPlaying: false,
  start() {
    elements.set.call(this);
    
    this.update();
  },
  play() {
    this.isPlaying = true;
    this.audio.play();
    this.playPause.innerText = "pause"
  },
  pause(){
    this.isPlaying = false;
    this.audio.pause();
    this.playPause.innerText = "play_arrow"
  },
  next_audio(){
    this.currentPlaying++ 

    if (this.currentPlaying == this.audioData.length)this.restart();    
    this.update();
    this.play();
  },
  prev_audio(){
    this.currentPlaying > 0 
    ?this.currentPlaying--
    :this.currentPlaying = this.audioData.length;

    if (this.currentPlaying == this.audioData.length)this.restart();    
    this.update();
    this.play();
  },
  toggleNextAudio(){
    this.pause();
    this.next_audio();
  },
  togglePrevAudio(){
    this.pause();
    this.prev_audio();
  },
  togglePlayPause(){
    if(this.isPlaying){
      this.pause();
    }else{
      this.play();
    }
  },
  toggleMute(){
    this.audio.muted = !this.audio.muted;
    this.volIcon.innerText = this.audio.muted ? "volume_off": "volume_up";
  },
  setVolume(value){
    this.audio.volume = value / 100;
  },
  setSeek(value){
    this.audio.currentTime = value;
  },
  next() {
    this.currentPlaying++;

    if (this.currentPlaying == this.audioData.length)this.restart();    
    this.update();
    this.audio.play();
  },
  timeUpdate(){
    this.currentDuration.innerText = secondsToMinutes(this.audio.currentTime)
    this.seekBar.value = this.audio.currentTime;
  },
  update() {
    this.currentAudio = this.audioData[this.currentPlaying];

    this.cover.style.background = `url('${path(this.currentAudio.cover)}')  no-repeat center center / cover`;
    this.title.innerText = this.currentAudio.title;
    this.artist.innerText = this.currentAudio.artist;
    elements.createAudioElement.call(this, path(this.currentAudio.file));
    
    this.audio.onloadeddata = () => {
      elements.actions.call(this);
    }
  },
  restart(){
    this.currentPlaying = 0;
    this.update();
  }
  }