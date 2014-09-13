var config = {};
config.Github = {
	apiKey: '1492966701.dee9a72.aa07b03276164d0f9aaec662ffbb57e0',
	clientID: 'dee9a7204df14a7ca686a94a9aaaa320',
	apiHost: 'https://api.instagram.com/'
}
config.Beget = {
	apiKey: '1492966701.1a9b8d2.d84982232aba438fbbceba821fa4d723',
	clientID: '1a9b8d2877bb47029597a26e54e5ffd5',
	apiHost: 'https://api.instagram.com/',
	count: '2',
	timeCalc: 1/(1000*60*60)
}
$(document).ready(function () {
	$('.search-form').submit(
		function () {
			$('.pic-row').remove();
			$('.morebtn').remove();
			getData();
			return false;
		}
	);
});

function getMore(url) {
	var nextID = $('#more').attr('data-id');
	if (nextID.length > 0) {
		var more = '&max_id=' + nextID;
		$('.morebtn').remove();
		getData('', more);
	}
}

function getUrl(tag) {
	var url = config.Beget.apiHost + 'v1/tags/' + tag + '/media/recent?access_token=' + config.Beget.apiKey + '&count=' + config.Beget.count;
	return url;
}

function getData(url, more) {
	var tag = $('input.search-tag').val().trim().split(' ')[0];
	if (more === undefined) {
		url = getUrl(tag);
	} else {
		url = getUrl(tag) + more;
	}
	$.ajax({
		dataType: 'jsonp',
		cache: false,
		url: url,
		headers: {
			'Access-Control-Allow-Origin': '*'
		},
		success: function (result) { makePage(result) },
		error: function () {
			console.log('Error!');
		}
	});
}

function getTime(time){
	time = time*1000;
	var now = new Date();
	var delta = now - time;
	var timeAgo = parseInt(delta*config.Beget.timeCalc);
	var string = '';
	 if (timeAgo == 0){
		 string = 'Few minutes ago';
	 }else{
		 string = timeAgo + ' hours ago';
	 } 
	return string;
}

function getAuthorPic(authID){
		url = config.Beget.apiHost + '/v1/users/' + authID + '/?access_token=' + config.Beget.apiKey;
	$.ajax({
				dataType: 'jsonp',
				cache: false,
				url: url,
				headers: {
							'Access-Control-Allow-Origin': '*'
				},
				success: function(result){
					var src = '';
						if(Object.keys(result.data).length != 0){
							src = result.data.profile_picture;
						}else{
							src = '';
						}
					$('.'+ authID).append("<img class='comm-pic' src = '" + src  + "' alt=''>");
				}		
					});
}

function getComments(comm){
	var commBlock =  '';
	$.each(comm, function(index, c){
			commBlock += "<div class='row comm-line'><div class='col-md-1 " + c.from.id + "'></div><div class='col-md-11'><span class='comm-name'>" + c.from.username + "</span> <span class='comm-body'>" + c.text + "</span></div></div>";
		getAuthorPic(c.from.id);
			return commBlock;
		}
	);
	return commBlock;
}

function makePage(result) {
	var text = userpic = picture = block = comments = '';
	var addCommForm = "<div class='add-comm'><form class='comment' onsubmit='return false'><input type='text' placeholder='Write your comment...'></div></div>";
	if (Object.keys(result.data).length != 0) {
		$.each(result.data, function (index, pic) {
			var ago = getTime(pic.created_time);
			userpic = "<div class='col-md-3'><div class='row clearfix'><div class='col-md-5 col-md-offset-3 user-about'><p class='username'>" + pic.user.full_name + "</p><p class='pic-time'>"+ ago +" </p></div><div class='col-md-4 userpic'><img src ='" + pic.user.profile_picture + "' alt = '" + pic.user.username + "' title ='" + pic.user.full_name + "' ></div></div></div>";
			if (pic.caption !== null && pic.caption.text !== null && pic.caption.text !== undefined) {
				text = pic.caption.text;
			}
			if (pic.comments.count != 0){
				comments = getComments(pic.comments.data);
				comments += addCommForm;
			}else{
				comments = "<div class='row comm-line'><div class='col-md-12 text-center'>There is no comments here. You can be first.</div></div>";
				comments += addCommForm;
			}
			picture = "<div class='col-md-6 page-item'><div class='pic-block'><figure><img class = 'pic' src ='" + pic.images.low_resolution.url + "' alt = 'Picture' ><div class='like-info'><img src='i/like.png' alt='' ><span class='likes-cnt'>" + pic.likes.count + "</span></div><figcaption>" + text + "</figcaption></figure><div class='comments-block'>"+ comments +"</div></div></div>";
			block = "<div class='row clearfix pic-row'>" + userpic + picture + "</div>";
			$('.container-fluid').append(block);
		});
		if (Object.keys(result).length != 0 || Object.keys(result.pagination).length != 0 || (result.pagination.next_max_id !== null && result.pagination.next_max_id !== undefined)) {
			var btn = "<div class='row clearfix morebtn'><div class='col-md-6 col-md-offset-3 text-center'><button type='button' id='more' data-id='" + result.pagination.next_max_id + "' onclick = 'getMore();'>Load more</button></div></div>";
			$('.container-fluid').append(btn);
		}
	} else {
		block = "<div class='row clearfix pic-block'><div class='col-md-6 col-md-offset-3 page-item text-center'>По вашему запросу ничего не найдено! Попробуйте еще.</div></div>"
		$('.container-fluid').append(block);
	}
}


