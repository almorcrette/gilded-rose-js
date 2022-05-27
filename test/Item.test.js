/* eslint-disable no-undef */

const Item  = require("../src/Item");

describe("Item", () => {
  describe(".updateQuality", () => {
    it("reduces sellIn by 1", () => {
      const standardItem = new Item("Standard item", 10, 20);
      standardItem.updateQuality();
      expect(standardItem.sellIn).toEqual(9);
    });
    it("does not reduce quality if quality already at 0", () => {
      const standardItem = new Item("Standard item", 10, 0);
      standardItem.updateQuality();
      expect(standardItem.quality).toEqual(0);
    });
    it("reduces quality by 1 when sellIn at least 1 (if quality not at 0)", () => {
      const standardItem = new Item("Standard item", 1, 20);
      standardItem.updateQuality();
      expect(standardItem.quality).toEqual(19);
    });
    it("reduces quality by 2 when sellIn is 0 or less (if quality is at least 2)", () => {
      const standardItem = new Item("Standard item", 0, 20);
      standardItem.updateQuality();
      expect(standardItem.quality).toEqual(18);
    });
    it("reduces quality by 1 when sellIn is 0 or less and quality is at 1", () => {
      const standardItem = new Item("Standard item", 0, 1);
      standardItem.updateQuality();
      expect(standardItem.quality).toEqual(0);
    });
  })
})