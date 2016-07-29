var utils = {};

// Center all the objects passed in an array.
utils.centerGameObjects = function(objects) {
	objects.forEach(function(object) {
		object.anchor.setTo(0.5);
	});
};

// Check if two sprites are overlapping.
utils.checkOverlap = function(spriteA, spriteB) {
	var boundsA = spriteA.getBounds();
	var boundsB = spriteB.getBounds();
	return Phaser.Rectangle.intersects(boundsA, boundsB);
};