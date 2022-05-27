# Gilded Rose

This is my solution to the Gilded Rose kata in JavaScript with Jest. Used to practise doing a tech test during week 10 of Makers Academy, focusing on code quality.

In this challenge specifically, I practice the following skills:
- Behaviour driven development;
- Analysing behaviour of existing production code;
- Writing a test suite testing program behaviour
- Using the test suite as a safety net to refactor / rewrite poorly written code
- Single responsibility principle
- Testing edge cases
- DRY code (Do not repeat yourself)

This kata was originally created by Terry Hughes (http://twitter.com/TerryHughes) and is on GitHub [here](https://github.com/NotMyself/GildedRose). See also [Bobby Johnson's description of the kata](http://iamnotmyself.com/2011/02/14/refactor-this-the-gilded-rose-kata/). The original kata as for C# and seed codebase for JS and Jest comes from [Emily Bache's library of seeds in different languages](https://github.com/emilybache/GildedRose-Refactoring-Kata).

## Client requirements

### Instruction from the kata

"Hi and welcome to team Gilded Rose. As you know, we are a small inn with a prime location in a prominent city run by a friendly innkeeper named Allison. We also buy and sell only the finest goods. Unfortunately, our goods are constantly degrading in quality as they approach their sell by date. We have a system in place that updates our inventory for us. It was developed by a no-nonsense type named Leeroy, who has moved on to new adventures. Your task is to add the new feature to our system so that we can begin selling a new category of items. First an introduction to our system:

All items have a SellIn value which denotes the number of days we have to sell the item. All items have a Quality value which denotes how valuable the item is. At the end of each day our system lowers both values for every item. Pretty simple, right? Well this is where it gets interesting:

    Once the sell by date has passed, Quality degrades twice as fast
    The Quality of an item is never negative
    “Aged Brie” actually increases in Quality the older it gets
    The Quality of an item is never more than 50
    “Sulfuras”, being a legendary item, never has to be sold or decreases in Quality
    “Backstage passes”, like aged brie, increases in Quality as it’s SellIn value approaches; Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but Quality drops to 0 after the concert

We have recently signed a supplier of conjured items. This requires an update to our system:

    “Conjured” items degrade in Quality twice as fast as normal items

Feel free to make any changes to the UpdateQuality method and add any new code as long as everything still works correctly. However, do not alter the Item class or Items property as those belong to the goblin in the corner who will insta-rage and one-shot you as he doesn’t believe in shared code ownership (you can make the UpdateQuality method and Items property static if you like, we’ll cover for you)."

## Test coverage

----------------|----------|----------|----------|----------|-------------------|
File            |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------------|----------|----------|----------|----------|-------------------|
All files       |      100 |      100 |      100 |      100 |                   |
 gilded_rose.js |      100 |      100 |      100 |      100 |                   |
----------------|----------|----------|----------|----------|-------------------|

## Solution design approach

### 1. Current domain model

I start with a quick domain model diagram of the current state of the production code, as follows:

![](assets/gilded-rose-baseline.excalidraw.png)

### 2. Analysis of each item

I then analyse the behaviour of each of the current categories of items. I analys the production code and add comments to it, and I sense-check against the client description above. I use this to generate behavioural profiles for each category. See below:

#### Standard item

- Starts with a `quality` score: e.g. `20`
- Starts with a `sellIn` number of days: e.g. `10`
- Min `quality` of `0`
- Every day, `sellIn` days goes down by `1` and `quality` score goes down by `1`, except
- When past their sell-by dates (i.e. when their `sellIn` days is zero or less), `quality` score goes down by `2` unless
- When past their sell-by dates (i.e. when their `sellIn` days is zero or less) and `quality` is `1`, `quality` goes down by `1` as it hits the minimum  and
- When past their sell-by dates (i.e. when their `sellIn` days is zero or less) and `quality` is `0`, `quality` doesn't change as already hit minimum


#### Aged Brie

- Starts with a `quality` score: e.g. `20`
- Starts with a `sellIn` number of days: e.g. `10`
- Max `quality` of `50`
- Every day, `sellIn` days goes down by `1` and `quality` score goes **up** by `1`, except...
- When past its sell-by date (i.e. when their `sellIn` days is zero or less), `quality` goes goes up every day by `2` unless
- When past their sell-by dates (i.e. when their `sellIn` days is zero or less) and `quality` is `49`, `quality` goes up by `1` as it hits the maximum  and
- When past their sell-by dates (i.e. when their `sellIn` days is zero or less) and `quality` is `50`, `quality` doesn't change as already hit maximum

#### Backstage passes

- Starts with a `quality` score: e.g. `20`
- Starts with a `sellIn` number of days: e.g. `10`
- Every day, `sellIn` days goes down by `1` and `quality` score goes **up** by `1`, except...
- When within 10 days of sell-by date (i.e. when their `sellIn` days are less than `11`), `quality` goes **up** by `2`, except...
- When within 5 days of sell-by date (i.e. when their `sellIn` days are less than `6`), `quality` goes **up** by `3`, except...
- When past their sell-by dates (i.e. when their `sellIn` days is zero), `quality` goes to `0`
- max `quality` of `50`

#### Sulfuras
- Starts with a `quality` score: e.g. `20`
- Starts with a `sellIn` number of days: e.g. `10`
- `sellIn` days doesn't change day-by-day
- `quality` score doesn't change day-by-day


### 3. Write passing tests

I now write a suite of tests to reflect the behaviour of the categories of items above. I structure the test suite as follows:
- I describe Gilded Rose
    - within which I describe Shop class
        - within which I describe .updateQuality method
            - within which I describe with of the categories of items in turn
                - testing for each of the behaviours set out in my analysis above.

### 4. Refactor

Now that I have tests for the behaviour of the shop and its current categories of items, I have the safety net to refactor the current production code.

#### `.newUpdateQuality` holder

I reproduce all test suite for a new method call `.newUpdateQuality` which will hold my refactored production code. As the tests are reproduced and test the same behaviour as for `.updateQuality`, I know that if I can get the `.newUpdateQuality` tests paasing, I am maintaining the same behaviour in the refactored code.

#### Category submethods

My refactoring approach is to pull out  the quality-updating behaviour of each category of itme into its own submethod, and to combine these via conditions in `.newUpdateQuality`. I therefore implement methods for:
- `.updateAgedBrie`
- `.updatedBackstagePass`
- `.updatedStandardItem`

Note that a method for Sulfuras is not necessary as its quality update behaviour is not to change at all.

### 5. Substitute new method

Once I have all the tests passing for `.newUpdateQuality` using the submethods, I am confident to delete `.updateQuality` and rename `.newUpdateQuality`, and to remove the superfluous `.newUpdateQuality` tests.

### 6. Analysis of Conjured Items

At this point I turn to the new category of items - conjured items - which I analyse as follows:

- Starts with a `quality` score: e.g. `20`
- Starts with a `sellIn` number of days: e.g. `10`
- Min `quality` of `0`
- Every day `sellIn` days goes down by `1` and `quality` score goes down by `2`, unless
- `quality` is at `1`, then `quality` goes down by `1` except
- When past their sell-by dates (i.e. when their `sellIn` days is zero or less), `quality` score goes down by `4` unless
- When past their sell-by dates (i.e. when their `sellIn` days is zero or less) and `quality` is less than `4`, then `quality` goes down as much as is possible without going beyong the minimum

### 7. Test drive Conjured Items

I test drive implementation of the new conjured item.

### 8. Further refactoring

I have now delivered the functionality set out in the challenge.

Nevertheless there are further opportunities to refactor:
- Extract methods for common patterns `._isInDate`, `_boostQuality` and `._reduceQuality`. The later two embedding checks again max and min quality values respectively
- Use `switch` and `case` syntax on `.updateQuality` to make clearer
- Make item category quality update methods private.

### 9. Yet more refactoring - extracting classes

I now extract classes for each of the special categories which inherit from the Item class: `AgedBrie`, `BackstagePass`, and `ConjuredItem`.

The Item class is given `.updateQuality` method for standard items, as well as the methods for common patterns: `._isInDate`, `_boostQuality` and `._reduceQuality`.

I also use polymorphism to provide variations on `.updateQuality` in the classes for the different special categories of items, allowing a simplification of a renamed `updateInventoryQuality` method in the `Shop` class which calls the respective version of `.updateQuality` for each of the items in the shop.

## Code structure

The test suite is found in several files, one for each of the classes:
- `./test/AgedBrie.test.js`
- `./test/BackstagePass.test.js`
- `./test/ConjuredItem.test.js`
- `./test/Item.test.js`
- `./test/Shop.test.js`

The `texttest_fixture.js` file is not used but forms part of the seed for the project and I may use it in a future iteration of the project.

The production code is found in several files, one for each of the classes:
- `./src/AgedBrie.js`
- `./src/BackstagePass.js`
- `./src/ConjuredItem.js`
- `./src/Item.js`
- `./src/Shop.js`

`AgedBrie`, `BackstagePass` and `ConjuredItems` inherit from `Item`, with `.updateQuality` method being polymorphic.

The `Item` class also has three mthods which capture common functional patterns in the code:
- `._isInDate`
- '`.boostQuality`
= `._reduceQuality`

the `Shop` class initiates with an items array defaulting to empty. It has one public method `.updateInventoryQuality` which calls `.updateQuality` on each item. 

### Dependencies

- `jest` for testing: `^8.16.0`
- `eslint` for linting: `^24.9.0

## Usage

Clone the repo locally: 
`git clone https://github.com/almorcrette/gilded-rose-js`

Install dependencies:
`npm install`

### Getting started (installing the code)

### Usage (executing the program)

Use `node` as follows:
- Start up node in the terminal: `node`
- Require the relevant modules: `const {Shop, Item} = require("../src/gilded_rose");`
- Set up shop with a range of items, e.g.:

```
gildedRose = new Shop([
    new Item("standardItem", 10, 20),
    new Item("Aged Brie", 10, 20),
    new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20),
    new Item("Sulfuras, Hand of Ragnaros", 10, 20),
    new Item("Conjured item", 10, 0)
    ])
```

- Update the quality of the items day-by-day with: `gildedRose.updateQuality();`

### Running tests

To run all tests

```sh
npm test
```

To run all tests in watch mode

```sh
npm run test:watch
```

To generate test coverage report

```sh
npm run test:coverage
```

### Potential future extensions
- There a possible refactor involving making `UpdateQuality` method and `Items` property static
- Makers coach Alex says he can think of at least very different ways of completing this kata, so I will explore alternatives.