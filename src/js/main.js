var webgl, gui;

$(document).ready(init);

function init(){
	webgl = new Webgl(window.innerWidth, window.innerHeight);

	gui = new dat.GUI();
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

$(document)
	.on('click', function () {

		event.preventDefault();
		webgl.mouseClick(( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1);

	})
;