<template>
  <div class="flex flex-col flex-grow">
    <div class="site-grid"></div>
    <main class="pt-32 pb-24 px-8 max-w-screen-2xl mx-auto min-h-screen relative w-full z-10">
      <div class="mb-16 lg:max-w-3xl">
        <div class="inline-block bg-primary/10 px-3 py-1 mb-6">
          <span class="text-primary font-headline text-xs font-bold tracking-[0.2em] uppercase">Instant Quotation</span>
        </div>
        <h1 class="font-headline text-[clamp(3rem,6vw,4.75rem)] leading-[0.9] font-bold tracking-tighter uppercase mb-6 text-on-surface">
          Quote Your <span class="text-primary italic">Print.</span>
        </h1>
        <p class="text-xl text-secondary max-w-2xl font-light leading-relaxed">
          Upload your STL, choose your material preferences, and see the final quoted price immediately before sending your order request.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <section class="lg:col-span-7 space-y-8">
          <div class="bg-surface-container-low p-8 border-l-4 border-primary relative overflow-hidden">
            <div class="absolute top-0 right-0 p-4 opacity-10">
              <span class="material-symbols-outlined text-8xl">upload_file</span>
            </div>
            <div class="relative z-10 space-y-8">
              <div>
                <h2 class="font-headline text-xl font-bold uppercase tracking-widest text-on-surface mb-2">Upload Geometry</h2>
                <p class="font-body text-sm text-secondary">STL only. Max {{ maxFileSizeLabel }} for email attachment delivery.</p>
              </div>

              <label
                class="block w-full min-h-32 bg-surface-container border border-dashed transition-colors cursor-pointer"
                :class="isDragging ? 'border-primary bg-primary/5' : 'border-outline-variant/40 hover:bg-surface-container-high'"
                @dragover.prevent="isDragging = true"
                @dragleave.prevent="isDragging = false"
                @drop.prevent="handleDrop"
              >
                <input class="hidden" type="file" accept=".stl" @change="handleFileChange" />
                <div class="h-full min-h-32 flex flex-col items-center justify-center px-6 text-center">
                  <span class="material-symbols-outlined text-primary text-4xl mb-3">view_in_ar</span>
                  <p class="font-headline text-sm uppercase tracking-[0.18em] text-on-surface mb-2">
                    {{ selectedFile ? selectedFile.name : 'Drop STL or click to browse' }}
                  </p>
                  <p class="font-label text-[11px] uppercase tracking-[0.22em] text-secondary">
                    {{ selectedFile ? 'Ready for live quotation' : 'Attachment is sent to you after customer acceptance' }}
                  </p>
                </div>
              </label>
            </div>
          </div>

          <div class="bg-surface border border-outline-variant/20 p-8">
            <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <h2 class="font-headline text-xl font-bold uppercase tracking-widest text-on-surface">Print Preferences</h2>
                <p class="font-body text-sm text-secondary">Only customer-safe options are editable.</p>
              </div>
              <div class="font-label text-[11px] uppercase tracking-[0.22em] text-secondary">Pricing controlled server-side</div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2 md:col-span-2">
                <label class="field-label">Filament</label>
                <div class="relative">
                  <select v-model="form.filamentId" class="field-input field-select">
                    <option v-for="filament in options.filaments" :key="filament.id" :value="filament.id">
                      {{ filament.label }}
                    </option>
                  </select>
                  <span class="material-symbols-outlined field-chevron">expand_more</span>
                </div>
              </div>

              <div class="space-y-2">
                <label class="field-label">Color</label>
                <div class="relative">
                  <select v-model="form.color" class="field-input field-select">
                    <option v-for="color in currentColors" :key="color" :value="color">{{ color }}</option>
                  </select>
                  <span class="material-symbols-outlined field-chevron">expand_more</span>
                </div>
              </div>

              <div class="space-y-2">
                <label class="field-label">Infill (%)</label>
                <input v-model.number="form.infill" class="field-input" type="number" min="0" max="100" />
              </div>

              <div class="space-y-2">
                <label class="field-label">Copies</label>
                <input v-model.number="form.copies" class="field-input" type="number" min="1" step="1" />
              </div>

              <div class="space-y-2 md:col-span-2">
                <label class="field-label">Other filament needed</label>
                <input v-model="form.customFilament" class="field-input" type="text" placeholder="Optional special filament request" />
              </div>

              <div class="space-y-2 md:col-span-2">
                <label class="field-label">Notes</label>
                <textarea v-model="form.notes" class="field-input min-h-32 resize-none" placeholder="Scale, finish, urgency, or any special request"></textarea>
              </div>
            </div>
          </div>

          <div class="bg-surface border border-outline-variant/20 p-8">
            <div class="mb-8">
              <h2 class="font-headline text-xl font-bold uppercase tracking-widest text-on-surface">Shipping Details</h2>
              <p class="font-body text-sm text-secondary">These details are included in the email you receive.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="field-label">Full name</label>
                <input v-model="form.name" class="field-input" type="text" />
              </div>
              <div class="space-y-2">
                <label class="field-label">Email</label>
                <input v-model="form.email" class="field-input" type="email" />
              </div>
              <div class="space-y-2">
                <label class="field-label">Phone</label>
                <input v-model="form.phone" class="field-input" type="tel" />
              </div>
              <div class="space-y-2 md:col-span-2">
                <label class="field-label">Address line 1</label>
                <input v-model="form.addressLine1" class="field-input" type="text" />
              </div>
              <div class="space-y-2 md:col-span-2">
                <label class="field-label">Address line 2</label>
                <input v-model="form.addressLine2" class="field-input" type="text" placeholder="Optional" />
              </div>
              <div class="space-y-2">
                <label class="field-label">City</label>
                <input v-model="form.city" class="field-input" type="text" />
              </div>
              <div class="space-y-2">
                <label class="field-label">State</label>
                <input v-model="form.state" class="field-input" type="text" />
              </div>
              <div class="space-y-2">
                <label class="field-label">Postal code</label>
                <input v-model="form.postalCode" class="field-input" type="text" />
              </div>
              <div class="space-y-2">
                <label class="field-label">Country</label>
                <input v-model="form.country" class="field-input" type="text" />
              </div>
            </div>
          </div>
        </section>

        <aside class="lg:col-span-5 space-y-8">
          <div class="bg-surface-container-lowest border border-outline-variant/20 p-4 relative min-h-[410px]">
            <div class="absolute top-4 right-4 font-headline text-[10px] font-bold uppercase tracking-[0.22em] text-primary z-10">
              Live Preview
            </div>
            <div ref="previewContainer" class="w-full h-[380px] bg-surface-container relative overflow-hidden group">
              <div v-if="!selectedFile" class="absolute inset-0 flex flex-col items-center justify-center text-secondary text-center px-6">
                <span class="material-symbols-outlined text-5xl mb-4 opacity-50">deployed_code</span>
                <p class="font-headline text-sm uppercase tracking-[0.18em]">Awaiting geometry</p>
              </div>
              <div v-show="selectedFile" class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <button class="preview-btn" :class="{ active: autoRotate }" @click="toggleAutoRotate">Auto Rotate</button>
                <button class="preview-btn" :class="{ active: isWireframe }" @click="toggleWireframe">Wireframe</button>
                <button class="preview-btn" @click="resetCamera">Reset</button>
              </div>
            </div>
          </div>

          <div class="bg-surface-container-low border-l-4 border-primary p-8">
            <div class="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 class="font-headline text-xl font-bold uppercase tracking-widest text-on-surface">Final Price</h2>
                <p class="font-body text-sm text-secondary">Calculated with the locked server-side quote engine.</p>
              </div>
              <span v-if="isLoadingQuote" class="font-label text-[11px] uppercase tracking-[0.22em] text-primary">Updating</span>
            </div>

            <div class="border border-outline-variant/30 bg-white p-8 text-center mb-5 min-h-36 flex flex-col justify-center">
              <p class="font-label text-[11px] uppercase tracking-[0.24em] text-secondary mb-3">Quoted total</p>
              <p class="font-headline text-5xl font-bold tracking-tight text-on-surface">
                {{ quotePrice !== null ? `Rs ${quotePrice.toFixed(2)}` : '--' }}
              </p>
              <p class="mt-3 font-body text-sm" :class="quoteError ? 'text-error' : 'text-secondary'">
                {{ quoteError || quoteHint }}
              </p>
            </div>

            <button
              class="gradient-cta w-full text-white px-8 py-5 font-headline font-bold uppercase tracking-widest text-sm transition-all hover:scale-[1.01] active:scale-95 shadow-xl shadow-primary/10 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              :disabled="isSubmitting || !canSubmit"
              @click="submitQuote"
            >
              {{ isSubmitting ? 'Sending Request...' : 'Accept Quote & Send Request' }}
            </button>

            <p v-if="submitMessage" class="mt-4 text-sm" :class="submitError ? 'text-error' : 'text-primary'">
              {{ submitMessage }}
            </p>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'

