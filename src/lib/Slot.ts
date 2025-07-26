import Reel from "./Reel";
import SlotSymbol from "./Symbol";

export interface SlotConfig {
  inverted?: boolean;
  onSpinStart?: (symbols: string[][]) => void;
  onSpinEnd?: (symbols: string[][]) => void;
}

export default class Slot {
  private currentSymbols: string[][];
  private nextSymbols: string[][];
  private container: HTMLElement;
  private reels: Reel[];
  private spinButton: HTMLButtonElement;
  private autoPlayCheckbox: HTMLInputElement;
  private config: SlotConfig;

  constructor(domElement: HTMLElement, config: SlotConfig = {}) {
    SlotSymbol.preload();

    this.currentSymbols = Array.from({ length: 5 }, () => [
      SlotSymbol.random(),
      "star",
      SlotSymbol.random(),
    ]);

    this.nextSymbols = Array.from({ length: 5 }, () => [
      SlotSymbol.random(),
      "star",
      SlotSymbol.random(),
    ]);

    this.container = domElement;

    this.reels = Array.from(this.container.getElementsByClassName("reel")).map(
      (reelContainer, idx) =>
        new Reel(reelContainer as HTMLElement, idx, this.currentSymbols[idx]),
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
    this.currentSymbols = this.nextSymbols;
    this.nextSymbols = Array.from({ length: 5 }, () => [
      SlotSymbol.random(),
      SlotSymbol.random(),
      SlotSymbol.random(),
    ]);

    this.onSpinStart(this.nextSymbols);

    return Promise.all(
      this.reels.map((reel) => {
        reel.renderSymbols(this.nextSymbols[reel.idx]);
        return reel.spin();
      }),
    ).then(() => this.onSpinEnd(this.nextSymbols));
  }

  private onSpinStart(symbols: string[][]): void {
    this.spinButton.disabled = true;
    this.config.onSpinStart?.(symbols);
  }

  private onSpinEnd(symbols: string[][]): void {
    this.spinButton.disabled = false;
    this.config.onSpinEnd?.(symbols);

    if (this.autoPlayCheckbox.checked) {
      window.setTimeout(() => this.spin(), 200);
    }
  }
}
