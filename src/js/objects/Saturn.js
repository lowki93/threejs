var Saturn = ( function () {

	function Saturn() {

		THREE.Object3D.call( this );

		this.planet = new THREE.Object3D();

		var saturnMaterial = new THREE.MeshPhongMaterial({
			wireframe: false,
			color: 0xffffff,
			map: THREE.ImageUtils.loadTexture("assets/img/saturnmap.jpg"),
			shininess: 1,
			specular: 0xffffff,
			bumpScale: 0.5,
			metal: true
		});

		var saturnSphere = new THREE.SphereGeometry(100, 100, 100);
		this.saturn = new THREE.Mesh(saturnSphere, saturnMaterial);
		this.planet.add( this.saturn );

		/** RING **/
		this.ring(100);

		this.add( this.planet );
	};

	Saturn.prototype = new THREE.Object3D;
    Saturn.prototype.constructor = Saturn;

    Saturn.prototype.ring = function(size) {

		var particles = 5000;

		var geometry = new THREE.BufferGeometry();

		var positions = new Float32Array( particles * 3 );
		var colors = new Float32Array( particles * 3 );

		var color = new THREE.Color();

		var n = 1000, n2 = n / 2; // particles spread in the cube

		for ( var i = 0; i < positions.length; i += 3 ) {

			// positions
			var rayon = ( Math.random() * ( ( size + 50 ) - ( size + 20 ) )) + ( size + 20 );
			var angle =  Math.random() *Math.PI * 2;
			var x = Math.cos( angle ) * rayon;
			var y = Math.sin( angle ) * rayon;
			var z = 0;

			positions[ i ]     = x;
			positions[ i + 1 ] = y;
			positions[ i + 2 ] = z;

			// colors

			var vx = ( x / n ) + 0.5;
			var vy = ( y / n ) + 0.5;
			var vz = ( z / n ) + 0.5;

			color.setRGB( vx, vy, vz );

			colors[ i ]     = color.r;
			colors[ i + 1 ] = color.g;
			colors[ i + 2 ] = color.b;

		}

		geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
		geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );

		geometry.computeBoundingSphere();

		var material = new THREE.PointCloudMaterial( { size: 1, vertexColors: THREE.VertexColors } );

		this.particleSystem = new THREE.PointCloud( geometry, material );
		this.particleSystem.rotation.x = -Math.PI * 0.25
		this.planet.add( this.particleSystem );

    };

    Saturn.prototype.update = function(time, planetPosition, position) {
    	this.planet.rotation.y += 0.005;

    	planetPosition.x = Math.cos(time * 0.0008 ) * position;
        planetPosition.z = Math.sin(time * 0.0008 ) * position;

    };

    Saturn.prototype.updateCamera = function(time, cameraPosition, position) {

    	cameraPosition.x = Math.cos(time * 0.0008 ) * position + 500 ;
        cameraPosition.z = Math.sin(time * 0.0008 ) * position + 500 ;

    };

    return Saturn;

})();