define([
	'underscore',
	'backbone',
	'models/photo'
], function(_, Backbone, Photo){
	/*Declare  and return a Collection where the photos' models will be put*/
	var PhotoList = Backbone.Collection.extend({
		model: Photo
	});
	
	var Photos = new PhotoList()
	return Photos;
});