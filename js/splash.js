let Splash = function() {};
Splash.prototype.loadScripts = function() {
	game.load.script('webfont_script', 'https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.26/webfontloader.js');
	game.load.script('mainmenu_script', 'js/mainmenu.js');
	game.load.script('game_script', 'js/game.js');
	game.load.script('level_script', 'js/level.js');
	game.load.script('style_script', 'js/style.js');
};
Splash.prototype.loadBgm = function() {
	game.load.audio('bgMusic', 'sfx/Despair and Triumph.mp3');
};
Splash.prototype.loadImages = function() {};
Splash.prototype.loadFonts = function() {		// Add the font using the WebFont script.
	WebFontConfig = {
		custom: {
			families: ['DK Drop Dead Gorgeous'],
			urls: ['css/dk_drop_dead_gorgeous.css']
		}
	}
};
Splash.prototype.addGameStates = function() {
	game.state.add('MainMenu', MainMenu); 		// Gets the MainMenu object from mainmenu_script.
	game.state.add('Game', Game);
	game.state.add('Level', Level);
};
Splash.prototype.addGameMusic = function() {
	music = game.add.audio('bgMusic');
	music.loop = true;
	music.play();
};
Splash.prototype.init = function() {
	this.menuProgressBar = game.make.sprite(game.world.centerX, 400, 'menu_progress_bar');
	this.status = game.make.text(game.world.centerX, 500, 'Loading...', {fill: 'white'});
	this.menuZomhbie = game.make.sprite(200, 450, 'scavenger_ss');
	this.menuZomhbie.scale.y = 3;
	this.menuZomhbie.scale.x = -3;
	this.menuZomhbie.animations.add('idle', [7, 8, 9, 10, 11]);
	this.menuZomhbie.animations.play('idle', 6, true);
	utils.centerGameObjects([this.menuProgressBar, this.status, this.menuZomhbie]);
};
Splash.prototype.preload = function() {
	game.add.sprite(0, 0, 'menu_bg');			// Background image.
	game.add.existing(this.menuProgressBar);	// Progress loading bar.
	game.add.existing(this.status);				// The 'Loading...' text.
	game.add.existing(this.menuZomhbie);		// The zombie.

	this.load.setPreloadSprite(this.menuProgressBar); // Set the progressbar.

	this.loadScripts();	// Scripts loaded in Splash.
	this.loadImages();	// Images loaded in Splash.
	this.loadFonts();	// Fonts loaded in Splash.
	this.loadBgm();		// Background music loaded in Splash.
};
Splash.prototype.create = function() {
	this.status.setText('Ready!'); 	// Change the text when everything has been loaded.
	this.addGameStates();
	this.addGameMusic();
	setTimeout(function() {			// Show the Splash scene for at least 5 seconds.
		game.state.start('MainMenu');
	}, 2000);
};