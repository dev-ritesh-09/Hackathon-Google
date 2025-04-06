
// Hero text animation
const text = document.querySelectorAll(".anim-text");
text.forEach((item) => {
	const strText = item.textContent;
	const splitText = strText.split("");
	item.textContent = "";
	for (let i = 0; i < splitText.length; i++) {
		item.innerHTML += "<span>" + splitText[i] + "</span>";
	}


	let char = 0;
	let timer = setInterval(onTick, 30);

	function onTick() {
		const span = item.querySelectorAll('span')[char];
		span.classList.add('fade');
		char++
		if (char === splitText.length) {
			complete();
			return;
		}
	}

	function complete() {
		clearInterval(timer);
		timer = null;
	}

})

// service secion accordion
const accordions = document.querySelectorAll(".accordion");

const openAccordion = (accordion) => {
	const content = accordion.querySelector(".accordion__content");
	accordion.classList.add("accordion__active");
	content.style.maxHeight = content.scrollHeight + "px";
};

const closeAccordion = (accordion) => {
	const content = accordion.querySelector(".accordion__content");
	accordion.classList.remove("accordion__active");
	content.style.maxHeight = null;
};

accordions.forEach((accordion) => {
	const intro = accordion.querySelector(".accordion__intro");
	const content = accordion.querySelector(".accordion__content");

	intro.onclick = () => {
		if (content.style.maxHeight) {
			closeAccordion(accordion);
		} else {
			accordions.forEach((accordion) => closeAccordion(accordion));
			openAccordion(accordion);
		}
	};
});



// js for faqs
let question = document.querySelectorAll(".question");

question.forEach((qsitem) => {
	qsitem.addEventListener("click", function (e) {
		//   store the .answer div containing the answer
		let sibling = qsitem.nextElementSibling;

		// Nested loop for removing active class from all and set answer height to 0
		question.forEach((item) => {
			item.nextElementSibling.style.height = "0px";
			//   remove class "active" except for the currently clicked item
			item != qsitem && item.parentNode.classList.remove("active");
		});
		//then toggle the "active" class of clicked item's parent ".qna"
		this.parentNode.classList.toggle("active");

		// set actual height for .answer div if .qna has the class "active"
		if (qsitem.parentNode.classList.contains("active")) {
			sibling.style.height = sibling.scrollHeight + "px";
		} else {
			sibling.style.height = "0px";
		}
	});
});





// swiffy slider minified js

