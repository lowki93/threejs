var Atmosphere = ( function() {

	function Atmosphere() {

		THREE.Object3D.call( this );

		var atmophereMaterial = new THREE.ShaderMaterial({
			uniforms: {},
			vertexShader: document.getElementById("vertexAtmosphere").textContent,
			fragmentShader: document.getElementById("fragmentAtmosphere").textContent,
			side: THREE.BackSide,
			blending: THREE.AdditiveBlending,
			transparent: true,
			light: false
		});

		atmosphereSphere = new THREE.SphereGeometry(50, 50, 50);
		this.atmosphere = new THREE.Mesh(atmosphereSphere, atmophereMaterial);
		this.add(this.atmosphere);

	};

	Atmosphere.prototype = new THREE.Object3D;
    Atmosphere.prototype.constructor = Atmosphere;

    return Atmosphere;
    
})();