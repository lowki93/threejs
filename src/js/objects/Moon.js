var Moon = ( function () {

	function Moon() {

		THREE.Object3D.call( this );

		var moonMaterial = new THREE.MeshPhongMaterial({
			wireframe: false,
			color: 0xffffff,
			map: THREE.ImageUtils.loadTexture("assets/img/moon.jpg"),
			shininess: 10,
			specular: 0xffffff,
			bumpScale: 0.5,
			metal: true
		});

		var moonSphere = new THREE.SphereGeometry(10, 10, 10);
		this.moon = new THREE.Mesh(moonSphere, moonMaterial);
		this.add( this.moon );

	};

	Moon.prototype = new THREE.Object3D;
    Moon.prototype.constructor = Moon;

	return Moon;

})();