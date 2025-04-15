#!/bin/sh

GROUP_ID="$1"
VK_KEY=""
my_path="./hugo-mag/"

if [[ "$VK_KEY" == "" ]]; then
	echo "Вставьте ключ доступа пользователя-администратора группы"
else

bash get_all_items.sh "$GROUP_ID" "$VK_KEY" > ${my_path}data/items.json && echo "Товары получены" && 
sed -i "" "s/^}/},/" ${my_path}data/items.json && 
tmp_file=$(mktemp) &&
awk '{a[i++]=$0} END {a[i-2]="}"; for(j=0;j<i;j++) print a[j]}' ${my_path}data/items.json > "$tmp_file" &&
mv "$tmp_file" ${my_path}data/items.json 

bash get_all_categories.sh "$GROUP_ID" "$VK_KEY" > ${my_path}data/categories.json && echo "Категории получены" 

bash get_images.sh  && echo "Изображения товаров собраны" &&
bash get_categories_images.sh && echo "Изображения категорий собраны" &&

bash pop_product_pages.sh && echo "Страницы товаров созданы" &&
bash pop_categories.sh && echo "Страницы категорий тоже" &&

rm -r hugo-mag/public/; hugo -s hugo-mag;
fi
