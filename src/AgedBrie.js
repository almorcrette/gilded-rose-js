const Item = require("./Item");

class AgedBrie extends Item {
  constructor(sellIn, quality) {
    super(sellIn, quality);
    this.sellIn = sellIn;
    this.quality = quality
    this.name = "Aged Brie"
  }

  updateQuality() {
    this._boostQuality();
    if (!this._isInDate()) {
      this._boostQuality();
    }
    this.sellIn -= 1;
  }
}

module.exports = AgedBrie;