export const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024

export const quoteSettings = {
  buildX: 256,
  buildY: 256,
  buildZ: 256,
  shell: 1.2,
  layer: 0.2,
  speed: 50,
  rate: 100,
  minProfit: 50,
}

export const filamentCatalog = [
  {
    id: 'pla-basic',
    label: 'PLA',
    type: 'PLA',
    pricePerKg: 1500,
    colors: ['White', 'Black', 'Orange', 'Gray', 'Blue'],
  },
  {
    id: 'petg-basic',
    label: 'PETG',
    type: 'PETG',
    pricePerKg: 1850,
    colors: ['Clear', 'Black', 'White', 'Blue'],
  },
  {
    id: 'abs-basic',
    label: 'ABS',
    type: 'ABS',
    pricePerKg: 1750,
    colors: ['Black', 'White', 'Gray'],
  },
]

export function getFilamentById(id) {
  return filamentCatalog.find((item) => item.id === id) || filamentCatalog[0]
}

export function getPublicCatalog() {
  return filamentCatalog.map(({ id, label, colors }) => ({ id, label, colors }))
}
