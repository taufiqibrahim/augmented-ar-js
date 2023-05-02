window.onload = () => {

    const el = document.querySelector("[gps-new-camera]");
    const objects = [
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
        },
        {
            "id": "5",
            latitude: -6.315801,
            longitude: 106.665437,
            position: { x: 0, y: 0, z: 0 },
            color: "orange"
        }
    ]
    let rendered = false;

    el.addEventListener("gps-camera-update-position", async (e) => {

        if (!rendered) {
            const camera = document.querySelector("[gps-new-camera]")
            const gpsCameraComponent = camera.components["gps-new-camera"];

            var deviceLongitude = e.detail.position.longitude;
            var deviceLatitude = e.detail.position.latitude;

            const formatter = new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
                timeStyle: "medium",
            });

            // var currentstate = document.querySelector('#currentstate');
            // currentstate.innerHTML = `Gps Info:
            //     <br/>Latitude: ${e.detail.position.latitude}
            //     <br/>Longitude: ${e.detail.position.longitude}`;

            console.log("Device coordinate:", deviceLongitude, deviceLatitude);
            var deviceWorldCoords = gpsCameraComponent.threeLoc.lonLatToWorldCoords(deviceLongitude, deviceLatitude);

            // var deviceWorldCoords = calcPosFromLatLonRad(1, deviceLatitude, deviceLongitude);

            var idx = 1;
            /*objects.forEach(object => {
    
                // Get object coordinate
                // console.log("Object coordinate:", object.longitude, object.latitude);
                var objectWorldCoords = gpsCameraComponent.threeLoc.lonLatToWorldCoords(object.longitude, object.latitude);
    
                // Create entity on object coordinate
                const entity = document.createElement("a-entity");
                entity.setAttribute("gps-new-entity-place", {
                    latitude: object.latitude,
                    longitude: object.longitude,
                });
    
                // Create the plane
                const plane = document.createElement("a-box");
                // plane.setAttribute("width", 5);
                // plane.setAttribute("height", 3);
                plane.setAttribute("depth", 0);
                // plane.setAttribute("material", "shader: flat");
                plane.setAttribute("material", { color: object.color });
                // plane.setAttribute("id", `plane-${object.id}`);
                // plane.setAttribute("z-index", idx)
                plane.setAttribute("gps-new-entity-place", {
                    latitude: object.latitude,
                    longitude: object.longitude,
                });
                plane.setAttribute('clicker', { });
    
                // Increase Z index
                idx = idx + 1;
    
                // // Add altitude above ground
                // plane.setAttribute("position", object.position)
                // const _position = objectWorldCoords[0] + " " + objectWorldCoords[1] + " " + "0";
                // console.log(_position);
                // plane.setAttribute("position", _position)
                // // Use wireframe
                // entity.setAttribute("wireframe", true);
                // entity.setAttribute("wireframe-linewidth", 5);
    
                // Add the plane to entity
                // entity.appendChild(plane);
    
                // Add the plane to the scene
                document.querySelector("a-scene").appendChild(plane);
    
                // console.log(entity);
    
            })*/

            const compoundEntity = document.createElement("a-entity");
            compoundEntity.setAttribute("gps-new-entity-place", {
                latitude: deviceLatitude,
                longitude: deviceLongitude,
            });

            const textLookOnMe = document.createElement("a-text");
            const textScale = 5;
            textLookOnMe.setAttribute("value", "TOLE-GILA");
            textLookOnMe.setAttribute("look-at", "[gps-new-camera]");
            textLookOnMe.setAttribute("scale", {
                x: textScale,
                y: textScale,
                z: textScale
            });
            textLookOnMe.setAttribute("align", "center");
            textLookOnMe.setAttribute("rotation", "0 0 90")

            compoundEntity.appendChild(textLookOnMe);

            document.querySelector("a-scene").appendChild(compoundEntity);

            // console.log(document.querySelector("a-scene"));
        }
        rendered = true;
    });

}