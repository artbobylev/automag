function displayViewedItems() {
    const main_container = document.getElementById('viewed_items');
    main_container.innerHTML = '';
    main_container.className = 'rounded-xl mt-8 h-full';

    let viewedItems = JSON.parse(localStorage.getItem('viewedItems'));

    if (viewedItems && viewedItems.length > 1) {
        const title = document.createElement('h5');
	title.className = "mt-8 mb-4 text-4xl font-bold";
        title.innerHTML = "Вы смотрели ";
        main_container.appendChild(title);

        const delete_btn = document.createElement('button');
	delete_btn.className = "float-right text-base-content text-sm hover:text-primary mb-4";
        delete_btn.innerHTML = "&times; Очистить";
        delete_btn.onclick = function() {
		localStorage.removeItem('viewedItems');
		location.reload(); 
	};
        main_container.appendChild(delete_btn);

        const add_div = document.createElement('div');
	add_div.className = 'w-full overflow-x-scroll h-full';

        const container = document.createElement('div');
	container.className = 'h-full carousel carousel-center rounded-box space-x-4 py-4 ';

	for (let i = viewedItems.length - 1; i >= 0; i--) {
            const { url, product_title, imageUrl } = viewedItems[i];
            const item = document.createElement('div');
	    item.className = 'carousel-item max-w-[55vw] sm:max-w-[40vw] md:max-w-[30vw] lg:max-w-[20vw] hover:text-primary';

            const link = document.createElement('a');
            link.className = 'h-full flex flex-col justify-between gap-4';
            link.href = url;

            const img = document.createElement('img');
	    img.src = "/items_photos/" + imageUrl;
            img.alt = product_title;
            img.className = 'h-[35vh] rounded-xl w-full object-cover';
            link.appendChild(img);

            const text = document.createElement('p');
            text.className = 'mt-auto text-2xl';
            text.innerHTML = product_title;
            link.appendChild(text);
            item.appendChild(link);

	    if (url != window.location.pathname) { container.appendChild(item);}
        }
        add_div.appendChild(container);
        main_container.appendChild(add_div);
    } 
}

window.addEventListener('load', function() {
	displayViewedItems();
})
