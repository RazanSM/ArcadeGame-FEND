'use strict';

// Enemies player's must avoid
const Enemy = function(row) {
    //row postions for enemies
    this.row = row;
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';    
};

//update the enemy's position
Enemy.prototype.update = function(dt) {
    // multiply any movement by the dt parameter
    if (this.x < 6 * 101) {
        this.x += this.speed * dt;
    } else {
        //randomly set the start point of an enemy
        this.x = (-101) - Math.floor(Math.random() * 300);
        //set speed randomly
        this.speed = parseInt(80 + Math.random() * 300, 10);
    }
};

//draw the enemy on the game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, (this.row-1) * 70);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


//define the Player class
const Player = function () {
    this.sprite = 'images/char-cat-girl.png';
    
    //position of the player on the grid
    this.col = 3;
    this.row = 5;
    //moves distance for the player
    this.moveDistanceX = 101;
    this.moveDistanceY = 73;
    //Initial x, y coordinator of the player
    this.x = 200;
    this.y = 300;  
};


//define Player update function
Player.prototype.update = function (key) {
    this.handleInput(key);     
};

//to reset the position of Player
Player.prototype.reset = function () {
    this.row = 5;
    this.col = 3;

    this.x = 200;
    this.y = 300;
};

//draw the Player on the game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//to define the function of each arrow key 
Player.prototype.handleInput = function (keypress) {
    //pressed left key 
    if (keypress === 'left' && this.col > 1) {
        this.col--;
        this.x = (this.col - 1) * this.moveDistanceX;
    }
    //pressed up key 
    else if (keypress === 'up' && this.row >= 1) {
        this.row--;
        this.y = (this.row - 1) * this.moveDistanceY;
    }
    //pressed up key  
    else if (keypress === 'right' && this.col < 5) {
        this.col++;
        this.x = (this.col - 1) * this.moveDistanceX;
    }
    //pressed down key  
    else if (keypress === 'down' && this.row < 6) {
        this.row++;
        this.y = (this.row - 1) * this.moveDistanceY;
    } 
    //when reached the river row
    else if (this.row === 1) {
        alert("YOU WIN!");
        this.reset();
    }
};

// Creat enemy objects and Place them in an array called allEnemies
// Place the player object in a variable called player
const firstEnemy = new Enemy(2);
const seconsEnemy = new Enemy(3);
const thirdEnemy = new Enemy(4);
const allEnemies = [firstEnemy, seconsEnemy, thirdEnemy];
const player = new Player();

//collisions function
function checkCollisions(allEnemies, player) {
    for (let i = 0, len = allEnemies.length; i < len; i++) {
        let enemyX = allEnemies[i].x;
        let playerX = player.x;

        if (allEnemies[i].row === player.row) {
            // calculate distance to judge if it is a collision event
            if(Math.abs(enemyX - playerX) <= 78){
                //alert('stop');
                player.reset();
            } 
        }
    }
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});