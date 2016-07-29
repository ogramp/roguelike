var Level = function(levelNumber, numberOfInerWalls, numberOfItems) {
	this.gridPositions = [];
	this.allGridPositions = [];
	this.exit;
	this.enemyCount = Math.ceil(Math.log(levelNumber, 2));

	this.boardSetup();
	this.initializeList();
	this.layoutItemsAtRandom('innerWallTile', numberOfInerWalls*0.5, numberOfInerWalls);
	this.layoutItemsAtRandom('itemTile', 1, numberOfItems);
	// this.layoutItemsAtRandom('enemyTile', this.enemyCount, this.enemyCount);
};
Level.prototype.initializeList = function() {
	this.gridPositions = [];
	for(var x = 1; x < game.columns-1; x++) {
		for(var y = 1; y < game.rows-1; y++) {
			this.gridPositions.push([x, y]);
		}
	}
};
Level.prototype.boardSetup = function() {
	for(var x = -1; x < game.columns+1; x++) {
		for(var y = -1; y < game.rows+1; y++) {
			var t;
			if(x === -1 || x === game.columns || y === -1 || y === game.rows) {
				t = new Tile(game, x+1, y+1, 'outerWallTile', false);
			} else {
				t = new Tile(game, x+1, y+1, 'floorTile', true);
			}
			game.add.existing(t);
			this.allGridPositions.push(t);
		}
	}
	this.exit = new Tile(game, game.columns, 1, 'exitTile', true);
	game.add.existing(this.exit);
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
		game.add.existing(t);
		var index = this.getTileByCoord(rPos[0]+1, rPos[1]+1);
		index.tileItem = tileType;
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