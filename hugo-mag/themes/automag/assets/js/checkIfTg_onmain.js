window.addEventListener('load', function(){
	const params = new URLSearchParams(window.location.search);
	const is_frombot = params.get('frombot');
	if (is_frombot) {
		document.cookie = "frombot=1; max-age=1800";
	}
});
