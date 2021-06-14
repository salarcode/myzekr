import React, { FC } from 'react';
import { PageMeta } from '../../containers/PageMeta/PageMeta';

export const NotFoundPage: FC = () => {
	return (
		<div>
			<PageMeta title="یافت نشد" description="عنوان مورد نظر شما یافت نشد" />
			<p>404 Not Found!</p>
		</div>
	);
};
