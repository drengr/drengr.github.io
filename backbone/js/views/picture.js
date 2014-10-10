define([
 'jquery',
 'underscore',
 'backbone',
 'collections/comments',
 'views/comments',
 'text!templates/pic.html'
], function ($, _, Backbone, Comments, CommBlockView, picTemplate) {
  'use strict';

  // Picture block view
  var Picture = Backbone.View.extend({
    el: $('.container-fluid'),
    template: _.template(picTemplate),

    initialize: function () {
      this.render();
    },

    events: {
      "submit .comment": 'addComm'
    },

    addComm: function (event) {
      var attr = $(event.target).attr('data-pic');
      var text = $('.comment[data-pic=' + attr + '] .new-comment').val().trim();
      $('.comment[data-pic=' + attr + '] .new-comment').val('');
      if (text.length > 0) {
        var commModel = {
          picID: attr,
          fromProfilePicture: 'http://images.ak.instagram.com/profiles/anonymousUser.jpg',
          fromUsername: 'LocalUser',
          commText: text,
          show: false
        };
        Comments.create(commModel);
      }
      return false;
    },


    render: function () {
      var el = $(this.el);
      var template = this.template;

      // Get models that are absent in the page
      var data = this.collection.where({
        show: false
      });
      data.forEach(function (model) {
        var html = template(model.toJSON());
        el.append(html);
        model.set({
          show: true
        });
      });
      return this;
    }
  });

  return Picture;
});
