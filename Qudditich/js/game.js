var backroundImage;

function setup() {
    createCanvas(250, 250);
    backroundImage = loadImage("img/harry.png")
}

function draw() {
    // background(0, 0, 100);
    
    background(backroundImage);
}