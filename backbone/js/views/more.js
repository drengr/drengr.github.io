define([
 'jquery',
 'underscore',
 'backbone',
 'views/start',
 'text!templates/morebtn.html'
], function ($, _, Backbone, StartView, moreTemplate) {
  
  // View for button "Load more"
  var MoreBtn = Backbone.View.extend({
    initialize: function () {
      this.render();
    },

    events: {
      "click #more": "getMore"
    },

    el: $('.container-fluid'),

    template: _.template(moreTemplate),

    render: function () {
      this.$el.append(this.template(this.model.toJSON()));
    },

    getMore: function () {
      var app = require('views/start');
      var id = parseInt($('#more').attr('data-id'), 10);
      if (id > 0) {
        var more = '&max_id=' + id;
        $('.morebtn').remove();
        app.getData(more);
      }
    }
  });

  return MoreBtn;
});
