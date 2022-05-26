const Item = require("./Item");

class BackstagePass extends Item {
  constructor(sellIn, quality) {
    super(sellIn, quality);
    this.sellIn = sellIn;
    this.quality = quality;
    this.name = "Backstage passes to a TAFKAL80ETC concert"
  }

  updateQuality() {
    if (!this._isInDate()) {
      this.quality = 0;
    } else {
      this._boostQuality()
      if (this.sellIn <= 10) {
        this._boostQuality()
      }
      if (this.sellIn <= 5) {
        this._boostQuality()
      }
    }
    this.sellIn -= 1;
  }

}

module.exports = BackstagePass;