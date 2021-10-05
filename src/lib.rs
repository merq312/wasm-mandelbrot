mod utils;

use num::complex::Complex;
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, wasm-mandelbrot!");
}

const WIDTH: usize = 800;
const HEIGHT: usize = 600;
const MAX_ITERATIONS: usize = 1000;

#[wasm_bindgen]
struct Mandelbrot {
    fractal: Vec<u32>,
    hist: Vec<u32>,
    total: u32,
}

#[wasm_bindgen]
struct CoordinatePair {
    x1: f32,
    x2: f32,
    y1: f32,
    y2: f32,
}

#[wasm_bindgen]
impl CoordinatePair {
    pub fn transform_coords(&mut self) {
        // FIXME: Why are all coords divided by height???
        self.x1 = 2.0 * self.x1 / HEIGHT as f32 - 2.0;
        self.x2 = 2.0 * self.x2 / HEIGHT as f32 - 2.0;
        self.y1 = 2.0 * self.y1 / HEIGHT as f32 - 1.0;
        self.y2 = 2.0 * self.y2 / HEIGHT as f32 - 1.0;
    }
}

#[wasm_bindgen]
impl Mandelbrot {
    pub fn new(&mut self) {
        self.fractal = vec![0; WIDTH * HEIGHT];
        self.hist = vec![0; MAX_ITERATIONS];
        self.total = 0;
    }

    pub fn get_iterations(x: f32, y: f32) -> usize {
        let mut z = Complex::new(0.0, 0.0);
        let c = Complex::new(x, y);

        let mut iterations = 0;

        while iterations < MAX_ITERATIONS {
            z = z * z + c;

            if z.norm() > 2.0 {
                break;
            }

            iterations += 1;
        }

        iterations
    }

    pub fn draw_fractal(&mut self, x1: f32, y1: f32, x2: f32, y2: f32) {
        self.hist = self.hist.iter().map(|_i| 0).collect();
        self.total = 0;

        let span_x = x2 - x1;
        let span_y = y1 - y2;

        let trans_x = span_x / 2.0 - x2;
        let trans_y = -(span_y / 2.0 + y2);

        for j in 0..HEIGHT {
            for i in 0..WIDTH {
                let scale_x = (span_x * i as f32 / WIDTH as f32 - span_x / 2.0) - trans_x;
                let scale_y = -(span_y * j as f32 / HEIGHT as f32 - span_y / 2.0) - trans_y;

                let iterations = Mandelbrot::get_iterations(scale_x, scale_y);

                self.fractal[j * WIDTH + 1] = iterations as u32;

                if iterations != MAX_ITERATIONS {
                    self.hist[iterations] += 1;
                }
            }
        }

        for i in 0..MAX_ITERATIONS {
            self.total += self.hist[i];
        }
    }
}
