

function makeTextField(_text, _x, _y, _w) {
	var txf = {
	
		x: _x,
		y: _y,
		w: _w || null,
		text: _text,
		color: "#FFF",
		redraw: true,
		canvas: "l1",
		
		draw:function(){
			if(this.redraw == true){
				R.canvas[this.canvas].fillText(this.text, this.x+((this.w)?this.w/2:0), this.y);
				this.redraw = false
			}
		}
		
	}
	return txf;
}