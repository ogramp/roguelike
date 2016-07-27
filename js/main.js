let game = new Phaser.Game(995, 600, Phaser.AUTO, '');

// Create the Main state to be used in the game.
// Preload the assets used int the Splash state.
// Create the Splash state and start it.
let Main = function() {};
Main.prototype.init = function() {
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true;
};
Main.prototype.preload = function() {
	game.load.image('menu_bg',				'img/menu_bg.jpg');
	game.load.image('menu_progress_bar', 	'img/menu_progress_bar.png');
	game.load.spritesheet('scavenger_ss', 	'img/scavengers_ss.png', 32, 32);
	game.load.script('utils', 				'js/utils.js');
	game.load.script('splash_script', 		'js/splash.js');
};
Main.prototype.create = function() {
	game.state.add('Splash', Splash);
	game.state.start('Splash');
};

// Add the Main state to the game and start it.
game.state.add('Main', Main);
game.state.start('Main');