var Sun = ( function (){

	function Sun() {

		THREE.Object3D.call( this );

		var sunMaterial = new THREE.ShaderMaterial({
			uniforms: {},
			vertexShader: document.getElementById("vertexSoleil").textContent,
			fragmentShader: document.getElementById("fragmentSoleil").textContent,
			side: THREE.BackSide,
			blending: THREE.AdditiveBlending,
			transparent: true,
			light: false
		});

		var sunSphere = new THREE.SphereGeometry(500, 64, 48);
		this.sun = new THREE.Mesh(sunSphere, sunMaterial);
		this.add( this.sun );
	};

	Sun.prototype = new THREE.Object3D;
    Sun.prototype.constructor = Sun;

	return Sun;

})();