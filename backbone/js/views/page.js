define([
 'jquery',
 'underscore',
 'backbone',
 'collections/photo',
 'collections/comments',
 'collections/subcollection',
 'views/comments',
 'text!templates/page.html'
], function ($, _, Backbone, Photos, Comments, List, CommBlockView, pageTemplate) {
  'use strict';
  
  // Page view
  var Page = Backbone.View.extend({
    el: $('.container-fluid'),
    template: _.template(pageTemplate),
    collection: Photos,
    commCollection: Comments,
    render: function (data) {

      // Get an array of models for this photo comments'
      var comments = _.where(this.commCollection.localStorage.findAll(), {
        picID: data
      });
      if (comments.length > 0) {
        var subCollection = new List(comments);
        var commBlock = new CommBlockView({
          collection: subCollection
        });
      }

      // Render model
      var model = this.collection.get({
        id: data
      });
      $(this.el).html(this.template(model.toJSON()));

    }
  });

  var PageView = new Page();
  return PageView;
});
