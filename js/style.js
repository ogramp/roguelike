let style;

(function() {
	let defaultColor = 'white';
	let highlightColor = '#FEFFD5';

	style = {
	
		header: {
			font: 'bold 40pt DK Drop Dead Gorgeous',
			fill: defaultColor,
			align: 'center'
		},
		navitem: {
			base: {
				font: '30pt DK Drop Dead Gorgeous',
				align: 'center',
				strokeThickness: 4
			},
			default: {
				fill: defaultColor,
				stroke: 'rgba(0, 0, 0, 0)'
			},
			hover: {
				fill: highlightColor,
				stroke: 'rgba(200, 200, 200, 0.5)'
			}
		}

	}

	Object.assign(style.navitem.hover, style.navitem.base);
	Object.assign(style.navitem.default, style.navitem.base);
})();

