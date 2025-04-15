#!/bin/sh

mypath="./hugo-mag/static/tags_photos/"
file="./hugo-mag/data/items.json"
main_file="./hugo-mag/data/categories.json"

category_ids=$(jq -r '.[] | .albums_ids[]' $file | awk '!seen[$1]++');

rm -r "$mypath"
mkdir "$mypath"

if [[ -n "$category_ids" ]]; then
for id in $category_ids; do
	echo $id;
	photos=$(jq -r --arg my_id "$id" '.[] | select(.id == ($my_id|tonumber)) | .photo | .sizes[-1].url ' $main_file)
	if [[ -n "$photos" ]]; then
	while IFS= read -r photo_url; do
		filename=${id}_$(uuidgen | cut -c1-8).jpg
		result=$(wget "$photo_url" -O "$mypath""$filename" 2>&1);
		magick "$mypath$filename" -format webp -quality 80 "$mypath${filename%.*}.webp" && rm  "$mypath""$filename";
		if [ $? -ne 0 ]; then
			magick xc:#f0f2f5 -size 1000x500 "$mypath""${filename%.*}.webp";
		fi
	done <<< "$photos"
	fi
done
fi
