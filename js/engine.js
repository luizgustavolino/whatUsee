

game.engine = {

	pause: false,
	frameCount: 0,
	timer: null,
	perFrameDelay: 1000.0/32.0,
	mute: false,
	ready: false,
	scene: null,
	canTouch: false,

	bootstrap: function( callback){
	
		R.harvest();
		this.timer = setInterval(this.loop, this.perFrameDelay);
		this.ready = true;
		canTouch = 'ontouchend' in document;
		
		R.canvas.bg.fillStyle = "#FFF"
		R.canvas.l1.fillStyle = "#FFF"
		R.canvas.l2.fillStyle = "#FFF"
		
		R.canvas.bg.textAlign = "center"
		R.canvas.l1.textAlign = "center"
		R.canvas.l2.textAlign = "center"
		
		if(canTouch) {
			R.dom.l2.addEventListener('touchstart', this.handleTouchDown, false);
			R.dom.l2.addEventListener('touchmove', this.handleTouchMove, false);
			R.dom.l2.addEventListener('touchend', this.handleTouchUp, false);
		}else{
			R.dom.l2.addEventListener('mousedown', this.handleMouseDown, false);
			R.dom.l2.addEventListener('mouseup', this.handleMouseUp, false);
		}
		
		if(callback) callback()
		this.loop()
	},

	showScene: function(_scene){
	    
	    if(this.scene && this.scene.onExit) this.scene.onExit();
	    
	    this.clear("bg")
	    this.clear("l1")
	    this.clear("l2")

	    R.canvas["bg"].globalAlpha = 1.0
		R.canvas["l1"].globalAlpha = 1.0
	    R.canvas["l2"].globalAlpha = 1.0
	    
	    this.frameCount = 0

	    this.scene = _scene;
	    this.scene.userInteractionEnabled = true
	    
	    if(this.scene && this.scene.onEnter) this.scene.onEnter();

	},

	clear: function(_layer){
		if(_layer && game.resources.canvas && game.resources.canvas[_layer]){
	    	R.canvas[_layer].clearRect(0, 0, game.size.width, game.size.height);
	    }
	},
	
	setMute: function (_mute) {

		for(var tag in game.resources.audio){
		    var audioAsset = R.audio[tag];
			audioAsset.muted = _mute;
		}
		
		this.mute = _mute;
	},

	fx: function (_name) {
		R.audio[_name].currentTime = 0;
		R.audio[_name].play();
	},
	
	// events
	loop: function(){
		
		var self = game.engine;
		if(!self.pause) self.frameCount += 1;
		    
		if(self.scene){
		    self.scene.update(self.frameCount);
		    self.scene.draw(self.frameCount);
		}
	},
	
	handleTouchDown: function(evnt) {
		
		evnt.preventDefault();
		var self = game.engine;
		if(!self.touchingPoint){
			var touches = evnt.changedTouches;
			if(touches && touches[0]){
				self.touchingPoint = touches[0]
				var px = self.touchingPoint.pageX - this.offsetLeft;
				var py = self.touchingPoint.pageY - this.offsetTop;
				
				if(self.scene && self.scene.onMouseDown && self.scene.userInteractionEnabled) {
					self.scene.onMouseDown(px, py)
				}
			}
		}
		
	},
	
	handleTouchMove: function(evnt) {
		//yeah
	},
	
	handleTouchUp: function(evnt) {
		
		evnt.preventDefault();
		var self = game.engine;
		
		if(self.touchingPoint){
			var touches = evnt.changedTouches;
			for (var i=0; i < touches.length; i++) {
				var touch = touches[i]
			
				if(touch.identifier == self.touchingPoint.identifier){
					
					var px = self.touchingPoint.pageX - this.offsetLeft;
					var py = self.touchingPoint.pageY - this.offsetTop;
					self.touchingPoint = null
					
					if(self.scene && self.scene.onMouseUp && self.scene.userInteractionEnabled){
						self.scene.onMouseUp(px,py)
					}
				}
			}
		}
		
	},
	
	handleMouseDown: function(evnt) {
			
	  	evnt.preventDefault();
		var self = game.engine;
	  	var px = evnt.x - this.offsetLeft;
		var py = evnt.y - this.offsetTop;
	  	
	  	if(self.scene && self.scene.onMouseDown && self.scene.userInteractionEnabled) self.scene.onMouseDown(px, py)
	},
	
	handleMouseUp: function(evnt) {
	  	
	  	evnt.preventDefault();
	  	var self = game.engine;
	  	var px = evnt.x - this.offsetLeft;
		var py = evnt.y - this.offsetTop;
		
		if(self.scene && self.scene.onMouseUp && self.scene.userInteractionEnabled) self.scene.onMouseUp(px,py)
	}
} 