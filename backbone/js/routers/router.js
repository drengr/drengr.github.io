define([
	'jquery',
	'backbone',
	'views/start',
	'views/page'
], function($, Backbone, StartView, PageView){
	/*Declare main Router*/
	var AppRouter = Backbone.Router.extend({
		routes: {
			"": 'start', // Empty hash.
			"!/photos": 'start', // Start page.
			"!/photos/:id": 'page' // single photo page. 
		},

		start: function () {
				StartView.render();
		},

		page: function () {
			if (PageView != null) {
				PageView.render(this.currentID());
			}
		},
		
		currentID: function(){
			var hash = Backbone.history.fragment.split('/');
			return hash[2];
		}
	});
	
	return AppRouter;
});