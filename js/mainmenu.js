var MainMenu = function() {};
MainMenu.prototype.addMenuOption = function(text, callback) {
	var txt = game.add.text(game.world.centerX, (this.optionCount*30) + this.titleText.y+this.titleText.height+30, text, style.navitem.default);
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
	this.titleText = game.make.text(game.world.centerX, game.world.centerY-(game.world.height*0.25), '2D SCAVENGER GAME', style.header);
	this.titleText.setShadow(3, 3, 'rgba(0, 0, 0, 0.5)', 5);
	this.titleText.anchor.setTo(0.5);
};
MainMenu.prototype.preload = function() {
	game.add.sprite(game.world.centerX, game.world.centerY, 'menu_bg').anchor.setTo(0.5);

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
	var returnKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
	returnKey.onDown.add(function() {
		console.log('Enter Kay')
		game.state.start('Game');
	}, this);
}; 