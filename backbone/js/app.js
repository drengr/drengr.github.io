var config = {
apiKey: 'e176f05b56f940658a91d14141e3d1dc',
clientID: 'b52af783c2bd45729d6263a0bed7af08',
apiHost: 'https://api.instagram.com/'
}
   function getData() {
	   var y = $.getJSON(config.apiHost + '/v1/tags/dogs/media/recent?callback=?&client_id=' + config.clientID)
	   .success(
		   function (result){
		   console.log(result);
		   }
	   )
	   .error(function(){console.log('ERROR')});
	   console.log(y);
	}
	

	/*$.ajax({
		url: 'https://api.instagram.com/v1/tags/football/media/recent?access_token=e176f05b56f940658a91d14141e3d1dc',
		dataType: 'jsonp',
		success: console.log('Пришли данные:' +data),
		error:  console.log('Error')
	});*/
