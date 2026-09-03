/**
 * One-shot asset pipeline: pulls the brand photography and line icons out of the
 * company deck (a .pptx is just a zip) and writes web-ready files.
 *
 *   photos -> public/images/*.webp        (max 1600px, q80; gallery also gets a thumb)
 *   icons  -> src/assets/icons/*.svg      (stroke rewritten to currentColor)
 *
 * Run with: npm run extract-assets
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import AdmZip from 'adm-zip'
import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const deck = new AdmZip(resolve(root, 'YASH-ELECTRICALS-and-SPA-SYSTEMS.pptx'))

const read = (name) => {
  const entry = deck.getEntry(`ppt/media/${name}`)
  if (!entry) throw new Error(`missing ${name} in deck`)
  return entry.getData()
}

const out = (...parts) => {
  const p = resolve(root, ...parts)
  mkdirSync(dirname(p), { recursive: true })
  return p
}

/**
 * slide -> photo. Source names verified against ppt/slides/_rels/slideN.xml.rels.
 *
 * The deck has seven photographs for nine slots — slides 3 and 7 (annual
 * maintenance, swimming pool) carry only icons. Rather than introduce stock
 * imagery, two of the deck's own frames do double duty:
 *   - slide 2's rooftop infinity pool moves to the swimming pool page, where it
 *     is by far the best subject match in the deck (About now shows real
 *     project photography from the gallery instead).
 *   - slide 9's electrician is cut twice: the full frame for electrical works,
 *     and a tight crop of the gloved hands on the distribution board — no face,
 *     no helmet — for annual maintenance.
 * The optional third element is a crop region in fractions of the source, taken
 * after the alpha mask is removed.
 */
const photos = [
  ['image3.png', 'images/hero.webp'], // slide 1 hero panel
  // slide 2, cropped to the lower half so the pool itself fills the frame
  // rather than the skyline above it
  ['image4.png', 'images/service-swimming-pool.webp', { x: 0, y: 0.48, w: 1, h: 0.52 }],
  ['image20.png', 'images/service-steam.webp'], // slide 4
  ['image21.jpeg', 'images/service-sauna.webp'], // slide 5
  ['image22.png', 'images/service-jacuzzi.webp'], // slide 6
  ['image27.jpeg', 'images/service-chilled.webp'], // slide 8
  ['image28.png', 'images/service-electrical.webp'], // slide 9
  ['image28.png', 'images/service-annual-maintenance.webp', { x: 0, y: 0.33, w: 0.52, h: 0.44 }],
]

/**
 * Three of the "Our Work" shots reached the deck as phone screenshots and carry
 * things that must not ship on a public site. Coordinates were measured off the
 * source files (see the notes on each entry); everything cropped away is UI
 * chrome or markup, never part of the installation itself.
 */
const galleryCrops = {
  // WhatsApp status screenshot — crops off the sender's name, avatar and the
  // Reply / navigation bars, leaving just the photo of the steam room.
  'image47.jpeg': { top: 278, height: 962 },
  // Hand-drawn magenta annotation across the top of the frame.
  'image49.jpeg': { top: 300 },
  // "OPPO F11" camera watermark along the bottom edge.
  'image43.jpeg': { bottom: 110 },
}

// slides 11-15, "Our Work"
const gallery = [
  ['image41.jpeg', 'sauna-1'],
  ['image42.jpeg', 'sauna-2'],
  ['image43.jpeg', 'sauna-3'],
  ['image44.jpeg', 'sauna-4'],
  ['image45.jpeg', 'steam-1'],
  ['image46.jpeg', 'steam-2'],
  ['image47.jpeg', 'steam-3'],
  ['image48.jpeg', 'steam-4'],
  ['image49.jpeg', 'steam-5'],
  ['image50.jpeg', 'steam-6'],
  ['image51.jpeg', 'steam-7'],
]

// Icon <-> label pairing comes from matching each <p:pic> <a:off> to the text box
// directly beneath it on slide 3 (services) and slide 10 (why choose us).
const icons = [
  ['image6.svg', 'steam-bath'],
  ['image8.svg', 'sauna-room'],
  ['image10.svg', 'jacuzzi'],
  ['image12.svg', 'swimming-pool'],
  ['image14.svg', 'chilled-shower-ice-bath'],
  ['image16.svg', 'annual-maintenance'],
  ['image18.svg', 'electrical-works'],
  ['image30.svg', 'experienced'],
  ['image32.svg', 'quality'],
  ['image34.svg', 'reliable'],
  ['image36.svg', 'timely'],
  ['image38.svg', 'satisfaction'],
  ['image40.svg', 'support'],
]

/**
 * The deck's photographs are exported with a soft curved alpha mask on one
 * edge — a slide flourish that reads as a rendering glitch inside a web card.
 * Find the largest axis-aligned rectangle of fully opaque pixels and crop to
 * it, so what ships is a clean photograph.
 */
