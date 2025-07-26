const cache = {};

export default class Symbol {
  constructor(name = Symbol.random()) {
    this.name = name;

    if (cache[name]) {
      this.img = cache[name].cloneNode();
    } else {
      this.img = new Image();
      this.img.src = require(
        `../assets/symbols/sensa-emoji-vectors-collection/${name}.svg`,
      );

      cache[name] = this.img;
    }
  }

  static preload() {
    Symbol.symbols.forEach((symbol) => new Symbol(symbol));
  }

  static get symbols() {
    return [
      "airplane",
      "angry-face",
      "anguished-face",
      "anxious-face-with-sweat",
      "astonished-face",
      "beaming-face-with-smiling-eyes",
      "bicycle",
      "clapping-hands",
      "confounded-face",
      "crying-face",
      "drooling-face",
      "exploding-head",
      "face-blowing-a-kiss",
      "face-savoring-food",
      "face-screaming-in-fear",
      "face-with-hand-over-mouth",
      "face-with-head-bandage",
      "face-with-medical-mask",
      "face-with-monocle",
      "face-with-open-mouth",
      "face-with-raised-eyebrow",
      "face-with-rolling-eyes",
      "face-with-steam-from-nose",
      "face-with-symbols-on-mouth",
      "face-with-tears-of-joy",
      "face-with-thermometer",
      "face-with-tongue",
      "face-without-mouth",
      "fearful-face",
      "fire",
      "flushed-face",
      "frowning-face",
      "frowning-face-with-open-mouth",
      "grinning-face",
      "grinning-face-with-big-eyes",
      "grinning-face-with-sweat",
      "grinning-squinting-face",
      "grimacing-face",
      "hugging-face",
      "hushed-face",
      "kissing-face",
      "kissing-face-with-closed-eyes",
      "kissing-face-with-smiling-eyes",
      "loudly-crying-face",
      "money-mouth-face",
      "nerd-face",
      "neutral-face",
      "partying-face",
      "pensive-face",
      "pile-of-poo",
      "pleading-face",
      "relieved-face",
      "rocket",
      "rolling-on-the-floor-laughing",
      "sad-but-relieved-face",
      "shushing-face",
      "sleepy-face",
      "slightly-frowning-face",
      "slightly-smiling-face",
      "smiling-face",
      "smiling-face-with-halo",
      "smiling-face-with-heart-eyes",
      "smiling-face-with-hearts",
      "smiling-face-with-smiling-eyes",
      "smirking-face",
      "sneezing-face",
      "star-struck",
      "thinking-face",
      "thumbs-down",
      "thumbs-up",
      "tired-face",
      "unamused-face",
      "weary-face",
      "winking-face",
      "woozy-face",
      "worried-face",
      "zipper-mouth-face",
    ];
  }

  static random() {
    return this.symbols[Math.floor(Math.random() * this.symbols.length)];
  }
}
