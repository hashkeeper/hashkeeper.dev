export function svgImporter () {
	return Promise.all([...document.querySelectorAll('[data-svg]')]
		.map(async (container) => {
			const svgUrl = container.getAttribute('data-svg');

			await fetch(svgUrl)
				.then(response => response.text())
				.then(svgText => {
					container.innerHTML = svgText;

					const svg = container.querySelector('svg');
					if (svg) {
						svg.classList.add('loaded-svg');
						svg.setAttribute('focusable', 'false');
						svg.setAttribute('aria-hidden', 'true');
					}
				})
				.catch(error => {
					console.error('Error loading SVG:', error);
					container.innerHTML = 'SVG failed to load';
				});
		}));
}
