import {Mandelbrot} from 'wasm-mandelbrot'
import {memory} from 'wasm-mandelbrot/wasm_mandelbrot_bg.wasm'

const WIDTH = 800
const HEIGHT = 600

class Pair {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    transform() {
        // Both coords are scaled by HEIGHT.
        // They need to be scaled by the same factor preserve proportions
        this.x = (2.0 * this.x) / HEIGHT - 2
        this.y = (2.0 * this.y) / HEIGHT - 1
    }
}

// Swap coordinates if they are backwards
const swapPair = (p1: Pair, p2: Pair) => {
    if (p2.x < p1.x) {
        const temp = p1.x;
        p1.x = p2.x;
        p2.x = temp;

        // p1.x = p1.x + p2.x;
        // p2.x = p1.x - p2.x;
        // p1.x = p1.x - p2.x;
    }
    if (p2.y < p1.y) {
        const temp = p1.y;
        p1.y = p2.y;
        p2.y = temp;

        // p1.y = p1.y + p2.y;
        // p2.y = p1.y - p2.y;
        // p1.y = p1.y - p2.y;
    }
}

const fixRatio = (p1: Pair, p2: Pair) => {
    const targetRatio = 4 / 3

    const diffX = (p2.x - p1.x)
    const diffY = (p2.y - p1.y)

    if (diffX >= diffY) {
        p2.x = p1.x + (diffY * targetRatio)
    } else {
        p2.y = p1.y + (diffX / targetRatio)
    }
}

const canvas: HTMLCanvasElement = <any>document.getElementById('canvas')!
const zoomBtn: HTMLButtonElement = <any>document.getElementById('zoomBtn')!
const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!
const imageData = ctx.createImageData(WIDTH, HEIGHT)

const m = Mandelbrot.new(WIDTH, HEIGHT)
const bitmapPtr = m.bitmap()
const bitmap = new Uint8Array(memory.buffer, bitmapPtr, WIDTH * HEIGHT * 4)

let clickCounter = 0
let pairFirst: Pair = new Pair(0, 0)
let pairSecond: Pair = new Pair(0, 0)

const generateFractal = (m: Mandelbrot, p1: Pair, p2: Pair) => {
    const startGenerate = performance.now()

    swapPair(p1, p2)
    fixRatio(p1, p2)
    p1.transform()
    p2.transform()

    console.log(`x1: ${p1.x.toFixed(2)}, y1: ${p1.y.toFixed(2)}`)
    console.log(`x2: ${p2.x.toFixed(2)}, y2: ${p2.y.toFixed(2)}`)

    m.draw_fractal(p1.x, p1.y, p2.x, p2.y)
    m.write_to_bitmap()

    const endGenerate = performance.now()
    const generate: HTMLParagraphElement = <any>document.getElementById('generate')!
    generate.textContent = `Generation took ${(endGenerate - startGenerate).toFixed(
        2
    )} milliseconds`
}

const drawFractal = () => {
    const startDraw = performance.now()

// Iterate through every pixel
    for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] = 0
        imageData.data[i + 1] = bitmap[i + 1] ?? 0
        imageData.data[i + 2] = bitmap[i + 2] ?? 0
        imageData.data[i + 3] = 255
    }

// Draw image data to the canvas
    ctx.putImageData(imageData, 0, 0)
    const endDraw = performance.now()

    const draw: HTMLParagraphElement = <any>document.getElementById('draw')!

    draw.textContent = `Drawing took ${(endDraw - startDraw).toFixed(
        2
    )} milliseconds`
}

const drawVertLine = (x: number) => {
    x = Math.floor(x)
    for (let i = 0; i < imageData.data.length; i += 4) {
        if (i % (4 * WIDTH) == 4 * x) {
            imageData.data[i] = 255
            imageData.data[i + 1] = 255
            imageData.data[i + 2] = 255
            imageData.data[i + 3] = 255
        }
    }
    ctx.putImageData(imageData, 0, 0)
}

const drawHorsLine = (y: number) => {
    y = Math.floor(y)
    for (let i = 0; i < imageData.data.length; i += 4) {
        if (Math.floor(i / (4 * 800)) == y) {
            imageData.data[i] = 255
            imageData.data[i + 1] = 255
            imageData.data[i + 2] = 255
            imageData.data[i + 3] = 255
        }
    }
    ctx.putImageData(imageData, 0, 0)
}

// Records and draws coordinate pair for zoom in
canvas.addEventListener('click', (event) => {
    const boundingRect = canvas.getBoundingClientRect()

    const canvasLeft = (event.clientX - boundingRect.left)
    const canvasTop = (event.clientY - boundingRect.top)

    if (clickCounter == 0) {
        pairFirst.x = canvasLeft
        pairFirst.y = canvasTop
        drawVertLine(canvasLeft)
        drawHorsLine(canvasTop)
        clickCounter = 1
    } else if (clickCounter == 1) {
        pairSecond.x = canvasLeft
        pairSecond.y = canvasTop

        drawVertLine(canvasLeft)
        drawHorsLine(canvasTop)

        clickCounter = 2
    }
})

zoomBtn.addEventListener('click', () => {
    generateFractal(m, pairFirst, pairSecond)
    drawFractal()
    clickCounter = 0
})

generateFractal(m, new Pair(0, 0), new Pair(WIDTH, HEIGHT))
drawFractal()
