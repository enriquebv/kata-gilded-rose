import Item from "./Item";

let VEST = new Item("+5 Dexterity Vest", 10, 20);
let BRIE = new Item("Aged Brie", 2, 0);
let ELIXIR = new Item("Elixir of the Mongoose", 5, 7);
let SULFURAS = new Item("Sulfuras, Hand of Ragnaros", 0, 80);
let PASS = new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20);
let CAKE = new Item("Conjured Mana Cake", 3, 6);

const makeNameChecker = name => item => item.name == name;

const isBrie = makeNameChecker(BRIE.name);
const isSulfuras = makeNameChecker(SULFURAS.name);
const isPass = makeNameChecker(PASS.name);

const isNotBrie = item => !isBrie(item);
const isNotPass = item => !isPass(item);

const qualityOverZero = item => item.quality > 0;
const qualityUnderFifty = item => item.quality < 50;
const qualityOverFifty = item => item.quality > 50;

const sellInUnderEleven = item => item.sellIn < 11;
const sellInUnderSix = item => item.sellIn < 6;
const sellInUnderZero = item => item.sellIn < 0;
const sellInLessOrEqualsZero = item => item.sellIn <= 0;

const updateSulfuras = sulfuras => sulfuras;

const updateBrie = brie => {
  brie.quality++;
  brie.sellIn--;

  sellInUnderEleven(brie) && brie.quality++;
  sellInUnderSix(brie) && brie.quality++;

  sellInUnderZero(brie) && (brie.quality = 0);

  qualityOverFifty(brie) && (brie.quality = 50);

  return brie;
};

const GildedRose = function() {};

GildedRose.updateQuality = function(items) {
  for (var i = 0; i < items.length; i++) {
    let item = items[i];

    if (isSulfuras(item)) {
      item = updateSulfuras(item);
      continue;
    }

    if (isBrie(item)) {
      item = updateBrie(item);
      continue;
    }

    //

    if (isNotPass(item)) {
      if (qualityOverZero(item)) {
        item.quality--;
      }
    } else {
      if (qualityUnderFifty(item)) {
        item.quality++;
        sellInUnderEleven(item) && item.quality++;
        sellInUnderSix(item) && item.quality++;
      }
    }

    item.sellIn--;

    if (sellInUnderZero(item)) {
      if (isNotPass(item)) {
        if (qualityOverZero(item)) {
          item.quality--;
        }
      } else {
        item.quality = 0;
      }
    }

    if (qualityOverFifty(item)) item.quality = 50;
  }
  return items;
};

export default GildedRose;
