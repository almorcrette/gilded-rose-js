/* eslint-disable no-undef */

const AgedBrie  = require("../src/AgedBrie");

describe("Aged Brie", () => {
  describe(".updateQuality", () => {
    it("reduces sellIn by 1", () => {
      const brie = new AgedBrie(10, 20);
      brie.updateQuality();
      expect(brie.sellIn).toEqual(9);
    });
    it("does not increase in quality if quality already at 50", () => {
      const brie = new AgedBrie(10, 50);
      brie.updateQuality();
      expect(brie.quality).toEqual(50);
    });
    it("increases in quality by 1 when sellIn at least 1 (if quality not at 50)", () => {
      const brie = new AgedBrie(1, 20);
      brie.updateQuality();
      expect(brie.quality).toEqual(21);
    });
    it("increases in quality by 2 when sellIn is 0 or less (if quality not at 50)", () => {
      const brie = new AgedBrie(0, 20);
      brie.updateQuality();
      expect(brie.quality).toEqual(22);
    });
    it("increases quality by 1 when sellIn is 0 or less and quality is at 49", () => {
      const brie = new AgedBrie(0, 49);
      brie.updateQuality();
      expect(brie.quality).toEqual(50);
    });
  })
})