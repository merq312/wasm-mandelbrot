//! Test suite for the Web and headless browsers.

#![cfg(target_arch = "wasm32")]

extern crate wasm_bindgen_test;
use wasm_bindgen_test::*;

wasm_bindgen_test_configure!(run_in_browser);

// #[wasm_bindgen_test]
// fn pass() {
//     assert_eq!(1 + 1, 2);
// }

extern crate wasm_mandelbrot;
use wasm_mandelbrot::CoordinatePair;
use wasm_mandelbrot::Mandelbrot;

#[wasm_bindgen_test]
pub fn test_get_iterations() {
    // Origin should reach max iterations
    let out1 = Mandelbrot::get_iterations(0.0, 0.0);
    assert_eq!(1000, out1);

    // 3,3 should coverge to 0
    let out2 = Mandelbrot::get_iterations(3.0, 3.0);
    assert_eq!(0, out2);
}
