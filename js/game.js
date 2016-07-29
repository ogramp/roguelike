var Game = function() {
	game.level;
	game.player;
};
Game.prototype.preload = function() {};
Game.prototype.create = function() {
	game.level = new Level(1, 2, 2); // Level nr 1, 1 innerWall, 1 fooditem
	game.player = game.add.existing(new Player(1, game.rows));

	var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	spaceKey.onDown.add(this.startNewLevel, this);
};
Game.prototype.startNewLevel = function() {
	game.level = new Level(1, 2, 2);
	game.player.bringToTop();
};