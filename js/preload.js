var Preload = function() {};
Preload.prototype.loadScripts = function() {
	game.load.script('webfont_script', 	'https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.26/webfontloader.js');
	game.load.script('mainmenu_script', 'js/mainmenu.js');
	game.load.script('game_script', 	'js/game.js');
	game.load.script('level_script', 	'js/level.js');
	game.load.script('player_script', 	'js/player.js');
	game.load.script('enemy_script', 	'js/enemy.js');
	game.load.script('tile_script', 	'js/tile.js');
	game.load.script('style_script', 	'js/style.js');
};
Preload.prototype.loadBgm = function() {
	game.load.audio('bgMusic', 'sfx/Despair and Triumph.mp3');
};
Preload.prototype.loadImages = function() {};
Preload.prototype.loadFonts = function() {		// Add the font using the WebFont script.
	WebFontConfig = {
		custom: {
			families: ['Slackey'],
			urls: ['css/Slackey.css']
		}
	};
};
Preload.prototype.addGameStates = function() {
	game.state.add('MainMenu', MainMenu); 		// Gets the MainMenu object from mainmenu_script.
	game.state.add('Game', Game);
};
Preload.prototype.addGameMusic = function() {
	music = game.add.audio('bgMusic');
	music.loop = true;
	music.play();
};
Preload.prototype.init = function() {
	this.menuProgressBar = game.make.sprite(game.world.centerX-0.5*game.cache.getImage('menu_progress_bar').width, game.world.centerY, 'menu_progress_bar');
	this.menuProgressBar.anchor.setTo(0, 0.5);
	this.menuProgressBarBg = game.make.sprite(game.world.centerX, game.world.centerY, 'menu_progress_bar_bg');
	this.menuProgressBarBg.anchor.setTo(0.5);
	this.status = game.make.text(game.world.centerX, game.world.centerY+50, 'Loading...', {fill: '#9EA2A8', fontSize: 16});
	this.status.anchor.setTo(0.5);
};
Preload.prototype.preload = function() {
	game.add.sprite(game.world.centerX, game.world.centerY, 'menu_bg').anchor.setTo(0.5);	// Background image.
	game.add.existing(this.menuProgressBar);	// Progress loading bar.
	game.add.existing(this.menuProgressBarBg);	// Progressbar backgrond (border);
	game.add.existing(this.status);				// The 'Loading...' text.

	this.load.setPreloadSprite(this.menuProgressBar); // Set the progressbar.

	this.loadScripts();	// Scripts loaded in Preload.
	this.loadImages();	// Images loaded in Preload.
	this.loadFonts();	// Fonts loaded in Preload.
	this.loadBgm();		// Background music loaded in Preload.
};
Preload.prototype.create = function() {
	this.status.setText('Ready!'); 	// Change the text when everything has been loaded.
	this.addGameStates();
	this.addGameMusic();
	game.add.tween(this.menuProgressBar).to({alpha: 0}, 1000, 'Linear', true, 500);
	game.add.tween(this.menuProgressBarBg).to({alpha: 0}, 1000, 'Linear', true, 500);
	game.add.tween(this.status).to({alpha: 0}, 1000, 'Linear', true, 500).onComplete.add(function() {			// Show the Preload scene for at least 2 seconds.
		game.state.start('MainMenu');
	}, this);
};