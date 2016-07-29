var Game = function() {
	game.level;
	game.player;
};
Game.prototype.preload = function() {
	game.levelNumber++;
};
Game.prototype.create = function() {
	game.level = new Level(game.levelNumber-1, 2, 2);
	game.player = game.add.existing(new Player(1, game.rows));

	var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	spaceKey.onDown.add(this.startNewLevel, this);
};
Game.prototype.startNewLevel = function() {
	game.state.start(game.state.current);
};