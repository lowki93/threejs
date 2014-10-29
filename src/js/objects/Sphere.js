var Sphere = (function(){

    function Sphere(){
        THREE.Object3D.call(this);

        var geometry = new THREE.SphereGeometry(35);
        var material = new THREE.MeshBasicMaterial({color: 0x3facc8, wireframe: true});
        this.mesh = new THREE.Mesh(geometry, material);
        this.add(this.mesh);
    }

    Sphere.prototype = new THREE.Object3D;
    Sphere.prototype.constructor = Sphere;

    Sphere.prototype.update = function(time, position) {
        // this.mesh.position.y = - Math.cos(time) + position;
        // this.mesh.position.x = - Math.sin(time) + position;
    };

    return Sphere;
})();