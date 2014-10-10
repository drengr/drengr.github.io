define([
 'underscore',
 'backbone'
], function (_, Backbone) {
  'use strict';
  
  // Declare a Model for photo's info
  var Photo = Backbone.Model.extend({
    defaults: function () {
      return {
        id: 0,
        userFullname: '',
        time: 0,
        userProfilePicture: '',
        userUsername: '',
        captionText: '',
        imgUrl: '',
        likesCnt: 0,
        show: false
      }
    }
  });

  return Photo;
});
