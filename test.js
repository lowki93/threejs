var largeur;
var hauteur;

var conteneur;
var scene;
var camera;
var camera_positon_x;
var camera_positon_y;
var camera_positon_z;
var camera_angle;
var camera_aspect;
var camera_proche;
var camera_loin;
var rendu;
var lumiere;

var planete;

var terre;
var terre_uniforms;
var terre_sphere;
var terre_texture;
var terre_matiere;
var terre_nuages;
var terre_nuages_ombres;
var terre_nuages_ombres_matiere;

var terre_nuages_clone;

var matiere_atmosphere;

var atmosphere;
var atmosphere_sphere;

var reduction;
var controles;
var statistiques;
var horloge;

jQuery(function($){

	function dimensions(){

		largeur = $(window).width();
		hauteur = $(window).height();

		rendu.setSize(largeur, hauteur);
		camera.aspect = largeur / hauteur;
		camera.updateProjectionMatrix();

	};

	function initialisation(){

		scene = new THREE.Scene();

		horloge = new THREE.Clock();

		/* ##################
		###### RENDU #######
		################# */

		if( !Detector.webgl ) return;

		rendu = new THREE.WebGLRenderer({
			antialias: true,
			precision: "highp",
			stencil: true,
			preserveDrawingBuffer: true
		});
		rendu.setClearColor(0x000000, 1);
		rendu.sortObjects = false;
		rendu.autoClear = true;
		rendu.gammaInput = true;
		rendu.gammaOutput = true;
		rendu.shadowMapEnabled = true;
		rendu.shadowMapSoft = true;

		rendu.setSize(largeur, hauteur);
		$("body").append(rendu.domElement);

		/* ##################
		###### CAMERA ######
		################# */

		camera_angle = 45;
		camera_aspect = largeur / hauteur;
		camera_min = 0.1;
		camera_max = 9999999;
		camera_positon_x = 0;
		camera_positon_y = 100;
		camera_positon_z = 600;
		reduction = 100;
		camera = new THREE.PerspectiveCamera(camera_angle, camera_aspect, camera_min, camera_max);
		scene.add(camera);
		camera.position.set(camera_positon_x, camera_positon_y, camera_positon_z);
		camera.lookAt(scene.position);

		dimensions();

		/* ###################
		##### CONTROLES #####
		################## */

		controles = new THREE.TrackballControls(camera, rendu.domElement);
		controles.rotateSpeed = 2.0;
		controles.zoomSpeed = 1.2;
		controles.panSpeed = 0.8;
		controles.noZoom = false;
		controles.noPan = false;
		controles.staticMoving = true;
		controles.dynamicDampingFactor = 1.0;
		controles.keys = [65, 83, 68];

		/* ##################
		### STATISTIQUES ###
		################# */

		statistiques = new Stats();
		$(statistiques.domElement).css({
			position: "absolute",
			bottom: 0,
			zIndex: 100
		});

		$("body").append(statistiques.domElement);

		/* ##################
		##### LUMIERES #####
		################# */

		lumiere_camera = new THREE.PointLight(0x111111);
		camera.add(lumiere_camera);

		lumiere_directionnelle = new THREE.DirectionalLight(0xf0f0ff);
		lumiere_directionnelle.position.set(1, 0, 1).normalize();
		scene.add(lumiere_directionnelle);

		/* ##################
		## SPHERE DE BASE ##
		################# */

		sphere = new THREE.SphereGeometry(100, 32, 32);

		/* ##################
		###### SOLEIL ######
		################# */

		soleil_matiere = new THREE.ShaderMaterial({
			uniforms: {},
			vertexShader: document.getElementById("vertexSoleil").textContent,
			fragmentShader: document.getElementById("fragmentSoleil").textContent,
			side: THREE.BackSide,
			blending: THREE.AdditiveBlending,
			transparent: true,
			light: false
		});

		soleil_sphere = new THREE.SphereGeometry(120, 32, 32);
		soleil = new THREE.Mesh(sphere, soleil_matiere);
		soleil.scale.set(100, 100, 100);
		soleil.position.x = 105000;
		soleil.position.y = 0;
		soleil.position.z = 100000;
		scene.add(soleil);

		/* ##################
		## GROUPE PLANETE ##
		################# */

		planete = new THREE.Object3D();

		/* ##################
		####### TERRE ######
		################# */

		terre_texture = THREE.ImageUtils.loadTexture("images/terremin.jpg");
		terre_normal = THREE.ImageUtils.loadTexture("images/terre_normal.jpg");
		terre_nuages = THREE.ImageUtils.loadTexture("images/terre_nuages.png");
		terre_nuages_ombres = THREE.ImageUtils.loadTexture("images/terre_nuages_ombres.png");
		terre_speculaire = THREE.ImageUtils.loadTexture("images/terre_speculaire.jpg");
		terre_lumieres = THREE.ImageUtils.loadTexture("images/terre_lumieres.png");

		terre_matiere = new THREE.MeshPhongMaterial({
			wireframe: false,
			color: 0xffffff,
			map: terre_texture,
			//lightMap: terre_lumieres,
			shininess: 100,
			specular: 0xffffff,
			specularMap: terre_speculaire,
			bumpMap: terre_normal,
			bumpScale: 0.5,
			metal: true
		});

		terre = new THREE.Mesh(sphere, terre_matiere);
		terre.rotation.y = -2;
		terre.rotation.z = -0.41;
		planete.add(terre);

		/* ##################
		#### ATMOSPHERE ####
		################# */

		matiere_atmosphere = new THREE.ShaderMaterial({
			uniforms: {},
			vertexShader: document.getElementById("vertexAtmosphere").textContent,
			fragmentShader: document.getElementById("fragmentAtmosphere").textContent,
			side: THREE.BackSide,
			blending: THREE.AdditiveBlending,
			transparent: true,
			light: false
		});

		atmosphere_sphere = new THREE.SphereGeometry(120, 32, 32);
		atmosphere = new THREE.Mesh(sphere, matiere_atmosphere);
		atmosphere.scale.set(1.2, 1.2, 1.2)
		atmosphere.rotation.z = -0.41;
		planete.add(atmosphere);

		/* ###################
		### GROUPE NUAGES ###
		################## */

		nuages = new THREE.Object3D();

		/* ###################
		### NUAGES OMBRES ###
		################## */

		terre_nuages_ombres_matiere = new THREE.MeshPhongMaterial({
			color: 0xffffff,
			map: terre_nuages_ombres,
			transparent: true
		});

		terre_nuages_ombres = new THREE.Mesh(sphere, terre_nuages_ombres_matiere);
		terre_nuages_ombres.scale.set(1.01, 1.01, 1.01);
		terre_nuages_ombres.rotation.z = -0.41;
		nuages.add(terre_nuages_ombres);



		/* ##################
		###### NUAGES ######
		################# */

		terre_nuages_matiere = new THREE.MeshPhongMaterial({
			color: 0xffffff,
			map: terre_nuages,
			transparent: true,
			side: THREE.DoubleSide,
		});

		terre_nuages_matiere.opacity = 0.2;

		for( i = 0; i < 10; i++ ){


			var terre_nuages = new THREE.Mesh(sphere, terre_nuages_matiere);
			terre_nuages.scale.set(1.03 + (i * 0.002), 1.03 + (i * 0.002), 1.03 + (i * 0.002));
			terre_nuages.rotation.z = -0.41;
			nuages.add(terre_nuages);

		};

		planete.add(nuages);

		scene.add(planete);

		/* ###################
		##### POUSSIERE #####
		################## */

		var poussiere_geometrie = new THREE.Geometry();

		for ( var i = 0; i < 10000; i ++ ) {

			var vertex = new THREE.Vector3();
			vertex.x = Math.random() * 2 - 1;
			vertex.y = Math.random() * 2 - 1;
			vertex.z = Math.random() * 2 - 1;
			vertex.multiplyScalar( 1000 );

			poussiere_geometrie.vertices.push( vertex );

		}

		poussiere_matiere = [
			new THREE.ParticleBasicMaterial({
				color: 0x212121,
				size: 1,
				sizeAttenuation: false,
			}),
			new THREE.ParticleBasicMaterial({
				color: 0x111111,
				size: 2,
				sizeAttenuation: false,
			}),
			new THREE.ParticleBasicMaterial({
				color: 0x000011,
				size: 1,
				sizeAttenuation: false,
			})
		];

		for ( i = 0; i < 100; i ++ ) {

			poussiere = new THREE.ParticleSystem( poussiere_geometrie, poussiere_matiere[i % 3] );

			poussiere.rotation.x = Math.random() * 6;
			poussiere.rotation.y = Math.random() * 6;
			poussiere.rotation.z = Math.random() * 6;

			var s = i * 10 + 1;
			poussiere.scale.set( s, s, s );

			poussiere.matrixAutoUpdate = true;
			poussiere.updateMatrix();

			//scene.add( poussiere );

		};

		/* ##################
		###### ETOILE ######
		################# */

		var etoile_geometrie = new THREE.Geometry();

		for ( var i = 0; i < 100; i ++ ) {

			var vertex = new THREE.Vector3();
			vertex.x = Math.random() * 2 - 1;
			vertex.y = Math.random() * 2 - 1;
			vertex.z = Math.random() * 2 - 1;
			vertex.multiplyScalar( 10000000 );

			etoile_geometrie.vertices.push( vertex );

		}

		etoile_matiere = [
			new THREE.ParticleBasicMaterial({
				uniforms: {},
				vertexShader: document.getElementById("vertexSoleil").textContent,
				fragmentShader: document.getElementById("fragmentSoleil").textContent,
				blending: THREE.AdditiveBlending,
				depthWrite: false,
				color: 0x999999,
				size: 1,
				sizeAttenuation: false
			}),
			new THREE.ParticleBasicMaterial({
				color: 0xffffff,
				size: 2,
				sizeAttenuation: false
			}),
			new THREE.ParticleBasicMaterial({
				color: 0x11119f,
				size: 1,
				sizeAttenuation: false
			})
		];

		for ( i = 0; i < 100; i ++ ) {

			etoile = new THREE.ParticleSystem( etoile_geometrie, etoile_matiere[0] );

			etoile.dynamic = true;

			etoile.rotation.x = Math.random() * 6;
			etoile.rotation.y = Math.random() * 6;
			etoile.rotation.z = Math.random() * 6;

			var s = i * 10 + 1;
			etoile.scale.set( s, s, s );

			etoile.matrixAutoUpdate = true;
			etoile.updateMatrix();

			scene.add( etoile );

		};

		$(window).on("resize", function(){
			dimensions();
		});


	}; initialisation();

	function animation(){

		requestAnimationFrame(animation);
		affichage();

	}; animation();

	function affichage(){

		planete.rotation.y += 0.0005;
		nuages.rotation.y += 0.0001;
		nuages.rotation.x += 0.0001;
		nuages.rotation.z += 0.0001;

		controles.update();
		rendu.render(scene, camera);
		statistiques.update();

	};

});