const options = reactive({ filaments: [], defaults: { infill: 20 }, maxFileSizeMb: 8 })
const selectedFile = ref(null)
const isDragging = ref(false)
const quotePrice = ref(null)
const quoteError = ref('')
const quoteHint = ref('Upload an STL and choose your settings to get the final price.')
const isLoadingQuote = ref(false)
const isSubmitting = ref(false)
const submitMessage = ref('')
const submitError = ref(false)
const previewContainer = ref(null)
const autoRotate = ref(true)
const isWireframe = ref(false)

const form = reactive({
  filamentId: '',
  color: '',
  copies: 1,
  customFilament: '',
  infill: 20,
  notes: '',
  name: '',
  email: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'India',
})

let scene = null
let camera = null
let renderer = null
let controls = null
let mesh = null
let animationFrame = null
let quoteTimer = null

const currentFilament = computed(() => options.filaments.find((item) => item.id === form.filamentId) || null)
const currentColors = computed(() => currentFilament.value?.colors || [])
const maxFileSizeLabel = computed(() => `${options.maxFileSizeMb}MB`)
const canSubmit = computed(() => {
  return Boolean(
    selectedFile.value &&
      quotePrice.value !== null &&
      !quoteError.value &&
      form.name &&
      form.email &&
      form.phone &&
      form.addressLine1 &&
      form.city &&
      form.state &&
      form.postalCode &&
      form.country &&
      form.filamentId &&
      form.color,
  )
})

