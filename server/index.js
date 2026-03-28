import cors from 'cors'
import express from 'express'
import fs from 'fs/promises'
import multer from 'multer'
import nodemailer from 'nodemailer'
import path from 'path'
import { fileURLToPath } from 'url'

import { calculateQuoteFromBuffer } from './quoteLogic.js'
import { getFilamentById, getPublicCatalog, MAX_FILE_SIZE_BYTES, quoteSettings } from './pricingConfig.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const TMP_DIR = path.join(__dirname, 'tmp')
const PORT = process.env.PORT || 3001

const app = express()
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE_BYTES },
  fileFilter: (_req, file, cb) => {
    if (!file.originalname.toLowerCase().endsWith('.stl')) {
      cb(new Error('Only STL files are allowed'))
      return
    }
    cb(null, true)
  },
})

app.use(cors())
app.use(express.json())

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'customer'
}

function requireMailConfig() {
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD
  const owner = process.env.OWNER_EMAIL || user

  if (!user || !pass || !owner) {
    throw new Error('Missing GMAIL_USER, GMAIL_APP_PASSWORD, or OWNER_EMAIL environment variables')
  }

  return { user, pass, owner }
}

function createTransporter() {
  const { user, pass } = requireMailConfig()
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass },
  })
}

function validateSubmitFields(body) {
  const required = ['name', 'email', 'phone', 'addressLine1', 'city', 'state', 'postalCode', 'country', 'filamentId', 'color', 'infill']
  for (const key of required) {
    if (!String(body[key] || '').trim()) {
      return `${key} is required`
    }
  }
  return null
}

function buildAddress(body) {
  return [
    body.addressLine1,
    body.addressLine2,
    [body.city, body.state, body.postalCode].filter(Boolean).join(', '),
    body.country,
  ]
    .filter(Boolean)
    .join('\n')
}

async function ensureTmpDir() {
  await fs.mkdir(TMP_DIR, { recursive: true })
}

async function cleanupTmpDir() {
  await ensureTmpDir()
  const entries = await fs.readdir(TMP_DIR)
  const cutoff = Date.now() - 24 * 60 * 60 * 1000

  await Promise.all(
    entries.map(async (entry) => {
      const filePath = path.join(TMP_DIR, entry)
      const stat = await fs.stat(filePath)
      if (stat.mtimeMs < cutoff) {
        await fs.unlink(filePath)
      }
    }),
  )
}

app.get('/api/quote/options', (_req, res) => {
  res.json({
    filaments: getPublicCatalog(),
    defaults: {
      infill: 20,
      buildVolume: {
        x: quoteSettings.buildX,
        y: quoteSettings.buildY,
        z: quoteSettings.buildZ,
      },
    },
    maxFileSizeMb: MAX_FILE_SIZE_BYTES / (1024 * 1024),
  })
})

app.post('/api/quote/preview', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'STL file is required' })
      return
    }

    const filamentId = req.body.filamentId || getPublicCatalog()[0].id
    const infill = Number(req.body.infill || 20)
    const quote = calculateQuoteFromBuffer(req.file.buffer, filamentId, infill)

    res.json({
      price: quote.finalPrice,
      modelFits: quote.modelFits,
    })
  } catch (error) {
    res.status(400).json({ error: error.message || 'Could not calculate quote' })
  }
})

app.post('/api/quote/submit', upload.single('file'), async (req, res) => {
  let tempFilePath = null

  try {
    if (!req.file) {
      res.status(400).json({ error: 'STL file is required' })
      return
    }

    const validationError = validateSubmitFields(req.body)
    if (validationError) {
      res.status(400).json({ error: validationError })
      return
    }

    const filament = getFilamentById(req.body.filamentId)
    const quote = calculateQuoteFromBuffer(req.file.buffer, req.body.filamentId, Number(req.body.infill || 20))
    const safeName = `${Date.now()}-${slugify(req.body.name)}.stl`

    await ensureTmpDir()
    tempFilePath = path.join(TMP_DIR, safeName)
    await fs.writeFile(tempFilePath, req.file.buffer)

    const { user, owner } = requireMailConfig()
    const transporter = createTransporter()
    const address = buildAddress(req.body)

    await transporter.sendMail({
      from: user,
      to: owner,
      subject: `New print request - ${req.body.name} - Rs ${quote.finalPrice}`,
      text: [
        `Customer: ${req.body.name}`,
        `Email: ${req.body.email}`,
        `Phone: ${req.body.phone}`,
        '',
        'Shipping Address:',
        address,
        '',
        `Quoted Price: Rs ${quote.finalPrice}`,
        `Filament: ${filament.label}`,
        `Color: ${req.body.color}`,
        `Custom Filament Request: ${req.body.customFilament || 'None'}`,
        `Infill: ${req.body.infill}%`,
        '',
        'Notes:',
        req.body.notes || 'None',
      ].join('\n'),
      attachments: [
        {
          filename: req.file.originalname,
          path: tempFilePath,
        },
      ],
    })

    res.json({ success: true, price: quote.finalPrice })
  } catch (error) {
    res.status(500).json({ error: error.message || 'Could not send request email' })
  } finally {
    if (tempFilePath) {
      await fs.unlink(tempFilePath).catch(() => {})
    }
  }
})

app.use((error, _req, res, _next) => {
  res.status(400).json({ error: error.message || 'Request failed' })
})

cleanupTmpDir()
  .catch(() => {})
  .finally(() => {
    app.listen(PORT, () => {
      console.log(`Quote server running on http://localhost:${PORT}`)
    })
  })
