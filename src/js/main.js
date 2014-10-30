var webgl, gui;

$(document).ready(init);

function init(){

	gui = new dat.GUI();
	webgl = new Webgl(window.innerWidth, window.innerHeight, gui);

	gui.close();

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

function showInformation() {

	$('.planet').hide();
	$('.saturn').show();
	$('.planets')
		.animate({
			opacity: 1,
			bottom: 0,
		}, 1000)
		.delay( 8000 )
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

$('.menu button')
	.on('click', function () {

		webgl.seeSaturn();
		showInformation();

	})
;