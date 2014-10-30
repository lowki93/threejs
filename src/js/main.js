var webgl, gui;

$(document).ready(

	$('.title')
		.animate({
			opacity: 1,
		}, 1500)

);

function init(){

	gui = new dat.GUI();
	webgl = new Webgl(window.innerWidth, window.innerHeight, gui);

	$(window).on('resize', resizeHandler);

	animate();

}

function resizeHandler() {
	webgl.resize(window.innerWidth, window.innerHeight);
}

function animate() {
	requestAnimationFrame(animate);
	webgl.render();
}

function showInformation(planet) {

	$('.planet').hide();
	$('.'+planet).show();
	$('.planets')
		.animate({
			opacity: 1,
			bottom: 40,
		}, 1000)
		.delay( 5000 )
		.animate({
			opacity: 0,
			bottom: -300,
		}, 1000);

}
$(document)
	.on('click', function () {

		event.preventDefault();
		webgl.mouseClick(( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1);

	})
;

$('.menu a')
	.on('click', function () {

		webgl.moveCameraButton();

	})
;

$('.title div a')
	.on('click', function () {

		$('.title')
			.animate({
				bottom: -500,
				opacity: 0,
			}, 3000);

		init();
	})
;

$('.menu-planets a')
	.on('click', function (event) {

		event.preventDefault();
		var planet = $(this).attr('href');
		webgl.movePlanet(planet);
		showInformation(planet);

	})
;