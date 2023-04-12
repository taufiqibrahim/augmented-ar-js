window.onload = () => {
    const watchEveryMs = 2000;
    // define the options object with desired settings
    const options = {
        enableHighAccuracy: true,
        timeout: 1000,
        maximumAge: 0
    };

    function simplifyNumber(str) {
        const num = Number(str); // convert to number
        if (!isNaN(num)) { // check if number is valid
            const formattedNum = num.toFixed(2); // format with 2 decimal places
            return formattedNum; // Output: "123.46"
        } else {
            return null;
        }
    }

    function watchLocation() {
        if (navigator.geolocation) {
            const watchId = setInterval(() => {
                navigator.geolocation.watchPosition(showPosition, errorPosition, options);
            }, watchEveryMs);
        } else {
            currentstate.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function showPosition(position) {
        const formatter = new Intl.DateTimeFormat("en-US", {
            dateStyle: "medium",
            timeStyle: "medium",
        });
        var currentstate = document.querySelector('#currentstate');
        currentstate.innerHTML = `Latitude/Longitude: ${position.coords.latitude} ${position.coords.longitude}
			<br/>Accuracy: ${simplifyNumber(position.coords.accuracy)}m
			<br/>Altitude: ${simplifyNumber(position.coords.altitude)}m
			<br/>altitudeAccuracy: ${simplifyNumber(position.coords.altitudeAccuracy)}m
			<br/>heading: ${simplifyNumber(position.coords.heading)}deg
			<br/>timestamp: ${formatter.format(new Date(position.timestamp))}`;
    }

    // define the error callback function
    function errorPosition(error) {
        console.error(error);
    }
    // create an IntersectionObserver instance
    const observer = new IntersectionObserver((entries, observer) => {
        // loop through the entries
        entries.forEach(entry => {
            if (entry.target.id === 'currentstate' && entry.isIntersecting) {
                // the target element is now visible in the viewport, so execute your code
                // your code goes here
                watchLocation()
                // stop observing the target element
                observer.unobserve(entry.target);
            }
        });
    });

    // start observing the target element
    const targetElement = document.querySelector('#currentstate');
    if (targetElement) {
        observer.observe(targetElement);
    }
}