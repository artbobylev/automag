#!/bin/sh

mypath="./hugo-mag/content/items/"
file="./hugo-mag/data/items.json"

ids=$(jq -r '.[].id' $file )

i=0
for id in $ids; do
        if [[ "$i" -le 100 ]]; then
		photos=$(jq -r --arg my_id "$id" '.[]|select(.id == ($my_id|tonumber)) | .photos[] | .orig_photo | .url' $file)
		while IFS= read -r photo_url; do
			echo "$photo_url";
		done <<< "$photos"
		echo $i;
        fi
        i=$((i+1))
done
