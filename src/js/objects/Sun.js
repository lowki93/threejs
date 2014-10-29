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

/* ##################
###### SOLEIL ######
################# */

// soleil_matiere = new THREE.ShaderMaterial({
// 	uniforms: {},
// 	vertexShader: document.getElementById("vertexSoleil").textContent,
// 	fragmentShader: document.getElementById("fragmentSoleil").textContent,
// 	side: THREE.BackSide,
// 	blending: THREE.AdditiveBlending,
// 	transparent: true,
// 	light: false
// });

// soleil_sphere = new THREE.SphereGeometry(120, 32, 32);
// soleil = new THREE.Mesh(sphere, soleil_matiere);
// soleil.scale.set(100, 100, 100);
// soleil.position.x = 105000;
// soleil.position.y = 0;
// soleil.position.z = 100000;
// scene.add(soleil);