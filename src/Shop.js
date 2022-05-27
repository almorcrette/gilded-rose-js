class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateInventoryQuality() {
    this.items.forEach( item => {
      item.updateQuality();
    })
    return this.items;
  }
    
  _isInDate (item) {
    return item.sellIn >= 1
  }

  _boostQuality (item) {
    if (item.quality <= 49) {
      item.quality += 1;
    }
  }

  _reduceQuality (item) {
    if (item.quality >= 1) {
      item.quality -= 1;
    }
  }

}

module.exports = Shop;
