var config = {
apiKey: '1492966701.dee9a72.aa07b03276164d0f9aaec662ffbb57e0',
clientID: 'dee9a7204df14a7ca686a94a9aaaa320',
apiHost: 'https://api.instagram.com/'
}

var url = config.apiHost + 'v1/tags/snow/media/recent?access_token=' + config.apiKey;
	 $.getJSON(url,
			 function(data, textStatus) {
		 document.write(data+'<br>'+textStatus)
	 })
	  
	
 /*  function getData() {
	$.ajax({
		dataType: 'jsonp',
		cache: false,
		url: config.apiHost + 'v1/tags/snow/media/recent?access_token=' + config.apiKey,
		success: function(result) {console.log(result)},
		error:  function(jqXHR, textStatus, errorThrown){console.log('Error!\n' +textStatus+ '\n' +errorThrown)}
	})
   }*/
