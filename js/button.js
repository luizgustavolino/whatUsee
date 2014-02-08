

function makeButton(btnTitle, imgNormal, imgPressed, _callback) {
	
	var button = {
	
		x: 0,
		y: 0,
		title: btnTitle,
		w: imgNormal.width,
		h: imgNormal.height,
		top: 55,
		state: imgNormal,
		callback: _callback,
		disabled: false,
		canvas: "l2",
		redraw: true,
		clearBefore: false,
		
		setDisabled: function(_disabled, _sprite) {
			if(_sprite) this.sprites.disabled = _sprite;
			this.disabled = _disabled;
			
			if(this.disabled) this.state = this.sprites.disabled;
			else this.state = this.sprites.normal;

			this.clearBefore = true;
			this.redraw = true;
		},
		
		setPosition: function(nx, ny) {
			this.x = nx;
			this.y = ny;
		},
		
		sprites: {
			normal: imgNormal,
			pressed: imgPressed,
			disabled: imgNormal
		},
		
		draw: function() {

			if(this.clearBefore == true){
				R.canvas[this.canvas].clearRect(this.x, this.y, this.state.width, this.state.height);
				this.clearBefore = false
				this.redraw = true
			}

			if(this.redraw){
				R.canvas[this.canvas].drawImage(this.state, this.x, this.y);
				R.canvas[this.canvas].fillText(this.title, this.x+this.w/2, this.y+this.top)
				this.redraw = false
			}
		},
		
		onMouseDown: function(mx, my) {
			if(this.disabled == false){			
				if(mx > this.x && my > this.y){
					if(mx < this.x + this.w && 
						my < this.y + this.h){
						this.state = this.sprites.pressed;
						this.clearBefore = true;
						this.redraw = true;
					}
				}
			}
		},
		
		onMouseUp: function(mx, my) {
			if(this.disabled == false){
				this.state = this.sprites.normal;
				this.clearBefore = true;
				this.redraw = true;
				if(mx > this.x && my > this.y){
					if(mx < this.x + this.w &&  my < this.y + this.h){
						this.callback()
					}
				}
			}
		}
	
	}
	
	return button;
	
}