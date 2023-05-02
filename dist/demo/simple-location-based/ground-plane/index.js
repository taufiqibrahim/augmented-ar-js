// window.onload = () => {

//     const el = document.querySelector("[gps-new-camera]");

//     let rendered = false;
//     let changes = 1;

//     el.addEventListener("gps-camera-update-position", async (e) => {

//         if (!rendered) {
//             var deviceLongitude = e.detail.position.longitude;
//             var deviceLatitude = e.detail.position.latitude;
//             changes = changes + 1;

//             var currentstate = document.querySelector('#currentstate');
//             currentstate.innerHTML = `Gps Info:
//                 <br/>Latitude: ${deviceLatitude}
//                 <br/>Longitude: ${deviceLongitude}
//                 <br/>Changes: ${changes}`;

//             console.log("Device coordinate:", deviceLongitude, deviceLatitude);

//             // Create the wireframe ground plane
//             const ground = document.createElement('a-plane');
//             ground.setAttribute('gps-new-entity-place', `latitude: ${deviceLatitude}; longitude: ${deviceLongitude};`);
//             ground.setAttribute('height', '16');
//             ground.setAttribute('width', '16');
//             ground.setAttribute('material', 'wireframe: true; color: white;');
//             ground.setAttribute('rotation', '-90 0 0');
//             document.querySelector("a-scene").appendChild(ground);

//             // // Add grid lines to the ground plane
//             // const numRows = 80;
//             // const numCols = 80;
//             // const spacing = 0.2;

//             // for (let row = 0; row < numRows; row++) {
//             //     for (let col = 0; col < numCols; col++) {
//             //         const x = (col - numCols / 2) * spacing;
//             //         const z = (row - numRows / 2) * spacing;

//             //         const line = document.createElement('a-entity');
//             //         line.setAttribute('line', `start: ${x} 0 ${z}; end: ${x + spacing} 0 ${z}; color: white;`);
//             //         ground.appendChild(line);
//             //     }
//             // }


//         }
//         rendered = true;
//     });

// }