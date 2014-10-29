var Webgl = (function(){

    function Webgl(width, height){
        // Basic three.js setup
        this.scene = new THREE.Scene();

        this.mouseX = -1;
        this.mouseY = -1;
        this.INTERSECTED = null;
        this.audio = new Audio();

        this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 10000);
        this.camera.position.z = 1000;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(0x2D2D2D);

        $('.three').append(this.renderer.domElement);

        this.controls = new THREE.TrackballControls( this.camera, this.renderer.domElement );

        var material = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('assets/img/crate.jpg'),
            bumpMap: THREE.ImageUtils.loadTexture('assets/img/crate.jpg'),
            bumpScale: 3
        });

        var material2 = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('assets/img/crate.jpg'),
            bumpMap: THREE.ImageUtils.loadTexture('assets/img/crate.jpg'),
            bumpScale: 10
        });

        // Directly add objects
        this.someObject = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100), material);
        this.someObject.position.set(0, 0, 0);
        // this.scene.add(this.someObject);

        // Directly add objects
        this.someObject1 = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100), material2);
        this.someObject1.position.set(200, 0, 0);
        // this.scene.add(this.someObject1);

        //Or create container classes for them to simplify your code
        this.someOtherObject = new Sphere();
        this.someOtherObject.position.set(200, 0, 0);
        // this.scene.add(this.someOtherObject);

        this.sun = new Sun();
        this.sun.position.set( 0, 0, 0 );
        this.scene.add( this.sun );

        this.earth = new Earth();
        this.earth.position.set( 400, 0, 0 );
        this.scene.add( this.earth );

        // directional lighting
        // var directionalLight = new THREE.DirectionalLight(0xffffff);
        // directionalLight.position.set(1, 1, 1).normalize();
        // this.scene.add(directionalLight);


        var light = new THREE.PointLight(0x111111);
        this.camera.add(light);

        var directionalLight = new THREE.DirectionalLight(0xf0f0ff);
        directionalLight.position.set(1, 0, 1).normalize();
        this.scene.add(directionalLight);

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
        // this.someObject.rotation.y += 0.01;
        // this.someObject.rotation.x += 0.01;

        // this.someOtherObject.update(time, 200);
        this.hover();
        this.controls.update();
    };

    Webgl.prototype.mouseMove = function(x, y) {
        this.mouseX = x;
        this.mouseY = y;
    };

    Webgl.prototype.hover = function() {
        var vector = new THREE.Vector3( this.mouseX, this.mouseY, 1).unproject( this.camera );
        this.raycaster.set( this.camera.position, vector.sub( this.camera.position ).normalize() );

        var intersects = this.raycaster.intersectObjects( this.scene.children );

        // if ( intersects.length > 0 ) {

        //     if ( this.INTERSECTED != intersects[0].object ) {

        //         if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );

        //         this.INTERSECTED = intersects[ 0 ].object;
        //         this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
        //         this.INTERSECTED.material.emissive.setHex( 0xff0000 );
        //         this.audio.play();

        //     }

        // } else {

        //     if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );

        //     this.INTERSECTED = null;

        // }
    };

    return Webgl;

})();
