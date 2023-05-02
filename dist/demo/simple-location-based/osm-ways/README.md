Go to https://overpass-turbo.eu/ and create query like below

```
[out:json][timeout:25];
// Define the bounding box using the bbox statement
(
// query part for: “highway=*”
way["highway"](-6.315178571360332,106.66227132081985,-6.314277485232768,106.6646933555603);
);
// Convert the ways to GeoJSON format
out geom ids;
```

Export it as GeoJSON.

