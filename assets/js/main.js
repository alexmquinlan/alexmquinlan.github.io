$(document).ready(function() {

	var direction = 'top',
	clicked = false;
	
	$('.main-link').click(function() {
		if (clicked)
			return;
		clicked = true;
		var color = $(this).css("color");
		var winHeight = $(window).height();

		var page = $(this).html().toLowerCase(); // get page name
		var source   = $("#"+page+"-template").html(); // get template for page
		var template = Handlebars.compile(source);

		$("#handlebarsTemplate").html(template);

		if (page === "work")
			createSkillsChart();

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


function createSkillsChart() {
	var ctx = $("#skillsChart")[0];
	var myChart = new Chart(ctx, {
	    type: 'bar',
	    data: {
	        labels: ["C++", "Java", "Python", "HTML/CSS", "JavaScript", "SQL"],
	        datasets: [{
	            label: 'Years',
	            data: [3, 4, 2.5, 5, 5, 4],
	            backgroundColor: [
	                'rgba(255, 99, 132, 1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(75, 192, 192, 1)',
	                'rgba(153, 102, 255, 1)',
	                'rgba(255, 159, 64, 1)'
	            ],
	            borderColor: [
	                'rgba(255,99,132,1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(255, 206, 86, 1)',
	                'rgba(75, 192, 192, 1)',
	                'rgba(153, 102, 255, 1)',
	                'rgba(255, 159, 64, 1)'
	            ],
	            borderWidth: 1
	        }]
	    },
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero:true
	                }
	            }]
	        }
	    }
	});
}