

// resources.js
game.resources = {
	
	harvest: function(){
	
		var canvasSet = ["bg", "l1", "l2"];
		this.dom = {}
		this.canvas = {}
		
		for(var i = 0; i < canvasSet.length; i++){
			var item = canvasSet[i];
			
			this.dom[item] 	= document.getElementById(item);
			this.canvas[item] = document.getElementById(item).getContext("2d");
			this.canvas[item].font = "40px 'Just Another Hand'";

			this.canvas[item].fillStyle = "#FFF"
			this.canvas[item].textAlign = "center"

		}
		
	    var imageSet = IMGList;
	    
	    this.img = {}
	    for(var i = 0; i < imageSet.length; i++){
	        var imageName = imageSet[i];
	        this.img[imageName] = document.getElementById(imageName);
	    }
	    
	    var audioAssets = [];
	    
	    this.audio = [];
	    for(var j = 0; j < audioAssets.length; j++){
	        var audioName = audioAssets[j];
	        this.audio[audioName] = document.getElementById(audioName);
	    }
	}
}

var R = game.resources