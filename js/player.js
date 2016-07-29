var Player = function(x, y) {
	this.currentTile = game.level.getTileByCoord(x, y);

	Phaser.Sprite.call(this, game, this.currentTile.x, this.currentTile.y, 'scavenger_ss', 0);

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
};

Player.prototype.attemptMove = function(dir) {
	var targetDirOk = true;
	var targetTile = game.level.getTileByCoord(this.currentTile.tilePosition.x+dir.x, this.currentTile.tilePosition.y+dir.y);

	if(targetTile.tileItem === 'food') {
		console.log('yum');
	} else if(targetTile.tileItem === 'innerWallTile') {
		targetDirOk = false;
	}

	if(targetTile.tilePosition.x === 0 || targetTile.tilePosition.y === 0 || targetTile.tilePosition.x === game.columns+1 || targetTile.tilePosition.y === game.rows+1) {
		targetDirOk = false; // The target tile is outerwall.
	}

	if(this.canMove && targetDirOk) {
		this.canMove = false;
		game.add.tween(this).to({x: this.x+(dir.x*32), y: this.y+(dir.y*32)}, 150, 'Quart.easeInOut', true).onComplete.add(function() {
			this.canMove = true;
			this.currentTile = targetTile;
		}, this);
	}
};