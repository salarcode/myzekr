import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Zekr } from '../../services/Zekr/models/Zekr';

interface Props {
	title: string;
	description: string;
}

export const PageMeta: FC<Props> = ({ title, description }) => {
	return (
		<Helmet>
			<title>مرجع دعاها و اذکار {title && ' - ' + title}</title>
			<meta name="description" content={description ? description : title} />
		</Helmet>
	);
};
