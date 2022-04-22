import { FC } from 'react';
import { BackButton } from '../../components/BackButton/BackButton';
import { CategoryContainer } from '../../containers/CategoryContainer/CategoryContainer';
import { PageMeta } from '../../containers/PageMeta/PageMeta';
import ZekrListFavorites from '../../containers/ZekrListFavorites/ZekrListFavorites';
import './HomePage.scss';

export const HomePage: FC = () => {
	return (
		<div>
			<PageMeta
				title="خوش آمدید"
				description="در اینجا سعی می کنیم که مرجعی برای دعاها، اذکار و اعمال عبادی رو جمع کنیم. به امید داشتن منبعی تقریبا کامل. این سایت و اطلاعات آن کد منبع آزاد بوده و رایگان است"
			/>
			<main className="text-center">
				<h2 className="fs-6">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</h2>
				<br />
				<h1 className="fs-6">
					<strong>به سایت دعاها و اذکار خوش آمدید</strong>
				</h1>
				<p className="text-start">
					در اینجا سعی می کنیم که مرجعی برای دعاها، اذکار و اعمال عبادی رو جمع کنیم. به امید داشتن منبعی تقریبا کامل.
					این سایت و اطلاعات آن کد منبع آزاد بوده و رایگان است و از{' '}
					<a href="https://github.com/salarcode/myzekr" target="_blank" rel="noopener noreferrer nofollow">
						<img src="https://github.githubassets.com/pinned-octocat.svg" alt="github" className="icon-13 m-1" />
						اینجا &nbsp;
					</a>
					قابل دریافت است.
					<br />
					محتاج دعای شما عزیزان.
					<br />
					تقدیم به امیرالمؤمنین مولا امام علی علیه السلام.
				</p>
				<BackButton doNotShowButton={true} />
			</main>
			<section className="main-section main-search-bar">
				<div className="input-group input-group-sm search-input">
					<input
						type="text"
						className="form-control"
						aria-describedby="homepage-search-input"
						placeholder="جستجو در میان اذکار"
						data-bs-toggle="modal"
						data-bs-target="#site-search-modal"
					/>
					<button
						className="btn btn-outline-secondary button-icon"
						type="button"
						id="homepage-search-input"
						data-bs-toggle="modal"
						data-bs-target="#site-search-modal"
					>
						<span role="img">🔍</span>
					</button>
				</div>
			</section>
			<section className="main-section">
				<h3 className="main-section-title">
					<span>⭐</span>
					انتخاب دسته بندی دعا ها
				</h3>
				<div className="">
					<CategoryContainer />
				</div>
			</section>
			<ZekrListFavorites sectionTitle="⭐ لیست علاقه مندی هایتان" />
		</div>
	);
};
