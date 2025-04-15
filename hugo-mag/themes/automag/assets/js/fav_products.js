function displayFavItems() {
    const main_container = document.getElementById('fav_items');
    main_container.innerHTML = '';
    main_container.className = 'rounded-xl py-2 mt-8';

    let favItems = JSON.parse(localStorage.getItem('favItems'));

    if (favItems && favItems.length > 0) {
        const title = document.createElement('h5');
	title.className = "mt-8 mb-4 text-4xl font-bold";
        title.innerHTML = "Избранное ";
        main_container.appendChild(title);

        const delete_btn = document.createElement('button');
	delete_btn.className = "float-right text-base-content text-sm hover:text-primary mb-4";
        delete_btn.innerHTML = "&times; Очистить";
        delete_btn.onclick = function() {
		localStorage.removeItem('favItems');
		location.reload(); 
	};
        main_container.appendChild(delete_btn);

        const container = document.createElement('div');
	container.className = 'mt-4 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8';

	for (let i = favItems.length - 1; i >= 0; i--) {
            const { id, url, product_title, imageUrl } = favItems[i];
            const item = document.createElement('div');
            item.className = 'relative';
	

            const favBtn = document.createElement('div');
            favBtn.className = 'absolute top-4 right-4';
	    favBtn.innerHTML = `
        	<svg xmlns="http://www.w3.org/2000/svg" width=36 height=36 viewBox="0 0 72 72" onclick="rmFromFavs('${id}'); displayFavItems();">
        	  <g><path class="fill-red-500" d="M59.5,25c0-6.9036-5.5964-12.5-12.5-12.5c-4.7533,0-8.8861,2.6536-11,6.5598 C33.8861,15.1536,29.7533,12.5,25,12.5c-6.9036,0-12.5,5.5964-12.5,12.5c0,2.9699,1.0403,5.6942,2.7703,7.8387l-0.0043,0.0034 L36,58.5397l20.7339-25.6975l-0.0043-0.0034C58.4597,30.6942,59.5,27.9699,59.5,25z"/></g>
        	<path xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#000000" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M59.5,25 c0-6.9036-5.5964-12.5-12.5-12.5c-4.7533,0-8.8861,2.6536-11,6.5598C33.8861,15.1536,29.7533,12.5,25,12.5 c-6.9036,0-12.5,5.5964-12.5,12.5c0,2.9699,1.0403,5.6942,2.7703,7.8387l-0.0043,0.0034L36,58.5397l20.7339-25.6975l-0.0043-0.0034 C58.4597,30.6942,59.5,27.9699,59.5,25z"/>
        	</svg>
	    `
            favBtn.href = url;
            item.appendChild(favBtn);

            const link = document.createElement('a');
            link.className = 'flex flex-col gap-4 justify-between hover:text-primary';
            link.href = url;

            const img = document.createElement('img');
	    img.src = "/items_photos/" + imageUrl;
            img.alt = product_title;
            img.className = 'rounded-xl h-[45vh] object-cover';
            link.appendChild(img);

            const text = document.createElement('p');
            text.className = 'mt-2 text-2xl';
            text.innerHTML = product_title;
            link.appendChild(text);
            item.appendChild(link);

	    if (url != window.location.pathname) { container.appendChild(item);}
        }
        main_container.appendChild(container);
    } 
    checkIfEmpty();
}

function checkIfEmpty(){
	const empty_div = document.getElementById('empty');
	let favItems = JSON.parse(localStorage.getItem('favItems')) || [];

	if (favItems.length) {
		empty_div.hidden="hidden";
	} else {
		empty_div.hidden="";
	}
}

window.addEventListener('load', function() {
	displayFavItems();
	checkIfEmpty();

})

