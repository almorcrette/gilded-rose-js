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

}

module.exports = Shop;
