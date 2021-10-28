import Item from "./Item";

const GildedRose = function () {
  var items = [];
  items.push(new Item("+5 Dexterity Vest", 10, 20));
  items.push(new Item("Aged Brie", 2, 0));
  items.push(new Item("Elixir of the Mongoose", 5, 7));
  items.push(new Item("Sulfuras, Hand of Ragnaros", 0, 80));
  items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20));
  items.push(new Item("Conjured Mana Cake", 3, 6));
  GildedRose.updateQuality(items);
};

GildedRose.updateQuality = function (items) {
  const INCREASEABLE_BY_AGE_ITEMS = [
    "Aged Brie",
    "Backstage passes to a TAFKAL80ETC concert"
  ];
  const LEGENDARY_ITEMS = {
    "Sulfuras, Hand of Ragnaros": 80,
  };

  items.forEach((item) => {
    const isLegendaryItem = LEGENDARY_ITEMS[item.name] !== undefined;
    const canIncreaseQualityByAge = !isLegendaryItem && INCREASEABLE_BY_AGE_ITEMS.includes(item.name);
    const canDecreaseQuality = !canIncreaseQualityByAge && !isLegendaryItem;

    // Decrease quality
    if (canDecreaseQuality && item.quality > 0) {
      item.quality = item.quality - 1;
    }
    
    // Increase quality
    if (canIncreaseQualityByAge && item.quality < 50) {
      let increment = 1;

      if (item.sellIn <= 10 && item.sellIn > 5) {
        increment *= 2;
      }

      if (item.sellIn <= 5) {
        increment *= 3;
      }

      item.quality = item.quality + increment;
    }

    // Drecrease days to be sold
    if (!isLegendaryItem) {
      item.sellIn = item.sellIn - 1;
    }
  
    if (item.sellIn < 0) {
      if ("Aged Brie" != item.name) {
        if ("Backstage passes to a TAFKAL80ETC concert" != item.name) {
          if (item.quality > 0) {
            if ("Sulfuras, Hand of Ragnaros" != item.name) {
              item.quality = item.quality - 1;
            }
          }
        } else {
          //TODO: Fix this.
          item.quality = item.quality - item.quality;
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
        }
        if ("Aged Brie" == item.name && item.sellIn <= 0) item.quality = 0;
      } // of for.
    }
    if ("Sulfuras, Hand of Ragnaros" != item.name) if (item.quality > 50) item.quality = 50;
  });
  return items;
};

export default GildedRose;
