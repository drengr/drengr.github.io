
   function getData() {
	   var x = $.getJSON("https://api.instagram.com/v1/tags/football/media/recent?access_token=e176f05b56f940658a91d14141e3d1dc")
	   .success(
		   function (result){
		   console.log(result);
		   }
	   )
	   .error(function(){console.log('ERROR')});
	   //console.log(x);
	}
	

	/*$.ajax({
		url: 'https://api.instagram.com/v1/tags/football/media/recent?access_token=e176f05b56f940658a91d14141e3d1dc',
		dataType: 'jsonp',
		success: console.log('Пришли данные:' +data),
		error:  console.log('Error')
	});*/