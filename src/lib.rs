mod utils;

use num::complex::Complex;
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

const MAX_ITERATIONS: usize = 1000;

#[wasm_bindgen]
pub struct Mandelbrot {
    fractal: Vec<u32>,
    hist: Vec<u32>,
    mem: Vec<u8>,
    total: u32,
    width: usize,
    height: usize,
}

#[wasm_bindgen]
impl Mandelbrot {
    pub fn new(width: usize, height: usize) -> Mandelbrot {
        let fractal = vec![0; width * height];
        let hist = vec![0; MAX_ITERATIONS];
        let mem = vec![0; width * height * 4];
        let total = 0;

        Mandelbrot {
            fractal,
            hist,
            mem,
            total,
            width,
            height,
        }
    }

    pub fn get_hist(&self) -> Vec<u32> {
        self.hist.clone()
    }

    fn get_iterations(x: f32, y: f32) -> usize {
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

        for j in 0..self.height {
            for i in 0..self.width {
                let scale_x = (span_x * i as f32 / self.width as f32 - span_x / 2.0) - trans_x;
                let scale_y = -(span_y * j as f32 / self.height as f32 - span_y / 2.0) - trans_y;

                let iterations = Mandelbrot::get_iterations(scale_x, scale_y);

                self.fractal[j * self.width + i] = iterations as u32;

                if iterations != MAX_ITERATIONS {
                    self.hist[iterations] += 1;
                }
            }
        }

        for i in 0..MAX_ITERATIONS {
            self.total += self.hist[i];
        }
    }

    pub fn write_to_bitmap(&mut self) {
        let mut row = self.mem.iter_mut();
        let mut pixel: Vec<&mut u8> = row.by_ref().take(4).collect();

        for j in 0..self.height {
            for i in 0..self.width {
                let iterations = self.fractal[j * self.width + i] as usize;
                let mut blue = 0;
                let mut green = 0;

                if iterations != MAX_ITERATIONS {
                    let mut hue = 0.0;
                    for i in 0..iterations {
                        hue += (self.hist[i] as f32) / self.total as f32;
                    }
                    blue = f32::powf(255.0, hue) as u8;
                    green = f32::powf(186.0, hue) as u8;
                }

                *pixel[1] = green;
                *pixel[2] = blue;

                pixel = row.by_ref().take(4).collect();
            }
        }
    }

    pub fn bitmap(&mut self) -> *const u8 {
        self.mem.as_ptr()
    }
}
