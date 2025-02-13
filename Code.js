let car;
let other
let picker
let wheel

// Load the image and create a p5.Image object.
function preload()
{
  car = loadImage('/assets/Car.png');
  other = loadImage('/assets/Other.png')
  wheel = loadImage('/assets/Wheel.png')
  car.loadPixels()
}

function setup() 
{
  createCanvas(500, 500);
  background(200)
  
  picker = createColorPicker("red")
  picker.position(0,0)

  car.resize(0,150)
  other.resize(0,150)
  wheel.resize(0,80)
}

function draw()
{
  colorizeCar()
  car.updatePixels()
  image(car, 75, 200);
  image(other, 75, 200)
  image(wheel, 90, 270)
  image(wheel, 335, 270)
}

let myColor

//Color changing function.
function colorizeCar()
{
  //Only run if new color has been selected.
  if(myColor != picker.color())
  {
    myColor = picker.color()
    //Iterate through every pixel.
    for (let i = 0; i < car.pixels.length; i += 4) 
    {
      //Ignore transparent pixels.
      if(car.pixels[1 + 3] != 1)
      {
        car.pixels[i] = red(myColor)
        car.pixels[i + 1] = green(myColor)
        car.pixels[i + 2] = blue(myColor)
      }
    }
  }
}
