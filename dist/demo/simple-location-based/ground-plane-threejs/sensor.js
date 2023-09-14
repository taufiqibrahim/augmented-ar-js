window.onload = () => {
    var currentstate = document.querySelector('#currentstate');

    console.log("Toleee");
    if ('AbsoluteOrientationSensor' in window) {
        const options = { frequency: 60, referenceFrame: "device" };
        const orientationSensor = new AbsoluteOrientationSensor(options);

        let heading;

        orientationSensor.addEventListener('reading', function (e) {
            // Get the quaternion values
            let q = orientationSensor.quaternion;
            let x = q[0];
            let y = q[1];
            let z = q[2];
            let w = q[3];
            // console.log(x, y, z, w);

            // Get the current screen orientation
            const orientation = screen.orientation.angle;

            // Determine the sensor axes based on the screen orientation
            let [xAxis, yAxis, zAxis] = [1, 0, 0]; // Default to portrait orientation
            if (orientation === 90) {
                [xAxis, yAxis, zAxis] = [0, -1, 0]; // Landscape left
            } else if (orientation === -90) {
                [xAxis, yAxis, zAxis] = [0, 1, 0]; // Landscape right
            } else if (orientation === 180) {
                [xAxis, yAxis, zAxis] = [-1, 0, 0]; // Upside down
            }

            // Rotate the quaternion to align with the sensor axes
            const rotatedQuaternion = [
                w * yAxis + x * zAxis - y * xAxis + z * xAxis,
                w * xAxis - x * zAxis + y * yAxis - z * yAxis,
                w * zAxis + x * yAxis - y * xAxis - z * xAxis,
                w * xAxis + x * xAxis + y * yAxis + z * zAxis,
            ];

            // Convert quaternion to Euler angles (in radians)
            // const pitch = Math.atan2(2 * (rotatedQuaternion[0] * rotatedQuaternion[1] + rotatedQuaternion[2] * rotatedQuaternion[3]), 1 - 2 * (rotatedQuaternion[1] * rotatedQuaternion[1] + rotatedQuaternion[2] * rotatedQuaternion[2]));
            // const roll = Math.asin(2 * (rotatedQuaternion[0] * rotatedQuaternion[2] - rotatedQuaternion[3] * rotatedQuaternion[1]));
            const yaw = Math.atan2(2 * (rotatedQuaternion[0] * rotatedQuaternion[3] + rotatedQuaternion[1] * rotatedQuaternion[2]), 1 - 2 * (rotatedQuaternion[2] * rotatedQuaternion[2] + rotatedQuaternion[3] * rotatedQuaternion[3]));

            // Convert yaw angle to degrees and adjust for north
            let heading = yaw * (180 / Math.PI) + 360;
            if (heading >= 360) {
                heading -= 360;
            }

            // // Convert quaternion to Euler angles (in radians)
            // // const pitch = Math.atan2(2 * (w * x + y * z), 1 - 2 * (x * x + y * y));
            // // const roll = Math.asin(2 * (w * y - z * x));
            // const yaw = Math.atan2(2 * (w * z + x * y), 1 - 2 * (y * y + z * z));

            // // Convert yaw angle to degrees and adjust for north
            // let heading = yaw * (180 / Math.PI) + 360;
            // if (heading >= 360) {
            //     heading -= 360;
            // }

            // heading = Math.atan2(2 * q[0] * q[1] + 2 * q[2] * q[3], 1 - 2 * q[1] * q[1] - 2 * q[2] * q[2]) * (180 / Math.PI);
            // console.log("Heading:", heading);

            currentstate.innerHTML = `Sensor Info:
            <br/>Heading: ${heading}`;
    });

    orientationSensor.start();

    currentstate.innerHTML = "AbsoluteOrientationSensor supported";
}
    else {
    currentstate.innerHTML = "AbsoluteOrientationSensor not supported";
}

}
