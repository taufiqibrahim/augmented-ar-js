window.onload = () => {
    console.log("on load")

    AFRAME.registerComponent("ground-hit-test", {
        init: function () {
            this.raycaster = new THREE.Raycaster();
            this.cameraPosition = new THREE.Vector2(0, 0);
            this.scene = this.el.sceneEl.object3D;
            this.groundPlane = this.el.sceneEl.querySelector("#ground-plane");

            this.hitTest = this.hitTest.bind(this);

            // Listen for the AR camera's "loaded" event
            this.el.sceneEl.camera.addEventListener("loaded", this.hitTest);
        },
        hitTest: function () {
            console.log("hit test")
            this.cameraPosition.set(0, 0);
            this.raycaster.setFromCamera(this.cameraPosition, this.scene);

            // Perform the hit test against the ground plane
            const intersects = this.raycaster.intersectObject(this.groundPlane.object3D, true);

            if (intersects.length > 0) {
                const intersection = intersects[0];
                console.log("Intersection point:", intersection.point);

                // Here you can place your custom meshes or models on the ground
                const mesh = new THREE.Mesh(
                    new THREE.BoxGeometry(1, 1, 1),
                    new THREE.MeshBasicMaterial({ color: "blue" })
                );
                mesh.position.copy(intersection.point);
                this.scene.add(mesh);
            }
        },
    });

}