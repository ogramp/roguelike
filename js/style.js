var style;

(function() {
	var defaultColor = '#9EA2A8';
	var highlightColor = '#646464';

	style = {
	
		header: {
			font: 'bold 32pt Slackey',
			fill: defaultColor,
			align: 'center'
		},
		navitem: {
			base: {
				font: '16pt Slackey',
				align: 'center',
				strokeThickness: 2
			},
			default: {
				fill: defaultColor,
				stroke: 'rgba(0, 0, 0, 0)'
			},
			hover: {
				fill: highlightColor,
				stroke: 'rgba(100, 100, 100, 0.5)'
			}
		}

	};

	Object.assign(style.navitem.hover, style.navitem.base);
	Object.assign(style.navitem.default, style.navitem.base);
})();