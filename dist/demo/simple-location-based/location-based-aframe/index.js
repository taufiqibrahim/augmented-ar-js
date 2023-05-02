window.onload = () => {
    // function watchLocation() {
    //     /*
    //     Watch current location
    //     */
    //     if (navigator.geolocation) {
    //         const watchId = setInterval(() => {
    //             navigator.geolocation.watchPosition(updatePosition, errorPosition, options);
    //         }, watchEveryMs);
    //     } else {
    //         currentstate.innerHTML = "Geolocation is not supported by this browser.";
    //     }
    // }

    // function updatePosition(position) {
    //     const formatter = new Intl.DateTimeFormat("en-US", {
    //         dateStyle: "medium",
    //         timeStyle: "medium",
    //     });
    //     var currentstate = document.querySelector('#currentstate');
    //     currentstate.innerHTML = `GPS Info:
    //         <br/>Latitude Longitude: ${position.coords.latitude} ${position.coords.longitude}
	// 		<br/>Timestamp: ${formatter.format(new Date(position.timestamp))}`;
    // }

    // function errorPosition(error) {
    //     console.error(error);
    // }

    // function calcPosFromLatLonRad(radius, lat, lon) {

    //     var phi = (90 - lat) * (Math.PI / 180);
    //     var theta = (lon + 180) * (Math.PI / 180);

    //     x = -(radius * Math.sin(phi) * Math.cos(theta));
    //     z = (radius * Math.sin(phi) * Math.sin(theta));
    //     y = (radius * Math.cos(phi));

    //     return [x, y, z];

    // }

    // const watchEveryMs = 2000;
    // const options = {
    //     enableHighAccuracy: true,
    //     timeout: 2000,
    //     maximumAge: 5000
    // };
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
        }
    ]

    el.addEventListener("gps-camera-update-position", e => {
        var scene = document.querySelector("a-scene");

        const camera = document.querySelector("[gps-new-camera]")
        const gpsCameraComponent = camera.components["gps-new-camera"];

        var deviceLongitude = e.detail.position.longitude;
        var deviceLatitude = e.detail.position.latitude;

        const formatter = new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
            timeStyle: "medium",
        });
        var currentstate = document.querySelector('#currentstate');
        currentstate.innerHTML = `GPS Info:
            <br/>Latitude Longitude: ${e.detail.position.latitude} ${e.detail.position.longitude}
			<br/>Timestamp: ${JSON.stringify(e)}`;

        console.log("Device coordinate:", deviceLongitude, deviceLatitude);
        var deviceWorldCoords = gpsCameraComponent.threeLoc.lonLatToWorldCoords(deviceLongitude, deviceLatitude);

        // var deviceWorldCoords = calcPosFromLatLonRad(1, deviceLatitude, deviceLongitude);


        objects.forEach(object => {

            // Add a red box on specific static coordinate
            const entity = document.createElement("a-box");
            // entity.setAttribute("scale", { x: 5, y: 5, z: 5 });
            entity.setAttribute("material", { color: object.color });
            entity.setAttribute("gps-new-entity-place", {
                latitude: object.latitude,
                longitude: object.longitude
            });
            // Add altitude above ground
            entity.setAttribute("position", object.position)
            // Use wireframe
            entity.setAttribute("wireframe", true);
            entity.setAttribute("wireframe-linewidth", 5);
            // console.log(entity)
            scene.appendChild(entity);

            // // Drawing line
            // // Remove existing
            // var lineId = `line-${object.id}`
            // // document.getElementById(lineId).remove();

            // var material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 10 });

            // console.log("Object coordinate:", object.longitude, object.latitude);
            // var objectWorldCoords = gpsCameraComponent.threeLoc.lonLatToWorldCoords(object.longitude, object.latitude);
            // // var objectWorldCoords = calcPosFromLatLonRad(1, object.latitude, object.longitude);

            // // console.log(deviceWorldCoords[1], deviceWorldCoords[0]);
            // // console.log(objectWorldCoords[1], objectWorldCoords[0]);

            // var geometry = new THREE.BufferGeometry().setFromPoints([
            //     new THREE.Vector3(deviceWorldCoords[0], 0, deviceWorldCoords[1]),
            //     new THREE.Vector3(objectWorldCoords[0], 0, objectWorldCoords[1])
            // ]);
            // var line = new THREE.Line(geometry, material);

            // // Create a new A-Frame entity and add the line to it
            // var lineEntity = document.createElement('a-entity');
            // lineEntity.setAttribute("id", lineId);
            // lineEntity.setObject3D(lineId, line);
            // // console.log(line);
            // console.log(lineEntity);
            // scene.appendChild(lineEntity);

        })

    });

    // // create an IntersectionObserver instance
    // const observer = new IntersectionObserver((entries, observer) => {
    //     // loop through the entries
    //     entries.forEach(entry => {
    //         if (entry.target.id === 'currentstate' && entry.isIntersecting) {
    //             // the target element is now visible in the viewport, so execute your code
    //             // your code goes here
    //             watchLocation()
    //             // stop observing the target element
    //             observer.unobserve(entry.target);
    //         }
    //     });
    // });

    // // start observing the target element
    // const targetElement = document.querySelector('#currentstate');
    // if (targetElement) {
    //     observer.observe(targetElement);
    // }
}