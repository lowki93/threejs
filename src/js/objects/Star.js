var Star = ( function() {

	function Star(nb) {

		THREE.Object3D.call( this );

		var starGeometry = new THREE.Geometry();

		for ( var i = 0; i < nb; i ++ ) {

			var vertex = new THREE.Vector3();
			vertex.x = Math.random() * 2 - 1;
			vertex.y = Math.random() * 2 - 1;
			vertex.z = Math.random() * 2 - 1;
			vertex.multiplyScalar( 10000 );

			starGeometry.vertices.push( vertex );

		}

		var sartMaterial = [
			new THREE.PointCloudMaterial({
				uniforms: {},
				vertexShader: document.getElementById("vertexSoleil").textContent,
				fragmentShader: document.getElementById("fragmentSoleil").textContent,
				blending: THREE.AdditiveBlending,
				depthWrite: false,
				color: 0x999999,
				size: 1,
				sizeAttenuation: false
			}),
			new THREE.PointCloudMaterial({
				color: 0xffffff,
				size: 2,
				sizeAttenuation: false
			}),
			new THREE.PointCloudMaterial({
				color: 0x11119f,
				size: 1,
				sizeAttenuation: false
			})
		];

		for ( i = 0; i < nb; i ++ ) {

			var star = new THREE.PointCloud( starGeometry, sartMaterial[0] );

			star.dynamic = true;

			star.rotation.x = Math.random() * 6;
			star.rotation.y = Math.random() * 6;
			star.rotation.z = Math.random() * 6;

			var s = i * 10 + 1;
			star.scale.set( s, s, s );

			star.matrixAutoUpdate = true;
			star.updateMatrix();

			this.add( star );
		}

	};

	Star.prototype = new THREE.Object3D;
    Star.prototype.constructor = Star;

    return Star;

})();