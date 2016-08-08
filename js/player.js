var Player = function(x, y) {
	console.log('created a player character');
	this.currentTile = game.roguelike.level.getTileByCoord(x, y);

	Phaser.Sprite.call(this, game, this.currentTile.x+16, this.currentTile.y, 'scavenger_ss', 0);

	// Set the horizontal achor to center for sprite direction fliping.
	this.anchor.setTo(0.5, 0);

	// Player sprite animations.
	var idle = this.animations.add('idle', [0, 1, 2, 3, 4, 5], 5, true);
	var dig = this.animations.add('dig', [40, 41], 10, false);
	var getHit = this.animations.add('getHit', [46, 47], 10, false);
	this.animations.play('idle');

	this.canMove = true;

	this.setUpKeys();
};
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.setUpKeys = function() {
	var upKey 	 = game.input.keyboard.addKey(Phaser.Keyboard.UP);
	var downKey  = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
	var leftKey  = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	var rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	var wKey	 = game.input.keyboard.addKey(Phaser.Keyboard.W);
	var sKey	 = game.input.keyboard.addKey(Phaser.Keyboard.S);
	var aKey	 = game.input.keyboard.addKey(Phaser.Keyboard.A);
	var dKey	 = game.input.keyboard.addKey(Phaser.Keyboard.D);

	var keys = [
			[upKey,    {x:  0, y: -1}], 
			[downKey,  {x:  0, y:  1}], 
			[leftKey,  {x: -1, y:  0}], 
			[rightKey, {x:  1, y:  0}], 
			[wKey, 	   {x:  0, y: -1}],
			[sKey, 	   {x:  0, y:  1}], 
			[aKey, 	   {x: -1, y:  0}], 
			[dKey, 	   {x:  1, y:  0}]
		];

	keys.forEach(function(item) {
		item[0].onDown.add(function() {
			this.attemptMove(item[1]);
		}, this);
	}, this);

	// Dig and getHit animations keys for testing.
	var digKey = game.input.keyboard.addKey(Phaser.Keyboard.G);
	digKey.onDown.add(function() {
		this.animations.play('dig').onComplete.add(function() {
			this.animations.play('idle');
		}, this);
	}, this);
	var hitKey = game.input.keyboard.addKey(Phaser.Keyboard.H);
	hitKey.onDown.add(function() {
		this.animations.play('getHit').onComplete.add(function() {
			this.animations.play('idle');
		}, this);
	}, this);
};

Player.prototype.attemptMove = function(dir) {
	var targetDirOk = true;
	var targetTile = game.roguelike.level.getTileByCoord(this.currentTile.tilePosition.x+dir.x, this.currentTile.tilePosition.y+dir.y);

	// Face the sprite in the correct direction.
	if(dir.x !== 0)
		this.scale.x = dir.x;

	if(targetTile.tileItem !== null && targetTile.tileItem.tileName === 'itemTile') {
		console.log('food');
		game.roguelike.score += 1;
	} else if(targetTile.tileItem !== null && targetTile.tileItem.tileName === 'innerWallTile') {
		// targetDirOk = false; // Here I should make it possible to kill wall
		console.log('innerWall');
		targetDirOk = this.digWall(targetTile);
	} else if(targetTile.tileName === 'outerWallTile') {
		console.log('outerWall');
		targetDirOk = false;
	} else if(targetTile.tileItem !== null && targetTile.tileItem.tileName === 'exitTile') {
		game.state.states.Game.startNewLevel();
	}

	if(this.canMove && targetDirOk) {
		this.canMove = false;
		game.add.tween(this).to({x: this.x+(dir.x*16)*2, y: this.y+(dir.y*32)}, 150, 'Quart.easeInOut', true).onComplete.add(function() {
			this.canMove = true;
			this.currentTile = targetTile;
		}, this);
	}
	Game.prototype.moveEnemies();
};

Player.prototype.digWall = function(targetTile) {	

	var t = targetTile.tileItem;

	this.animations.play('dig').onComplete.add(function() {
		this.animations.play('idle');
	}, this);

	targetTile.tileHP -= 3;

	if(targetTile.tileHP === null || targetTile.tileHP < 1) {
		targetTile.tileItem = null;
		t.destroy();
		return true;
	} else {
		return false;
	}

};