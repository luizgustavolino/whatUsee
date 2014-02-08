


function makeIntroScene() {
	var scene = {
	
		draw: function(_frame){
			for(var childId in this.children) {
				this.children[childId].draw(_frame)
			}
		},
	
		update:function(_frame){

			if(_frame > 30){
				R.canvas["l2"].globalAlpha = this.flowerOnCurrentAlpha
				this.flowerOnCurrentAlpha = this.flowerOnCurrentAlpha + 0.01
				this.flowerOn.hidden = false
				this.flowerOn.redraw = true
				this.flowerOn.clearBefore = true
			}

		},
	
		onEnter: function(_frame){
		
			this.children = new Array();
				
			this.bg = makeBackground();
			this.logo = makeSprite(R.img.home_title, 130, 34);
			this.footer = makeSprite(R.img.home_credits, 0, 557);
			
			this.flower = makeSprite(R.img.homeimg1, 636, 164);
			
			this.flowerOn = makeSprite(R.img.homeimg2, 636, 164);
			this.flowerOn.canvas = "l2";
			this.flowerOn.hidden = true
			this.flowerOnCurrentAlpha = 0.0;

			this.children.push(this.bg, this.logo, this.footer, this.flower, this.flowerOn)
			
			this.btns = new Array();
			
			for (var i = 0; i < 2; i++) {
				for (var j = 0; j < 2; j++) {
				
					var btn = makeButton("STAGE "+(1+(i*2)+j), R.img.buttonstage_normal, R.img.buttonstage_chosen, this.enterStage)
					btn.owner = this;
					btn.stage = (i*2)+j;
					btn.canvas = "l1"
					btn.x = 38+270*j;
					btn.y = 210+170*i;
					
					var stars = GD.stages[btn.stage].stars;
					var count = stars.length;
					for (var k = 0; k < count; k++) {
						
						var simage = R.img.homestar_none;
						if(stars[k] == 1) simage = R.img.homestar_right;
						if(stars[k] == 2) simage = R.img.homestar_wrong;
						
						var star = makeSprite(simage, 30+btn.x+k*35, btn.y+82)
						star.canvas = "l2"
						this.children.push(star)
					}
					
					
					this.btns.push(btn)
					this.children.push(btn)
				}
			}
		
		},
		
		enterStage: function() {
			GD.stages[this.stage].stars = [0,0,0,0,0]
			var scene = makeGameScene(this.stage,  0)
			game.engine.showScene(scene)
		},
		
		onMouseDown: function (x,y){
			for (var childId in this.children) {
				var c = this.children[childId];
				if(c.onMouseDown) c.onMouseDown(x,y)
			}
		},
		
		onMouseUp: function (x,y){
			for (var childId in this.children) {
				var c = this.children[childId];
				if(c.onMouseUp) c.onMouseUp(x,y)
			}
		},
	
		onExit: function(_frame){
			
		}
	
	};
	
	return scene;
}