/*--------------------------------------------------*/
/*-Author---Vasyl-Menzatiuk-(Neucanoo)--------------*/
/*--------------------------------------------------*/
var Page = {
	vw: 0,
	vh: 0,
	tablet: false,
	mobile: false,
}
document.addEventListener("DOMContentLoaded", function(e) {
	if (onDom.length != 0) {
		for (var i = 0; i < onDom.length; i++) {
			onDom[i](e);
		}
	}
	window.addEventListener("resize", function(e) {
		Page.vw = window.innerWidth;
		Page.vh = window.innerHeight;
		Page.vw <= 1024 && Page.vw > 576 ? Page.tablet = true : Page.tablet = false;
		Page.vw <= 576 ? Page.mobile = true : Page.mobile = false;
		if (onResize.length != 0) {
			for (var i = 0; i < onResize.length; i++) {
				onResize[i](e);
			}
		}	
	});
});
window.addEventListener("load", function(e) {
	if (onLoad.length != 0) {
		for (var i = 0; i < onLoad.length; i++) {
			onLoad[i](e);
		}
	}
});

/*--------------------------------------------------*/
/*--------------------------------------------------*/
/*--------------------------------------------------*/
/*--------------------------------------------------*/
/*--------------------------------------------------*/

class Switcher {
	constructor(params = {
		buttons: undefined,
		elemsParent: undefined,
		elems: undefined,
		onInited: function() {},
	}) {
		if (typeof params.elemsParent !== "object" || 
			typeof params.buttons !== "object" || 
			typeof params.elems !== "object") {
			console.warn("Switcher error: check parameters: ", params);
			return;
		}
		var self = this;
		this.params = params;
		this.elemsParent = params.elemsParent;
		this.buttons = params.buttons;
		this.elems = params.elems;
		this.amount = this.buttons.length;
		if (this.amount != this.elems.length) {
			console.warn("Switcher error: buttons count != elems count");
			return;
		}
		this.prev = 0;
		this.resize();
		this.elems[0].classList.add("active");
		this.buttons[0].classList.add("active");
		for (var i = 0; i < this.amount; i++) {
			const ci = i;
			this.buttons[ci].onclick = () => {
				this.switchTo(ci);
			}
		}
		this.checkURL();
		this.inited = true;
		if (typeof this.params.onInited == "function") {
			this.params.onInited();
		}
	}
	resize() {
		this.h = new Array(this.amount);
		for (var i = 0; i < this.amount; i++) {
			const ci = i;
			this.h[ci] = this.elems[ci].getBoundingClientRect().height;
		}
		this.elemsParent.style.height = this.h[this.prev] + "px";
	}
	switchTo(ci) {
		console.log(this, ci)
		this.elems[this.prev].classList.remove("active");
		this.elems[ci].classList.add("active");
		this.buttons[this.prev].classList.remove("active");
		this.buttons[ci].classList.add("active");
		this.elemsParent.style.height = this.h[ci] + "px";
		this.prev = ci;
	}
	checkURL() {
		if (window.location.hash.indexOf("#switch") != -1) {
			var ci = +window.location.hash.slice(7);
			this.switchTo(ci % this.amount);
		}
	}
};

/*--------------------------------------------------*/
/*--------------------------------------------------*/
/*--------------------------------------------------*/
/*--------------------------------------------------*/
/*--------------------------------------------------*/
