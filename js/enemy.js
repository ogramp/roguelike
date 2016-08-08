var Enemy = function(x, y) {
	this.currentTile = game.roguelike.level.getTileByCoord(x, y);
	this.target = game.roguelike.player;
	this.skipMove = game.rnd.integerInRange(0, 1);

	var zFrames = [
		[6, 7, 8, 9, 10, 11],
		[12, 13, 14, 15, 16, 17]
	];

	var z = zFrames[game.rnd.integerInRange(0, zFrames.length-1)];

	// Extend the Phase Sprite.
	Phaser.Sprite.call(this, game, this.currentTile.x+16, this.currentTile.y, 'scavenger_ss', z[0]);

	// Set the horizontal anchor for sprite direction flipping.
	this.anchor.setTo(0.5, 0);

	// Enemy animations.
	var idle = this.animations.add('idle', z, 5, true);

	// Start the idle animation. Yes.
	this.animations.play('idle');
};
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.attemptMove = function() {
	if(this.skipMove) {
		this.skipMove = !this.skipMove;
		return;
	} 
	this.skipMove = !this.skipMove;

	var hor = Math.abs(this.target.currentTile.tilePosition.x - this.currentTile.tilePosition.x);
	var ver = Math.abs(this.target.currentTile.tilePosition.y - this.currentTile.tilePosition.y);

	var dir = {x: 0, y: 0};
	if(hor > ver) {
		// Move horizontally
		dir.x = this.target.x > this.x ? 1 : -1;
		var targetTile = game.roguelike.level.getTileByCoord(this.currentTile.tilePosition.x+dir.x, this.currentTile.tilePosition.y+dir.y);
		if(targetTile.tileItem !== null && targetTile.tileItem.tileName === 'innerWallTile') {
			dir.y = this.target.y > this.y ? 1 : -1;
			dir.x = 0;
			var targetTile = game.roguelike.level.getTileByCoord(this.currentTile.tilePosition.x+dir.x, this.currentTile.tilePosition.y+dir.y);
			if(targetTile.tileItem !== null && targetTile.tileItem.tileName === 'innerWallTile') {
				dir.x = 0;
				dir.y = 0;
			}
		}
	} else if(hor < ver) {
		// Move vertically
		dir.y = this.target.y > this.y ? 1 : -1;
		var targetTile = game.roguelike.level.getTileByCoord(this.currentTile.tilePosition.x+dir.x, this.currentTile.tilePosition.y+dir.y);
		if(targetTile.tileItem !== null && targetTile.tileItem.tileName === 'innerWallTile') {
			dir.x = this.target.x > this.x ? 1 : -1;
			dir.y = 0;
			var targetTile = game.roguelike.level.getTileByCoord(this.currentTile.tilePosition.x+dir.x, this.currentTile.tilePosition.y+dir.y);
			if(targetTile.tileItem !== null && targetTile.tileItem.tileName === 'innerWallTile') {
				dir.x = 0;
				dir.y = 0;
			}
		}
	}

	// console.log(hor + ' and ' + ver);

	// var dir = {x: 0, y: 0}; // Zombie tries to go left always.
	// if(Math.abs(this.target.currentTile.tilePosition.x - this.currentTile.tilePosition.x) < Number.EPSILON) { // If the zombie and the player are on the same column
	// 	dir.y = this.target.y > this.y ? 1 : -1;
	// } else {
	// 	dir.x = this.target.x > this.x ? 1 : -1;
	// }

	var targetDirOk = true;
	// var targetTile = game.roguelike.level.getTileByCoord(this.currentTile.tilePosition.x+dir.x, this.currentTile.tilePosition.y+dir.y);

	// if(targetTile.tileItem !== null && targetTile.tileItem.tileName === 'innerWallTile') {
	// 	targetDirOk = false;
	// }

	// Face the sprite in the correct direction.
	if(dir.x !== 0)
		this.scale.x = -1*dir.x;

	if(targetDirOk) {
		game.add.tween(this).to({x: this.x+(dir.x*32), y: this.y+(dir.y*32)}, 150, 'Quart.easeInOut', true).onComplete.add(function() {
			this.currentTile = targetTile;
		}, this);
	}
};