define([
 'jquery',
 'underscore',
 'backbone',
 'text!templates/wrong.html'
], function ($, _, Backbone, wrongTemplate) {

  // Declare view for wrong search results
  var WrongView = Backbone.View.extend({
    initialize: function () {
      this.render();
    },
    el: $('.container-fluid'),
    template: _.template(wrongTemplate),
    render: function () {
      $(this.el).append(this.template());
      return this;
    }
  });

  return WrongView;
});
