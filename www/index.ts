import { Mandelbrot } from 'wasm-mandelbrot'
import { memory } from 'wasm-mandelbrot/wasm_mandelbrot_bg.wasm'

const WIDTH = 800
const HEIGHT = 600

class CoordinatePair {
  x1: number
  x2: number
  y1: number
  y2: number

  constructor(x1: number, y1: number, x2: number, y2: number) {
    this.x1 = x1
    this.y1 = y1
    this.x2 = x2
    this.y2 = y2
  }

  transform() {
    this.x1 = (2.0 * this.x1) / HEIGHT - 1.6
    this.x2 = (2.0 * this.x2) / HEIGHT - 1.6
    this.y1 = (2.0 * this.y1) / HEIGHT - 0.4
    this.y2 = (2.0 * this.y2) / HEIGHT - 0.4
  }
}

// ******************************************

const startGenerate = performance.now()
const m = Mandelbrot.new(WIDTH, HEIGHT)
const c = new CoordinatePair(0, 0, WIDTH, HEIGHT)
c.transform()

m.draw_fractal(c.x1, c.y1, c.x2, c.y2)
m.write_to_bitmap()
const endGenerate = performance.now()

// ******************************************

const startDraw = performance.now()

const canvas: HTMLCanvasElement = <any>document.getElementById('canvas')!
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!
const imageData = ctx.createImageData(WIDTH, HEIGHT)

const bitmapPtr = m.bitmap()
const bitmap = new Uint8Array(memory.buffer, bitmapPtr, WIDTH * HEIGHT * 4)

// Iterate through every pixel
for (let i = 0; i < imageData.data.length; i += 4) {
  imageData.data[i + 0] = 0
  imageData.data[i + 1] = bitmap[i + 1]
  imageData.data[i + 2] = bitmap[i + 2]
  imageData.data[i + 3] = 255
}

// Draw image data to the canvas
ctx.putImageData(imageData, 0, 0)
const endDraw = performance.now()

// ******************************************

const generate: HTMLParagraphElement = <any>document.getElementById('generate')!
const draw: HTMLParagraphElement = <any>document.getElementById('draw')!

generate.textContent = `Generation took ${(endGenerate - startGenerate).toFixed(
  2
)} milliseconds`
draw.textContent = `Drawing took ${(endDraw - startDraw).toFixed(
  2
)} milliseconds`

// Testing hist
// const hist = m.get_hist();
// let str: String = "";

// hist.forEach((ea) => (str += ea.toString() + ", "));

// console.log(str);
