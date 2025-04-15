#!/bin/sh

ACCESS_TOKEN="$2"
API_URL="https://api.vk.com/method/market.get"

owner_id="$1"

echo "["

result=$(curl "${API_URL}" -F "access_token=${ACCESS_TOKEN}" -F "owner_id=-${owner_id}" -F "count=200" -F "offset=0" -F "extended=1" -F "v=5.199")
echo "$result" | jq -r '.[] | .items[]';

items_num=$(echo "$result" | jq '.[] | .count')
offset_num=$(( items_num / 200))

for ((i = 1; i <= offset_num; i++)); do
	offset=$(( 200 * i ))
	result=$(curl "${API_URL}" -F "access_token=${ACCESS_TOKEN}" -F "owner_id=-${owner_id}" -F "count=200" -F "offset=$offset" -F "extended=1" -F "v=5.199")
	echo "$result" | jq -r '.[] | .items[]';
done

echo "]"
