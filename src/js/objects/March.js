var March =  ( function () {

	function March() {

		THREE.Object3D.call( this );

		var marchMaterial = new THREE.MeshPhongMaterial({
			wireframe: false,
			color: 0xffffff,
			map: THREE.ImageUtils.loadTexture("assets/img/march.jpg"),
			shininess: 10,
			specular: 0xffffff,
			bumpScale: 0.5,
			metal: true
		});

		var marchSphere = new THREE.SphereGeometry( 20, 20, 20);

		this.march = new THREE.Mesh( marchSphere, marchMaterial);
		this.add( this.march );

	};

	March.prototype = new THREE.Object3D;
	March.prototype.constructor = March;

	March.prototype.update = function(time, marchPosition, position) {

		marchPosition.x = Math.cos(time * 0.0005 ) * position;
        marchPosition.z = Math.sin(time * 0.0005 ) * position;

	};

    March.prototype.updateCamera = function(time, cameraPosition, position) {

    	cameraPosition.x = Math.cos(time * 0.0005  ) * position + 500 ;
        cameraPosition.z = Math.sin(time * 0.0005  ) * position + 500 ;

    };

	return March;

})();