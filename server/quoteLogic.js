import { getFilamentById, quoteSettings } from './pricingConfig.js'

const densities = {
  PLA: 1.24,
  ABS: 1.04,
  PETG: 1.27,
}

const materialPremiums = {
  PLA: 0,
  ABS: 5,
  PETG: 3,
}

export function calculateDynamicProfit(vol_cm3, time_hr, material, layer) {
  let baseProfit = 20

  let volumeAdj = 0
  if (vol_cm3 < 10) volumeAdj = 15
  else if (vol_cm3 < 50) volumeAdj = 8
  else if (vol_cm3 < 200) volumeAdj = 3
  else volumeAdj = -5

  let timeAdj = 0
  if (time_hr > 12) timeAdj = 15
  else if (time_hr > 4) timeAdj = 8
  else if (time_hr > 1) timeAdj = 3
  else timeAdj = 0

  const materialAdj = materialPremiums[material] || 0

  let complexityAdj = 0
  if (layer <= 0.08) complexityAdj = 20
  else if (layer <= 0.12) complexityAdj = 12
  else if (layer <= 0.2) complexityAdj = 5
  else complexityAdj = 0

  const totalPercent = baseProfit + volumeAdj + timeAdj + materialAdj + complexityAdj

  return {
    baseProfit,
    volumeAdj,
    timeAdj,
    materialAdj,
    complexityAdj,
    totalPercent,
  }
}

export function parseSTL(arrayBuffer) {
  const dv = new DataView(arrayBuffer)
  const isASCII = new TextDecoder().decode(arrayBuffer.slice(0, 80)).includes('solid')

  const triangles = []

  if (isASCII) {
    const text = new TextDecoder().decode(arrayBuffer)
    const lines = text.split('\n')
    let vertices = []
    for (let line of lines) {
      line = line.trim()
      if (line.startsWith('vertex')) {
        const [, x, y, z] = line.split(/\s+/).map(Number)
        vertices.push([x, y, z])
        if (vertices.length === 3) {
          triangles.push(vertices)
          vertices = []
        }
      }
    }
  } else {
    const triCount = dv.getUint32(80, true)
    let offset = 84
    for (let i = 0; i < triCount; i++) {
      offset += 12
      const vertices = []
      for (let j = 0; j < 3; j++) {
        vertices.push([
          dv.getFloat32(offset, true),
          dv.getFloat32(offset + 4, true),
          dv.getFloat32(offset + 8, true),
        ])
        offset += 12
      }
      triangles.push(vertices)
      offset += 2
    }
  }

  return triangles
}

export function volumeAndArea(triangles) {
  let volume = 0
  let area = 0

  for (const triangle of triangles) {
    const [p1, p2, p3] = triangle

    const cross = [
      (p2[1] - p1[1]) * (p3[2] - p1[2]) - (p2[2] - p1[2]) * (p3[1] - p1[1]),
      (p2[2] - p1[2]) * (p3[0] - p1[0]) - (p2[0] - p1[0]) * (p3[2] - p1[2]),
      (p2[0] - p1[0]) * (p3[1] - p1[1]) - (p2[1] - p1[1]) * (p3[0] - p1[0]),
    ]

    volume += (p1[0] * cross[0] + p1[1] * cross[1] + p1[2] * cross[2]) / 6

    const triangleArea = Math.sqrt(
      cross[0] * cross[0] + cross[1] * cross[1] + cross[2] * cross[2],
    ) / 2

    area += triangleArea
  }

  return { volume: Math.abs(volume), area }
}

export function getBoundingBox(triangles) {
  let minX = Infinity
  let minY = Infinity
  let minZ = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  let maxZ = -Infinity

  for (const triangle of triangles) {
    for (const point of triangle) {
      minX = Math.min(minX, point[0])
      minY = Math.min(minY, point[1])
      minZ = Math.min(minZ, point[2])
      maxX = Math.max(maxX, point[0])
      maxY = Math.max(maxY, point[1])
      maxZ = Math.max(maxZ, point[2])
    }
  }

  return {
    width: maxX - minX,
    depth: maxY - minY,
    height: maxZ - minZ,
  }
}

export function toArrayBuffer(buffer) {
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength)
}

export function calculateQuoteFromBuffer(fileBuffer, filamentId, infillValue, copiesValue = 1) {
  const filament = getFilamentById(filamentId)
  const arrayBuffer = toArrayBuffer(fileBuffer)
  const triangles = parseSTL(arrayBuffer)

  if (!triangles.length) {
    throw new Error('Could not parse STL file')
  }

  const { volume, area } = volumeAndArea(triangles)
  const bbox = getBoundingBox(triangles)
  const infill = Number(infillValue) / 100
  const copies = Math.max(1, Number(copiesValue) || 1)
  const shell = quoteSettings.shell
  const layer = quoteSettings.layer
  const speed = quoteSettings.speed
  const rate = quoteSettings.rate
  const density = densities[filament.type]
  const price = filament.pricePerKg

  const fitsX = bbox.width <= quoteSettings.buildX
  const fitsY = bbox.depth <= quoteSettings.buildY
  const fitsZ = bbox.height <= quoteSettings.buildZ
  const modelFits = fitsX && fitsY && fitsZ

  const shellVol = area * shell
  const effVol = shellVol + infill * (volume - shellVol)

  const vol_cm3 = effVol / 1000
  const weight_g = vol_cm3 * density
  const materialCost = (weight_g / 1000) * price

  const extrusionRate = 0.4 * layer * speed
  const time_hr = (effVol / extrusionRate / 3600) * 1.3
  const machineCost = time_hr * rate
  const baseCost = materialCost + machineCost

  const profitBreakdown = calculateDynamicProfit(vol_cm3, time_hr, filament.type, layer)

  let profitAmount = baseCost * (profitBreakdown.totalPercent / 100)
  let appliedMinimum = false
  if (profitAmount < quoteSettings.minProfit) {
    profitAmount = quoteSettings.minProfit
    appliedMinimum = true
  }

  const singleUnitPrice = baseCost + profitAmount
  const finalPrice = singleUnitPrice * copies

  return {
    finalPrice: Number(finalPrice.toFixed(2)),
    copies,
    modelFits,
    dimensions: {
      width: Number(bbox.width.toFixed(1)),
      depth: Number(bbox.depth.toFixed(1)),
      height: Number(bbox.height.toFixed(1)),
    },
    quoteDetails: {
      filamentLabel: filament.label,
      filamentType: filament.type,
      infill: Number(infillValue),
      copies,
      effectiveVolumeCm3: Number(vol_cm3.toFixed(2)),
      weightG: Number(weight_g.toFixed(2)),
      printTimeHours: Number(time_hr.toFixed(2)),
      materialCost: Number(materialCost.toFixed(2)),
      machineCost: Number(machineCost.toFixed(2)),
      baseCost: Number(baseCost.toFixed(2)),
      profitAmount: Number(profitAmount.toFixed(2)),
      singleUnitPrice: Number(singleUnitPrice.toFixed(2)),
      appliedMinimum,
    },
  }
}
