class AgedBrie {
  constructor(sellIn, quality){
    this.name = "Aged Brie";
    this.sellIn = sellIn;
    this.quality = quality;
  }

  updateQuality() {
    if (this.sellIn > 0 && this.quality <= 49) {
      this.quality += 1;
    } else if (this.sellIn <= 0 && this.quality <= 48) {
      this.quality += 2;
    } else if (this.quality === 49) {
      this.quality += 1;
    };
    this.sellIn -= 1;
  }
}

module.exports = AgedBrie;