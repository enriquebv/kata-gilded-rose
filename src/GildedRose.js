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
  const ITEMS_INCREASEABLE_BY_AGE = [
    "Aged Brie",
    "Backstage passes to a TAFKAL80ETC concert"
  ];
  const ITEMS_PERSISTENT_QUALITY = {
    "Sulfuras, Hand of Ragnaros": 80,
  };

  items.forEach((item) => {
    const canIncreaseByAge = ITEMS_INCREASEABLE_BY_AGE.includes(item.name);
    const canDecrease = ITEMS_PERSISTENT_QUALITY[item.name] === undefined;

    // si no es aged brie ni backstage
    if (!canIncreaseByAge && canDecrease && item.quality > 0) {
      item.quality = item.quality - 1;
    } else {
      // Si no se ha llegado al maximo de calidad
      if (item.quality < 50) {
        item.quality = item.quality + 1;
        if ("Aged Brie" == item.name) {
          if (item.sellIn < 6) {
            item.quality = item.quality + 1;
          }
        }
        //Increases the Quality of the stinky cheese if its 11 days to due date.
        if ("Aged Brie" == item.name) {
          if (item.sellIn < 11) {
            item.quality = item.quality + 1;
          }
        }
        if ("Backstage passes to a TAFKAL80ETC concert" == item.name) {
          if (item.sellIn < 11) {
            // See revision number 2394 on SVN.
            if (item.quality < 50) {
              item.quality = item.quality + 1;
            }
          }
          //Increases the Quality of Backstage Passes if the Quality is 6 or less.
          if (item.sellIn < 6) {
            if (item.quality < 50) {
              item.quality = item.quality + 1;
            }
          }
        }
      }
    }
    if ("Sulfuras, Hand of Ragnaros" != item.name) {
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
