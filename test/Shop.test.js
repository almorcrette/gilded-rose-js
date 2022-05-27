/* eslint-disable no-undef */
const Item = require("../src/Item");
jest.mock('../src/Item');
const Shop = require("../src/Shop");

describe("Gilded Rose", () => {
  describe("Shop", () => {

    describe("initializes with an items array", () => {
      const shop = new Shop();
      expect(shop.items).toEqual([]);
    });
    
    describe(".updateInventoryQuality", () => {

      beforeEach(() => {
        Item.mockClear();
      })

      it("updates the quality of each item in the shop", () => {

        const shop = new Shop(
          [
            new Item(),
            new Item(),
          ]
        );

        shop.updateInventoryQuality()

        const mockItemInstance = Item.mock.instances[0];
        const mockUpdateQuality = mockItemInstance.updateQuality;
        expect(mockUpdateQuality).toHaveBeenCalledTimes(1);

        const mockAnotherItemInstance = Item.mock.instances[1];
        mockAnotherUpdateQuality = mockAnotherItemInstance.updateQuality;
        expect(mockAnotherUpdateQuality).toHaveBeenCalledTimes(1);
      });

    });
  });
})
