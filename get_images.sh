#!/bin/sh

mypath="./hugo-mag/content/items/"
file="./hugo-mag/data/items.json"

ids=$(jq -r '.[].id'  $file )

static_path="./hugo-mag/static/items_photos/"
rm -r "$static_path"
mkdir "$static_path"

i=0
for id in $ids;
do
	if [[ "$i" -le 50 ]]; then
		photos=$(jq -r --arg my_id "$id" '.[]|select(.id == ($my_id|tonumber)) | .photos[] | .orig_photo | .url' $file)
		while IFS= read -r photo_url; do
			filename=${id}_$(uuidgen | cut -c1-8).jpg
			wget "$photo_url" -O "$static_path""$filename"
			magick "$static_path""$filename" -format webp -quality 80 "$static_path""${filename%.*}.webp" && rm "$static_path""$filename";
		done <<< "$photos"
	fi
	echo $i;
	i=$((i+1))
done
