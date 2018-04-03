// Enemies our player must avoid
let counter = document.querySelector('.score');
let score = 0;
let displayLives = document.querySelector('lives');
let lives = 3;


const Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = 100 + Math.floor(Math.random() * 250);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x > 510){
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 250);
    }
        //CHECKS IF COLLISION OCCURED
  this.checkCollision();
};

Enemy.prototype.checkCollision = function(){
            //CHECKS IF COLLISION OCCURED
    if (player.x < this.x + 70 &&
        player.x + 70 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
        //resets the position of player
        player.reset();
    }
}
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
}

Player.prototype.update = function (dt){
    if (player.y < 0) {
        score++;
        counter.innerHTML = score;
        player.reset();
    }
};

Player.prototype.render = function (){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function(){
    this.x = 202;
    this.y = 405;
}


Player.prototype.handleInput = function (keyPress) {
    if (keyPress == 'left' && this.x >= 0){
        this.x -= 102;
    }
    if (keyPress == 'right' && this.x < 405){
        this.x += 102;
    }
    if (keyPress == 'up' && this.y > 0){
        this.y -= 83;
    }
    if (keyPress == 'down' && this.y < 405){
        this.y += 83;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = new Array();
let enemyLocations = [63, 147, 230];

enemyLocations.forEach(function (locationY){
    enemy = new Enemy(-55, locationY, 200);
    allEnemies.push(enemy);
});

let player = new Player(202, 405);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
