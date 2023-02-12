mod utils;
use std::fmt;
use wasm_bindgen::prelude::*;

extern crate js_sys;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
#[repr(u8)] // represents each Cell as a byte
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Cell {
    Dead = 0,
    Alive = 1,
}

#[wasm_bindgen]
pub struct Universe {
    width: u32,
    height: u32,
    cells: Vec<Cell> 
}

#[wasm_bindgen]
impl Universe {
    pub fn new(height: u32, width: u32, random: bool) -> Universe {
        let cells = (0..height*width).map(|i| {
            match random {
                true => {
                    if js_sys::Math::random() < 0.5 {Cell::Alive}
                    else {Cell::Dead}
                },
                false => {
                    if i%2 == 0 || i%7 == 0 {Cell::Alive}
                    else {Cell::Dead} 
                }
            }
        }).collect();
        Universe {height, width, cells}
    }
    pub fn width(&self) -> u32 {
        self.width
    }
    pub fn height(&self) ->u32 {
        self.height
    }
    pub fn cells(&self) -> *const Cell {
        self.cells.as_ptr()
    }
    pub fn render(&self) -> String {
        self.to_string()
    }

    pub fn get_cell(&self, row: u32, column: u32) -> usize {
        return (row*self.width + column) as usize
    }

    fn live_neighbour_count(&self, row: u32, column: u32) -> u8 {
        let mut live = 0;
        for delta_row in [self.height - 1, 0, 1] {
            for delta_column in [self.width - 1, 0, 1] {
                if delta_row == 0 && delta_column == 0 {
                    continue;
                }
                let r = (row + delta_row)%self.height;
                let c = (column + delta_column)%self.width;
                let index = self.get_cell(r, c);
                live += self.cells[index] as u8;
            }
        }
        live
    }

    pub fn tick(&mut self) {
        let mut new_gen = self.cells.clone();
        for r in 0..self.height {
            for c in 0..self.width {
                let idx = self.get_cell(r, c);
                let live_neighbours = self.live_neighbour_count(r, c);
                new_gen[idx] = match(live_neighbours, self.cells[idx]) {
                    (3, Cell::Dead) => Cell::Alive, // re-birth
                    (x, Cell::Alive) if x < 2 => Cell::Dead, // under population (no sex)
                    (2, Cell::Alive) | (3, Cell::Alive) => Cell::Alive, // perfectly balanced
                    (x, Cell::Alive) if x > 3 => Cell::Dead, // over population
                    (_, x) => x // same old same old
                }
            }
        }

        self.cells = new_gen;
    }
}

impl fmt::Display for Universe {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        for line in self.cells.as_slice().chunks(self.width as usize) {
            for &cell in line {
                let symbol = if cell == Cell::Alive {'◼'} else {'◻'};
                write!(f, "{}", symbol)?;
            }
            write!(f, "\n")?;
        }
        Ok(())
    }
}