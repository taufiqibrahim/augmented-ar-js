AFRAME.registerComponent('gps-vector-ways', {
    init: function () {
        this.originSphMerc = null;
        console.log(this);

        this.vectorWaysListener = (ev) => {
            var camera = document.querySelector('[gps-new-camera]');

            console.log(camera);
            console.log(camera.components);
            console.log(camera.components['gps-new-camera']);

            if (!camera.components['gps-new-camera']) {
                console.error('gps-new-camera not initialised');
            } else {
                if (!this.originSphMerc) {
                    this.originSphMerc = camera.components['gps-new-camera'].originCoords;
                }
                
                ev.detail.objectIds.forEach(k => {
                    // console.log(this.el.object3DMap[k]);
                    // console.log(this.originSphMerc)
                    // this.el.object3DMap[k].geometry.translate(-this.originSphMerc[0], 0, this.originSphMerc[1]);
                });
            }
        };

        this.el.addEventListener('vector-ways-loaded', this.vectorWaysListener);
    }
});