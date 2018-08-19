import './assets/index.css';

// try to auto-focus and make sure the game can be focused with a click if run from an iframe
window.focus();
document.body.addEventListener('mousedown', function() {
	window.focus();
});

const progressEl = document.createElement('p');
const preloadAnimationInterval = setInterval(renderPreload, 100);

let loadingAnimationIdx = 0;
const loadingAnimation = [
	' ..',
	'. .',
	'.. ',
	'...',
];

function renderPreload() {
	loadingAnimationIdx = (loadingAnimationIdx + 1) % loadingAnimation.length;
	progressEl.innerHTML = `${loadingAnimation[loadingAnimationIdx]}`;
}

function fail({
	message,
	error
}) {
	progressEl.textContent = `${message} - Sorry :(`;
	throw error;
}


document.body.appendChild(progressEl);

Promise.all([
		import ('./main')
	])
	.then(([{
		default: main
	}]) => {
		progressEl.remove();
	}, error => {
		fail({
			message: 'Unsupported browser',
			error
		});
	})
	.then(() => {
		clearInterval(preloadAnimationInterval);
	});
