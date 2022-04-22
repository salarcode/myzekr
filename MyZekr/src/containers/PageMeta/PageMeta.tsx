import React, { FC } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Zekr } from '../../services/Zekr/models/Zekr';

interface Props {
	title: string;
	description: string;
}

export const PageMeta: FC<Props> = ({ title, description }) => {
	if (!title) {
		title = 'مرجع دعاها و اذکار';
	} else if (title.length < 60) {
		title += ' - مرجع دعاها و اذکار';
	}
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description ? description : title} />
		</Helmet>
	);
};
