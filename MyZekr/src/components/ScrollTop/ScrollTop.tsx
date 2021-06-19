import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Zekr } from '../../services/Zekr/models/Zekr';
import './ScrollTop.scss';

export const ScrollTop: FC = () => {
	function onScrollClick() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
	window.addEventListener('scroll', function (e) {
		var elem = document.getElementById('scroll-back-to-top');
		if (!elem) return;

		if (window.scrollY > 300) {
			//elem.classList.remove('hidden');
			//elem.classList.remove('opacity-0');
			fadeIn(elem);
		} else {
			//elem.classList.add('opacity-0');
			fadeOut(elem);

			// this.setTimeout(() => {
			// 	if (elem) elem.classList.add('hidden');
			// }, 500);
		}
	});
	function fadeOut(el: any) {
		el.style.opacity = 1;

		(function fade() {
			if ((el.style.opacity -= 0.1) < 0) {
				el.style.display = 'none';
			} else {
				requestAnimationFrame(fade);
			}
		})();
	}
	function fadeIn(el: any, display: string | undefined = undefined) {
		el.style.opacity = 0;
		el.style.display = display || 'block';

		(function fade() {
			var val = parseFloat(el.style.opacity);
			var proceed = (val += 0.1) > 1 ? false : true;

			if (proceed) {
				el.style.opacity = val;
				requestAnimationFrame(fade);
			}
		})();
	}

	return (
		<a href="#" onClick={onScrollClick} id="scroll-back-to-top" className="opacity-0">
			<img src="/assets/icons/arrow-up.svg" alt="⬆" className="icon-28 link-image" />
		</a>
	);
};
