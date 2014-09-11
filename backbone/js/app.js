	var config = {};
	config.Github = {
	apiKey: '1492966701.dee9a72.aa07b03276164d0f9aaec662ffbb57e0',
	clientID: 'dee9a7204df14a7ca686a94a9aaaa320',
	apiHost: 'https://api.instagram.com/'
	}
	config.Beget = {
	apiKey: '1492966701.1a9b8d2.d84982232aba438fbbceba821fa4d723',
	clientID: '1a9b8d2877bb47029597a26e54e5ffd5',
	apiHost: 'https://api.instagram.com/'
	}

	function getData() {
		var tag = $('input.search-tag').val().trim().split(' ')[0];
		var url = config.Beget.apiHost + 'v1/' + tag + '/media/recent?access_token=' + config.Beget.apiKey; 
			$.ajax({
				dataType: 'jsonp',
				cache: false,
				url: url,
				 headers: {
				'Access-Control-Allow-Origin': '*'
				 },
				success: function(result) {console.log('REQUEST SENT: ' +result)},
				error: function(){console.log('Error!');}
			});
	}