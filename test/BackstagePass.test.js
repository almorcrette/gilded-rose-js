/* eslint-disable no-undef */

const BackstagePass  = require("../src/BackstagePass");

describe("Backstage Pass", () => {
  describe(".updateQuality", () => {
    it("reduces sellIn by 1", () => {
      const pass = new BackstagePass(10, 20);
      pass.updateQuality();
      expect(pass.sellIn).toEqual(9);
    });
    it("does not increase in quality if quality already at 50", () => {
      const pass = new BackstagePass(10, 50);
      pass.updateQuality();
      expect(pass.quality).toEqual(50);
    });
    it("increases in quality by 1 when sellIn at least 11 (if quality not at 50)", () => {
      const pass = new BackstagePass(11, 20);
      pass.updateQuality();
      expect(pass.quality).toEqual(21);
    });
    it("increases in quality by 2 when sellIn is between 6 and 10 (if quality not at 50)", () => {
      const pass = new BackstagePass(10, 20);
      pass.updateQuality();
      expect(pass.quality).toEqual(22);
    });
    it("increases in quality by 3 when sellIn is between 0 and 5 (if quality not at 50)", () => {
      const pass = new BackstagePass(5, 20);
      pass.updateQuality();
      expect(pass.quality).toEqual(23);
    });
    it("quality falls to 0 when sellIn is zero", () => {
      const pass = new BackstagePass(0, 20);
      pass.updateQuality();
      expect(pass.quality).toEqual(0);
    });
  })
})