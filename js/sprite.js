

function makeSprite(_img, _x, _y) {
	var sprite = {
	
		x: _x,
		y: _y,
		img: _img,
		hidden: false,
		redraw: true,
		clearBefore: false,
		canvas: "l1",
		customTextureRect: null,

		draw:function(){
		
			if(this.clearBefore == true){
				R.canvas[this.canvas].clearRect(this.x, this.y, this.img.width, this.img.height);
				this.clearBefore = false
				this.redraw = true
			}
		
			if(this.hidden == false && this.redraw == true){
				
				if(this.customTextureRect){
					var c = this.customTextureRect
					R.canvas[this.canvas].drawImage(this.img,
						c.sx, c.sy, c.w, c.h, this.x+c.dx, this.y+c.dy, c.w, c.h);
				}else {
					R.canvas[this.canvas].drawImage(this.img, this.x, this.y);
				}

				this.redraw = false
			}
		}
		
	}
	return sprite;
}