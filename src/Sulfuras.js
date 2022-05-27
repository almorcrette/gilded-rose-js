const Item = require("./Item");

class Sulfuras extends Item {
  constructor(sellIn, quality) {
    super(sellIn, quality);
    this.sellIn = sellIn;
    this.quality = quality
    this.name = "Sulfuras, Hand of Ragnaros"
  }

  updateQuality() {}
}

module.exports = Sulfuras;