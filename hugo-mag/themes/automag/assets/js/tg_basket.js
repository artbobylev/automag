simpleCart({
	storageKey: "simpleCart_items",
	cartColumns: [
		{view: function(item, column){
			return "<div class='w-full flex justify-center'><div class='flex flex-col gap-4 justify-center '>" + 
			"<div class='simpleCart_remove text-lg -my-2 cursor-pointer ml-auto text-base-content/50'>&times;</div>" + 
			"<a href='" + item.get('href') + "'><img loading='lazy' alt='' src='/items_photos/" + item.get('image') + "' class='w-80 rounded mx-auto'></a>" + 
			"<a href='"+item.get('href')+"'>" + "<div><p class='font-medium text-3xl max-w-80'>" + item.get('name') + "</p></div></a>" + 
			"<div class='w-full flex gap-4 items-center align-center justify-center'><p>" + item.get('price') + "&#8381;</p><div class='flex w-full justify-end gap-2'><a href='javascript:;' class='simpleCart_decrement'><button class='rounded-xl hover:bg-base-300'>-</button></a><p class='border rounded-lg px-2'>"+item.get('quantity')+"</p><a href='javascript:;' class='simpleCart_increment'><button class='rounded-xl hover:bg-base-300'>+</button></a></div></div></div></div>";
		}, attr: "name" , label: "Товар" } ,
	],
	cartStyle: "div", 
	checkout: {
		type: "SendForm",
		url: "/basket",
		method: "GET",
	}
});

simpleCart.currency({
	code: "RUB",
	name: "Рубли",
	symbol: " &#8381; ",
	delimiter: "",
	decimal: ",",
	after: true,
	accuracy: 0
});

function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}

window.addEventListener('load', function(){
	const frombot = getCookie('frombot');
	if (frombot == "1") {
		document.getElementById("basket_content").hidden = "";	
		if(simpleCart.items().length == 0){
			document.getElementById("basket_content").hidden = "hidden";
			document.getElementById("empty_basket").hidden = "";
		} else {
			document.getElementById("basket_content").hidden = "";
			document.getElementById("empty_basket").hidden = "hidden";
		}
	
		document.getElementById("checkout_btn").addEventListener("click", function() {
			try {
				const tg = window.Telegram.WebApp;
				tg.sendData(tg.sendData(localStorage.getItem('simpleCart_items'))); 
				tg.close(); 
			} catch (err) {
				document.getElementById("basket_content").hidden = "hidden";
				document.getElementById("empty_basket").hidden = "";
				document.getElementById("empty_basket").querySelector("p").innerHTML = document.getElementById("bot_link").innerHTML;
			}
		});
	} else {
		document.getElementById("basket_content").hidden = "hidden";	
		document.getElementById("empty_basket").hidden = "";	
	}

});

simpleCart.bind( 'update' , function(){
        if(simpleCart.items().length == 0){
                document.getElementById("basket_content").hidden = "hidden";
                document.getElementById("empty_basket").hidden = "";
        } else {
                document.getElementById("basket_content").hidden = "";
                document.getElementById("empty_basket").hidden = "hidden";
        }
});

