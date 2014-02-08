


function makeGameScene(_stage, _level){

	var scene = {
	
		stageIndex: _stage,
		levelIndex: _level,
		timerRunning: true,
		stage: GD.stages[_stage],
		level: GD.stages[_stage].levels[_level],
		
		draw: function(_frame){
		
			this.bg.draw(_frame)
			
			for(var childId in this.children) {
				this.children[childId].draw(_frame)
			}
			
		},
	
		update:function(_frame){
			
			this.frame = _frame
			this.holder_timer.redraw = true;
			this.timerLabel.redraw = true;
				
			if( this.timerRunning == true && _frame % GD.setup.frames_per_count == 0){
				if(this.secondsRemaining == 0){
					this.loseState();
					this.callNextStage();
				}else{
					this.secondsRemaining -= 1;
					this.timerLabel.text = this.secondsRemaining;
				}
			}
			
			
			if(this.secondsRemaining > GD.setup.free_hint_blinking){
				if(this.userInteractionEnabled) this.drawingLevel(1);
			}else if(this.secondsRemaining > GD.setup.free_hint_go_away){
				if(this.userInteractionEnabled) this.drawingLevel(((_frame/2)%2 == 0)?0:1);
			}else if(this.secondsRemaining == GD.setup.free_hint_go_away){
				if(this.userInteractionEnabled) this.drawingLevel(0);
			}else if(this.secondsRemaining == GD.setup.first_hint_unlock){
				this.hint_btn.setDisabled(false)
			}else if(this.secondsRemaining == GD.setup.last_hint_unlock){
				this.hint_btn.setDisabled(false)
			}
			
			
		},
	
		onEnter: function(_frame){
			
			this.bg = makeBackground();	
			this.children = new Array();
				
			this.logo = makeSprite(R.img.logoingame, 22, 22)
			this.holder_drawing = makeSprite(R.img.holder_drawings, 387, 22)
			
			var owner = this
			var tdrw = this.level.drawing;
			
			this.drawing = {}
			this.drawing.question 	= makeSprite(R.img["drawings/"+tdrw+"_question"], 387, 22);
			this.drawing.hint1  	= makeSprite(R.img["drawings/"+tdrw+"_hint1"], 387, 22);
			this.drawing.hint2  	= makeSprite(R.img["drawings/"+tdrw+"_hint2"], 387, 22);
			this.drawing.answer 	= makeSprite(R.img["drawings/"+tdrw+"_answer"], 387, 22);
			
			this.holder_timer = makeSprite(R.img.holder_timer, 22, 587);
			this.holder_timer.canvas = "bg";
			this.secondsRemaining = GD.setup.level_timeout;
			this.timerLabel = makeTextField(this.secondsRemaining, 86, 622);
			this.timerLabel.canvas = "bg";
			
			this.hint_btn = makeButton("HINT", R.img.button_hintexit_normal,
												   button_hintexit_chosen, this.getHint);
			this.hint_btn.setPosition(415, 587);
			this.hint_btn.owner = owner;
			this.hint_btn.top = 36;
			
			this.hint_btn.setDisabled(true, R.img.button_hintexit_disabled)
			
			this.exit_btn = makeButton("EXIT", R.img.button_hintexit_normal,
												   button_hintexit_chosen, this.quit);
			this.exit_btn.setPosition(810, 587);
			this.exit_btn.top = 36;
			
			var stars = GD.stages[this.stageIndex].stars;
			var count = stars.length;
			this.stars = new Array();
			for (var i = 0; i < count; i++) {
				
				var simage = R.img.staringame_none;
				if(stars[i] == 1) simage = R.img.staringame_right;
				if(stars[i] == 2) simage = R.img.staringame_wrong;
				
				var star = makeSprite(simage, 147+i*43, 82)
				this.children.push(star)
				this.stars.push(star)
			}
			
			this.stageLabel = makeTextField("STAGE "+(this.stageIndex+1)+":", 30, 116)
			this.stageLabel.canvas = "l1";
			
			var count = this.level.options.length;
			this.optionsList = new Array();
			for (var i = 0; i < count; i++) {
				
				var optItem = this.level.options[i]
				var optBtn = makeButton(optItem, R.img.buttongame_normal, 
										buttongame_chosen, function () {
											this.owner.chooseOption(this.option)
										});
				optBtn.owner = this
				optBtn.option = i
				optBtn.setPosition(22, 132+i*90);
				
				this.children.push(optBtn)
				this.optionsList.push(optBtn)
			}
			
			this.children.push(this.logo, this.hint_btn, this.holder_timer, this.holder_drawing, this.exit_btn, this.stageLabel, this.timerLabel, this.drawing.answer, this.drawing.hint1, this.drawing.hint2, this.drawing.question);
			
			this.drawing.answer.canvas = "l2"
			this.drawing.hint1.canvas = "l2"
			this.drawing.hint2.canvas = "l2"
			this.drawing.question.canvas = "l2"
			
			this.drawingLevel(0)
			
		},
		
		getHint: function() {
		
			if(this.owner.secondsRemaining < GD.setup.last_hint_unlock){
				this.owner.drawingLevel(2);
				this.setDisabled(true)
			}else if(this.owner.secondsRemaining <  GD.setup.first_hint_unlock){
				this.owner.drawingLevel(1);	
				this.setDisabled(true)
			}
			
		},
		
		drawingLevel: function(_level) {
			this.drawing.answer.hidden 	 = (_level == 3) ? false : true;
			this.drawing.hint1.hidden 	 = (_level == 1) ? false : true;
			this.drawing.hint2.hidden 	 = (_level == 2) ? false : true;
			this.drawing.question.hidden = (_level == 0) ? false : true;
			
			if(_level == 3) this.drawing.answer.clearBefore = true;
			if(_level == 1) this.drawing.hint1.clearBefore = true;
			if(_level == 2) this.drawing.hint2.clearBefore = true;
			if(_level == 0) this.drawing.question.clearBefore = true;
		},
		
		chooseOption: function(opt) {
						
			if(this.level.answer == opt+1){
				this.optionsList[opt].setDisabled(true, R.img.choice_right01)
				this.winState();

			}else{
				this.optionsList[opt].setDisabled(true, R.img.choice_wrong)
				this.loseState()
			}
			
			this.callNextStage()
			
		},

		winState:function(){
			this.bg.img = R.img.backgroundtilegreen
			this.drawingLevel(3)
			this.stars[this.levelIndex].img = R.img.staringame_right;
			this.stars[this.levelIndex].redraw = true
			GD.stages[this.stageIndex].stars[this.levelIndex] = 1
		},

		loseState:function(){
			this.bg.img = R.img.backgroundtilered;
			this.stars[this.levelIndex].img = R.img.staringame_wrong;
			this.stars[this.levelIndex].redraw = true
			GD.stages[this.stageIndex].stars[this.levelIndex] = 2
		},
		
		quit: function() {
			game.engine.showScene(makeIntroScene());
		},
		
		callNextStage: function() {
		
			this.userInteractionEnabled = false
			this.timerRunning = false
		
			var prevStage = this;
			this.nextStageTimer = window.setTimeout(function() {
				if(prevStage.levelIndex < 4){
					var newScene = makeGameScene(prevStage.stageIndex, prevStage.levelIndex+1);
					game.engine.showScene(newScene);
				}else{
					game.engine.showScene(makeIntroScene());
				}
				
			}, 2000);
		},
		
		onExit: function(_frame){
			
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
		}
	
	};
	
	return scene;
	
}