<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)

type Star = {
  x: number
  y: number
  r: number
  base: number
  twinkleSpeed: number
  phase: number
  drift: number
  depth: number
  hue: number
}

type Meteor = {
  x: number
  y: number
  len: number
  speed: number
  angle: number
  life: number
  maxLife: number
}

let raf = 0
let stars: Star[] = []
let meteors: Meteor[] = []
let width = 0
let height = 0
let dpr = 1
let running = true
let reduced = false
let lastMeteor = 0
let meteorGap = 8000
let last = 0
// Pointer parallax (desktop only)
let pointerX = 0
let pointerY = 0
let targetX = 0
let targetY = 0

const STAR_HUES = [
  [255, 255, 255], // white
  [206, 190, 255], // violet
  [190, 214, 255] // blue
]

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

function buildStars() {
  // Density scales with screen area, capped for mobile performance.
  const area = width * height
  const target = Math.min(260, Math.max(70, Math.round(area / 9000)))
  stars = []
  for (let i = 0; i < target; i++) {
    const depth = rand(0.3, 1)
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: rand(0.4, 1.8) * depth,
      base: rand(0.25, 0.9),
      twinkleSpeed: rand(0.6, 2.2),
      phase: rand(0, Math.PI * 2),
      drift: rand(2, 10) * depth,
      depth,
      hue: Math.floor(rand(0, STAR_HUES.length))
    })
  }
}

function resize() {
  if (!canvas.value) return
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  width = window.innerWidth
  height = window.innerHeight
  canvas.value.width = Math.floor(width * dpr)
  canvas.value.height = Math.floor(height * dpr)
  canvas.value.style.width = width + 'px'
  canvas.value.style.height = height + 'px'
  const ctx = canvas.value.getContext('2d')
  if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  buildStars()
}

function spawnMeteor() {
  const fromLeft = Math.random() > 0.5
  meteors.push({
    x: fromLeft ? rand(-0.1, 0.4) * width : rand(0.6, 1.1) * width,
    y: rand(-0.05, 0.35) * height,
    len: rand(120, 260),
    speed: rand(7, 12),
    angle: fromLeft ? rand(0.32, 0.5) : rand(2.64, 2.82), // radians
    life: 0,
    maxLife: rand(60, 95)
  })
}

function draw(t: number) {
  if (!canvas.value) return
  const ctx = canvas.value.getContext('2d')
  if (!ctx) {
    raf = requestAnimationFrame(draw)
    return
  }

  const dt = last ? Math.min((t - last) / 1000, 0.05) : 0
  last = t

  ctx.clearRect(0, 0, width, height)

  // Ease pointer parallax toward target.
  pointerX += (targetX - pointerX) * 0.04
  pointerY += (targetY - pointerY) * 0.04

  // Stars
  for (const s of stars) {
    s.phase += s.twinkleSpeed * dt
    s.x += s.drift * dt * 0.05
    if (s.x > width + 4) s.x = -4
    const twinkle = s.base + Math.sin(s.phase) * 0.35
    const alpha = Math.max(0.05, Math.min(1, twinkle))
    const px = s.x + pointerX * s.depth * 26
    const py = s.y + pointerY * s.depth * 26
    const [r, g, b] = STAR_HUES[s.hue]

    if (s.r > 1.1) {
      const glow = ctx.createRadialGradient(px, py, 0, px, py, s.r * 4)
      glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.5})`)
      glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(px, py, s.r * 4, 0, Math.PI * 2)
      ctx.fill()
    }

    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
    ctx.beginPath()
    ctx.arc(px, py, s.r, 0, Math.PI * 2)
    ctx.fill()
  }

  // Meteors
  if (t - lastMeteor > meteorGap) {
    lastMeteor = t
    meteorGap = rand(6000, 11000)
    spawnMeteor()
  }
  meteors = meteors.filter((m) => m.life < m.maxLife)
  for (const m of meteors) {
    m.life++
    m.x += Math.cos(m.angle) * m.speed
    m.y += Math.sin(m.angle) * m.speed
    const fade = Math.sin((m.life / m.maxLife) * Math.PI)
    const tailX = m.x - Math.cos(m.angle) * m.len
    const tailY = m.y - Math.sin(m.angle) * m.len
    const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY)
    grad.addColorStop(0, `rgba(255, 255, 255, ${0.9 * fade})`)
    grad.addColorStop(0.3, `rgba(180, 200, 255, ${0.5 * fade})`)
    grad.addColorStop(1, 'rgba(138, 99, 255, 0)')
    ctx.strokeStyle = grad
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(m.x, m.y)
    ctx.lineTo(tailX, tailY)
    ctx.stroke()

    // Bright head
    ctx.fillStyle = `rgba(255, 255, 255, ${0.95 * fade})`
    ctx.beginPath()
    ctx.arc(m.x, m.y, 1.8, 0, Math.PI * 2)
    ctx.fill()
  }

  raf = requestAnimationFrame(draw)
}

function start() {
  if (raf) cancelAnimationFrame(raf)
  last = 0
  lastMeteor = performance.now()
  raf = requestAnimationFrame(draw)
}

function stop() {
  if (raf) cancelAnimationFrame(raf)
  raf = 0
}

function drawStatic() {
  // Reduced-motion: render a single calm starfield frame, no animation.
  if (!canvas.value) return
  const ctx = canvas.value.getContext('2d')
  if (!ctx) return
  ctx.clearRect(0, 0, width, height)
  for (const s of stars) {
    const [r, g, b] = STAR_HUES[s.hue]
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${s.base})`
    ctx.beginPath()
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
    ctx.fill()
  }
}

function onVisibility() {
  if (reduced) return
  if (document.hidden) {
    running = false
    stop()
  } else if (!running) {
    running = true
    start()
  }
}

function onPointer(e: PointerEvent) {
  // Normalize to -0.5..0.5 for subtle parallax.
  targetX = e.clientX / width - 0.5
  targetY = e.clientY / height - 0.5
}

const mq =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : null
const fineMq =
  typeof window !== 'undefined' ? window.matchMedia('(pointer: fine)') : null

function applyMode() {
  reduced = !!mq?.matches
  if (reduced) {
    stop()
    drawStatic()
  } else {
    start()
  }
}

onMounted(() => {
  resize()
  applyMode()
  window.addEventListener('resize', resize)
  document.addEventListener('visibilitychange', onVisibility)
  mq?.addEventListener('change', applyMode)
  if (fineMq?.matches) window.addEventListener('pointermove', onPointer)
})

onBeforeUnmount(() => {
  stop()
  window.removeEventListener('resize', resize)
  document.removeEventListener('visibilitychange', onVisibility)
  mq?.removeEventListener('change', applyMode)
  window.removeEventListener('pointermove', onPointer)
})
</script>

<template>
  <canvas ref="canvas" class="irua-starfield" aria-hidden="true" />
</template>

<style scoped>
.irua-starfield {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
}
</style>
