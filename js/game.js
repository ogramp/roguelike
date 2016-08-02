var Game = function() {};
Game.prototype.preload = function() {
	game.roguelike.levelNumber += 1;
};
Game.prototype.create = function() {
	var numberOfInnerWallsOnLevel = Math.ceil(((game.roguelike.columns-2)*(game.roguelike.rows-2))/3);
	game.roguelike.level = new Level(game.roguelike.levelNumber, numberOfInnerWallsOnLevel, 2);
	game.roguelike.player = game.add.existing(new Player(1, game.roguelike.rows));

	console.log(numberOfInnerWallsOnLevel);

	var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	spaceKey.onDown.add(this.startNewLevel, this);
};
Game.prototype.startNewLevel = function() {
	game.state.start(game.state.current);
};