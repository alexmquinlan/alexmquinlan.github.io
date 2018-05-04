$(document).ready(function() {

	var direction = 'top',
	clicked = false;
	
	$('.main-link').click(function() {
		if (clicked)
			return;
		clicked = true;
		var color = $(this).css("color");
		console.log(color);
		var winHeight = $(window).height();

		var newDir = $(this).attr('name');

		
		if (newDir != direction)
			$('.hidden-page').addClass('hp-' + newDir)
				.removeClass('hp-' + direction);

		var options = {};
		options[newDir] = 0;
		$(".hidden-page").css("background-color", color);
		$('.hidden-page').removeClass('hp-'+newDir, 1250, function() {
			clicked = false;
		});
		direction = newDir;
	});

	$('.close, .title-close').click(function() {
		if (clicked)
			return;
		clicked = true;
		$('.hidden-page').addClass('hp-'+direction, 1250, function() {
			clicked = false;
		});
	});


	$("#contactFormSubmit").click(function(e) {
		e.preventDefault();
		var contactEmail = $("#contactEmail").val();
		var contactName = $("#contactName").val();
		var contactContent = $("#contactContent").val();

		if (contactEmail == "" || contactEmail == undefined ||
			contactName == "" || contactName == undefined ||
			contactContent == "" || contactContent == undefined) {
			return;
		}
		
		$.ajax({
			url: "//formspree.io/alexquinlan1@gmail.com",
			method: "POST",
			data: {
				"email": contactEmail,
				"name": contactName,
				"text": contactContent
			},
			dataType: "json"
		}).done(function(result) {
			console.log(result);
			console.log("Success!");

			$("#contactForm")[0].reset();

		}).fail(function(result) {
			console.log(result);
			console.log("failure");
		});
	});


});