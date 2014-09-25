define([
	'underscore',
	'backbone'
], function (_, Backbone) {
	/*Declare a Model for comment*/
	var Comment = Backbone.Model.extend({
		defaults: function () {
			return {
				picID: 0,
				fromProfilePicture: '',
				fromUsername: '',
				commText: '',
				show: false
			}
		}
	});
	
	return Comment;
});