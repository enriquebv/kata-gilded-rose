import Item from "./Item"

const GildedRose = function () {
  var items = []
  items.push(new Item("+5 Dexterity Vest", 10, 20))
  items.push(new Item("Aged Brie", 2, 0))
  items.push(new Item("Elixir of the Mongoose", 5, 7))
  items.push(new Item("Sulfuras, Hand of Ragnaros", 0, 80))
  items.push(new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20))
  items.push(new Item("Conjured Mana Cake", 3, 6))
  GildedRose.updateQuality(items)
}

// Añadir constantes fuera
GildedRose.increaseableByAgeItems = ["Aged Brie", "Backstage passes to a TAFKAL80ETC concert"]
GildedRose.fastDegradeItems = ["Conjured Mana Cake"]
GildedRose.legendaryQualityItems = {
  "Sulfuras, Hand of Ragnaros": 80,
}

GildedRose.updateQuality = function (items) {
  const INCREASEABLE_BY_AGE_ITEMS = ["Aged Brie", "Backstage passes to a TAFKAL80ETC concert"]
  const FAST_DEGRADE_ITEMS = ["Conjured Mana Cake"]
  const LEGENDARY_QUALITY_ITEMS = {
    "Sulfuras, Hand of Ragnaros": 80,
  }

  items.forEach((item) => {
    const isLegendaryItem = LEGENDARY_QUALITY_ITEMS[item.name] !== undefined
    const canIncreaseQualityByAge = !isLegendaryItem && INCREASEABLE_BY_AGE_ITEMS.includes(item.name)
    const canDecreaseQuality = !canIncreaseQualityByAge && !isLegendaryItem
    const fastDegradeItem = FAST_DEGRADE_ITEMS.includes(item.name)
    const timedOut = !isLegendaryItem && item.sellIn - 1 < 0

    // Separar cada acción en una función
    if (!isLegendaryItem) {
      item.sellIn = item.sellIn - 1
    }

    if (canDecreaseQuality && item.quality > 0) {
      let decrement = 1

      if (timedOut) decrement *= 2
      if (fastDegradeItem) decrement *= 2

      item.quality = item.quality - decrement
    }

    if (canIncreaseQualityByAge && item.quality < 50 && !timedOut) {
      let increment = 1

      if (item.sellIn <= 10 && item.sellIn > 5) increment = 2
      if (item.sellIn <= 5) increment = 3

      const qualityUpdated = item.quality + increment
      item.quality = qualityUpdated > 50 ? 50 : qualityUpdated
    }

    if (canIncreaseQualityByAge && timedOut) {
      item.quality = 0
    }

    // Persist legendary quality
    if (isLegendaryItem) {
      item.quality = LEGENDARY_QUALITY_ITEMS[item.name]
    }
  })
  return items
}

export default GildedRose
