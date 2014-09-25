define([
	'underscore',
	'backbone',
	'models/comment'
], function(_, Backbone, Comment){
	/*Declare  and return a Collection where the comments for single page will be put*/
	var List = Backbone.Collection.extend({
		model: Comment,
	});
	
	return List;
});