async function cropToOpaque(buf) {
  const image = sharp(buf)
  const meta = await image.metadata()
  if (!meta.hasAlpha) return buf

  // Work on a small copy — the mask is smooth, so a coarse grid is plenty.
  const gw = 240
  const gh = Math.max(1, Math.round((meta.height / meta.width) * gw))
  const { data } = await sharp(buf)
    .ensureAlpha()
    .resize(gw, gh, { fit: 'fill' })
    .raw()
    .toBuffer({ resolveWithObject: true })

  const opaque = (x, y) => data[(y * gw + x) * 4 + 3] > 250

  // Maximal rectangle over the opaque mask (histogram method, row by row).
  const heights = new Array(gw).fill(0)
  let best = { area: 0, x0: 0, y0: 0, x1: gw - 1, y1: gh - 1 }

  for (let y = 0; y < gh; y++) {
    for (let x = 0; x < gw; x++) heights[x] = opaque(x, y) ? heights[x] + 1 : 0

    const stack = []
    for (let x = 0; x <= gw; x++) {
      const h = x === gw ? 0 : heights[x]
      let start = x
      while (stack.length && stack.at(-1).h >= h) {
        const top = stack.pop()
        const area = top.h * (x - top.x)
        if (area > best.area) {
          best = { area, x0: top.x, x1: x - 1, y0: y - top.h + 1, y1: y }
        }
        start = top.x
      }
      stack.push({ x: start, h })
    }
  }

  const sx = meta.width / gw
  const sy = meta.height / gh
  const left = Math.ceil(best.x0 * sx)
  const top = Math.ceil(best.y0 * sy)
  const width = Math.floor((best.x1 + 1) * sx) - left
  const height = Math.floor((best.y1 + 1) * sy) - top

  if (width < 32 || height < 32) return buf
  return image.extract({ left, top, width, height }).toBuffer()
}

const webp = async (buf, width, region) => {
  let source = await cropToOpaque(buf)

  if (region) {
    const { width: w, height: h } = await sharp(source).metadata()
    source = await sharp(source)
      .extract({
        left: Math.round(region.x * w),
        top: Math.round(region.y * h),
        width: Math.round(region.w * w),
        height: Math.round(region.h * h),
      })
      .toBuffer()
  }

  return sharp(source)
    .resize({ width, withoutEnlargement: true })
    .flatten({ background: '#ffffff' })
    .webp({ quality: 80 })
    .toBuffer()
}

const kb = (buf) => `${Math.round(buf.length / 1024)}kb`

for (const [src, dest, region] of photos) {
  const buf = await webp(read(src), 1600, region)
  writeFileSync(out('public', dest), buf)
  console.log(`photo   ${src.padEnd(14)} -> ${dest} (${kb(buf)})`)
}

/** Applies a galleryCrops entry, if this source has one. */
async function applyCrop(buf, src) {
  const crop = galleryCrops[src]
  if (!crop) return buf

  const { width, height } = await sharp(buf).metadata()
  const top = crop.top ?? 0
  const boxHeight = crop.height ?? height - top - (crop.bottom ?? 0)
  return sharp(buf).extract({ left: 0, top, width, height: boxHeight }).toBuffer()
}

for (const [src, name] of gallery) {
  const raw = await applyCrop(read(src), src)
  const full = await webp(raw, 1600)
  const thumb = await webp(raw, 800)
  writeFileSync(out('public', `images/gallery/${name}.webp`), full)
  writeFileSync(out('public', `images/gallery/${name}-thumb.webp`), thumb)
  console.log(`gallery ${src.padEnd(14)} -> ${name} (${kb(full)} / ${kb(thumb)})`)
}

for (const [src, name] of icons) {
  const svg = read(src)
    .toString('utf8')
    // The deck points strokes at a gradient that does not travel with the file;
    // currentColor lets each section tint its own icons instead.
    .replace(/stroke="url\((?:&quot;|")?#[^)]*\)\s*[^"]*"/g, 'stroke="currentColor"')
    .replace(/fill="rgb\(0, 0, 0\)"/g, 'fill="none"')
    // Drop the baked-in 62px box so CSS can size them.
    .replace(/^(<svg[^>]*?)\swidth="\d+"\sheight="\d+"/, '$1')
    // Normalise every stroke to unit length so a single dasharray value can
    // draw any of them (see the .icon-draw rule in index.css).
    .replace(/<(path|line|polyline|polygon|circle|ellipse|rect)\s/g, '<$1 pathLength="1" ')
  writeFileSync(out('src/assets/icons', `${name}.svg`), svg)
  console.log(`icon    ${src.padEnd(14)} -> ${name}.svg`)
}

console.log('\ndone.')
