var ship;
var shipImage;

// your new asteroids variable
var asteroids;

// new variables for the bullets
var bullets;
var bulletImage;

function setup() {
    
    createCanvas(windowWidth, windowHeight);

    ship = createSprite(width/2, height/2);
    
    // set our maxSpeed to 6. 6 what? 6 speed.
    ship.maxSpeed = 6;
    
    // set friction to allow our ship to eventually slow to a stop
    ship.friction = .98;

    shipImage = loadImage("img/asteroids_ship0001.png")
    
    // new bulletImg assignment
    bulletImage = loadImage("img/asteroids_bullet.png");

    ship.addImage("normal", shipImage);
    
    ship.addAnimation("thrust", "img/asteroids_ship0002.png", "img/asteroids_ship0003.png", "img/asteroids_ship0004.png", "img/asteroids_ship0005.png", "img/asteroids_ship0006.png", "img/asteroids_ship0007.png");

    // your new asteroids group
    asteroids = new Group();

    bullets = new Group();
  
    // the basic for loop that will iterate through 8 times starting with 0
    for(var i = 0; i<8; i++) {

      // pick an angle between 0 and 360
      var ang = random(360);
      // calculate a x position somewhere along the line at the chosen angle, outside the canvas area.
      var px = width/2 + 1000 * cos(radians(ang));
      //calculate a y position somewhere along the line at the chosen angle, outside the canvas area.
      var py = height/2+ 1000 * sin(radians(ang));
      createAsteroid(3, px, py);
  
  }
    
}

function draw() {
    
   background(254,248,248);
   
  // set the text fill
  fill(254,190,190);

  // set the text alignment
  textAlign(RIGHT);

  // set the text size
  textSize(12);
  
  //how do we control our ship
  text("W + A + D keys to move. K to shoot", width-30, 30);
  
  // set up a for loop based on the length of any sprite
for(var i=0; i<allSprites.length; i++) {
  // create an array for each individual sprite
  var s = allSprites[i];

  // If the sprite's x position is less than or equal to 0 (the left edge),
  // then set the new x position to the value of the width of the window (on the right)
  if(s.position.x<-0) s.position.x = width;

  // If the sprite's x position is greater than the width of the windows (right edge)
  // then set the new x position to be 0 (left edge)
  if(s.position.x>width) s.position.x = 0;

  // If the sprite's y position is less than or equal to 0 (the top)
  // then set the new y position to be the height of the window (the bottom)
  if(s.position.y<-0) s.position.y = height;

  // If the sprite's y position is greater than the windows's height (bottom)
  // then set the new y position to be 0 (the top)
  if(s.position.y>height) s.position.y = 0;
  

}

     // rotateleft
  if(keyDown("A"))
     ship.rotation -=4;
     
     //rotate right
  if(keyDown("D"))
     ship.rotation += 4;
     
    // before the drawSprites() method
   
   
   if(keyDown("W"))
    {
    ship.addSpeed(.2, ship.rotation);
    
    ship.changeAnimation("thrust")
 }
 if(keyWentDown("K"))
 
 {
   var bullet = createSprite(ship.position.x, ship.position.y);
  
   bullet.addImage(bulletImage);
   bullet.setSpeed(10+ship.getSpeed(), ship.rotation);
   bullet.life = 30;
   bullets.add(bullet);
  }
  else
    ship.changeAnimation("normal");
    
    //before the drawSprotes() method
 
 drawSprites();
}

function createAsteroid(type, x, y) {
  var a = createSprite(x, y);
  var img  = loadImage("img/asteroid"+floor(random(0,3))+".png");
  a.addImage(img);

  a.type = type;
  a.setSpeed(2.5-(type/2), random(360));
  a.rotationSpeed = .5;
  
    asteroids.add(a);
  return a;
}

function asteroidHit(asteroid, bullet) {

  bullet.remove();
  asteroid.remove();
}