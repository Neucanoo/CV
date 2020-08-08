var switcher = undefined;
onDom.push(function() {
	switcher = new Switcher({
		buttons: document.querySelectorAll("#top-nav button"),
		elemsParent: document.getElementsByClassName("swparent")[0],
		elems: document.getElementsByClassName("swelem"),
		onInited: function() {
		}
	});
	if (switcher.inited) {
		onResize.push(function() {
			switcher.resize()
		});
	}
});

onDom.push(function() {
	document.getElementsByClassName("copyright")[0].innerHTML = new Date().getFullYear();
});

