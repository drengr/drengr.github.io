$(function(){
					$('#rating_1').rating({
						fx: 'full',
						image: 'img/stars.png',
						width: 15,
						stars: 5,
						minimal: 1,
						url: 'rating.php',
						callback: function (responce) {

							this.vote_success.fadeOut(2000);
						}
					});
						$('#rating_2').rating({
						fx: 'full',
						image: 'img/stars.png',
						width: 15,
						stars: 5,
						minimal: 1,
						url: 'rating.php',
						callback: function (responce) {

							this.vote_success.fadeOut(2000);
						}
					});
						$('#rating_3').rating({
						fx: 'full',
						image: 'img/stars.png',
						width: 15,
						stars: 5,
						minimal: 1,
						url: 'rating.php',
						callback: function (responce) {

							this.vote_success.fadeOut(2000);
						}
					});
						$('#rating_4').rating({
						fx: 'full',
						image: 'img/stars.png',
						width: 15,
						stars: 5,
						minimal: 1,
						url: 'rating.php',
						callback: function (responce) {

							this.vote_success.fadeOut(2000);
						}
					});
	$('#rating_5').rating({
						fx: 'full',
						image: 'img/stars.png',
						width: 15,
						stars: 5,
						minimal: 1,
						url: 'rating.php',
						callback: function (responce) {

							this.vote_success.fadeOut(2000);
						}
					});
	$('#rating_6').rating({
						fx: 'full',
						image: 'img/stars.png',
						width: 15,
						stars: 5,
						minimal: 1,
						url: 'rating.php',
						callback: function (responce) {

							this.vote_success.fadeOut(2000);
						}
					});
					})