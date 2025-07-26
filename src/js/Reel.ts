import Symbol from "./Symbol";

export default class Reel {
  reelContainer: HTMLElement;
  idx: number;
  symbolContainer: HTMLDivElement;
  animation: Animation;

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
        // We cannot animate translateY & filter at the same time in safari for some reasons,
        // so we go with animating top & filter instead.
        { top: 0, filter: "blur(0)" },
        { filter: "blur(50px)", offset: 0.5 },
        {
          top: `calc((${Math.floor(this.factor) * 10} / 3) * -100% - (${
            Math.floor(this.factor) * 10
          } * 3px))`,

          filter: "blur(0)",
        },
      ],
      {
        duration: this.factor * 1000,
        easing: "ease-in-out",
      },
    );
    this.animation.cancel();

    initialSymbols.forEach((symbol) =>
      this.symbolContainer.appendChild(new Symbol(symbol).img),
    );
  }

  get factor(): number {
    return 1 + Math.pow(this.idx / 2, 2);
  }

  private renderSpin(nextSymbols: string[]): void {
    const fragment = document.createDocumentFragment();
    const count = Math.floor(this.factor) * 10;

    for (let i = 0; i < count - 3; i++) {
      fragment.appendChild(new Symbol().img);
    }

    nextSymbols.forEach((s) => fragment.appendChild(new Symbol(s).img));

    this.symbolContainer.appendChild(fragment);
  }

  spin(nextSymbols: string[]): Promise<void> {
    const animationPromise = new Promise<void>(
      (resolve) => (this.animation.onfinish = resolve),
    );
    const timeoutPromise = new Promise<void>((resolve) =>
      setTimeout(resolve, this.factor * 1000),
    );

    this.renderSpin(nextSymbols);

    this.animation.cancel();
    this.animation.play();

    return Promise.race([animationPromise, timeoutPromise]).then(() => {
      if (this.animation.playState !== "finished") this.animation.finish();

      this.symbolContainer.innerHTML = "";
      nextSymbols.forEach((s) =>
        this.symbolContainer.appendChild(new Symbol(s).img),
      );
    });
  }
}
