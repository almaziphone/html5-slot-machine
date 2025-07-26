import Reel from "./Reel";
import Symbol from "./Symbol";

interface SlotConfig {
  inverted?: boolean;
  onSpinStart?: (symbols: string[][]) => void;
  onSpinEnd?: (symbols: string[][]) => void;
}

export default class Slot {
  container: HTMLElement;
  reels: Reel[];
  spinButton: HTMLButtonElement;
  autoPlayCheckbox: HTMLInputElement;
  currentSymbols: string[][];
  config: SlotConfig;

  constructor(domElement: HTMLElement, config: SlotConfig = {}) {
    Symbol.preload();

    this.currentSymbols = [
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
    ];

    this.container = domElement;

    this.reels = Array.from(this.container.getElementsByClassName("reel")).map(
      (reelContainer, idx) =>
        new Reel(reelContainer, idx, this.currentSymbols[idx]),
    );

    this.spinButton = document.getElementById("spin") as HTMLButtonElement;
    this.spinButton.addEventListener("click", () => this.spin());

    this.autoPlayCheckbox = document.getElementById(
      "autoplay",
    ) as HTMLInputElement;

    if (config.inverted) {
      this.container.classList.add("inverted");
    }

    this.config = config;
  }

  spin(): Promise<void> {
    const resultSymbols: string[][] = [
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
      [Symbol.random(), Symbol.random(), Symbol.random()],
    ];

    this.onSpinStart(resultSymbols);

    return Promise.all(
      this.reels.map((reel) => {
        return reel.spin(resultSymbols[reel.idx]);
      }),
    ).then(() => {
      this.currentSymbols = resultSymbols;
      this.onSpinEnd(resultSymbols);
    });
  }

  onSpinStart(symbols: string[][]): void {
    this.spinButton.disabled = true;

    this.config.onSpinStart?.(symbols);
  }

  onSpinEnd(symbols: string[][]): void {
    this.spinButton.disabled = false;

    this.config.onSpinEnd?.(symbols);

    if (this.autoPlayCheckbox.checked) {
      return window.setTimeout(() => this.spin(), 200);
    }
  }
}
