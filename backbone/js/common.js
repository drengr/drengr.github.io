/*Router*/
var Controller = Backbone.Router.extend({
	routes: {
		"": 'start', // Empty hash
		"!/photos": 'start', // Start page
		"!/photos/:id": 'page' // single photo page 
	},
	
	start: function () {
		console.log('Start');
		if (Views.start != null){
			Views.start.render();
		}
	},
	
	page: function () {
		console.log('Page');
		if (Views.page != null){
			Views.page.render();
		}
	}
});
var controller = new Controller(); // Create controller

var Views = {};


/*Start view*/
var Start = Backbone.View.extend({
	el: $('.container-fluid'),  // DOM element where view will add
	template: _.template($('#start').html()),
	render: function(){  //Get block template and put it in the el
		$(this.el).html(this.template()); 	
		for(var i = 0; i<2; i++){
		this.addOne();
		}
		return this;
	},
	addOne: function (){
		var picView = new Picture();
		$('.container-fluid').append(picView.render().el)
	}
});

/*Picture view: child of Start, nested in it */
var Picture = Backbone.View.extend({
	tagName: "div",
	className: "row clearfix pic-row",
	template: _.template($('#pic').html()),
	render: function() {
		$(this.el).html(this.template());
		return this;
	}
});
	
/*Page view*/
var Page = Backbone.View.extend({
	el: $('.container-fluid'),  
	template: _.template($('#page').html()),
	render: function(){  
		$(this.el).html(this.template()); 
	}
});

Views = {
	start: new Start(),
	page: new Page(),
	picture: new Picture()
};

Backbone.history.start(); // Start HTML5 History push