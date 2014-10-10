define([
 'underscore',
 'backbone',
 'backboneLocalstorage',
 'models/comment'
], function (_, Backbone, Store, Comment) {
  
  // Declare and return a Collection where the comments' models will be put
  var CommList = Backbone.Collection.extend({
    model: Comment,
    localStorage: new Store("comments")
  });

  var Comments = new CommList();
  return Comments;
});
