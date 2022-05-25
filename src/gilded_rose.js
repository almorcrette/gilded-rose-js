class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    this.items.forEach( item => {
      if (item.name === "Aged Brie") {
        this._updateAgedBrie(item);
      } else if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
        this._updateBackstagePass(item);
      } else if (item.name === "Conjured item") {
        this._updateConjuredItems(item);
      } else if (item.name != "Sulfuras, Hand of Ragnaros") {
        this._updateStandardItem(item);
      };
    });
    return this.items;
  };

  _isInDate (item) {
    return item.sellIn >= 1
  }

  _boostQuality (item) {
    if (item.quality <= 49) {
      item.quality += 1;
    };
  };

  _reduceQuality (item) {
    if (item.quality >= 1) {
      item.quality -= 1;
    }
  }

  _updateAgedBrie (agedBrie) {
    this._boostQuality(agedBrie);
    if (!this._isInDate(agedBrie)) {
      this._boostQuality(agedBrie);
    }
    agedBrie.sellIn -= 1;
  };

  _updateBackstagePass (backstagePass) {
    if (!this._isInDate(backstagePass)) {
      backstagePass.quality = 0;
    } else {
      this._boostQuality(backstagePass)
      if (backstagePass.sellIn <= 10) {
        this._boostQuality(backstagePass)
      };
      if (backstagePass.sellIn <= 5) {
        this._boostQuality(backstagePass)
      };
    }
    backstagePass.sellIn -= 1;
  };

  _updateConjuredItems (conjuredItem) {
    if (conjuredItem.quality <= 2) {
      conjuredItem.quality = 0;
    } else {
      if (this._isInDate(conjuredItem)) {
        conjuredItem.quality -= 2;
    } else {
      if (conjuredItem.quality >= 4) {
        conjuredItem.quality -= 4;
      } else {
        conjuredItem.quality = 0;
        };
      };
    };
    conjuredItem.sellIn -= 1;
  };

  _updateStandardItem (standardItem) {
    this._reduceQuality (standardItem)
    if (!this._isInDate(standardItem)) {
      this._reduceQuality (standardItem)
    }
    standardItem.sellIn -= 1;
  };

}

module.exports = {
  Item,
  Shop
}
