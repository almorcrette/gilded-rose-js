/* eslint-disable no-undef */

const {ConjuredItem} = require("../src/gilded_rose");

describe("Conjured Item", () => {
  describe(".updateQuality", () => {
    it("reduces sellIn by 1", () => {
      const conjuring = new ConjuredItem(10, 20);
      conjuring.updateQuality();
      expect(conjuring.sellIn).toEqual(9);
    });
    it("does not reduce quality if quality already at 0", () => {
      const conjuring = new ConjuredItem(10, 0);
      conjuring.updateQuality();
      expect(conjuring.quality).toEqual(0);
    });
    it("reduces quality by 2 when sellIn at least 1 (if quality not at 0)", () => {
      const conjuring = new ConjuredItem(1, 20);
      conjuring.updateQuality();
      expect(conjuring.quality).toEqual(18);
    });
    it("reduces quality by 1 when sellIn at least 1 (if quality is at 1)", () => {
      const conjuring = new ConjuredItem(1, 11);
      conjuring.updateQuality();
      expect(conjuring.quality).toEqual(0);
    });
    it("reduces quality by 4 when sellIn is 0 or less (if quality is at least 4)", () => {
      const conjuring = new ConjuredItem(0, 20);
      conjuring.updateQuality();
      expect(conjuring.quality).toEqual(16);
    });
    it("reduces quality by 1 when sellIn is 0 or less and quality is at 1", () => {
      const conjuring = new ConjuredItem(0, 1);
      conjuring.updateQuality();
      expect(conjuring.quality).toEqual(0);
    });
    it("reduces quality by 2 when sellIn is 0 or less and quality is at 2", () => {
      const conjuring = new ConjuredItem(0, 2);
      conjuring.updateQuality();
      expect(conjuring.quality).toEqual(0);
    });
    it("reduces quality by 3 when sellIn is 0 or less and quality is at 3", () => {
      const conjuring = new ConjuredItem(0, 3);
      conjuring.updateQuality();
      expect(conjuring.quality).toEqual(0);
    });
  })
})