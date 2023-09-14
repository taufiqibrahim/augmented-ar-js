window.onload = () => {

    const osmElement = document.querySelector('[osm]');
    const el = document.querySelector("[gps-new-camera]");

    // Show loading message
    document.getElementById('status').innerHTML = 'Loading OpenStreetMap data...';

    // Listen to vector-ways-loaded event and remove loading if done
    osmElement.addEventListener('vector-ways-loaded', e => {
        document.getElementById('status').innerHTML = '';
    });


    /*const objects = [
        {
            id: "1",
            latitude: -6.315871931937459,
            longitude: 106.66511099064911,
            position: { x: 0, y: 2, z: 0 },
            color: "red"
        },
        {
            id: "2",
            latitude: -6.315834,
            longitude: 106.665272,
            position: { x: 0, y: 4, z: 0 },
            color: "aqua"
        },
        {
            id: "3",
            latitude: -6.315878,
            longitude: 106.665365,
            position: { x: 0, y: 0, z: 0 },
            color: "green"
        },
        {
            "id": "4",
            latitude: -6.315876,
            longitude: 106.665444,
            position: { x: 0, y: 0, z: 0 },
            color: "blue"
        }
    ]

    el.addEventListener("gps-camera-update-position", async(e) => {

        const camera = document.querySelector("[gps-new-camera]")
        const gpsCameraComponent = camera.components["gps-new-camera"];

        var deviceLongitude = e.detail.position.longitude;
        var deviceLatitude = e.detail.position.latitude;

        // var currentstate = document.querySelector('#currentstate');
        // currentstate.innerHTML = `GPS Info:
        //     <br/>Latitude Longitude: ${e.detail.position.latitude} ${e.detail.position.longitude}
		// 	<br/>Timestamp: ${JSON.stringify(e)}`;

        objects.forEach(object => {

            // Add a red box on specific static coordinate
            const entity = document.createElement("a-plane");
            // entity.setAttribute("scale", { x: 5, y: 5, z: 5 });
            entity.setAttribute("material", { color: object.color });
            entity.setAttribute("gps-new-entity-place", {
                latitude: object.latitude,
                longitude: object.longitude
            });
            
            // // Add altitude above ground
            // entity.setAttribute("position", object.position)

            // Add altitude with adjustment
            entity.setAttribute("position", "0 0 0")

            // Use wireframe
            // entity.setAttribute("wireframe", true);
            // entity.setAttribute("wireframe-linewidth", 5);
            // console.log(entity)
            document.querySelector("a-scene").appendChild(entity);

        })

    });*/
};