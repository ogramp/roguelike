var Game = function() {};
Game.prototype.preload = function() {
	game.roguelike.levelNumber += 1;
};
Game.prototype.create = function() {
	game.roguelike.level = new Level(game.roguelike.levelNumber, 2, 2);
	game.roguelike.player = game.add.existing(new Player(1, game.roguelike.rows));

	var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	spaceKey.onDown.add(this.startNewLevel, this);
};
Game.prototype.startNewLevel = function() {
	game.state.start(game.state.current);
};