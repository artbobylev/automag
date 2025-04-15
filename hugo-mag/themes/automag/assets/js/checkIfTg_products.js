function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}

window.addEventListener('load', function(){
	const frombot = getCookie('frombot');
	if (frombot == "1") {
		document.getElementById("vk_btn").hidden = "hidden";	
		document.getElementById("addCart_btn").hidden = "";	
		document.getElementById("vk_info_link").hidden = "";	
	} else {
		document.getElementById("vk_btn").hidden = "";	
		document.getElementById("addCart_btn").hidden = "hidden";	
		document.getElementById("vk_info_link").hidden = "hidden";	
	}
});
