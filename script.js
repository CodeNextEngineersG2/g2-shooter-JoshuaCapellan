



// UI Variables
var canvas;
var canvasWidth;
var canvasHeight;
var gameScreen;
var scoreDisplay;

// Game Variables
var gameRunning;
var shipShooting;
var alienShooting;
var score;

// Ship Variables
var shipDiameter;
var shipX;
var shipY;
var shipSpeed;
var shipColor;

// Bullet Variables
var bulletDiameter;
var bulletX;
var bulletY;

// Alien Variables
var alienDiameter;
var alienX;
var alienY;
var alienVelocity;

// Alien Bullet Variables
var alienBulletDiameter;
var alienBulletX;
var alienBulletY;

function setup(){
	canvasWidth=500;
	canvasHeight=400;
	canvas=createCanvas(canvasWidth,canvasHeight);
	
	gameScreen = select('#game-screen');
	canvas.parent("game-screen");

	scoreDisplay = select ("#score-display");

	resetGame();
}

function draw(){
	if (gameRunning == true){
		background(125);
	
		noStroke();

		fill(0);
		drawShip();
		
		fill (108, 196, 23);
		drawAlien();

		if (shipShooting == true){
		drawBullet();
		}

		if (alienShooting == true){
			drawAlienBullet();
		}

		checkCollision (shipX, shipY, shipDiameter, alienBulletX, alienBulletY, alienBulletDiameter);
	}
}

function drawShip(){
	ellipse(shipX,shipY,shipDiameter,shipDiameter);
	fill (0);

	if (keyIsDown(LEFT_ARROW) && shipX > 40){
		shipX -= shipSpeed;
	}

	else if (keyIsDown(RIGHT_ARROW) && shipX < 460) {
		shipX += shipSpeed;
	}
}

function drawBullet (){
	if (bulletY >= 0){
	fill (0);
	ellipse(bulletX,bulletY,bulletDiameter,bulletDiameter);

	}

	else {
		shipShooting = false;  
	}

	var hitAlien = checkCollision (alienX, alienY, alienDiameter, bulletX, bulletY, bulletDiameter);

	if (bulletY > 0 && !hitAlien) {
		bulletY -= 13;
	}

	else if (hitAlien){
		resetAlien();
		alienVelocity++;
		shipShooting = false;
		
		score ++;
		scoreDisplay.html(score);
	}

	else {
		shipShooting = false;
	}

	
}

function keyPressed(){
  if (keyCode === 32 && shipShooting==false && gameRunning){
  	bulletX = shipX;
  	bulletY = shipY;

  	shipShooting = true;
  }
}

function drawAlien(){
	ellipse(alienX,alienY,alienDiameter,alienDiameter);
	alienX += alienVelocity;

	if (alienX >= 475){
		alienVelocity = -10;
	}

	else if (alienX <= 25){
		alienVelocity = 10;
	}

	if (random(4) < 1 && !alienShooting){
		alienBulletY = alienY;
		alienBulletX = alienX;

		alienShooting = true;
	}
}

function drawAlienBullet (){
	var hitShip = checkCollision (shipX, shipY, shipDiameter, alienBulletX, alienBulletY, alienBulletDiameter);

	if (alienBulletY < 400 && !hitShip){	
		fill(108, 196, 23);
		ellipse(alienBulletX,alienBulletY,alienBulletDiameter,alienBulletDiameter);
		alienBulletY +=10;
	}

	else if (hitShip){
		gameOver();
	}

	else {
		alienShooting = false;
	}
}

function checkCollision(aX, aY, aD, bX, bY, bD){
	var distance = dist(aX, aY, bX, bY);

	if(distance <= aD/2 + bD/2){
		return true;
	}
	else {
		return false;
	}
}

function resetAlien(){
	alienX = 25;
	alienY = 25;
}

function gameOver(){
	gameRunning = false;
	resetGame();

	window.alert ("Game Over");
}

/*
 * checkCollision(aX, aY, aD, bX, bY, bD)
 * This function first calculates the distance between two circles based on
 * their X and Y values. Based on the distance value, the function returns
 * "true" if the circles are touching, and false otherwise.
 * Circles are considered touching if
 * (distance <= (circle1Diameter + circle2Diameter) / 2)
 */


/*
 * 
 * This function is called once. Sets up the canvas, accesses HTML elements with
 * select(), and adds event listeners to those elements. Sets initial values of
 * variables by calling resetGame().
 */


/*
 * gameOver()
 * This function stops the game from running and shows an alert telling the
 * player what their final score is. Finally it resets the game by calling
 * resetGame()
 */


/*
 * resetGame()
 * This function "resets the game" by initializing ship, alien, and game
 * variables.
 */

 function resetGame (){
 	score = 0;
	scoreDisplay.html(score);

	shipColor = 255;
	shipDiameter = 80;
	shipSpeed = 10;
	shipX = width/2;
	shipY = 360;

	bulletDiameter = 20;
	shipShooting = false;

	alienDiameter = 50;
	alienVelocity = 10;
	alienX = 25;
	alienY = 25;

	alienBulletDiameter = 15;
	alienShooting = false;

	gameRunning = true;
 }


/*
 * draw()
 * This function animates the ship, alien, and both kinds of bullets, but only
 * if the game is running.
 */


/*
 * drawShip()
 * This function draws the player's ship. It also controls the ship's
 * x value by checking if the player is holding down the left or right keys.
 */


/*
 * keyPressed()
 * This function runs automatically when the player presses the spacebar
 * (keyCode === 32). If they do, and a bullet is not currently being fired
 * ("shipShooting" variable is false), it positions the bullet relative to the
 * ship. Then it sets the "shipShooting" variable to "true", indicating a ship
 * bullet is currently being fired.
 */


/*
 * drawBullet()
 * This function draws a bullet. It also checks to see if the bullet has hit
 * the alien. If it has, the alien is reset to the top-left of the screen
 * and the player earns a point. The alien aslo becomes faster (i.e., harder
 * to hit) each time it is hit by a bullet.
 */


/*
 * drawAlien()
 * This function draws an alien. It also checks to see if the alien has touched
 * the player's ship. If it has, the function calls gameOver().
 */


/*
 * drawAlienBullet()
 * This function behaves much like drawBullet(), only it fires from the alien
 * and not the player's ship. If the bullet hits the player, it's game over.
 */


/*
 * resetAlien()
 * This function sets the alien to its original position at the top-left of
 * the screen. It also sets its velocity to its absolute value (so, if the
 * velocity was negative when it died, it becomes positive upon reset, making
 * it always start by moving to the right).
 */


/*
 * checkCollision(aX, aY, aD, bX, bY, bD)
 * This function first calculates the distance between two circles based on
 * their X and Y values. Based on the distance value, the function returns
 * "true" if the circles are touching, and false otherwise.
 * Circles are considered touching if
 * (distance <= (circle1Diameter + circle2Diameter) / 2)
 */
