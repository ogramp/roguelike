var Enemy = function(x, y) {
	this.currentTile = game.roguelike.level.getTileByCoord(x, y);

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

	// Start the idle animation.
	this.animations.play('idle');
};
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;