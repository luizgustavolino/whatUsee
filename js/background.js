

function makeBackground() {
	var bg = {
	
		imgW: R.img.backgroundtile.width,
		imgH: R.img.backgroundtile.height,
		
		scrW: game.size.width,
		scrH: game.size.height,
		
		timesW: Math.ceil(game.size.width / R.img.backgroundtile.width),
		timesH: Math.ceil(game.size.height / R.img.backgroundtile.height),
		
		img: R.img.backgroundtile,
		frameLimit: 50,
		
		draw: function(_frame) {
			
			var fd = _frame%this.frameLimit;
			this.fx = fd*this.imgW/this.frameLimit;
			this.fy = fd*this.imgH/this.frameLimit;
		
			for (var iy = 0; iy < this.timesH+1; iy++) {
				for (var ix = -1; ix < this.timesW; ix++) {
					R.canvas.bg.drawImage(this.img,
						ix*this.imgW+this.fx,
						iy*this.imgH-this.fy);
				}
			}
		}
		
		
	};
	
	return bg;
}