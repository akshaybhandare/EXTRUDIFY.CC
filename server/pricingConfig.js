import pricing from './pricing.json' with { type: 'json' }

export const MAX_FILE_SIZE_BYTES = pricing.maxFileSizeBytes

export const quoteSettings = pricing.quoteSettings

export const densities = pricing.densities

export const materialPremiums = pricing.materialPremiums

export const filamentCatalog = pricing.filamentCatalog

export function getFilamentById(id) {
  return filamentCatalog.find((item) => item.id === id) || filamentCatalog[0]
}

export function getPublicCatalog() {
  return filamentCatalog.map(({ id, label, colors }) => ({ id, label, colors }))
}
