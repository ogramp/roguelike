let utils = {};

// Center all the objects passed in an array.
utils.centerGameObjects = function(objects) {
	objects.forEach(function(object) {
		object.anchor.setTo(0.5);
	});
};