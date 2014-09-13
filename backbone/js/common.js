var Controller = Backbone.Router.extend({
	routes: {
		"": 'start', // Empty hash
		"*path": 'start', // Wrong hash
		"/photos": 'start', // Start page
		"/photos/:id": 'page' // single photo page 
	},
	
	start: function () {
		console.log('Start');
	},
	
	page: function () {
		console.log('Page');
	}
});
var controller = new Controller(); // Create controller
Backbone.history.start(); // Start HTML5 History push