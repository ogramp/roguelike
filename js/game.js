var Game = function() {};
Game.prototype.preload = function() {
	game.roguelike.levelNumber += 1;
};
Game.prototype.create = function() {
	game.roguelike.level = new Level(game.roguelike.levelNumber, game.roguelike.maxNrOfInnerWalls, 2);
	game.roguelike.player = game.add.existing(new Player(1, game.roguelike.rows));
	game.roguelike.enemies = this.createEnemies();

	var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	spaceKey.onDown.add(this.startNewLevel, this);

	console.log(Game);
};
Game.prototype.startNewLevel = function() {
	game.state.start(game.state.current);
};
Game.prototype.createEnemies = function() {
	var enemies = game.add.group();
	for(var i = 0; i < game.roguelike.level.enemyCount; i++) {
		var tempTilePos = game.roguelike.level.randomPosition();	
		var tmpEnm = game.add.existing(new Enemy(tempTilePos[0]+1, tempTilePos[1]+1));
		enemies.add(tmpEnm);
	}
	return enemies;
};
Game.prototype.moveEnemies = function() {
	game.roguelike.enemies.forEach(function(enemy) {
		enemy.attemptMove();
	});
};