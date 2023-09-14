## Using Neon Postgres
```bash
psql postgres://<user>:<password>@ep-muddy-glade-92174709.ap-southeast-1.aws.neon.tech/neondb
```

### Install Extensions
Postgis
```sql
CREATE EXTENSION postgis;
```

HSTORE
```sql
CREATE EXTENSION hstore;
```

### Prepare OSM2PGSQL

Installation: https://osm2pgsql.org/doc/install.html
```bash
# on Ubuntu
sudo apt-get install -y osm2pgsql
```

### Load OSM Data to Postgres

```bash
osm2pgsql --create --slim --unlogged \
  --cache 200 \
  --number-processes 1 \
  --hstore \
  --style ~/git/openstreetmap-carto/openstreetmap-carto.style \
  --multi-geometry \
  -d pgosm  ~/tmp/colorado-latest.osm.pbf


```