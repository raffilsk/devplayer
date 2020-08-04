import { secondsToMinutes } from "./utils.js";
export default {
  set() {
    this.cover = document.querySelector(".card-image");
    this.title = document.querySelector(".card-content h5");
    this.artist = document.querySelector(".artist");
    this.playPause = document.querySelector("#playpause");
    this.volIcon = document.querySelector("#volume");
    this.volControl = document.querySelector("#vol-control");
    this.seekBar = document.querySelector("#seekbar");
    this.currentDuration = document.querySelector("#current-duration");
    this.totalDuration = document.querySelector("#total-duration");
    this.dataBase = document.querySelector(".database");
    this.nextAudio = document.querySelector("#next_audio");
    this.previous = document.querySelector("#previous");
  },
  createAudioElement(audio) {
    this.audio = new Audio(audio);
  },
  actions() {
    this.audio.onended = () => this.next();
    this.playPause.onclick = () => this.togglePlayPause();
    this.volIcon.onclick = () => this.toggleMute();
    this.volControl.oninput = () => this.setVolume(this.volControl.value);
    this.volControl.onchange = () => this.setVolume(this.volControl.value);
    this.seekBar.oninput = () => this.setSeek(this.seekBar.value);
    this.seekBar.onchange = () => this.setSeek(this.seekBar.value);
    this.seekBar.max = this.audio.duration;
    this.totalDuration.innerText = secondsToMinutes(this.audio.duration);
    this.audio.ontimeupdate = () => this.timeUpdate();
    this.nextAudio.onclick = () => this.toggleNextAudio();
    this.previous.onclick = () => this.togglePrevAudio();   
  }
};
