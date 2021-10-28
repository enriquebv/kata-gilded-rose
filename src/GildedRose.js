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
  const LEGENDARY_QUALITY_ITEMS = {
    "Sulfuras, Hand of Ragnaros": 80,
  };

  items.forEach((item) => {
    const isLegendaryItem = LEGENDARY_QUALITY_ITEMS[item.name] !== undefined;
    const canIncreaseQualityByAge = !isLegendaryItem && INCREASEABLE_BY_AGE_ITEMS.includes(item.name);
    const canDecreaseQuality = !canIncreaseQualityByAge && !isLegendaryItem;
    const timedOut = !isLegendaryItem && (item.sellIn - 1) < 0;

    if (!isLegendaryItem) {
      item.sellIn = item.sellIn - 1;
    }

    if (canDecreaseQuality && item.quality > 0) {
      item.quality = item.quality - (timedOut ? 2 : 1);
    }
    
    if (canIncreaseQualityByAge && item.quality < 50 && !timedOut) {
      let increment = 1;

      if (item.sellIn <= 10 && item.sellIn > 5) increment = 2;
      if (item.sellIn <= 5) increment = 3;

      const qualityUpdated = item.quality + increment;
      item.quality = qualityUpdated > 50 ? 50 : qualityUpdated;
    }

    if (canIncreaseQualityByAge && timedOut) {
      item.quality = 0;
    }

    // Persist legendary quality
    if (isLegendaryItem) {
      item.quality = LEGENDARY_QUALITY_ITEMS[item.name];
    }
  });
  return items;
};

export default GildedRose;
