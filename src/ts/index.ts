// @ts-ignore
import Slot from "../js/Slot.js";
// @ts-ignore
import { playSpinSound, playEndSound } from "../js/audio.js";

interface Config {
  inverted: boolean;
  onSpinStart?: (symbols: string[][]) => void;
  onSpinEnd?: (symbols: string[][]) => void;
}

const config: Config = {
  inverted: false,
  onSpinStart: (symbols) => {
    console.log("onSpinStart", symbols);
    playSpinSound();
  },
  onSpinEnd: (symbols) => {
    console.log("onSpinEnd", symbols);
    playEndSound();
  },
};

const slot = new Slot(document.getElementById("slot") as HTMLElement, config);

const reels = document.getElementById("reels");
if (reels) {
  reels.addEventListener("click", () => {
    const button = (slot as any).spinButton as HTMLButtonElement | undefined;
    if (button && button.disabled) return;
    slot.spin();
  });
}
