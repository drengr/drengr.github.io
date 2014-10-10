define([
 'underscore',
 'backbone'
], function (_, Backbone) {
  'use strict';

  // Declare a model for pagination
  var PaginID = Backbone.Model.extend({
    defaults: function () {
      return {
        nextMaxID: 0
      }
    }
  });

  return PaginID;
});