require.config({
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
	shim: {
		underscore: {
			exports: '_'
		},
		
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		
		backboneLocalstorage: {
			deps: ['backbone'],
			exports: 'Store'
		}
	},
	
	paths: {
		jquery: '../components/jquery-2.1.1.min',
		underscore: '../components/underscore-1.7.0',
		backbone: '../components/backbone-1.1.2',
		backboneLocalstorage: '../components/backbone.localStorage-1.1.13',
		text: '../components/requirejs-text-2.0.12'
	}
});

require([
	'backbone',
	'views/start',
	'routers/router'
], function(Backbone, StartView, AppRouter){
	// Initialize routing and start Backbone.history. Router start app by itself.
	new AppRouter();
	Backbone.history.start();
});