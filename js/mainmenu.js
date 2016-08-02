var MainMenu = function() {};
MainMenu.prototype.addMenuOption = function(text, callback) {
	var txt = game.add.text(game.world.centerX, (this.optionCount*50) + 300, text, style.navitem.default);
	txt.anchor.setTo(0.5, 0);
	txt.inputEnabled = true;
	txt.events.onInputUp.add(callback);
	txt.events.onInputOver.add(function(target) {
		target.setStyle(style.navitem.hover);
	});
	txt.events.onInputOut.add(function(target) {
		target.setStyle(style.navitem.default);
	});
	this.optionCount++;
};
MainMenu.prototype.init = function() {
	this.optionCount = 1;
	this.titleText = game.make.text(game.world.centerX, 100, '2D SCAVENGER GAME', style.header);
	this.titleText.setShadow(3, 3, 'rgba(0, 0, 0, 0.5)', 5);
	this.titleText.anchor.setTo(0.5);
	this.mz = game.make.sprite(200, 450, 'scavenger_ss');
	this.mz.scale.y = 3;
	this.mz.scale.x = -3;
	this.mz.animations.add('idle', [7, 8, 9, 10, 11]);
	this.mz.animations.play('idle', 6, true);
	utils.centerGameObjects([this.mz]);
};
MainMenu.prototype.preload = function() {
	game.add.sprite(0, 0, 'menu_bg');
	
	game.add.existing(this.mz);		// The zombie.

	this.addMenuOption('Start', function() {
		game.state.start('Game');
	});
	this.addMenuOption('Credits', function() {
		console.log('You clicked Credits');
	});
	this.addMenuOption('Register', function() {
		console.log('You clicked Register');
	});
	this.addMenuOption('Options', function() {
		console.log('You clicked Options');
	});
};
MainMenu.prototype.create = function() {
	game.add.existing(this.titleText);
};