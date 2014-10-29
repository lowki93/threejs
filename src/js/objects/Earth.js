var Earth = ( function () {

	function Earth() {

		THREE.Object3D.call ( this );

		var earthMaterial = new THREE.MeshPhongMaterial({
			wireframe: false,
			color: 0xffffff,
			map: THREE.ImageUtils.loadTexture("assets/img/terremin.jpg"),
			//lightMap: terre_lumieres,
			shininess: 100,
			specular: 0xffffff,
			specularMap: THREE.ImageUtils.loadTexture("assets/img/terre_speculaire.jpg"),
			bumpMap: THREE.ImageUtils.loadTexture("assets/img/terre_normal.jpg"),
			bumpScale: 0.5,
			metal: true
		});

		var earthSphere = new THREE.SphereGeometry(50, 50, 50);

		this.earth = new THREE.Mesh(earthSphere, earthMaterial);
		// terre.rotation.y = -2;
		// terre.rotation.z = -0.41;
		this.add( this.earth);

		this.moon = new Moon();
		this.moon.position.set( 100, 0, 0 );
		this.add( this.moon);
	};

	Earth.prototype = new THREE.Object3D;
    Earth.prototype.constructor = Earth;

	return Earth;

})();