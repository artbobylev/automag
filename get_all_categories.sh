#!/bin/sh

ACCESS_TOKEN="$2"
API_URL="https://api.vk.com/method/market.getAlbums"

owner_id="$1"

result=$(curl "${API_URL}" -F "access_token=${ACCESS_TOKEN}" -F "owner_id=-${owner_id}" -F "count=100" -F "offset=0" -F "v=5.199")
echo "$result" | jq -r '.[] | .items';
