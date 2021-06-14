import { IconButton, InputAdornment, TextField } from '@material-ui/core';
import React, { FC } from 'react';
import { BackButton } from '../../components/BackButton/BackButton';
import { CategoryContainer } from '../../containers/CategoryContainer/CategoryContainer';
import { PageMeta } from '../../containers/PageMeta/PageMeta';
import './HomePage.scss';

export const HomePage: FC = () => {
	return (
		<div>
			<PageMeta title="خوش آمدید" description="سایت مرجع دعاها و اذکار" />
			<main className="text-center">
				<p>
					<strong>به سایت مرجع دعاها و اذکار خوش آمدید</strong>
				</p>
				<p>
					در اینجا سعی می کنیم که مرجعی برای دعاها، اذکار و اعمال عبادی رو جمع کنیم. به امید داشتن یک منبع برای همه چی.
					<br />
					این سایت و اطلاعات آن کد منبع آزاد بوده و رایگان است و از{' '}
					<a href="https://github.com/" target="_blank" rel="noopener noreferrer nofollow">
						<img src="https://github.githubassets.com/pinned-octocat.svg" alt="" className="icon-13 m-1" />
						اینجا &nbsp;
					</a>
					قابل دریافت است.
					<br />
					محتاج دعای شما عزیزان.
				</p>
				<BackButton doNotShowButton={true} />
			</main>
			<section className="main-section main-search-bar">
				<TextField
					className="search-input"
					id="homepage-main-search"
					placeholder="جستجو در میان اذکار"
					data-bs-toggle="modal"
					data-bs-target="#site-search-modal"
					InputProps={{
						endAdornment: (
							<InputAdornment position="start">
								<IconButton>
									<span role="img">🔍</span>
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			</section>
			<section className="main-section">
				<div className="main-section-title">
					<span>⭐</span>
					انتخاب دسته بندی دعا ها
				</div>
				<div className="">
					<CategoryContainer />
				</div>
			</section>
		</div>
	);
};
