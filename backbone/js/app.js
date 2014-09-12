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
	count: '2'
}
$('form').submit(
	function(e){
		getData();
		return false;
	}
);

function getMore(url){
	var nextID = $('#more').attr('data-id');
	if (nextID.length > 0){
		var more = '&max_id=' + nextID;
		$('.morebtn').remove();
		getData('', more);
	}
}
function getUrl(tag){
	var url = config.Beget.apiHost + 'v1/tags/' + tag + '/media/recent?access_token=' + config.Beget.apiKey + '&count=' + config.Beget.count;
	return url;
}

function getData(url, more) {
	var tag = $('input.search-tag').val().trim().split(' ')[0];
	if (more === undefined){
		url = getUrl(tag);
	}else{
		url = getUrl(tag)+more;
	}
	$.ajax({
		dataType: 'jsonp',
		cache: false,
		url: url,
		headers: {
			'Access-Control-Allow-Origin': '*'
		},
		success: function (result) {
			var text = userpic = picture = block = '';
			console.log(result +'\n'+ Object.keys(result.data).length+'\n'+ Object.keys(result.data));
			if(Object.keys(result.data).length != 0){
				$.each(result.data, function (index, upic) {
					userpic = "<div class='col-md-3'><div class='row clearfix'><div class='col-md-7 col-md-offset-5 userpic'><figure><img src ='" + upic.user.profile_picture + "' alt = '" + upic.user.username + "' title ='" + upic.user.full_name + "' ><figcaption>" + upic.user.full_name + "</figcaption></figure></div></div></div>";
					if (upic.caption.text !== null && upic.caption.text !== undefined) {
						text = upic.caption.text;
					}
					picture = "<div class='col-md-6 page-item'><figure><img class = 'pic' src ='" + upic.images.low_resolution.url + "' alt = 'Picture' ><figcaption>" + text + "</figcaption></figure></div>";
					block = "<div class='row clearfix'>" + userpic + picture + "</div>";
					$('.container-fluid').append(block);
				});
				if (Object.keys(result).length != 0 || Object.keys(result.pagination).length != 0 || (result.pagination.next_max_id !== null && result.pagination.next_max_id !== undefined)){
					var btn = "<div class='row clearfix morebtn'><div class='col-md-6 col-md-offset-3 text-center'><button type='button' id='more' data-id='"+ result.pagination.next_max_id +"' onclick = 'getMore();'>Get More photos ...</button></div></div>";
					$('.container-fluid').append(btn);
				}
			}else{
				block ="<div class='row clearfix'><div class='col-md-6 col-md-offset-3 page-item text-center'>По вашему запросу ничего не найдено! Попробуйте еще.</div></div>"
					$('.container-fluid').append(block);
			}
		},
		error: function () {
			console.log('Error!');
		}
	});
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