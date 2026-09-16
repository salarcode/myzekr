import React, { FC, Fragment } from 'react';

interface Props {
	condition: boolean;
	children?: React.ReactNode;
}

export const Conditional: FC<Props> = ({ condition, children }) => {
	return <Fragment>{condition && children}</Fragment>;
};