/*request:

	{
		"pagination": {
			"next_max_tag_id": "1410456298400191",
			"deprecation_warning": "next_max_id and min_id are deprecated for this endpoint; use min_tag_id and max_tag_id instead",
			"next_max_id": "1410456298400191",
			"next_min_id": "1410456406972228",
			"min_tag_id": "1410456406972228",
			"next_url": "https:\/\/api.instagram.com\/v1\/tags\/snow\/media\/recent?access_token=1492966701.1a9b8d2.d84982232aba438fbbceba821fa4d723\u0026_=1410456085232\u0026max_tag_id=1410456298400191"
		},
		"meta": {
			"code": 200
		},
		"data": [{
			"attribution": null,
			"tags": ["mountains", "mountain", "mybanff", "yonder", "snow", "roadtrip", "neverstopexploring", "liveyouradventure", "yonderon", "winterwonderland", "livebetterstories"],
			"type": "image",
			"location": {
				"latitude": 52.582200129,
				"longitude": -112.971795169
			},
			"comments": {
				"count": 0,
				"data": []
			},
			"filter": "Sierra",
			"created_time": "1410456406",
			"link": "http:\/\/instagram.com/p/s0EVlsDM4V\/",
			"likes": {
				"count": 0,
				"data": []
			},
			"images": {
				"low_resolution": {
					"url": "http:\/\/scontent-a.cdninstagram.com\/hphotos-xaf1\/t51.2885-15\/10624378_1539971072884040_2051670368_a.jpg",
					"width": 306,
					"height": 306
				},
				"thumbnail": {
					"url": "http:\/\/scontent-a.cdninstagram.com\/hphotos-xaf1\/t51.2885-15\/10624378_1539971072884040_2051670368_s.jpg",
					"width": 150,
					"height": 150
				},
				"standard_resolution": {
					"url": "http:\/\/scontent-a.cdninstagram.com\/hphotos-xaf1\/t51.2885-15\/10624378_1539971072884040_2051670368_n.jpg",
					"width": 640,
					"height": 640
				}
			},
			"users_in_photo": [],
			"caption": {
				"created_time": "1410456406",
				"text": "A #WinterWonderland...in summer... #MyBanff #mountains #mountain #snow #roadtrip #NeverStopExploring #LiveYourAdventure #livebetterstories #yonder #yonderon",
				"from": {
					"username": "chelseaevemcpherson",
					"profile_picture": "http:\/\/photos-c.ak.instagram.com\/hphotos-ak-xpa1\/923722_866392866721474_2006595233_a.jpg",
					"id": "898905818",
					"full_name": "Chelsea McPherson"
				},
				"id": "807289309463629337"
			},
			"user_has_liked": false,
			"id": "807289308968701461_898905818",
			"user": {
				"username": "chelseaevemcpherson",
				"website": "",
				"profile_picture": "http:\/\/photos-c.ak.instagram.com\/hphotos-ak-xpa1\/923722_866392866721474_2006595233_a.jpg",
				"full_name": "Chelsea McPherson",
				"bio": "",
				"id": "898905818"
			}
     }]
	}*/