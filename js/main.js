const slide = (direction) => {
	const items = document.getElementsByClassName("item");
	const activeIndex = Array.from(items).findIndex((i) =>
		i.classList.contains("active")
	);
	items[activeIndex].classList.remove("active");
	items[activeIndex].children[3].classList.remove("show");
	const target =
		direction === "+"
			? (activeIndex + 1) % items.length
			: (activeIndex - 1 + items.length) % items.length;

	items[target].classList.add("active");
	items[target].children[3].classList.add("show");
};

const playVideo = () => {
	const player = document.getElementById("player");
	player.play();
	document.getElementById("active-metadata").classList.add("hide");
	document.getElementById("media-button").classList.add("hide");
	player.controls = true;
	player.style.pointerEvents = "auto";
};
const setActiveVideo = (videoElement) => {
	const video = videoElement.children[0].children[0].children[0].src;
	const title = videoElement.children[1].children[0].innerText;
	const duration = videoElement.children[1].children[1].innerText;
	const player = document.getElementById("player");
	const activeMetadata = document.getElementById("active-metadata");
	document.getElementsByClassName("current")[0].classList.remove("current");
	videoElement.classList.add("current");
	player.children[0].src = video;
	activeMetadata.children[0].innerText = title;
	activeMetadata.children[1].innerText = duration;
	player.load();
	player.controls = false;
	activeMetadata.classList.remove("hide");
	document.getElementById("media-button").classList.remove("hide");
	player.style.pointerEvents = "none";
};
const getData = (video) => {
	video.parentNode.parentNode.children[1].children[1].innerText = new Date(
		video.duration * 1000
	)
		.toISOString()
		.substr(14, 5);
};
const loadPlayer = () => {
	const player = document.getElementById("active-video");
	const initialVideo = document.getElementsByClassName("video-item")[0];
	const video = initialVideo.children[0].children[0].children[0].src;
	const title = initialVideo.children[1].children[0].innerText;
	const duration = initialVideo.children[1].children[1].innerText;
	initialVideo.classList.add("current");
	player.innerHTML = `<div id="active-metadata"><h3>${title}
</h3><p>${duration}</p></div>
<button id="media-button" onclick="playVideo()"><svg width="1em" height="1em" viewBox="0 0 16 16" class="play" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
</svg></button>
<video id="player">
	<source src=${video} type="video/mp4">
</video>`;
};

const slideRotate = (direction) => {
	const slider = document.getElementById("sliderbox");
	const childrenArray = Array.from(slider.children);
	const length = childrenArray.length;
	const activeIndex =
		(length / 2) % 2 === 0 ? length / 2 : Math.round(length / 2) - 1;
	if (direction === "-") {
		childrenArray.unshift(childrenArray.pop());
	} else {
		childrenArray.push(childrenArray.shift());
	}
	slider.appendChild(createElementsFromArray(childrenArray));
	slider.classList.add("fade");

	setTimeout(() => {
		direction === "-"
			? slider.children[activeIndex + 1].classList.remove("active")
			: slider.children[activeIndex - 1].classList.remove("active");
		slider.children[activeIndex].classList.add("active");
	}, 100);
	setTimeout(() => slider.classList.remove("fade"), 300);
};

const createElementsFromArray = (array) => {
	let elements = document.createDocumentFragment();
	array.forEach((element) => {
		elements.appendChild(element);
	});

	return elements;
};

const reviewSlide = (direction) => {
	const clients = document.getElementById("clients").children;
	const currentClient = Array.from(clients).findIndex((e) =>
		e.classList.contains("display")
	);
	const length = clients.length - 1;
	let target;
	clients[currentClient].classList.remove("display");
	clients[currentClient].classList.remove("fade");
	if (direction === "+") {
		target = (currentClient + 1) % length;
	} else {
		target = (currentClient - 1 + length) % length;
	}
	clients[target].classList.add("display");

	setTimeout(() => clients[target].classList.add("fade"), 0);

	const pagination = document.getElementById("pagination").children;
	pagination[currentClient].classList.remove("current");
	pagination[target].classList.add("current");
};

const jumpToClient = (target) => {
	const pagination = document.getElementById("pagination").children;
	const current = Array.from(pagination).findIndex((e) =>
		e.classList.contains("current")
	);
	pagination[current].classList.remove("current");
	pagination[target].classList.add("current");

	const clients = document.getElementById("clients").children;
	const currentClient = Array.from(clients).findIndex((e) =>
		e.classList.contains("display")
	);
	clients[currentClient].classList.remove("display");
	clients[currentClient].classList.remove("fade");
	clients[target].classList.add("display");

	setTimeout(() => clients[target].classList.add("fade"), 0);
};
