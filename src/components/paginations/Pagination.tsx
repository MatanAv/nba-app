import React from 'react';

import '@styles/paginations/Pagination.css';

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, pageSize, totalItems, totalPages, onPageChange }: PaginationProps) => {
  const firstPage = 1;
  const lastPage = totalPages || Math.ceil(totalItems / pageSize);

  const isPrevDisabled = currentPage === firstPage;
  const isNextDisabled = currentPage === lastPage;

  return (
    <span className='pagination'>
      <button className='pagination__button' onClick={() => onPageChange(firstPage)} disabled={isPrevDisabled}>
        {'<<'}
      </button>
      <span> | </span>
      <button className='pagination__button' onClick={() => onPageChange(currentPage - 1)} disabled={isPrevDisabled}>
        {'<'}
      </button>
      <p className='pagination__text'>
        {currentPage} of {lastPage}
      </p>
      <button className='pagination__button' onClick={() => onPageChange(currentPage + 1)} disabled={isNextDisabled}>
        {'>'}
      </button>
      <span> | </span>
      <button className='pagination__button' onClick={() => onPageChange(lastPage)} disabled={isNextDisabled}>
        {'>>'}
      </button>
    </span>
  );
};

export default Pagination;
