const Item = require("./Item")

class ConjuredItem extends Item {
  constructor(sellIn, quality) {
    super(sellIn, quality);
    this.sellIn = sellIn;
    this.quality = quality;
    this.name = "Conjured item"
  }

  updateQuality() {
    this._reduceQuality ();
    this._reduceQuality ();
    if (!this._isInDate()) {
      this._reduceQuality();
      this._reduceQuality ();
    }
    this.sellIn -= 1;
  }
}

module.exports = ConjuredItem;