//Initialize variables.

//This variable name is very important, this is the name of the car and it's feelings will be hurt if you call it anything else. Please to not hurt the car's feelings.
let Shlungauhlobungus; //Car body sprite.
let name //Text sprite.
let other //Car body details sprite.
let picker //Color Picker HTML object.
let picker2 //Color Picker HTML object.
let wheel //Wheel sprite.
let slider //Slider HTML object.
let currSpeed = 0 //The factor moved every frame by certain sprites.
let pos = 0 //The distance road sprite has moved from x = 0.
let deg = 0 //The degree a wheel has rotated from 0.
let deg2 = 0 //The degree the other wheel has rotated from 0.

// Load the image and create a p5.Image object.
function preload() {
  
  soundFormats("mp3")
  
  carNoise = loadSound('/assets/carNoise.mp3')
  
  //Load all parts of car as separate images for simplicity.
  Shlungauhlobungus = loadImage('/assets/Car.png');
  other = loadImage('/assets/Other.png')
  wheel = loadImage('/assets/Wheel.png')
  name = loadImage('/assets/Text.png')
  
  //Load road.
  road = loadImage('/assets/Road.png')
  
  //Initialize car main img's pixel array.
  Shlungauhlobungus.loadPixels()
  
  //Initialize text img's pixel array
  name.loadPixels()
}

function setup() {
  
  //Create sky.
  createCanvas(500, 500);
  background("rgb(154,234,255)")
  
  //Create grass/ground.
  push()
  fill(115,206,115)
  ground = rect(0,250,500,250)
  pop()
  
  //Create color picker for colorizer function.
  picker = createColorPicker("red")
  picker.position(0,0)
  
  picker2 = createColorPicker("black")
  picker2.position(0,30)
  
  //Create slider for speed controller.
  slider = createSlider(0, 150, 0)
  slider.position(365,0)

  
  //Resize images to fit on canvas.
  Shlungauhlobungus.resize(0,150)
  other.resize(0,150)
  wheel.resize(80,80)
  name.resize (200,0)
  
  angleMode(DEGREES) //Use radians for rotation.
  
}

function draw(){
    
  //Move road by currSpeed value every frame.
  pos -= currSpeed
  if(pos < -200)
  {
    pos = 0
  }
  image(road, pos, 220)
  
  
  //Change car color to color on first slider.
  picker.changed(colorizeCar)
  Shlungauhlobungus.updatePixels()
  
  //Change text color to color on second slider.
  picker2.changed(colorizeName)
  name.updatePixels()
  
  //Draw all parts of car.
  image(Shlungauhlobungus, 75, 200);
  image(other, 75, 200)
  image(name, 145,245)
  
  //Rotate wheels by speed currSpeed value every frame.
  push()
  deg += currSpeed
  translate(130, 310)
  rotate(deg)
  image(wheel, -40, -40)
  pop()
  
  push()
  deg2 += currSpeed
  translate(375, 310)
  rotate(deg2)
  image(wheel, -40, -40)
  pop()
  
  //Gradually scale speed to the value selected on the slider to simulate inertia.
  let targSpeed = slider.value()
  
  //If car is accelerating.
  if(currSpeed == 0 & targSpeed >= 1)
  {
    //Start playing noises.
    carNoise.playMode('restart')
    carNoise.loop(true)
    carNoise.setVolume(0.5)
    carNoise.play()
  }
  //If car is declerating.
  if(currSpeed != 0 & targSpeed == 0)
  {
    //Stop playing noises.
    carNoise.playMode('sustain')
    carNoise.loop(false)
    carNoise.setVolume(0.0, 1, 0)
  }
  
  //Inertia simulation.
  if(currSpeed < targSpeed)
  {
    currSpeed += 1
  }
  if(currSpeed > targSpeed)
  {
    currSpeed -= 1
  }
}

//Color changing function for car.
function colorizeCar()
{
  //Iterate through every pixel.
  for (let i = 0; i < Shlungauhlobungus.pixels.length; i += 4) 
  {
    //Ignore transparent pixels.
    if(Shlungauhlobungus.pixels[1 + 3] != 1)
    {
      //Change color to selected color.
      Shlungauhlobungus.pixels[i] = red(picker.color())
      Shlungauhlobungus.pixels[i + 1] = green(picker.color())
      Shlungauhlobungus.pixels[i + 2] = blue(picker.color())
    }
  }
}

//Color changing function for text.
function colorizeName()
{
  //Iterate through every pixel.
  for (let i = 0; i < name.pixels.length; i += 4) 
  {
    //Ignore transparent pixels.
    if(name.pixels[1 + 3] != 1)
    {
      //Change color to selected color.
      name.pixels[i] = red(picker2.color())
      name.pixels[i + 1] = green(picker2.color())
      name.pixels[i + 2] = blue(picker2.color())
    }
  }
}
