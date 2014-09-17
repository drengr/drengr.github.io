//$(function(){
var config = {
	apiKey: '1492966701.1a9b8d2.d84982232aba438fbbceba821fa4d723',
	clientID: '1a9b8d2877bb47029597a26e54e5ffd5',
	apiHost: 'https://api.instagram.com/',
	count: '2',
	timeCalc: 1/(1000*60*60)
}


/*Router*/
var Routes = Backbone.Router.extend({
	routes: {
		"": 'start', // Empty hash
		"!/photos": 'start', // Start page
		"!/photos/:id": 'page' // single photo page 
		 // TODO: make a regexp to define wrong hash
	},
	
	start: function () {
		console.log('Start');
		if (Views.start != null){
			Views.start.render();
		}
	},
	
	page: function () {
		console.log('Page');
		if (Views.page != null){
			Views.page.render();
		}
	}
});
var router = new Routes(); // Create router

/*Declare a Model that set default info about photo*/

var Photo = Backbone.Model.extend({
	defaults: function(){
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
	defaults: function(){
		return {
			nextMaxID: 0
		}
	}
});

/*Declare a Model for comment*/
var Comment = Backbone.Model.extend({
	defaults: function(){
		return {
			id: 0,
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

/*Declare all views in our app*/

var Views = {};

/*Picture block view */
var Picture = Backbone.View.extend({
	el: $('.container-fluid'),
	template: _.template($('#pic').html()),
	
	initialize: function(){
		this.render();
	},
	
	render: function() {
		var el = $(this.el);
		var template = this.template;
		 this.collection.models.forEach(function(model){
            var html = template(model.toJSON());
			 el.append(html);
        });
		return this;
	}
});

/*Comments block view */
var Comments = Backbone.View.extend({
	el: $('.comments-block'),
	
	initialize: function(){
        _.bindAll(this, "renderItem");
    },
	
	renderItem: function(model){
        var commView = new CommView({model: model});
        commView.render();
        $(this.el).append(commView.el);
    },
	
	render: function(){
        this.collection.each(this.renderItem);
    }
	
});

/*Comments line view*/
var CommView = Backbone.View.extend({
	tagName: 'div',
	className: 'row comm-line',
	template: _.template($('#comment').html()),
	render: function(){
		var html = this.template(model.toJSON());
		$(this.el).append(html)
	}
});
	
	
/*View for button "Load more" */
var MoreBtn = Backbone.View.extend({
	initialize: function(){
		this.render();
	},
	
	events: {
		"click #more": "getMore"
	},
	
	el: $('.container-fluid'),
	
	template: _.template($('#morebtn').html()),
	
	render: function(){
		this.$el.append( this.template(this.model.toJSON()));
	},
	
	getMore: function(){
		var id = $('#more').attr('data-id');
		if (id.length > 0) {
			var more = '&max_id=' + id;
			var target = $("body").height(); // Get a target for mini-animation in  future 
			var scrollTime = target/1.73; // time = (end-start)/speed.  Our start = 0, it's the page's begin
			$('.pic-row').remove();
			$('.morebtn').remove();
			Views.start.getData(more);
			$("body,html").animate({"scrollTop":target},scrollTime); // Scroll to next image
		}
	}
});


/*Start view*/
var Start = Backbone.View.extend({
	events: {
		"submit .search-form": "search"
	},
	
	el: $('.container-fluid'),  // DOM element where view will add
	
	template: _.template($('#start').html()),
	
	render: function(){  //Get block template and put it in the el
		$(this.el).html(this.template());
		return this;
	},
	
	search: function(){
		Photos.reset(); // Reset a collection from previous saerch results
		$('.pic-row').remove(); // Clean the output
		$('.morebtn').remove(); // Delete button 'Load more'
		this.getData();
		return false;
	},
	
	getData: function(more){
		var tag = $('input.search-tag').val().trim().split(' ')[0];
		if (more === undefined) {
			url = this.getUrl(tag);
		}else{
			url = this.getUrl(tag)+more;
		}
		$.ajax({
			dataType: 'jsonp',
			cache: false,
			url: url,
			headers: {
				'Access-Control-Allow-Origin': '*'
			},
			success: function (result) { 
				console.log(result);
				Views.start.makePage(result);
				Views.start.addPic(Photos);
				Views.start.addAllComm(Comments);
				if (Object.keys(result).length != 0 || Object.keys(result.pagination).length != 0 || (result.pagination.next_max_id !== null && result.pagination.next_max_id !== undefined)) {
					var id = new PaginID({nextMaxID: result.pagination.next_max_id});
					var more = new MoreBtn({model: id});
				}
			},
			error: function () {
				console.log('Error!');
			}
		});
	},
	
	getUrl: function(tag){
		var url = config.apiHost + 'v1/tags/' + tag + '/media/recent?access_token=' + config.apiKey + '&count=' + config.count;
		return url;
		console.log('getUrl: '+ url);
	},
	
	getTime: function(time){
		time = time*1000;
		var now = new Date();
		var delta = now - time;
		var timeAgo = parseInt(delta*config.timeCalc);
		var string = '';
		 if (timeAgo == 0){
			 string = 'Few minutes ago';
		 }else{
			 string = timeAgo + ' hours ago';
		 } 
		return string;
		console.log('getTime: '+ string);
	},
	
	makePage: function(result){
		if (Object.keys(result.data).length != 0) {
			var ago = text = '';
			$.each(result.data, function (index, pic) {
				// Calculate how much time ago the photo was posted
				ago = Views.start.getTime(pic.created_time);
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
					commentsModel: '',
					imgUrl: pic.images.low_resolution.url,
					likesCnt: pic.likes.count
				});
				console.log('makePage: Model create');
				// Make a collection with comments' data
				if (pic.comments.count != 0){
					var id = pic.id;
					//TODO: adding to collection is absent. Collection stay empty
					this.collection = Comments;
					$.each(pic.comments.data, function(index,c){
							this.collection.add({
								id: id,
								fromProfilePicture: c.from.profile_picture,
								fromUsername: c.from.username,
								commText: c.text
							});
						}
					);
					
				}
			});
		}
	},
	
	addPic: function (data){
		var picView = new Picture({collection: data});
	},
	
	addAllComm: function(data){
		var commBlock = new Comments({collection: data});
	}
	
});

	
/*Page view*/
var Page = Backbone.View.extend({
	el: $('.container-fluid'),  
	template: _.template($('#page').html()),
	render: function(){  
		$(this.el).html(this.template()); 
	}
});

/*Create views*/
Views = {
	start: new Start(),
	page: new Page()
};

Backbone.history.start(); // Start HTML5 History push
	
//});