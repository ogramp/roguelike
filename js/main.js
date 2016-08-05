// Figure out the optimal game dimensions based ont the tile size which is 32px.
var w = 32*(Math.floor(($(window).width())/32)); // Game width from window width.
var h = 32*(Math.floor(($(window).height())/32)); // Game height from window height.

// The main game object. Should be the only global object.
var game = new Phaser.Game(w, h, Phaser.AUTO, '');
	game.roguelike = {
			// Set up game variables.
			columns: Math.floor((w-64)/32), // How many tiles wide will the game be.
			rows: Math.floor((h-64)/32), // How many tiles high the game will be.
			maxNrOfInnerWalls: Math.ceil(((Math.floor((w-64)/32)-2)*(Math.floor((h-64)/32)-2))/3),
			player: null, 
			level: null,
			levelNumber: 0,
			score: 0,

			ss_outerWallTiles: [25, 26, 28, 29, 31], // Outerwall tile frame numbers on the spritesheet.
			ss_innerWallTiles: [21, 22, 23, 24, 27, 30, 48, 49, 50, 51, 52, 53], // Breakable wall tile frame numbers on the spritesheet.
			ss_floorTiles: [32, 33, 34, 35, 36, 37, 38, 39], // Floor tile frame numbers on the spritesheet.
			ss_itemTiles: [18, 19], // Item tile frame numbers on the spritesheet.
			ss_enemyTiles: [7, 12]
		};

// Create the Main state to be used in the game.
// Main the assets used in the Preload state.
// Create the Preload state and start it.
var Main = function() {};
Main.prototype.init = function() {

	console.log(game.roguelike.maxNrOfInnerWalls);
	// Center the game horizontally and vertically.
	// (the game is not always full width and height of window)
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true;
	// Make it so the game does not pause when browser tab loses focus.
	game.stage.disableVisibilityChange = true;
};
Main.prototype.preload = function() {
	game.load.image('menu_bg',				'img/menu_bg.jpg');
	game.load.image('menu_progress_bar', 	'img/menu_progress_bar.png');
	game.load.spritesheet('scavenger_ss', 	'img/scavengers_ss.png', 32, 32);
	game.load.script('utils_script',		'js/utils.js');
	game.load.script('preload_script', 		'js/preload.js');
};
Main.prototype.create = function() {
	game.state.add('Preload', Preload);
	game.state.start('Preload');
};

// Add the Main state to the game and start it.
game.state.add('Main', Main);
game.state.start('Main');