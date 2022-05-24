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
        it("reduces quality by 1 when sellIn at least 1 (if quality not at 0)", () => {
          const gildedRose = new Shop([new Item("standardItem", 1, 20)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toEqual(19);
        });
        it("reduces quality by 2 when sellIn is 0 or less (if quality is at least 2)", () => {
          const gildedRose = new Shop([new Item("standardItem", 0, 20)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toEqual(18);
        });
        it("reduces quality by 1 when sellIn is 0 or less and quality is at 1", () => {
          const gildedRose = new Shop([new Item("standardItem", 0, 1)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toEqual(0);
        });
      });

      describe("Aged Brie", () => {
        it("reduces sellIn by 1", () => {
          const gildedRose = new Shop([new Item("Aged Brie", 10, 20)]);
          const items = gildedRose.updateQuality();
          expect(items[0].sellIn).toEqual(9);
        });
        it("does not increase in quality if quality already at 50", () => {
          const gildedRose = new Shop([new Item("Aged Brie", 10, 50)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toEqual(50);
        });
        it("increases in quality by 1 when sellIn at least 1 (if quality not at 50)", () => {
          const gildedRose = new Shop([new Item("Aged Brie", 1, 20)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toEqual(21);
        });
        it("increases in quality by 2 when sellIn is 0 or less (if quality not at 50)", () => {
          const gildedRose = new Shop([new Item("Aged Brie", 0, 20)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toEqual(22);
        });
        it("increases quality by 1 when sellIn is 0 or less and quality is at 49", () => {
          const gildedRose = new Shop([new Item("Aged Brie", 0, 49)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toEqual(50);
        });
      });

      describe("Backstage passes", () => {
        it("reduces sellIn by 1", () => {
          const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20)]);
          const items = gildedRose.updateQuality();
          expect(items[0].sellIn).toEqual(9);
        });
        it("does not increase in quality if quality already at 50", () => {
          const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 50)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toEqual(50);
        });
        it("increases in quality by 1 when sellIn at least 11 (if quality not at 50)", () => {
          const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 11, 20)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toEqual(21);
        });
        it("increases in quality by 2 when sellIn is between 6 and 10 (if quality not at 50)", () => {
          const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toEqual(22);
        });
        it("increases in quality by 3 when sellIn is between 0 and 5 (if quality not at 50)", () => {
          const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toEqual(23);
        });
        it("quality falls to 0 when sellIn is negative)", () => {
          const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", -1, 20)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toEqual(0);
        });
      });

      describe("Sulfuras", () => {
        it("does not change sellIn", () => {
          const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 20)]);
          const items = gildedRose.updateQuality();
          expect(items[0].sellIn).toEqual(10);
        });
        it("does not change quality)", () => {
          const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 11, 20)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toEqual(20);
        });
      });

    });
  });
})
