#!/bin/sh 

mypath="./hugo-mag/content/items/"
file="./hugo-mag/data/items.json"
cats_file="./hugo-mag/data/categories.json"

ids=$(jq -r '.[].id'  $file )

rm -r $mypath;
mkdir $mypath;

touch ${mypath}_index.md;
echo "+++" > ${mypath}_index.md;
echo "type=\"items\"" >>${mypath}_index.md;
echo "layout=\"home\"" >> ${mypath}_index.md;
echo "title=\"Каталог\"" >> ${mypath}_index.md;
echo "+++" >> ${mypath}_index.md;

i=1
for id in $ids;
do
	if [[ "$i" -le 50 ]]; then
	echo $i;

	category=$(jq -r --arg my_id "$id" '.[]|select(.id == ($my_id|tonumber)) | .owner_info.category' $file )
	category_ids=()
	for cat_id in $(jq -r --arg my_id "$id" '.[]|select(.id == ($my_id|tonumber)) | .albums_ids[]' $file); do
		category=$(jq -r --arg my_id "$cat_id" '.[]|select(.id == ($my_id|tonumber)) | .title' $cats_file | sed "s/\"//g" );
		if [[ -n "$category" ]]; then
			category_ids+=("$cat_id")
		fi
	done

	url=$(jq -r --arg my_id "$id" '.[]|select(.id == ($my_id|tonumber)) | .market_url' $file )
	title=$(jq -r --arg my_id "$id" '.[]|select(.id == ($my_id|tonumber)) | .title' $file | tr -d "\n" | sed "s/\"//g" )
	price=$(jq -r --arg my_id "$id" '.[]|select(.id == ($my_id|tonumber)) | .price.text' $file )
	old_price=$(jq -r --arg my_id "$id" '.[]|select(.id == ($my_id|tonumber)) | .price.old_amount_text' $file )

	slug=$(echo "$url" | sed "s/https:\/\/vk\.com\/market\/product\///")

	mkdir "$mypath$slug"; 
	touch "$mypath$slug"/_index.md; 
	conn_pks=()
	for pk in $(jq -r --arg my_id "$id" '.[]|select(.id == ($my_id|tonumber)) | .other_items[] | .item_ids[]' $file | sed "s/.*_//");
	do
		conn_pks+=("$pk")
	done

	filenames=()
	for filename in $(find ./hugo-mag/static/items_photos -name "${id}_*" -type f -exec basename {} \;);
	do
		filenames+=("$filename")
	done

        echo "+++" > $mypath$slug/_index.md;
        echo "type=\"items\"" >> $mypath$slug/_index.md;
        echo "layout=\"single\"" >> $mypath$slug/_index.md;
        echo "id=\"$id\"" >> $mypath$slug/_index.md;
        echo "photos=[$(printf '\"%s\",' "${filenames[@]}")]" >> $mypath$slug/_index.md;
        echo "conn_pks=[$(printf '\"%s\",' "${conn_pks[@]}")]" >> $mypath$slug/_index.md;
        echo "vk_url=\"$url\"" >> $mypath$slug/_index.md;
        echo "slug=\"$slug\"" >> $mypath$slug/_index.md;

	if [[ -n "$category_ids" ]]; then
		echo "tags=[$(printf '\"%s\",' "${category_ids[@]}")]" >> $mypath$slug/_index.md;
	fi

	if [[ "$old_price" != "null" ]]; then
		echo "old_price=\"$old_price\"" >> $mypath$slug/_index.md;
	fi
        echo "price=\"$price\"" >> $mypath$slug/_index.md;
        echo "vk_title=\"$title\"" >> $mypath$slug/_index.md;
        echo "+++" >> $mypath$slug/_index.md;
	fi
	i=$((i+1))
done
