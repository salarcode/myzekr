import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Zekr } from '../../services/Zekr/models/Zekr';

interface Props {
	zekr: Zekr;
}

export const ZekrButton: FC<Props> = ({ zekr }) => {
	return (
		<Link to={'/zekr/' + zekr.uid} key={zekr.uid} className="zekr-button">
			{zekr.fullName}
		</Link>
	);
};
