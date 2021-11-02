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

GildedRose.itemIsLegendary = function (item) {
  return ["Sulfuras, Hand of Ragnaros"].includes(item.name)
}

GildedRose.itemCanIncreaseQualityByAge = function (item) {
  return ["Aged Brie", "Backstage passes to a TAFKAL80ETC concert"].includes(item.name)
}

GildedRose.itemCanDegradeFast = function (item) {
  return ["Conjured Mana Cake"].includes(item.name)
}

GildedRose.itemTimedOut = function (item) {
  return item.sellIn < 0
}

GildedRose.decreaseSellInDays = function (item) {
  if (GildedRose.itemIsLegendary(item)) {
    return
  }

  item.sellIn = item.sellIn - 1
}

GildedRose.decreaseQuality = function (item) {
  if (item.quality <= 0) return
  if (GildedRose.itemIsLegendary(item)) return
  if (GildedRose.itemCanIncreaseQualityByAge(item)) return

  let decrement = 1

  if (GildedRose.itemTimedOut(item)) decrement *= 2
  if (GildedRose.itemCanDegradeFast(item)) decrement *= 2

  item.quality = item.quality - decrement
}

GildedRose.increaseQuality = function (item) {
  if (item.quality >= 50) return
  if (GildedRose.itemTimedOut(item)) return
  if (GildedRose.itemIsLegendary(item)) return
  if (!GildedRose.itemCanIncreaseQualityByAge(item)) return

  let increment = 1

  if (item.sellIn <= 10 && item.sellIn > 5) increment = 2
  if (item.sellIn <= 5) increment = 3

  item.quality = Math.min(item.quality + increment, 50)
}

GildedRose.degradeItem = function (item) {
  if (GildedRose.itemIsLegendary(item)) return
  if (!GildedRose.itemCanIncreaseQualityByAge(item)) return
  if (!GildedRose.itemTimedOut(item)) return

  item.quality = 0
}

GildedRose.persistLegendaryItemQuality = function (item) {
  if (!GildedRose.itemIsLegendary(item)) return

  item.quality = 80
}

GildedRose.updateQuality = function (items) {
  items.forEach((item) => {
    GildedRose.decreaseSellInDays(item)
    GildedRose.decreaseQuality(item)
    GildedRose.increaseQuality(item)
    GildedRose.degradeItem(item)
    GildedRose.persistLegendaryItemQuality(item)
  })
  return items
}

export default GildedRose
