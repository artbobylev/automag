function addToFavorites(id, url, product_title, imageUrl) {
    let favItems = JSON.parse(localStorage.getItem('favItems')) || [];
    const existingIndex = favItems.findIndex(item => item.url === url);
                
    if (existingIndex === -1) {
        favItems.push({
            id,
            url,
            product_title,
            imageUrl
        });
	infoFav("Товар добавлен в избранное");
    } else {
	favItems.splice(existingIndex, 1);
	infoFav("Товар удален из избранного");
    }

    while (favItems.length > 20) {
        favItems.shift(); 
    }   
        
    localStorage.setItem('favItems', JSON.stringify(favItems));
} 

function infoFav(text){
	const infoBlock = document.getElementById("info_block");
	infoBlock.innerHTML = "<p class='rounded-full bg-success/80 shadow shadow-xl backdrop-blur-md text-success-content px-8 py-4 font-bold'>" + text + "</p>";
	setTimeout(() => {
		infoBlock.innerHTML = ""
	}, 2000);
	
}

function rmFromFavs(id) {
    let favItems = JSON.parse(localStorage.getItem('favItems')) || [];
    const existingIndex = favItems.findIndex(item => item.id === id);
                
    if (existingIndex === -1) {
    } else {
	favItems.splice(existingIndex, 1);
	infoFav("Товар удален из избранного");
    }
    localStorage.setItem('favItems', JSON.stringify(favItems));
}

function displayAllFavs(){
	document.querySelectorAll(".favBtn").forEach(function(el){
		let favItems = JSON.parse(localStorage.getItem('favItems')) || [];
		const existingIndex = favItems.findIndex(item => item.id === el.id);
	    if (existingIndex === -1) {
	    } else {
		el.querySelector("input").checked="True";
	    }
	});
}

window.addEventListener('load', function() {
	displayAllFavs();
});
