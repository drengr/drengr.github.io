$(document).ready(function(){
    /*$.getJSON("https://api.instagram.com/v1/tags/football/media/recent?access_token=e176f05b56f940658a91d14141e3d1dc",
        function(data){
         /* $.each(data.items, function(i,item){
            $("<img/>").attr("src", item.media.m).appendTo("#images");
            if ( i == 3 ) return false;
          });
		console.log('ok');
        });
  });*/
	
function getData() {
	$.ajax({
		url: 'https://api.instagram.com/v1/tags/football/media/recent?access_token=e176f05b56f940658a91d14141e3d1dc',
		dataType: 'jsonp',
		data: data,
		success: console.log(data)
	});
}