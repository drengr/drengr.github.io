define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/comment.html'
], function($, _, Backbone, commTemplate){
	/*Comments block view */
	var CommBlockView = Backbone.View.extend({
		el: $('.comments-block'),
		template: _.template(commTemplate),

		initialize: function () {
			this.collection.bind('add', this.reRender, this);
			this.render();
		},
		reRender: function(){
			$('.comm-line').remove();
			this.collection.forEach(function (model) {
				model.set({show: false});
			});
			this.render();
		},
		render: function () {
			var template = this.template;
			// Get models that are absent in the page
			var data = this.collection.where({show: false});
			data.forEach(function (model) {
				// Get a parent element for every comment, according picture's id.
				var el = $('.comments-block[data-id=' + model.attributes.picID + ']');
				var html = template(model.toJSON());
				$(html).prependTo(el);
				model.set({show: true});
			});
			return this;
		}
	});
	
	return CommBlockView;
});