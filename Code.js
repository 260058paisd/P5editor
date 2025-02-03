let car;

// Load the image and create a p5.Image object.
function preload() {
  car = loadImage('/assets/Car.png');
  
}

function setup() {
  createCanvas(500, 500);
  background(200)

  
  car.resize(0,150)
  // Draw the car.
  
  
  car.loadPixels()
  
  // A double for loop. First we loop over the y, then the x
  for (let y = 0; y < car.height; y++) {
    for (let x = 0; x < car.width; x++) {

      // The equation for pixel index in a double loop is y * width + x
      // Multiply by 4 since we have 4 color channels
      const index = (y * car.width + x) * 4;

      // Get the individual color channels
      const r = car.pixels[index + 0];
      const g = car.pixels[index + 1];
      const b = car.pixels[index + 2];
      const a = car.pixels[index + 2];

      // Do something with the pixels

      // if red or green or blue is greater than 100, invert it
      if (r < 100 || g < 100 || g < 100) {
        car.pixels[index + 0] = 255 - r;
        car.pixels[index + 1] = 255 - g;
        car.pixels[index + 2] = 255 - b;
      }
    }
  }
  
  image(car, 75, 200);
}
