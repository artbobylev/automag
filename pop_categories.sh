#!/bin/sh

mypath="./hugo-mag/content/tags/"
file="./hugo-mag/data/items.json"
cats_file="./hugo-mag/data/categories.json"

rm -r $mypath;
mkdir $mypath;

for category_id in $(jq -r '.[] | .albums_ids[]' $file | awk '!seen[$1]++');
do
	category=$(jq -r --arg my_id "$category_id" '.[]|select(.id == ($my_id|tonumber)) | .title' $cats_file | sed "s/\"//g" );
	category_image=$(jq -r --arg my_id "$category_id" '.[]|select(.id == ($my_id|tonumber)) | .photo' $cats_file );
	if [[ -n "$category" ]]; then 
		if [[ -n "$category_image" ]]; then 
			filename=$(find ./hugo-mag/static/tags_photos -name "${category_id}_*" -type f -exec basename {} \; | uniq);

			mkdir $mypath$category_id;
			touch $mypath$category_id/_index.md;
			echo "+++" > $mypath$category_id/_index.md;
			echo "title=\"$category\"" >> $mypath$category_id/_index.md;
			echo "id=\"$category_id\"" >> $mypath$category_id/_index.md;
			echo "photo=\"$filename\"" >> $mypath$category_id/_index.md;
			echo "+++" >> $mypath$category_id/_index.md;
		fi
	fi
done
