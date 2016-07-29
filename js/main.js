var w = 32*(Math.floor(($(window).width())/32));
var h = 32*(Math.floor(($(window).height())/32));

console.log(w + ' ' + h);

var game = new Phaser.Game(w, h, Phaser.AUTO, '');

	game.columns = Math.floor((w-64)/32);
	game.rows = Math.floor((h-64)/32);

	game.player;
	game.level;
	game.levelNumber = 1;

// Create the Main state to be used in the game.
// Preload the assets used int the Splash state.
// Create the Splash state and start it.
var Main = function() {};
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
	game.stage.disableVisibilityChange = true;
};

// Add the Main state to the game and start it.
game.state.add('Main', Main);
game.state.start('Main');