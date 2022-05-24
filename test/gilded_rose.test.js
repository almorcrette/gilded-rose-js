const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", () => {
  describe("Shop", () => {
    describe(".updateQuality", () => {
      describe("Standard item", () => {
        it("reduces sellIn by 1", () => {
          const gildedRose = new Shop([new Item("standardItem", 10, 20)]);
          const items = gildedRose.updateQuality();
          expect(items[0].sellIn).toEqual(9);
        });
        it("does not reduce quality if quality already at 0", () => {
          const gildedRose = new Shop([new Item("standardItem", 10, 0)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toEqual(0);
        });
        it("reduces quality by 1 when sellIn at least 0 (if quality not at 0)", () => {
          const gildedRose = new Shop([new Item("standardItem", 10, 20)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toEqual(19);
        });
        it("reduces quality by 2 when sellIn is negative (if quality not at 0)", () => {
          const gildedRose = new Shop([new Item("standardItem", -1, 20)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toEqual(18);
        });
      })
    })
  })
});
