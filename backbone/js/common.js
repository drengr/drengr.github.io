$(function () {
	var config = {
		apiKey: '1492966701.1a9b8d2.d84982232aba438fbbceba821fa4d723',
		clientID: '1a9b8d2877bb47029597a26e54e5ffd5',
		apiHost: 'https://api.instagram.com/',
		count: '2',
		timeCalc: 1 / (1000 * 60 * 60)
	}


	/*Router*/
	var Routes = Backbone.Router.extend({
		routes: {
			"": 'start', // Empty hash.
			"!/photos": 'start', // Start page.
			"!/photos/:id": 'page' // single photo page. 
		},

		start: function () {
			if (Views.start != null) {
				Views.start.render();
			}
		},

		page: function () {
			if (Views.page != null) {
				Views.page.render();
			}
		}
	});
	var router = new Routes(); // Create router.

	/*Declare a Model that set default info about photo*/

	var Photo = Backbone.Model.extend({
		defaults: function () {
			return {
				id: 0,
				userFullname: '',
				time: 0,
				userProfilePicture: '',
				userUsername: '',
				captionText: '',
				commentsModel: '',
				imgUrl: '',
				likesCnt: 0
			}
		}
	});

	/*Declare  and create a Collection where the photos' models will be put*/

	var PhotoList = Backbone.Collection.extend({
		model: Photo
	});

	var Photos = new PhotoList;

	/*Declare a model for pagination*/
	var PaginID = Backbone.Model.extend({
		defaults: function () {
			return {
				nextMaxID: 0
			}
		}
	});

	/*Declare a Model for comment*/
	var Comment = Backbone.Model.extend({
		defaults: function () {
			return {
				picID: 0,
				fromProfilePicture: '',
				fromUsername: '',
				commText: ''
			}
		}
	});

	/*Declare  and create a Collection where the comments' models will be put*/
	var CommList = Backbone.Collection.extend({
		model: Comment
	});

	var Comments = new CommList;

	/*Declare general views in our app*/

	var Views = {};

	/*Picture block view */
	var Picture = Backbone.View.extend({
		el: $('.container-fluid'),
		template: _.template($('#pic').html()),

		initialize: function () {
			this.render();
		},

		render: function () {
			var el = $(this.el);
			var template = this.template;
			this.collection.models.forEach(function (model) {
				var html = template(model.toJSON());
				el.append(html);
			});
			return this;
		}
	});

	/*Comments block view */
	var CommBlockView = Backbone.View.extend({
		el: $('.comments-block'),
		template: _.template($('#comment').html()),

		initialize: function () {
			this.render();

		},

		render: function () {
			var template = this.template;
			this.collection.models.forEach(function (model) {
				// Get a parent element for every comment, according picture's id.
				var el = $('.comments-block[data-id=' + model.attributes.picID + ']');
				$('.comments-block[data-id=' + model.attributes.picID + '] > .no-comments').remove();
				var html = template(model.toJSON());
				$(html).prependTo(el);
			});
			return this;
		}
	});


	/*View for button "Load more" */
	var MoreBtn = Backbone.View.extend({
		initialize: function () {
			this.render();
		},

		events: {
			"click #more": "getMore"
		},

		el: $('.container-fluid'),

		template: _.template($('#morebtn').html()),

		render: function () {
			this.$el.append(this.template(this.model.toJSON()));
		},

		getMore: function () {
			var id = parseInt($('#more').attr('data-id'));
			if (id > 0) {
				var more = '&max_id=' + id;
				var target = $("body").height(); // Get a target for mini-animation in  future. 
				var scrollTime = target / 1.73; // time = (end-start)/speed.  Our start = 0, it's the page's begin.
				$('.pic-row').remove();
				$('.morebtn').remove();
				Views.start.getData(more);
				$("body,html").animate({
					"scrollTop": target
				}, scrollTime); // Scroll to next image.
			}
		}
	});

	/*Declare view for wrong search results*/
	var WrongView = Backbone.View.extend({
		initialize: function () {
			this.render();
		},
		el: $('.container-fluid'),
		template: _.template($('#wrong').html()),
		render: function () {
			$(this.el).append(this.template());
			return this;
		}
	})


	/*Start view*/
	var Start = Backbone.View.extend({
		events: {
			"submit .search-form": "search"
		},

		el: $('.container-fluid'),

		template: _.template($('#start').html()),

		render: function () {
			$(this.el).html(this.template());
			return this;
		},

		search: function () { // Complex function to create a page for every search.
			Photos.reset(); // Reset a collection of photos from previous search results.
			Comments.reset(); // Reset a collection of comments from previous search results.
			$('.wrong-search').remove(); // Delete results of wrong search.
			$('.pic-row').remove(); // Clean the output.
			$('.morebtn').remove(); // Delete button 'Load more'.
			this.getData(); // Start search.
			return false;
		},

		getData: function (more) { // Getting url, making AJAX request, start functions to parse it's results.
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
						Views.start.makePage(result);
						Views.start.addPic(Photos, Comments);
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

		getUrl: function (tag) { // Generate url for AJAX request
			var url = config.apiHost + 'v1/tags/' + tag + '/media/recent?access_token=' + config.apiKey + '&count=' + config.count;
			return url;
		},

		getTime: function (time) { // Generate a line, that shows how much time ago the photo was created
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

		makePage: function (result) { // Parse results of AJAX request.
			if (Object.keys(result.data).length != 0) {
				var ago = text = '';
				$.each(result.data, function (index, pic) {
					// Calculate how much time ago the photo was posted.
					ago = Views.start.getTime(pic.created_time);
					if (pic.caption !== null && pic.caption.text !== null && pic.caption.text !== undefined) {
						text = pic.caption.text;
					}
					//Make a collection with photos' data.
					Photos.add({
						id: pic.id,
						userFullname: pic.user.full_name,
						time: ago,
						userProfilePicture: pic.user.profile_picture,
						userUsername: pic.user.username,
						captionText: text,
						commentsModel: '',
						imgUrl: pic.images.low_resolution.url,
						likesCnt: pic.likes.count
					});
					// Make a collection with comments' data.
					if (pic.comments.count != 0) {
						Views.start.makeCommCollection(pic.comments.data, pic.id);
					}
				});
			}
		},

		makeCommCollection: function (data, id) { //Make a collection with comments' data.
			$.each(data, function (index, c) {
				Comments.add({
					picID: id,
					fromProfilePicture: c.from.profile_picture,
					fromUsername: c.from.username,
					commText: c.text
				});
			});
		},

		addPic: function (picData, commData) { // Create a view for photos. 
			var picView = new Picture({
				collection: picData
			});
			if (commData.length > 0) {
				this.addAllComm(commData);
			}
		},

		addAllComm: function (data) { // Create a view for comments. Generally start from "this.addPic" if comments exists. 
			var commBlock = new CommBlockView({
				collection: data
			});
		},

		wrongSearch: function () { // Create a view for results of wrong or empty search. Generally start from "this.getData".
			var wrong = new WrongView();
		}

	});


	/*Page view*/
	var Page = Backbone.View.extend({
		el: $('.container-fluid'),
		template: _.template($('#page').html()),
		render: function () {
			$(this.el).html(this.template());
		}
	});

	/*Create views*/
	Views = {
		start: new Start(),
		page: new Page()
	};

	Backbone.history.start(); // Start HTML5 History push

});