function initThree() {
  if (!previewContainer.value) return

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10000)
  camera.position.set(150, 150, 150)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  previewContainer.value.appendChild(renderer.domElement)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.autoRotate = autoRotate.value
  controls.autoRotateSpeed = 2

  scene.add(new THREE.AmbientLight(0xffffff, 0.7))

  const lightA = new THREE.DirectionalLight(0xffffff, 0.9)
  lightA.position.set(1, 1, 1)
  scene.add(lightA)

  const lightB = new THREE.DirectionalLight(0xffffff, 0.4)
  lightB.position.set(-1, -0.5, -1)
  scene.add(lightB)

  const gridHelper = new THREE.GridHelper(220, 20, 0xfc5b00, 0xf4c2ad)
  gridHelper.material.opacity = 0.28
  gridHelper.material.transparent = true
  scene.add(gridHelper)

  onResize()
  animate()
  window.addEventListener('resize', onResize)
}

function animate() {
  animationFrame = window.requestAnimationFrame(animate)
  if (controls) controls.update()
  if (renderer && scene && camera) renderer.render(scene, camera)
}

function onResize() {
  if (!previewContainer.value || !renderer || !camera) return
  const width = previewContainer.value.clientWidth
  const height = previewContainer.value.clientHeight
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

function loadPreview(file) {
  const reader = new FileReader()
  reader.onload = (event) => {
    try {
      const loader = new STLLoader()
      const geometry = loader.parse(event.target.result)
      geometry.computeVertexNormals()

      if (mesh) {
        scene.remove(mesh)
        mesh.geometry.dispose()
        mesh.material.dispose()
      }

      const material = new THREE.MeshPhongMaterial({
        color: 0xa73a00,
        specular: 0x2a2a2a,
        shininess: 35,
        wireframe: isWireframe.value,
      })

      mesh = new THREE.Mesh(geometry, material)
      geometry.computeBoundingBox()
      const box = geometry.boundingBox
      const center = new THREE.Vector3()
      box.getCenter(center)
      mesh.position.sub(center)

      const size = new THREE.Vector3()
      box.getSize(size)
      mesh.position.y += size.y / 2
      scene.add(mesh)

      const maxDim = Math.max(size.x, size.y, size.z) || 100
      camera.position.set(maxDim * 1.5, maxDim * 1.2, maxDim * 1.5)
      controls.target.set(0, size.y / 2, 0)
      controls.update()
    } catch {
      quoteError.value = 'Could not preview this STL file.'
    }
  }
  reader.readAsArrayBuffer(file)
}

function toggleAutoRotate() {
  autoRotate.value = !autoRotate.value
  if (controls) controls.autoRotate = autoRotate.value
}

function toggleWireframe() {
  isWireframe.value = !isWireframe.value
  if (mesh) mesh.material.wireframe = isWireframe.value
}

function resetCamera() {
  if (!mesh) return
  const box = new THREE.Box3().setFromObject(mesh)
  const size = new THREE.Vector3()
  box.getSize(size)
  const maxDim = Math.max(size.x, size.y, size.z) || 100
  camera.position.set(maxDim * 1.5, maxDim * 1.2, maxDim * 1.5)
  controls.target.set(0, size.y / 2, 0)
  controls.update()
}

async function fetchOptions() {
  const response = await fetch('/api/quote/options')
  const data = await response.json()
  options.filaments = data.filaments || []
  options.defaults = data.defaults || options.defaults
  options.maxFileSizeMb = data.maxFileSizeMb || options.maxFileSizeMb
  form.filamentId = options.filaments[0]?.id || ''
  form.color = options.filaments[0]?.colors?.[0] || ''
  form.infill = options.defaults.infill || 20
  form.copies = options.defaults.copies || 1
}

function handleDrop(event) {
  isDragging.value = false
  const file = event.dataTransfer.files[0]
  if (file) setSelectedFile(file)
}

function handleFileChange(event) {
  const file = event.target.files[0]
  if (file) setSelectedFile(file)
}

function setSelectedFile(file) {
  if (!file.name.toLowerCase().endsWith('.stl')) {
    quoteError.value = 'Only STL files are allowed.'
    return
  }
  if (file.size > options.maxFileSizeMb * 1024 * 1024) {
    quoteError.value = `STL must be under ${options.maxFileSizeMb}MB for email attachment sending.`
    return
  }

  selectedFile.value = file
  submitMessage.value = ''
  quoteError.value = ''
  quoteHint.value = 'Calculating your final price...'
  loadPreview(file)
  requestQuotePreview()
}

async function requestQuotePreview() {
  if (!selectedFile.value || !form.filamentId || !form.infill) return

  isLoadingQuote.value = true
  quoteError.value = ''

  const payload = new FormData()
  payload.append('file', selectedFile.value)
  payload.append('filamentId', form.filamentId)
  payload.append('infill', String(form.infill))
  payload.append('copies', String(form.copies))

  try {
    const response = await fetch('/api/quote/preview', {
      method: 'POST',
      body: payload,
    })
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Could not calculate quote')
    }

    quotePrice.value = Number(data.price)
    quoteHint.value = data.modelFits
      ? 'Live quote ready. Price is locked again on submit before email is sent.'
      : 'Model is larger than the standard build volume. Price shown is estimate only.'
  } catch (error) {
    quotePrice.value = null
    quoteError.value = error.message
  } finally {
    isLoadingQuote.value = false
  }
}

