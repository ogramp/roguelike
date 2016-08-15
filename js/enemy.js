var Enemy = function(x, y) {
	this.currentTile = roguelike.level.getTileByCoord(x, y);
	this.target = roguelike.player;
	this.skipMove = game.rnd.integerInRange(0, 1); // Make the zombie movement a bit more random.

	// Zombie animation frames.
	var zFrames = [
		[
			[6, 7, 8, 9, 10, 11], // Naked zombie idle frames.
			[42, 43], // Naked zombie attack frames.
		],
		[
			[12, 13, 14, 15, 16, 17], // Red Coat zombie idle frames.
			[44, 45] // Red Coat zombie attack frames.
		]
	];

	var z = zFrames[game.rnd.integerInRange(0, zFrames.length-1)]; // Choose zombie texture randomly.

	// Extend the Phase Sprite.
	Phaser.Sprite.call(this, game, this.currentTile.x+16, this.currentTile.y, 'scavenger_ss', z[0]);

	// Set the horizontal anchor for sprite direction flipping.
	this.anchor.setTo(0.5, 0);

	// Enemy animations.
	this.animations.add('idle', z[0], game.rnd.integerInRange(4, 6), true);
	this.animations.add('attack', z[1], 10, false);

	// Start the idle animation. Yes.
	this.animations.play('idle');

	// Attack animation key for testing.
	var attackKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
	attackKey.onDown.add(function() {
		this.animations.play('attack').onComplete.add(function() {
			this.animations.play('idle');
		}, this);
	}, this);
};
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.attemptMove = function() {
	// The enemy moves once every two times the player moves. Check if the enemy is supposed
	// to skip move this turn.
	if(this.skipMove) {
		this.skipMove = !this.skipMove;
		return;
	} else {
		this.skipMove = !this.skipMove;
	}

	// Find out the direction the enemy wants to move to.
	// For that we create the default dir variable.
	var dir = {x: 0, y: 0};
	var targetDirOk = true; // Set the flag that we can move to true.

	// Calculate how many tiles away the enemy is from the player horizontally and vertically.
	var hor = Math.abs(this.target.currentTile.tilePosition.x - this.currentTile.tilePosition.x);
	var ver = Math.abs(this.target.currentTile.tilePosition.y - this.currentTile.tilePosition.y);

	// If we are further horizontally, attempt horizntal movement
	if(hor > ver) {
		// Decide the horizontal direction.
		dir.x = this.target.x > this.x ? 1 : -1;
		// Face the sprite in the correct direction.
		if(dir.x !== 0) {
			this.scale.x = -1*dir.x;	
		}
	} else if(hor < ver) { // Else attempt vertical movement.
		// Decide the veritical direction.
		dir.y = this.target.y > this.y ? 1 : -1;
	}

	// Get the tile object in the desired direction.
	var targetTile = roguelike.level.getTileByCoord(this.currentTile.tilePosition.x+dir.x, this.currentTile.tilePosition.y+dir.y);

	// Check the status of the target tile. If it is a innerWall tile, don't move.
	if(!(targetTile.tileItem !== null && targetTile.tileItem.tileName === 'innerWallTile')) {
		this.move(dir, targetTile);
	}
};
Enemy.prototype.move = function(dir, targetTile) {
	game.add.tween(this).to({x: this.x+(dir.x*32), y: this.y+(dir.y*32)}, 150, 'Quart.easeInOut', true).onComplete.add(function() {
		this.currentTile = targetTile;
	}, this);
};
Enemy.prototype.attack = function() {
	this.animations.play('attack').onComplete.add(function() {
		this.animations.play('idle');
	}, this);
};