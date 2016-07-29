var outerWallTiles = [25, 26, 28, 29, 31]; // Outerwall tile frame numbers on the spritesheet.
var innerWallTiles = [21, 22, 23, 24, 27, 30, 48, 49, 50, 51, 52, 53]; // Breakable wall tile frame numbers on the spritesheet.
var floorTiles = [32, 33, 34, 35, 36, 37, 38, 39]; // Floor tile frame numbers on the spritesheet.
var itemTiles = [18, 19]; // Item tile frame numbers on the spritesheet.
var enemyTiles = [7, 12];

var Tile = function(game, x, y, tileType) {
	if(tileType === 'floorTile') {
		Phaser.Sprite.call(this, game, x*32, y*32, 'scavenger_ss', floorTiles[game.rnd.integerInRange(0, floorTiles.length-1)]);
	} else if(tileType === 'outerWallTile') {
		Phaser.Sprite.call(this, game, x*32, y*32, 'scavenger_ss', outerWallTiles[game.rnd.integerInRange(0, outerWallTiles.length-1)]);
	} else if(tileType === 'innerWallTile') {
		Phaser.Sprite.call(this, game, x*32, y*32, 'scavenger_ss', innerWallTiles[game.rnd.integerInRange(0, innerWallTiles.length-1)]);
	} else if(tileType === 'itemTile') {
		Phaser.Sprite.call(this, game, x*32, y*32, 'scavenger_ss', itemTiles[game.rnd.integerInRange(0, itemTiles.length-1)]);
	} else if(tileType === 'enemyTile') {
		Phaser.Sprite.call(this, game, x*32, y*32, 'scavenger_ss', enemyTiles[game.rnd.integerInRange(0, enemyTiles.length-1)]);
	} else if(tileType === 'exitTile') {
		Phaser.Sprite.call(this, game, x*32, y*32, 'scavenger_ss', 20); // 20 is the exit tile on the spritesheet.
	}
	this.tileName = tileType;
	this.tilePosition = {x: x, y: y};
	this.tileItem = null;
};
Tile.prototype = Object.create(Phaser.Sprite.prototype);
Tile.prototype.constructor = Tile;