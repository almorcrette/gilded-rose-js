/* eslint-disable no-undef */

const Sulfuras = require("../src/Sulfuras");


describe("Sulfuras", () => {
  describe(".updateQuality", () => {
    it("does not change sellIn", () => {
      const sulfuras = new Sulfuras(10, 20);
      sulfuras.updateQuality();
      expect(sulfuras.sellIn).toEqual(10);
    });
    it("does not change quality)", () => {
      const sulfuras = new Sulfuras(10, 20);
      sulfuras.updateQuality();
      expect(sulfuras.quality).toEqual(20);
    });
  })
})

