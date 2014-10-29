var Webgl = (function(){

    function Webgl(width, height){
        // Basic three.js setup
        this.scene = new THREE.Scene();
        this.potentiel = 0.5;
        this.object = null;
        this.mouseActive = false;
        this.planets = [];
        this.mouseX = -1;
        this.mouseY = -1;
        this.INTERSECTED = null;
        this.audio = new Audio();

        this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000);
        this.camera.position.z = 1000;
        this.camera.position.y = 1500;
        this.camera.position.x = 1000;

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
    };

    Webgl.prototype.resize = function(width, height) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    };

    Webgl.prototype.render = function() {
        this.renderer.render(this.scene, this.camera);

        var time = Date.now();

        // this.march.update(time, this.march.position, this.marchPositionX );
        this.earth.update(time, this.earth.position, this.earthPositionX, this.potentiel );
        this.saturn.update(time, this.saturn.position, this.saturnPositionX );

        switch(this.object) {
            case this.saturn :  this.saturn.updateCamera(time, this.camera.position, this.saturnPositionX);
                break;
            case this.earth : this.earth.updateCamera(time, this.camera.position, this.earthPositionX, this.potentiel);
                break;
        };            

        if( this.mouseActive == true)
            this.hover();

        this.mouseActive = false;

        // this.controls.update();
    };

    Webgl.prototype.mouseClick = function(x, y) {
        this.mouseActive = true;
        this.mouseX = x;
        this.mouseY = y;
    };

    Webgl.prototype.planetAxe = function( position ) {

        var geometry = new THREE.TorusGeometry( position, 1, 16, 100 );
        var material = new THREE.MeshBasicMaterial( { color: 0xffffff, side: THREE.DoubleSide } );
        var mesh = new THREE.Mesh( geometry, material );
        mesh.rotation.x = - Math.PI * 0.5;
        this.scene.add( mesh );

    };

    Webgl.prototype.hover = function() {
        var vector = new THREE.Vector3( this.mouseX, this.mouseY, 1).unproject( this.camera );
        this.raycaster.set( this.camera.position, vector.sub( this.camera.position ).normalize() );

        var intersects = this.raycaster.intersectObjects( this.planets );

        if ( intersects.length > 0 ) {

            if ( this.INTERSECTED != intersects[0].object ) {

                this.object = intersects[0].object.parent.parent;
 
                this.camera.position.x = this.object.position.x + 900;
                this.camera.position.y = this.object.position.y + 900;
                this.camera.position.z = this.object.position.z + 900;
                // this.camera.lookAt( object.position );

                
                
                // if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );

                // this.INTERSECTED = intersects[ 0 ].object;
                // this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
                // this.INTERSECTED.material.emissive.setHex( 0xff0000 );


                // this.audio.play();

            }

        } /*else {

            if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );

            this.INTERSECTED = null;

        }*/
    };

    return Webgl;

})();
