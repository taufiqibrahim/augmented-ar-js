window.onload = () => {

    const osmElement = document.querySelector('[osm]');

    // Show loading message
    document.getElementById('status').innerHTML = 'Loading OpenStreetMap data...';

    // Listen to vector-ways-loaded event and remove loading if done
    osmElement.addEventListener('vector-ways-loaded', e => {
        document.getElementById('status').innerHTML = '';
    });
};