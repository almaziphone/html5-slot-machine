const cache = {};

export default class Symbol {
  constructor(name = Symbol.random()) {
    this.name = name;

    if (cache[name]) {
      this.img = cache[name].cloneNode();
    } else {
      this.img = new Image();
      this.img.src = require(`../assets/symbols/${name}.svg`);

      cache[name] = this.img;
    }
  }

  static preload() {
    Symbol.symbols.forEach((symbol) => new Symbol(symbol));
  }

  static get symbols() {
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

  static random() {
    return this.symbols[Math.floor(Math.random() * this.symbols.length)];
  }
}
