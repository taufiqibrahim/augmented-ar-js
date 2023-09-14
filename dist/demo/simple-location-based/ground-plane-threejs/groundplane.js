AFRAME.registerComponent('groundplane', {
    schema: {
        latitude: {
            type: 'number',
            default: 181
        },
        longitude: {
            type: 'number',
            default: 91
        }
    },

    init: function () {
        console.log("groundplane.js init()");
        this.camera = document.querySelector("[gps-new-camera]");
        this._createGroundPlane(0, 0);
    },

    update: function () {
        console.log("groundplane.js update()");
    },

    _createGroundPlane: function (lat, lon) {
        console.log(`groundplane.js _createGroundPlane(${lat}, ${lon})`);

        // const gpsCameraComponent = this.camera.components["gps-new-camera"];
        // if (!gpsCameraComponent) {
        //     alert('gps-new-camera component not initialised');
        //     return;
        // }
        // fetch(`${BASE_URL}?bbox=${lon - 0.01},${lat - 0.01},${lon + 0.01},${lat + 0.01}&layers=ways&outProj=4326`)
        //     .then(response => response.json())
        //     .then(json => {

        // Draw ground plane
        // Create a PlaneGeometry for the ground
        // const planeMesh = new THREE.Mesh(
        //     new THREE.PlaneGeometry(100, 100, 1, 1),
        //     new THREE.MeshStandardMaterial({
        //         color: '#ffc000',
        //         opacity: 0.5,
        //         transparent: true,
        //     })
        // );
        // planeMesh.rotateX(-Math.PI / 2);

        // console.log(planeMesh);

        // this.el.setObject3D("planeMesh", planeMesh);

        const size = 100;
        const divisions = 100;
        const gridHelper = new THREE.GridHelper(size, divisions);
        this.el.setObject3D("gridHelper", gridHelper);

        //         // // Create a MeshStandardMaterial with opacity for the ground
        //         // const groundMaterial = new THREE.MeshStandardMaterial({
        //         //     color: '#ffc000',
        //         //     // opacity: 0.5,
        //         //     transparent: true,
        //         // });

        //         // // Create a Mesh with the ground geometry and material
        //         // const ground = new THREE.Mesh(groundGeometry, groundMaterial);

        //         // ground.position.set(0, 0, -5);

        //         // // Rotate the ground so it faces up
        //         // ground.rotation.x = -Math.PI / 2;

        //         // // Add the ground to the scene
        //         // this.el.setObject3D("Ground", ground);

        //         const drawProps = {
        //             'footway': { color: '#00ff00' },
        //             'path': { color: '#00ff00' },
        //             'steps': { color: '#00ff00' },
        //             'bridleway': { color: '#ffc000' },
        //             'byway': { color: '#ff0000' },
        //             'track': { color: '#ff8080' },
        //             'cycleway': { color: '#00ffff' },
        //         };
        //         const objectIds = [];
        //         json.features.forEach((f, i) => {
        //             const line = [];
        //             let projectedCoords;
        //             if (f.geometry.type == 'LineString' && f.geometry.coordinates.length >= 2) {
        //                 f.geometry.coordinates.forEach(coord => {
        //                     projectedCoords = gpsCameraComponent.threeLoc.lonLatToWorldCoords(coord[0], coord[1]);
        //                     line.push([projectedCoords[0], 0, projectedCoords[1]]);
        //                 });

        //                 if (line.length >= 2) {
        //                     const g = new OsmWay(line, (drawProps[f.properties.highway] ? (drawProps[f.properties.highway].width || 5) : 5)).geometry;

        //                     const color = drawProps[f.properties.highway] ? (drawProps[f.properties.highway].color || '#ffffff') : '#ffffff';

        //                     const mesh = new THREE.Mesh(g,
        //                         new THREE.MeshBasicMaterial({
        //                             color: color
        //                         }));
        //                     this.el.setObject3D(f.properties.osm_id, mesh);
        //                     objectIds.push(f.properties.osm_id);
        //                 }
        //             }
        //         });
        //         this.el.emit('vector-ways-loaded', {
        //             objectIds: objectIds
        //         });
        //     });
    }
});