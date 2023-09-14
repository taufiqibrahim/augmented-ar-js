const BASE_URL = "https://pnva33y2rxxx62ipkwd6glmmfq0rnolc.lambda-url.ap-southeast-1.on.aws";
const OSM_VERTICAL_POS_ADJUSTMENT = 5;
const DEFAULT_ROAD_COLOR = '#ffd700';

AFRAME.registerComponent('osm', {
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
        console.log("osm.js init()");
        this.camera = document.querySelector("[gps-new-camera]");
        this.camera.addEventListener("gps-camera-update-position", e => {
            this._readOsm(e.detail.position.latitude, e.detail.position.longitude);
        });
    },

    update: function () {
        console.log("osm.js update()");

        this.camera.addEventListener("gps-camera-update-position", e => {
            const latitude = e.detail.position.latitude;
            const longitude = e.detail.position.longitude;

            if (latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180) {
                this._readOsm(latitude, longitude);

                console.log("1 - New gps-camera-update-position received.");

                // Update status pane
                var currentstate = document.querySelector('#currentstate');
                currentstate.innerHTML = `Gps Info:
                        <br/>Latitude: ${latitude}
                        <br/>Longitude: ${longitude}`;
            }
            else {
                console.error("ERROR: Invalid longitude and latitude", this.data);
            }
        });

    },

    _convertLngLatToMercator: function (lng, lat) {
        const RADIUS = 6378137;
        // const MAX_LATITUDE = 85.0511287798;
        const MAX_LATITUDE = 90.0;

        const latRad = Math.max(Math.min(MAX_LATITUDE, lat), -MAX_LATITUDE) * Math.PI / 180;
        const sinLat = Math.sin(latRad);
        const x = RADIUS * lng * Math.PI / 180;
        const y = -1 * (RADIUS * Math.log((1 + sinLat) / (1 - sinLat)) / 2);

        return [x, y];
    },

    _readOsm: function (lat, lon) {
        console.log(`osm.js _readOsm(${lat}, ${lon})`);
        const gpsCameraComponent = this.camera.components["gps-new-camera"];
        if (!gpsCameraComponent) {
            alert('gps-new-camera component not initialised');
            return;
        }
        fetch(`${BASE_URL}?bbox=${lon - 0.01},${lat - 0.01},${lon + 0.01},${lat + 0.01}&layers=ways&outProj=4326`)
            .then(response => response.json())
            .then(json => {

                // // Draw ground plane
                // // Create a PlaneGeometry for the ground
                // const groundGeometry = new THREE.PlaneGeometry(100, 100, 1, 1);

                // // Create a MeshStandardMaterial with opacity for the ground
                // const groundMaterial = new THREE.MeshStandardMaterial({
                //     color: '#ffc000',
                //     // opacity: 0.5,
                //     transparent: true,
                // });

                // // Create a Mesh with the ground geometry and material
                // const ground = new THREE.Mesh(groundGeometry, groundMaterial);

                // ground.position.set(0, 0, -5);

                // // Rotate the ground so it faces up
                // ground.rotation.x = -Math.PI / 2;

                // // Add the ground to the scene
                // this.el.setObject3D("Ground", ground);

                const drawProps = {
                    'footway': { color: '#00ff00' },
                    'path': { color: '#00ff00' },
                    'steps': { color: '#00ff00' },
                    'bridleway': { color: '#ffc000' },
                    'byway': { color: '#ff0000' },
                    'track': { color: '#ff8080' },
                    'cycleway': { color: '#00ffff' },
                };
                const objectIds = [];
                json.features.forEach((f, i) => {
                    const line = [];
                    let projectedCoords;
                    if (f.geometry.type == 'LineString' && f.geometry.coordinates.length >= 2) {
                        f.geometry.coordinates.forEach(coord => {
                            // projectedCoords = gpsCameraComponent.threeLoc.lonLatToWorldCoords(coord[0], coord[1]);
                            projectedCoords = this._convertLngLatToMercator(coord[0], coord[1]);
                            // console.log(projectedCoords, projectedCoords2)
                            line.push([projectedCoords[0], 0, projectedCoords[1]]);
                        });

                        if (line.length >= 2) {
                            const g = new OsmWay(line, (drawProps[f.properties.highway] ? (drawProps[f.properties.highway].width || 5) : 5)).geometry;
                            // const g = new OsmWayPoint(line, (drawProps[f.properties.highway] ? (drawProps[f.properties.highway].width || 5) : 5)).geometry;

                            const color = drawProps[f.properties.highway] ? (drawProps[f.properties.highway].color || DEFAULT_ROAD_COLOR) : DEFAULT_ROAD_COLOR;

                            const mesh = new THREE.Mesh(g,
                                new THREE.MeshBasicMaterial({
                                    color: color
                                }));

                            // Adjust OSM ways vertical position (Not working!)
                            // mesh.position.y -= OSM_VERTICAL_POS_ADJUSTMENT;

                            this.el.setObject3D(f.properties.osm_id, mesh);
                            objectIds.push(f.properties.osm_id);
                        }
                    }
                });
                this.el.emit('vector-ways-loaded', {
                    objectIds: objectIds
                });
            });
    }
});