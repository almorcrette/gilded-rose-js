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
        this.updateAgedBrie(item);
      } else if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
        this.updateBackstagePass(item);
      } else if (item.name === "Conjured item") {
        this.updateConjuredItems(item);
      } else if (item.name != "Sulfuras, Hand of Ragnaros") {
        this.updateStandardItem(item);
      };
    });
    return this.items;
  };


  updateStandardItem (standardItem) {
    if (standardItem.sellIn > 0 && standardItem.quality >= 1) {
      standardItem.quality -= 1;
    } else if (standardItem.sellIn <= 0 && standardItem.quality >= 2) {
      standardItem.quality -= 2;
    } else if (standardItem.quality === 1) {
      standardItem.quality -= 1;
    };
    standardItem.sellIn -= 1;
  };

  updateAgedBrie (agedBrie) {
    if (agedBrie.quality >= 49) {
      agedBrie.quality = 50;
    } else {
      if (agedBrie.sellIn > 0) {
        agedBrie.quality += 1;
      } else {
        agedBrie.quality += 2;
      }
    }
    agedBrie.sellIn -= 1;
  };

  updateBackstagePass (backstagePass) {
    if (backstagePass.sellIn === 0) {
      backstagePass.quality = 0;
    } else if (backstagePass.sellIn > 10 && backstagePass.quality <= 49) {
      backstagePass.quality += 1;
    } else if (backstagePass.sellIn > 5 && backstagePass.quality <= 48) {
      backstagePass.quality += 2;
    } else if (backstagePass.sellIn > 5 && backstagePass.quality <= 49) {
      backstagePass.quality += 1;
    } else if (backstagePass.sellIn > 0 && backstagePass.quality <= 47) {
      backstagePass.quality += 3;
    } else if (backstagePass.sellIn > 0 && backstagePass.quality <= 48) {
      backstagePass.quality += 2;
    } else if (backstagePass.sellIn > 0 && backstagePass.quality <= 49) {
      backstagePass.quality += 1;
    };
    backstagePass.sellIn -= 1;
  }

  updateConjuredItems (conjuredItem) {
    if (conjuredItem.quality <= 2) {
      conjuredItem.quality = 0
    } else {
      if (conjuredItem.sellIn >= 1) {
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
}

module.exports = {
  Item,
  Shop
}
