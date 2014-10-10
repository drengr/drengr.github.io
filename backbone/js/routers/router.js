define([
 'jquery',
 'backbone',
 'views/start',
 'views/page'
], function ($, Backbone, StartView, PageView) {

  //Declare main Router
  var AppRouter = Backbone.Router.extend({
    routes: {

      // Empty hash
      "": 'start',

      // Start page
      "!/photos": 'start',

      // Single photo page
      "!/photos/:id": 'page'
    },

    start: function () {
      StartView.render();
    },

    page: function () {
      if (PageView != null) {
        PageView.render(this.currentID());
      }
    },

    currentID: function () {
      var hash = Backbone.history.fragment.split('/');
      return hash[2];
    }
  });

  return AppRouter;
});
