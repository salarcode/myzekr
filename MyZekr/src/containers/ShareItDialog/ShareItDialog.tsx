import React, { FC, FormEvent, FormEventHandler, Fragment, KeyboardEventHandler, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ZekrList } from '../ZekrList/ZekrList';
import { Zekr, ZekrIndex } from '../../services/Zekr/models/Zekr';
import { getZekrIndexList } from '../../services/Zekr/ZekrWebService';
import { ErrorMessage, retryType } from '../../components/ErrorMessage/ErrorMessage';
import { Loading } from '../../components/Loading/Loading';
import { searchZekrIndex } from '../../services/Zekr/ZekrSearch';
import './ShareItDialog.scss';

interface Props {}

export const ShareItDialog: FC<Props> = ({}) => {
	var pageTitle = (document.querySelector('head title') as any)?.innerText;
	var url = document.location;

	return (
		<div className="modal fade" id="shareit-modal" tabIndex={-1} aria-labelledby="shareit-modal-label" aria-hidden="true">
			<button
				id="toggle-shareit-modal"
				style={{ display: 'none' }}
				data-bs-toggle="modal"
				data-bs-target="#shareit-modal"
			/>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="shareit-modal-label">
							<i className="fas fa-share-alt"></i>&nbsp; اشتراک گذاری با دوستان
						</h5>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						<p className="text-center">
							<a
								rel="nofollow"
								href={'https://telegram.me/share/url?url=' + url}
								className="btn btn-outline-light"
								target="_blank"
							>
								<i className="fab fa-telegram text-info"></i>{' '}
								<span className="hidden-sm hidden-xs text-dark">تلگرام</span>
							</a>
							<a
								rel="nofollow"
								href={`whatsapp://send?text=${pageTitle} - ${url}`}
								className="btn btn-outline-light"
							>
								<i className="fab fa-whatsapp text-success"></i>{' '}
								<span className="hidden-sm hidden-xs text-dark">WhatsApp</span>
							</a>
							<a rel="nofollow" href={`mailto:?subject=${pageTitle}&body=${url}`} className="btn btn-outline-light">
								<i className="far fa-envelope text-primary"></i>{' '}
								<span className="hidden-sm hidden-xs text-dark">ایمیل</span>
							</a>
							<a
								href={`https://twitter.com/home?status=${pageTitle}+${url}`}
								className="btn btn-outline-light"
								target="_blank"
							>
								<i className="fab fa-twitter text-info"></i>{' '}
								<span className="hidden-sm hidden-xs text-dark">توییتر</span>
							</a>
						</p>
					</div>
					<div className="modal-footer d-none d-md-flex">
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
							بستن
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
