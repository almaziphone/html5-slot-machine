import SlotSymbol from "./Symbol";

export default class Reel {
  private reelContainer: HTMLElement;
  private symbolContainer: HTMLDivElement;
  idx: number;
  private animation: Animation;

  constructor(
    reelContainer: HTMLElement,
    idx: number,
    initialSymbols: string[],
  ) {
    this.reelContainer = reelContainer;
    this.idx = idx;

    this.symbolContainer = document.createElement("div");
    this.symbolContainer.classList.add("icons");
    this.reelContainer.appendChild(this.symbolContainer);

    this.animation = this.symbolContainer.animate(
      [
        { top: 0, filter: "blur(0)" },
        { filter: "blur(10px)", offset: 0.5 },
        {
          top: `calc((${Math.floor(this.factor) * 10} / 3) * -100% - (${
            Math.floor(this.factor) * 10
          } * 3px))`,
          filter: "blur(0)",
        },
      ],
      {
        duration: this.factor * 500,
        easing: "ease-in-out",
      },
    );
    this.animation.cancel();

    initialSymbols.forEach((symbol) =>
      this.symbolContainer.appendChild(new SlotSymbol(symbol).img),
    );
  }

  get factor(): number {
    return 1 + Math.pow(this.idx / 2, 2);
  }

  renderSymbols(nextSymbols: string[]): void {
    const fragment = document.createDocumentFragment();

    for (let i = 3; i < 3 + Math.floor(this.factor) * 10; i++) {
      const icon = new SlotSymbol(
        i >= 10 * Math.floor(this.factor) - 2
          ? nextSymbols[i - Math.floor(this.factor) * 10]
          : undefined,
      );
      fragment.appendChild(icon.img);
    }

    this.symbolContainer.appendChild(fragment);
  }

  spin(): Promise<void> {
    const animationPromise = new Promise<void>(
      (resolve) => (this.animation.onfinish = () => resolve()),
    );
    const timeoutPromise = new Promise<void>((resolve) =>
      setTimeout(resolve, this.factor * 500),
    );

    this.animation.cancel();
    this.animation.play();

    return Promise.race([animationPromise, timeoutPromise]).then(() => {
      if (this.animation.playState !== "finished") this.animation.finish();

      const max = this.symbolContainer.children.length - 3;
      for (let i = 0; i < max; i++) {
        this.symbolContainer.firstChild?.remove();
      }
    });
  }
}