const swiffyslider = {
	version: "1.6.0",
	init(e = document.body) {
		for (let t of e.querySelectorAll(".swiffy-slider")) this.initSlider(t)
	},
	initSlider(e) {
		for (let t of e.querySelectorAll(".slider-nav")) {
			let i = t.classList.contains("slider-nav-next");
			t.addEventListener("click", () => this.slide(e, i), {
				passive: !0
			})
		}
		for (let t of e.querySelectorAll(".slider-indicators")) t.addEventListener("click", () => this.slideToByIndicator()), this.onSlideEnd(e, () => this.handleIndicators(e), 60);
		if (e.classList.contains("slider-nav-autoplay")) {
			const t = e.getAttribute("data-slider-nav-autoplay-interval") ? e.getAttribute("data-slider-nav-autoplay-interval") : 2500;
			this.autoPlay(e, t, e.classList.contains("slider-nav-autopause"))
		}
		if (["slider-nav-autohide", "slider-nav-animation"].some(t => e.classList.contains(t))) {
			const t = e.getAttribute("data-slider-nav-animation-threshold") ? e.getAttribute("data-slider-nav-animation-threshold") : .3;
			this.setVisibleSlides(e, t)
		}
	},
	setVisibleSlides(e, t = .3) {
		let i = new IntersectionObserver(t => {
			t.forEach(e => {
				e.isIntersecting ? e.target.classList.add("slide-visible") : e.target.classList.remove("slide-visible")
			}), e.querySelector(".slider-container>*:first-child").classList.contains("slide-visible") ? e.classList.add("slider-item-first-visible") : e.classList.remove("slider-item-first-visible"), e.querySelector(".slider-container>*:last-child").classList.contains("slide-visible") ? e.classList.add("slider-item-last-visible") : e.classList.remove("slider-item-last-visible")
		}, {
			root: e.querySelector(".slider-container"),
			threshold: t
		});
		for (let t of e.querySelectorAll(".slider-container>*")) i.observe(t)
	},
	slide(e, t = !0) {
		const i = e.querySelector(".slider-container"),
			s = e.classList.contains("slider-nav-page"),
			l = e.classList.contains("slider-nav-noloop"),
			r = e.classList.contains("slider-nav-nodelay"),
			o = i.children,
			n = parseInt(window.getComputedStyle(i).columnGap),
			a = o[0].offsetWidth + n;
		let d = t ? i.scrollLeft + a : i.scrollLeft - a;
		s && (d = t ? i.scrollLeft + i.offsetWidth : i.scrollLeft - i.offsetWidth), i.scrollLeft < 1 && !t && !l && (d = i.scrollWidth - i.offsetWidth), i.scrollLeft >= i.scrollWidth - i.offsetWidth && t && !l && (d = 0), i.scroll({
			left: d,
			behavior: r ? "auto" : "smooth"
		})
	},
	slideToByIndicator() {
		const e = window.event.target,
			t = Array.from(e.parentElement.children).indexOf(e),
			i = e.parentElement.children.length,
			s = e.closest(".swiffy-slider"),
			l = s.querySelector(".slider-container").children.length / i * t;
		this.slideTo(s, l)
	},
	slideTo(e, t) {
		const i = e.querySelector(".slider-container"),
			s = parseInt(window.getComputedStyle(i).columnGap),
			l = i.children[0].offsetWidth + s,
			r = e.classList.contains("slider-nav-nodelay");
		i.scroll({
			left: l * t,
			behavior: r ? "auto" : "smooth"
		})
	},
	onSlideEnd(e, t, i = 125) {
		let s;
		e.querySelector(".slider-container").addEventListener("scroll", (function () {
			window.clearTimeout(s), s = setTimeout(t, i)
		}), {
			capture: !1,
			passive: !0
		})
	},

	// Pause the autoplay


	autoPlay(e, t, i) {

		t = t < 750 ? 750 : t;
		let s = setInterval(() => this.slide(e), t);
		const l = () => this.autoPlay(e, t, i);


		childDiv = document.querySelector('.pause');
		console.log(childDiv);
		childDiv.addEventListener("click", function () {
			// e.preventDefault();
			e.classList.add("toggle");
			clearInterval(s);
			clearTimeout(s);

		});

		const switchClass = document.querySelector(".play");
		if (switchClass !== null) {
			switchClass.addEventListener("click", function () {
				e.classList.remove("toggle");

				l();
			})
		}
		return i && (["mouseover", "touchstart"].forEach((function (t) {
			e.addEventListener(t, (function () {
				window.clearTimeout(s)
			}), {
				once: !0,
				passive: !0
			})
		})), ["mouseout", "touchend"].forEach((function (t) {
			e.addEventListener(t, (function () {
				l()
			}), {
				once: !0,
				passive: !0
			})
		}))), s
	},
	handleIndicators(e) {
		if (!e) return;
		const t = e.querySelector(".slider-container"),
			i = t.scrollWidth - t.offsetWidth,
			s = t.scrollLeft / i;
		for (let t of e.querySelectorAll(".slider-indicators")) {
			let e = t.children,
				i = Math.abs(Math.round((e.length - 1) * s));
			for (let t of e) t.classList.remove("active");
			e[i].classList.add("active")
		}
	}


};
window.swiffyslider = swiffyslider, document.currentScript.hasAttribute("data-noinit") || (document.currentScript.hasAttribute("defer") ? swiffyslider.init() : document.onreadystatechange = () => {
	"interactive" === document.readyState && swiffyslider.init()
});

// mobile menu toggle

document.querySelector('.site-toggle i').onclick = function (e) {
	var toggleDiv = document.querySelector('body');
	toggleDiv.classList.toggle('on');
}

document.querySelector('.nav-close').onclick = function (e) {
	var toggleDiv = document.querySelector('body');
	toggleDiv.classList.remove('on');
}

let navs = document.querySelectorAll(".site-nav ul li a");
navs.forEach((nav) => {
	nav.addEventListener('click', function () {
		document.querySelector('body').classList.remove("on");
	})
})


// scroll animation js

const mediaQuery = window.matchMedia('(min-width:100px)')
// Check if the media query is true
if (mediaQuery.matches) {

	const scrollElements = document.querySelectorAll(".site-scroll");

	const elementInView = (el, dividend = 1) => {
		const elementTop = el.getBoundingClientRect().top;

		return (
			elementTop <=
			(window.innerHeight || document.documentElement.clientHeight) / dividend
		);
	};

	const elementOutofView = (el) => {
		const elementTop = el.getBoundingClientRect().top;

		return (
			elementTop > (window.innerHeight || document.documentElement.clientHeight)
		);
	};

	const displayScrollElement = (element) => {
		element.classList.add("scrolled");
	};

	const hideScrollElement = (element) => {
		element.classList.remove("scrolled");
	};

	const handleScrollAnimation = () => {
		scrollElements.forEach((el) => {
			if (elementInView(el, 1.25)) {
				displayScrollElement(el);
			} else if (elementOutofView(el)) {
				hideScrollElement(el)
			}
		})
	}

	window.addEventListener("scroll", () => {
		handleScrollAnimation();
	});
}



// custom individual scoll timing
setTimeout(() => document.querySelector('.site-header').classList.add('show'), 100);
setTimeout(() => document.querySelector('.hero-slider').classList.add('show'), 100);
setTimeout(() => document.querySelector('.hero-slider .hero-content .anchor-div').classList.add('show'), 2000);



