	$(document).ready(function () {
		$('.dropdown').mouseover(function () {
			var idElem = $(this).attr("id");
			var idNumber = idElem.slice(-1);
			var dropId = '#drop-' + idNumber;
			$(dropId).css('display', 'block');
			$(this).css('background-color', '#00a388');
			$(this).css('color', '#fff');
		});
		$('.dropdown').mouseleave(function () {
			var idElem = $(this).attr("id");
			var idNumber = idElem.slice(-1);
			var dropId = '#drop-' + idNumber;
			$(dropId).css('display', 'none');
			$(this).css('background-color', '#fff');
			$(this).css('color', '#000');
		});
		$('.nav-links').mouseleave(function () {
			$('.dropdown-menu').css('display', 'none');
		});

		$('.dropdown-menu').mouseleave(function () {
			$('.dropdown-menu').css('display', 'none');
			$('.dropdown').css('background-color', '#fff');
			$('.dropdown').css('color', '#000');
		});
	});