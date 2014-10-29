var Earth = ( function () {

	function Earth() {

		THREE.Object3D.call ( this );

		this.planet = new THREE.Object3D();

		var earthMaterial = new THREE.MeshPhongMaterial({
			wireframe: false,
			color: 0xffffff,
			map: THREE.ImageUtils.loadTexture("assets/img/terremin.jpg"),
			//lightMap: terre_lumieres,
			shininess: 10,
			specular: 0xffffff,
			specularMap: THREE.ImageUtils.loadTexture("assets/img/terre_speculaire.jpg"),
			bumpMap: THREE.ImageUtils.loadTexture("assets/img/terre_normal.jpg"),
			bumpScale: 0.5,
			metal: true
		});

		var earthSphere = new THREE.SphereGeometry(50, 50, 50);

		this.earth = new THREE.Mesh(earthSphere, earthMaterial);
		this.planet.add( this.earth );

		// this.atmosphere = new Atmosphere();
		// var scale = 1.2
		// this.atmosphere.scale.set(scale, scale, scale)
		// this.planet.add( this.atmosphere );

		this.add( this.planet );

		this.moon = new Moon();
		this.moonPositionX = 75; 
		this.moon.position.set( this.moonPositionX, 0, 0 );
		this.add( this.moon );
	};

	Earth.prototype = new THREE.Object3D;
    Earth.prototype.constructor = Earth;

    Earth.prototype.update = function(time, earthPosition, position, speed) {
    	this.earth.rotation.y += 0.005 * speed;

    	earthPosition.x = Math.cos(time * 0.001 ) * position;
        earthPosition.z = Math.sin(time * 0.001 ) * position;

        this.moon.position.x = - Math.cos(time * 0.005 * speed ) * this.moonPositionX;
        this.moon.position.z = - Math.sin(time * 0.005 * speed  ) * this.moonPositionX;
    };

    Earth.prototype.updateCamera = function(time, cameraPosition, position, speed) {
    	// console.log('toto');
    	cameraPosition.x = Math.cos(time * 0.001  ) * position + 500 ;
        cameraPosition.z = Math.sin(time * 0.001  ) * position + 500 ;

    };

	return Earth;

})();