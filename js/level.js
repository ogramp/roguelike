var Level = function() {

	// Every level has:
	this.columns = Math.floor((game.width)/32); // How many tiles wide will the level be.
	this.rows = Math.floor((game.height)/32); 	// How many tiles high the level will be.
	this.exitTile = null;
	this.allGridPositions = []; // All tile positions in level.
	this.allowedGridPos = []; 	// Positions where it is allowed to spawn an item.

	// Every level needs to:
	this.setUpGridPositions();
	this.setUpAllowedGridPositions();

	// Set up the exit tile.
	this.exitTile = new Tile(game, this.columns-2, 1, 'exitTile', true);
	game.add.existing(this.exitTile);

};

Level.prototype.setUpGridPositions = function() {
	for(var x = 0; x < this.columns; x++) {
		for(var y = 0; y < this.rows; y++) {
			var t = null;
			if(x === 0 || x === this.columns-1 || y === 0 || y === this.rows-1) {
				t = new Tile(game, x, y, 'outerWallTile');
			} else {
				t = new Tile(game, x, y, 'floorTile');
			}
			game.add.existing(t);
			this.allGridPositions.push(t);
		}
	}
	// this.exitTile = new Tile(game, this.columns-1, 1, 'exitTile', true);

	// var exitHoldTile = this.getTileByCoord(this.columns, 1);
	// 	exitHoldTile.tileItem = this.exit;

	// game.add.existing(this.exitTile);
};

Level.prototype.setUpAllowedGridPositions = function() {
	this.gridPositions = [];
	for(var x = 1; x < this.columns-1; x++) {
		for(var y = 1; y < this.rows-1; y++) {
			this.gridPositions.push([x, y]);
		}
	}
};

Level.prototype.randomPosition = function() {
	var randomIndex = game.rnd.integerInRange(0, this.gridPositions.length-1);
	var randomPos = this.gridPositions[randomIndex];
	this.gridPositions.splice(randomIndex, 1);
	return randomPos;
};
Level.prototype.layoutItemsAtRandom = function(tileType, min, max) {
	var objectCount = game.rnd.integerInRange(min, max);
	for(var i = 0; i < objectCount; i++) {
		var rPos = this.randomPosition();
		var t = new Tile(game, rPos[0]+1, rPos[1]+1, tileType);
		this.innerWallTiles.push(t);
		game.add.existing(t);
		var index = this.getTileByCoord(rPos[0]+1, rPos[1]+1);
		index.tileItem = t;
		if(tileType === 'innerWallTile') {
			index.tileHP = 10;
		} 
	} 
};
Level.prototype.getTileByCoord = function(x, y) {
	var returnVar = null;
	for(var i = 0; i < this.allGridPositions.length; i++) {
		if(this.allGridPositions[i].tilePosition.x === x && this.allGridPositions[i].tilePosition.y === y) {
			returnVar = this.allGridPositions[i];
			break;
		} 
	}
	return returnVar;
};