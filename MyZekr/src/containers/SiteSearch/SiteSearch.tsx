import React, { FC, FormEvent, FormEventHandler, KeyboardEventHandler, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ZekrList } from '../ZekrList/ZekrList';
import { Zekr, ZekrIndex } from '../../services/Zekr/models/Zekr';
import { getZekrIndexList } from '../../services/Zekr/ZekrWebService';
import { ErrorMessage, retryType } from '../../components/ErrorMessage/ErrorMessage';
import { Loading } from '../../components/Loading/Loading';
import { searchZekrIndex } from '../../services/Zekr/ZekrSearch';

interface Props {
	modalId: string;
	searchLimit?: number;
}

export const SiteSearch: FC<Props> = ({ modalId, searchLimit }) => {
	var limit = 20;
	if (searchLimit) {
		limit = searchLimit;
	}

	const [loading, setLoading] = useState<boolean>(true);
	const [zekrIndexList, setZekrIndexList] = useState<ZekrIndex[]>([]);
	const [searchText, setSearchText] = useState<string>('');
	const [zekrSearchResult, setZekrSearchResult] = useState<ZekrIndex[]>([]);

	useEffect(() => {
		async function doGetZekrList() {
			setLoading(true);
			let loadedZekrIndexList = await getZekrIndexList();

			if (loadedZekrIndexList) {
				setZekrIndexList(loadedZekrIndexList);
			}

			setLoading(false);
		}
		doGetZekrList();
		autoFocusInput();
	}, []);

	function onSearchSubmit(event: FormEvent) {
		event.preventDefault();
	}

	var searchTimeout: NodeJS.Timeout;

	function onSearchInput(event: FormEvent<HTMLInputElement>) {
		event.preventDefault();

		if (searchTimeout) {
			clearTimeout(searchTimeout);
		}
		searchTimeout = setTimeout(doSearch, 500);

		// event.target.value
	}
	function onSearchInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key == 'Enter') {
			doSearch();
			document.getElementById('site-search')?.blur();
			document.getElementById('search-result')?.focus();
		}
	}
	function onSearchItemClick() {
		document.getElementById('search-modal-close')?.click();
	}

	function doSearch() {
		var val = (document.getElementById('site-search') as HTMLInputElement).value;
		if (!val) {
			setSearchText(val);
			setZekrSearchResult([]);
			return;
		}

		var searchResult = searchZekrIndex(zekrIndexList, val, limit);

		setZekrSearchResult(searchResult);
		setSearchText(val);
	}

	function autoFocusInput() {
		var searchModal = document.getElementById(modalId);
		var searchInput = document.getElementById('site-search') as HTMLInputElement;

		if (searchModal)
			searchModal.addEventListener('shown.bs.modal', function () {
				if (searchInput) {
					searchInput.focus();
					searchInput.select();
				}
			});
	}

	return (
		<div className="modal fade" id={modalId} tabIndex={-1} aria-labelledby={modalId + '-label'} aria-hidden="true">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id={modalId + '-label'}>
							جستجو کلی در محتوای سایت
						</h5>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						<form onSubmit={onSearchSubmit} id="form-site-search" className="">
							<div className="form-floating mb-3">
								<input
									autoFocus
									onInput={onSearchInput}
									onChange={onSearchInput}
									onKeyDown={onSearchInputKeyDown}
									type="search"
									name="search"
									placeholder="عبارت جستجو را وارد کنید..."
									accessKey="f"
									id="site-search"
									autoComplete="off"
									className="form-control"
								/>
								<label htmlFor="site-search">عبارت جستجو را وارد کنید</label>
							</div>
						</form>
						<div id="search-result">
							{loading && <Loading />}
							{!loading && (!zekrIndexList || !zekrIndexList.length) && (
								<ErrorMessage retry={retryType.reloadPage} />
							)}
							{searchText && !zekrSearchResult.length && (
								<div className="">متاسفانه نتیجه ای یافت نشد. با کلمات کوتاه تر امتحان کنید.</div>
							)}
							{zekrSearchResult && <ZekrList data={zekrSearchResult} onItemClick={onSearchItemClick} />}
						</div>
					</div>
					<div className="modal-footer d-none d-md-flex">
						<button id="search-modal-close" type="button" className="btn btn-secondary" data-bs-dismiss="modal">
							بستن
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
