var Webgl = (function(){
//http://planetpixelemporium.com/saturn.html
// https://github.com/superguigui/threejs-starter-kit
// maybe replace that by window... or something
    function Webgl(width, height, gui){

        // Basic three.js setup
        this.gui = gui;
        this.activeControls = false;
        this.scene = new THREE.Scene();
        this.potentiel = 0.5;
        this.mouseActive = false;
        this.planets = [];
        this.mouseX = -1;
        this.mouseY = -1;
        this.INTERSECTED = null;
        this.audio = new Audio();
        this.isMoving = true;
        this.distance = 1500;

        this.options = {
            cameraX : 500
        };

        this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 100000);
        this.camera.position.z = 15000;
        this.camera.position.y = 15000;
        this.camera.position.x = 15000;

        this.cameraCenter = new THREE.Object3D();
        this.cameraCenter = this.camera;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(0x000000);

        $('.three').append(this.renderer.domElement);

        this.controls = new THREE.TrackballControls( this.camera, this.renderer.domElement );

        /** STARS **/
        this.stars = new Star(3000);
        this.scene.add( this.stars );

        /** SUN **/
        this.sun = new Sun();
        this.sun.position.set( 0, 0, 0 );
        this.scene.add( this.sun );
        this.planets.push( this.sun.sun );
        this.object = this.sun;

        /** MARCH **/
        this.march = new March();
        this.marchPositionX = 400;
        this.march.position.set( this.marchPositionX, 0, 0 );
        this.scene.add( this.march );
        this.planets.push( this.march.march );

        this.planetAxe( this.marchPositionX );

        /** EARTH **/
        this.earth = new Earth();
        this.earthPositionX = 600;
        this.earth.position.set( this.earthPositionX, 0, 0 );
        this.scene.add( this.earth );
        this.planets.push( this.earth.earth )

        this.planetAxe( this.earthPositionX );


        /** SATURN **/
        this.saturn = new Saturn();
        this.saturnPositionX = 900;
        this.saturn.position.set( this.saturnPositionX, 0, 0 );
        this.scene.add( this.saturn );
        this.planets.push( this.saturn.saturn );

        this.planetAxe( this.saturnPositionX );

        var light = new THREE.PointLight(0xffffff);
        this.scene.add(light);

        this.raycaster = new THREE.Raycaster();

        this.audio.play();

        this.menu();
                // build the GUI
        this.buildGui(this.options);

        TweenMax.to(this.camera.position, 5,  {x: 1500, y: 1500, z:1500, ease:Linear.None, onComplete: function() {
        }, onCompleteScope: this });
    };

    Webgl.prototype.buildGui = function(options) {

        this.gui.add(this, 'distance').name('Distance').min(300).max(2000).listen();
    };

    Webgl.prototype.resize = function(width, height) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    };

    Webgl.prototype.render = function() {
        this.renderer.render(this.scene, this.camera);

        if( this.isMoving ){
            this.time = Date.now() * this.potentiel;

            this.march.update(this.time, this.march.position, this.marchPositionX );
            this.earth.update(this.time, this.earth.position, this.earthPositionX);
            this.saturn.update(this.time, this.saturn.position, this.saturnPositionX );

            switch(this.object) {
                case this.saturn :  this.saturn.updateCamera(this.time, this.camera, this.saturnPositionX, this.distance);
                    break;
                case this.earth : this.earth.updateCamera(this.time, this.camera.position, this.earthPositionX, this.distance);
                    break;
                case this.march : this.march.updateCamera(this.time, this.camera.position, this.marchPositionX, this.distance);
                    break;
            };

        }

        if( this.mouseActive == true)
            this.hover();

        this.mouseActive = false;

    };

    Webgl.prototype.mouseClick = function(x, y) {
        this.mouseActive = true;
        this.mouseX = x;
        this.mouseY = y;
    };


    Webgl.prototype.moveCameraButton = function() {

        var posX = Math.random();
        var posY = Math.random();
        var posZ = Math.random();

        TweenMax.to(this.camera.up, 2,  {x: posX, y: posY, z:posZ, ease:Expo.easeInOut, onUpdate: function() {
                this.camera.lookAt(this.object.position);
            }, onUpdateScope: this });

    };

    Webgl.prototype.planetAxe = function( position ) {

        var geometry = new THREE.TorusGeometry( position, 2, 10, 200 );
        var material = new THREE.MeshBasicMaterial( { color: 0x333333, side: THREE.DoubleSide } );
        var mesh = new THREE.Mesh( geometry, material );
        mesh.rotation.x = - Math.PI * 0.5;
        this.scene.add( mesh );

    };

    Webgl.prototype.hover = function() {
        
        var vector = new THREE.Vector3( this.mouseX, this.mouseY, 1).unproject( this.camera );
        this.raycaster.set( this.camera.position, vector.sub( this.camera.position ).normalize() );

        var intersects = this.raycaster.intersectObjects( this.planets );

        if ( intersects.length > 0 ) {

            this.isMoving = false;
            this.activeControls = false;
            if ( this.INTERSECTED != intersects[0].object ) {

                this.object = intersects[0].object.parent;

                if( this.object.parent != this.scene )
                    this.object = this.object.parent;

                this.moveCamera();
                
            }

        }
    };

    Webgl.prototype.movePlanet = function(planet) {

        switch(planet) {
            case 'saturn' :  this.object = this.saturn;
                break;
            case 'earth' : this.object = this.earth;
                break;
            case 'march' : this.object = this.march;
                break;
            case 'sun' : this.object = this.sun;
                break;
        };

        this.moveCamera();

    };

    Webgl.prototype.moveCamera = function() {

        switch(this.object) {
            case this.saturn :  this.distance = 900;
                break;
            case this.earth : this.distance = 500;
                break;
            case this.march : this.distance = 200;
                break;
            default: this.distance = 1500;
                break;
        };

        TweenMax.to(this.camera.position, 0.5,  {x: this.object.position.x + this.distance, y: this.object.position.y + this.distance, z:this.object.position.z + this.distance, ease:Expo.easeInOut, onComplete: function() {
            this.isMoving = true
        }, onCompleteScope: this });

    };

    Webgl.prototype.menu = function() {

        $('.click-info')
            .animate({
                top: 0,
            }, 4000);

        $('.menu')
            .animate({
                left: 40,
            }, 4000);

        $('.menu-planets')
            .animate({
                right: 40,
            }, 4000);
    };

    return Webgl;

})();