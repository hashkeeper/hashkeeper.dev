export function svgImporter () {
	return new Promise(async (resolve, reject) => {
		await document.querySelectorAll('[data-svg]').forEach(container => {
			const svgUrl = container.getAttribute('data-svg');

			fetch(svgUrl)
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
					reject();
				});
		});
	resolve();
	});
};
