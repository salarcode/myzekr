import React, { FC, FormEvent, FormEventHandler, Fragment, KeyboardEventHandler, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ZekrList } from '../ZekrList/ZekrList';
import { Zekr, ZekrIndex } from '../../services/Zekr/models/Zekr';
import { getZekrIndexList } from '../../services/Zekr/ZekrWebService';
import { ErrorMessage, retryType } from '../../components/ErrorMessage/ErrorMessage';
import { Loading } from '../../components/Loading/Loading';
import { searchZekrIndex } from '../../services/Zekr/ZekrSearch';

interface Props {}

export const AboutDialog: FC<Props> = ({}) => {
	return (
		<div className="modal fade" id="about-modal" tabIndex={-1} aria-labelledby="about-modal-label" aria-hidden="true">
			<button id="toggle-about-modal" style={{ display: 'none' }} data-bs-toggle="modal" data-bs-target="#about-modal" />
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="about-modal-label">
							درباره مرجع دعاها و اذکار
						</h5>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						<p>
							در اینجا سعی می کنیم که مرجعی برای دعاها، اذکار و اعمال عبادی رو جمع کنیم. به امید داشتن یک منبع برای
							همه چی.
							<br />
							این سایت و اطلاعات آن کد منبع آزاد بوده و رایگان است و از{' '}
							<a href="https://github.com/salarcode/myzekr" target="_blank" rel="noopener noreferrer nofollow">
								<img
									src="https://github.githubassets.com/pinned-octocat.svg"
									alt="github"
									className="icon-13 m-1"
								/>
								اینجا &nbsp;
							</a>
							قابل دریافت است.
							<br />
							محتاج دعای شما عزیزان.
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
