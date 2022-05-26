class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  _isInDate () {
    return this.sellIn >= 1
  }

  _boostQuality () {
    if (this.quality <= 49) {
      this.quality += 1;
    }
  }

  _reduceQuality () {
    if (this.quality >= 1) {
      this.quality -= 1;
    }
  }

  updateItemQuality () {
    this._reduceQuality ();
    if (!this._isInDate()) {
      this._reduceQuality();
    }
    this.sellIn -= 1;
  }
}

module.exports = Item;