import React, { FormEvent, MouseEventHandler } from 'react';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ZekrIndex } from '../../services/Zekr/models/Zekr';
import './ZekrList.scss';

interface Props {
	data: ZekrIndex[];
	onItemClick?: MouseEventHandler<HTMLAnchorElement>;
	displayRemoveButton?: boolean;
	onRemoveClick?: (zekr: ZekrIndex) => void;
}

export const ZekrList: FC<Props> = ({ data, onItemClick, displayRemoveButton, onRemoveClick }) => {
	function onRemoveButtonClick(e: any, zekr: ZekrIndex) {
		e.preventDefault();
		if (onRemoveClick) onRemoveClick(zekr);
	}
	return (
		<div className="item-list zekr-list">
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
							<img className="icon-16 mx-1 button-icon" src="/assets/icons/star.svg" alt={zekr.metaTitle} />
						)}
						{zekr.fullName}
						{displayRemoveButton && (
							<button className="btn btn-sm float-left" onClick={(e) => onRemoveButtonClick(e, zekr)}>
								<i className="fas fa-times"></i>
							</button>
						)}
					</Link>
				);
			})}
		</div>
	);
};
