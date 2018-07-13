all: pathrows.db

pathrows.db: pathrows/wrs2_descending.shx
	spatialite pathrows.db ".loadshp pathrows/wrs2_descending pathrows UTF-8"

pathrows/wrs2_descending.shx: wrs2_descending.zip
	mkdir -p pathrows
	unzip -u wrs2_descending.zip -d pathrows

wrs2_descending.zip:
	wget https://landsat.usgs.gov/sites/default/files/documents/wrs2_descending.zip

clean:
	rm pathrows.db wrs2_descending.zip
	rm -r pathrows