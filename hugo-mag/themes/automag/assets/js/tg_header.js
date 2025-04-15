function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}

window.addEventListener('load', function(){
	const frombot = getCookie('frombot');
	if (frombot == "1") {
		document.getElementById("basket_icon").hidden = "";	
	} else {
		document.getElementById("basket_icon").hidden = "hidden";	
	}
});
