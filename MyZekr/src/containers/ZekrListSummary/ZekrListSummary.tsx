import './ZekrListSummary.scss';
import { Fragment, MouseEventHandler } from 'react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ZekrIndex } from '../../services/Zekr/models/Zekr';
import StarImage from '../../assets-offline/icons/star.svg';

interface Props {
	data: ZekrIndex[];
	onItemClick?: MouseEventHandler<HTMLAnchorElement>;
	displayMoreButton?: boolean;
	moreButtonText?: string;
	moreButtonLink?: string;
	moreButtonImage?: React.ReactElement;
	onMoreClick?: () => void;
}

export const ZekrListSummary: FC<Props> = ({
	data,
	onItemClick,
	displayMoreButton,
	moreButtonText,
	moreButtonLink,
	moreButtonImage,
	onMoreClick,
}) => {
	moreButtonLink = moreButtonLink || '#';
	return (
		<Fragment>
			<div className="item-list zekr-list item-list-summary">
				{data.map((zekr) => {
					return (
						<Link
							to={'/zekr/' + zekr.uid}
							key={zekr.uid}
							className="item-button"
							title={zekr.metaTitle}
							onClick={onItemClick}
						>
							{zekr.imageClass ? (
								<i className={zekr.imageClass || 'fa fa-search'} />
							) : zekr.imageUrl ? (
								<img
									className="icon-16 mx-1 button-icon"
									src={'/assets/icons/' + zekr.imageUrl}
									alt={zekr.metaTitle}
								/>
							) : (
								<img className="icon-16 mx-1 button-icon" src={StarImage} alt={zekr.metaTitle} />
							)}
							{zekr.fullName}
						</Link>
					);
				})}
				{displayMoreButton && (
					<Link to={moreButtonLink} key={moreButtonLink} className="item-button button-link-more" onClick={onMoreClick}>
						{moreButtonImage}
						{moreButtonText}
					</Link>
				)}
			</div>
		</Fragment>
	);
};
