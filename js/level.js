let minimum = 5;
let maximum = 9;

let columns = 8;
let rows = 8;
let wallCount = 0;
let foodCount = 0;

let exit;
let floorTiles;
let wallTiles;
let foodTiles;
let enemyTiles;
let outerWallTiles;

let gridPositions = [];



let Level = function() {};
Level.prototype.initializeList = function() {
	// Here I should crlear the gridPositions.
	for(let x = 1; x < columns-1; x++) {
		for(let y = 1; y < rows-1; y++) {
			gridPositions.push([x, y]);
		}
	}
};
Level.prototype.boardSetup = function() {
	for(let x = -1; x < columns+1; x++) {
		for(let y = -1; y < rows+1; y++) {
			
		}
	}
};
Level.prototype.preload = function() {
	console.log('Level::function::preload');
	this.initializeList();
};
Level.prototype.create = function() {
	console.log('Level::function::create');
	wallCount = game.rnd.integerInRange(minimum, maximum);
	foodCount = game.rnd.integerInRange(minimum, maximum);
	console.log(gridPositions);
};