var config = {
//apiKey: 'e176f05b56f940658a91d14141e3d1dc',
clientID: 'dee9a7204df14a7ca686a94a9aaaa320',
apiHost: 'https://api.instagram.com/'
}

	  /* $.getJSON(config.apiHost + 'v1/tags/dogs/media/recent?callback=?&client_id=' + config.clientID)
	   .success(
		   function (result){
		   console.log('Server answer: ' +result);
		   }
	   )
	   .error(function(){console.log('ERROR')});
	   console.log(y);*/
	
   function getData() {
	$.ajax({
		dataType: 'jsonp',
		cache: false,
		url: config.apiHost + 'v1/tags/dogs/media/recent?callback=?&client_id=' + config.clientID,
		success: function(result) {console.log(result)},
		error:  console.log('Error')
	})
   }
