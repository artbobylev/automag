function searchProduct(text) {
	document.getElementById("no_search").hidden = true;
        document.getElementById("clear_search").hidden = false;

	var searchText = text.toLowerCase().trim().normalize('NFD').replace(/\p{Diacritic}/gu, "");
	var product_div = document.getElementById("product_div");
	var products = product_div.querySelectorAll(".item");

	if (text.length > 0) {
		document.getElementById("search_text").innerHTML = "Результаты поиска по запросу «" + text.charAt(0).toUpperCase() + text.slice(1) + "»:";
	} else { 
		document.getElementById("search_text").innerHTML ="";
	}

	const searchTerms = searchText.split(" ");
	products.forEach(product => {
	      const searchString = `${product.textContent} ${product.dataset.tags}`.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, "");
	      const isMatch = searchTerms.every(term => searchString.includes(term));
	      product.hidden = !isMatch;
	    })
	document.getElementById("clear_search").hidden = false;
}

function clearSearch() {
	window.location.href = window.location.origin + window.location.pathname;
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

window.addEventListener('load', function() {
        const titles = document.getElementById("product_div").querySelectorAll(".item h2");
	if (titles.length > 0) {
		document.getElementById("search_prints").placeholder = titles[Math.floor(Math.random()*titles.length)].textContent;
	}
        var items = document.getElementById("product_div").querySelectorAll(".item")
        var new_items = [...items];
        new_items = shuffle(new_items);
        let i=0;
        for (item of new_items) {
                document.getElementById("product_div").appendChild(item);
        }
});

function getRandomPage() {
	var items = document.querySelectorAll("#product_div > .item");
        var random_index = Math.floor(Math.random() * items.length);
	window.location = items[random_index].querySelector("a").getAttribute("href");
}
