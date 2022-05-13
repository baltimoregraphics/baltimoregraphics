
console.log('pdcl')
const canvas = document.getElementById('nart')
const ch = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

let mouseDown = false
addEventListener('mousedown', () => {
  mouseDown = true;
})

addEventListener('mouseup', () => {
  mouseDown = false
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

// Objects
class Particle {
  constructor(x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  draw() {
    ch.beginPath()
    ch.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    ch.shadowColor = this.color
    ch.shadowBlur = 15
    ch.fillStyle = this.color
    ch.fill()
    ch.closePath()
  }

  update() {
    this.draw()
  }
}

// Implementation
let particles
function init() {
  particles = []

  for (let i = 0; i < 1500; i++) {
    const canvasWidth = canvas.width + 1000
    const canvasHeight = canvas.height + 2000

    const x = Math.random() * canvasWidth - canvasWidth / 2
    const y = Math.random() * canvasHeight - canvasHeight / 2
    const radius = 2 * Math.random()

    const color = colors[Math.floor(Math.random() * colors.length)]
    particles.push(new Particle(x, y, radius, color))
  }
}

// Animation Loop
let radians = 0
let alpha = 1
function animate() {
  requestAnimationFrame(animate)
  ch.fillStyle = `rgba(10, 10, 10, ${alpha})`
  ch.fillRect(0, 0, canvas.width, canvas.height)

  ch.save()
  ch.translate(canvas.width / 2, canvas.height / 2)
  ch.rotate(radians)
  particles.forEach((particle) => {
    particle.update()
  })
  ch.restore()

  radians += 0.003

  if (mouseDown && alpha >= 0.03) {
    alpha -= 0.01
  } else if (!mouseDown && alpha < 1) {
    alpha += 0.01
  }
}

init()
animate()