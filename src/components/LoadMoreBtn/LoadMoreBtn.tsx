import css from './LoadMoreBtn.module.css';

import { FC } from 'react';
import { LoadMoreBtnProps } from '../../types';

const LoadMoreBtn: FC<LoadMoreBtnProps> = ({ totalPage, loadNextPage }) => {
  if (totalPage === 0) return null;

  return (
    <button className={css.loadMoreBtn} onClick={loadNextPage} type="button">
      Load more
    </button>
  );
};

export default LoadMoreBtn;
