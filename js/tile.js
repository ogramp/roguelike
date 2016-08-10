var Tile = function(game, x, y, tileType) {
	'use strict';
	if(tileType === 'floorTile') {
		Phaser.Sprite.call(this, game, x*32, y*32, 'scavenger_ss', roguelike.ss_floorTiles[game.rnd.integerInRange(0, roguelike.ss_floorTiles.length-1)]);
	} else if(tileType === 'outerWallTile') {
		Phaser.Sprite.call(this, game, x*32, y*32, 'scavenger_ss', roguelike.ss_outerWallTiles[game.rnd.integerInRange(0, roguelike.ss_outerWallTiles.length-1)]);
	} else if(tileType === 'innerWallTile') {
		Phaser.Sprite.call(this, game, x*32, y*32, 'scavenger_ss', roguelike.ss_innerWallTiles[game.rnd.integerInRange(0, roguelike.ss_innerWallTiles.length-1)]);
	} else if(tileType === 'itemTile') {
		Phaser.Sprite.call(this, game, x*32, y*32, 'scavenger_ss', roguelike.ss_itemTiles[game.rnd.integerInRange(0, roguelike.ss_itemTiles.length-1)]);
	} else if(tileType === 'enemyTile') {
		Phaser.Sprite.call(this, game, x*32, y*32, 'scavenger_ss', roguelike.ss_enemyTiles[game.rnd.integerInRange(0, roguelike.ss_enemyTiles.length-1)]);
	} else if(tileType === 'exitTile') {
		Phaser.Sprite.call(this, game, x*32, y*32, 'scavenger_ss', 20); // 20 is the exit tile on the spritesheet.
	}
	if(tileType === 'exitTile') {
		this.tileName = 'exitTile';
	} else {
		this.tileName = tileType;
	}
	this.tilePosition = {x: x, y: y};
	this.tileItem = null;
};
Tile.prototype = Object.create(Phaser.Sprite.prototype);
Tile.prototype.constructor = Tile;