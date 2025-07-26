import Slot from "./Slot.js";
import { playSpinSound, playEndSound } from "./audio.js";

const config = {
  inverted: false, // true: reels spin from top to bottom; false: reels spin from bottom to top
  onSpinStart: (symbols) => {
    console.log("onSpinStart", symbols);
    playSpinSound();
  },
  onSpinEnd: (symbols) => {
    console.log("onSpinEnd", symbols);
    playEndSound();
  },
};

const slot = new Slot(document.getElementById("slot"), config);