function queuePreview() {
  if (!selectedFile.value) return
  window.clearTimeout(quoteTimer)
  quoteTimer = window.setTimeout(() => {
    requestQuotePreview()
  }, 300)
}

async function submitQuote() {
  if (!canSubmit.value) return

  isSubmitting.value = true
  submitError.value = false
  submitMessage.value = ''

  const payload = new FormData()
  payload.append('file', selectedFile.value)
  payload.append('filamentId', form.filamentId)
  payload.append('color', form.color)
  payload.append('copies', String(form.copies))
  payload.append('customFilament', form.customFilament)
  payload.append('infill', String(form.infill))
  payload.append('notes', form.notes)
  payload.append('name', form.name)
  payload.append('email', form.email)
  payload.append('phone', form.phone)
  payload.append('addressLine1', form.addressLine1)
  payload.append('addressLine2', form.addressLine2)
  payload.append('city', form.city)
  payload.append('state', form.state)
  payload.append('postalCode', form.postalCode)
  payload.append('country', form.country)

  try {
    const response = await fetch('/api/quote/submit', {
      method: 'POST',
      body: payload,
    })
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Could not send request')
    }

    submitMessage.value = `Request sent successfully. Quoted total: Rs ${Number(data.price).toFixed(2)}.`
    submitError.value = false
  } catch (error) {
    submitMessage.value = error.message
    submitError.value = true
  } finally {
    isSubmitting.value = false
  }
}

watch(
  () => form.filamentId,
  () => {
    if (!currentColors.value.includes(form.color)) {
      form.color = currentColors.value[0] || ''
    }
    queuePreview()
  },
)

watch(
  () => form.infill,
  () => {
    if (form.infill < 0) form.infill = 0
    if (form.infill > 100) form.infill = 100
    queuePreview()
  },
)

watch(
  () => form.copies,
  () => {
    if (form.copies < 1) form.copies = 1
    form.copies = Math.floor(form.copies || 1)
    queuePreview()
  },
)

onMounted(async () => {
  await fetchOptions()
  initThree()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  window.clearTimeout(quoteTimer)
  if (animationFrame) window.cancelAnimationFrame(animationFrame)
  if (renderer) renderer.dispose()
  if (mesh) {
    mesh.geometry.dispose()
    mesh.material.dispose()
  }
})
</script>

<style scoped>
.gradient-cta {
  background: linear-gradient(45deg, #a73a00 0%, #fc5b00 100%);
}

.field-label {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #5b4039;
}

.field-input {
  width: 100%;
  background: #eeeeee;
  border: none;
  padding: 1rem;
  color: #1a1c1c;
  outline: none;
  transition: box-shadow 0.2s ease;
}

.field-input:focus {
  box-shadow: inset 0 0 0 1px #a73a00;
}

.field-select {
  appearance: none;
  cursor: pointer;
  padding-right: 3rem;
}

.field-chevron {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #5f5e5e;
}

.preview-btn {
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(228, 190, 180, 0.6);
  color: #1a1c1c;
  padding: 0.4rem 0.75rem;
  font-family: 'Inter', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.6rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.preview-btn:hover {
  border-color: #a73a00;
  color: #a73a00;
}

.preview-btn.active {
  background: #a73a00;
  border-color: #a73a00;
  color: #ffffff;
}
</style>
