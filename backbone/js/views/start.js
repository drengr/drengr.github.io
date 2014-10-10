define([
 'jquery',
 'underscore',
 'backbone',
 'backboneLocalstorage',
 'collections/comments',
 'collections/photo',
 'models/pagination',
 'views/picture',
 'views/comments',
 'views/more',
 'views/wrong',
 'text!templates/start.html',
 'common'
], function ($, _, Backbone, Store, Comments, Photos, PaginID, Picture, CommBlockView, MoreBtn, WrongView, startTemplate, config) {
  'use strict';

  // Start view
  var Start = Backbone.View.extend({
    events: {
      "submit .search-form": "search"
    },

    el: $('.container-fluid'),

    template: _.template(startTemplate),

    render: function () {
      $(this.el).html(this.template());
      return this;
    },

    // Complex function to create a page for every search.
    search: function () {

      // Reset a collection of photos from previous search results
      Photos.reset();

      // Reset a collection of comments from previous search results
      Comments.reset();

      // Reset a localStorage
      Comments.localStorage._clear();

      // Delete results of wrong search
      $('.wrong-search').remove();

      // Clean the output
      $('.pic-row').remove();

      // Delete button 'Load more'
      $('.morebtn').remove();

      // Start searching
      this.getData();
      return false;
    },

    // Getting url, making AJAX request, start functions to parse it's results
    getData: function (more) {
      var tag = $('input.search-tag').val().trim().split(' ')[0];
      if (more === undefined) {
        url = this.getUrl(tag);
      } else {
        url = this.getUrl(tag) + more;
      }
      $.ajax({
        dataType: 'jsonp',
        cache: false,
        url: url,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        success: function (result) {
          if (Object.keys(result.data).length != 0) {
            StartView.makePage(result);
            StartView.addPic(Photos, Comments);
            if (result.pagination.next_max_id !== undefined) {
              var id = new PaginID({
                nextMaxID: result.pagination.next_max_id
              });
              var more = new MoreBtn({
                model: id
              });
            } else {}
          } else {
            Views.start.wrongSearch();
          }
        },
        error: function () {}
      });
    },

    // Generate url for AJAX request
    getUrl: function (tag) {
      var url = config.apiHost + 'v1/tags/' + tag + '/media/recent?access_token=' + config.apiKey + '&count=' + config.count;
      return url;
    },

    // Generate a line, that shows how much time ago the photo was created
    getTime: function (time) {
      time = time * 1000;
      var now = new Date();
      var delta = now - time;
      var timeAgo = parseInt(delta * config.timeCalc);
      var string = '';
      if (timeAgo == 0) {
        string = 'Few minutes ago';
      } else {
        string = timeAgo + ' hours ago';
      }
      return string;
    },

    // Parse results of AJAX request
    makePage: function (result) {
      if (Object.keys(result.data).length != 0) {
        var ago = '',
          text = '';
        $.each(result.data, function (index, pic) {

          // Calculate how much time ago the photo was posted
          ago = StartView.getTime(pic.created_time);
          if (pic.caption !== null && pic.caption.text !== null && pic.caption.text !== undefined) {
            text = pic.caption.text;
          }

          //Make a collection with photos' data
          Photos.add({
            id: pic.id,
            userFullname: pic.user.full_name,
            time: ago,
            userProfilePicture: pic.user.profile_picture,
            userUsername: pic.user.username,
            captionText: text,
            imgUrl: pic.images.low_resolution.url,
            likesCnt: pic.likes.count,
            show: false
          });

          // Make a collection with comments' data
          if (pic.comments.count != 0) {
            StartView.makeCommCollection(pic.comments.data, pic.id);
          }
        });
      }
    },

    //Make a collection with comments' data
    makeCommCollection: function (data, id) {
      $.each(data, function (index, c) {
        Comments.create({
          picID: id,
          fromProfilePicture: c.from.profile_picture,
          fromUsername: c.from.username,
          commText: c.text,
          show: false
        });
      });
    },

    // Create a view for photos
    addPic: function (picData, commData) {
      var picView = new Picture({
        collection: picData
      });
      if (commData.length > 0) {
        this.addAllComm(commData);
      }
    },

    // Create a view for comments. Generally start from "this.addPic" if comments exists
    addAllComm: function (data) {
      var commBlock = new CommBlockView({
        collection: data
      });
    },

    // Create a view for results of wrong or empty search. Generally start from "this.getData"
    wrongSearch: function () {
      var wrong = new WrongView();
    }

  });

  var StartView = new Start();
  return StartView;
});