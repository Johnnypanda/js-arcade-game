
const TITLE_WIDTH = 101,
      TITLE_HEIGHT = 83;
const Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here
    // The image/sprite for our enemies, this uses
    // a helper to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = 100 + Math.floor(Math.random() * 250);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x > 510){
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 250);
    }
    this.checkCollision();
};

//CHECKS IF COLLISION OCCURED
Enemy.prototype.checkCollision = function(){
            //Compares position of a player and a bug, if they match - collision occured
    if (player.x < this.x + 70 &&
        player.x + 70 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
        //If collision occured - reset the player's position
        player.reset();
        player.score = 0;
    }
}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //Display athe score on canvas
    ctx.font = "30px Roboto";
    ctx.fillText(`Score: ${player.score}`, 202 , 30);
};

// The player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function() {
    this.sprite = 'images/char-boy.png';
    this.startingX = 202;
    this.startingY = 405;
    this.x = this.startingX;
    this.y = this.startingY;
    this.score = 0;
}

//Player moves differently from enemies, so we dont need to use multiplied movement
Player.prototype.update = function (dt){
    if (this.y < 0) {
            this.reset();
            this.score++;
    }
};
//Draws the player
Player.prototype.render = function (){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//Reset the position of the player
Player.prototype.reset = function(){
    this.x = player.startingX;
    this.y = player.startingY;
}

//Define the movement of the player on the keypress
Player.prototype.handleInput = function (keyPress) {
    if (keyPress == 'left' && this.x >= 0){
        this.x -= TITLE_WIDTH;
    }
    if (keyPress == 'right' && this.x < 405){
        this.x += TITLE_WIDTH;
    }
    if (keyPress == 'up' && this.y > 0){
        this.y -= TITLE_HEIGHT;
    }
    if (keyPress == 'down' && this.y < 405){
        this.y += TITLE_HEIGHT;
    }
}

// Now instantiate our objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
//Enemy starting locations
let enemyLocations = [63, 147, 230];

//Create the array of 3 enemies
for(let enemyLocation of enemyLocations){
    allEnemies.push(new Enemy(-60, enemyLocation, 200));
}

//Create the new player
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
