const cache: Record<string, HTMLImageElement> = {};

export default class SlotSymbol {
  name: string;
  img: HTMLImageElement;

  constructor(name: string = SlotSymbol.random()) {
    this.name = name;

    if (cache[name]) {
      this.img = cache[name].cloneNode() as HTMLImageElement;
    } else {
      this.img = new Image();
      this.img.src = new URL(
        `../assets/symbols/${name}.svg`,
        import.meta.url,
      ).href;
      cache[name] = this.img;
    }
  }

  static preload(): void {
    SlotSymbol.symbols.forEach((symbol) => new SlotSymbol(symbol));
  }

  static get symbols(): string[] {
    return [
      "clown-face",
      "cowboy-hat-face",
      "face-screaming-in-fear",
      "face-with-open-mouth",
      "grinning-face-1",
      "hugging-face",
      "panda",
      "pile-of-poo",
      "rolling-on-the-floor-laughing",
      "santa-claus",
      "smiling-face-with-heart-eyes",
      "smiling-face-with-hearts",
      "star",
      "star-struck",
    ];
  }

  static random(): string {
    return this.symbols[Math.floor(Math.random() * this.symbols.length)];
  }
}
