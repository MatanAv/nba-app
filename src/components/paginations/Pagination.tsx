import React from 'react';

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, pageSize, totalPages, onPageChange }: PaginationProps) => {
  const firstPage = 1;
  const lastPage = Math.ceil(totalPages / pageSize);

  const isPrevDisabled = currentPage === firstPage;
  const isNextDisabled = currentPage === lastPage;

  return (
    <div className='pagination'>
      <button className='pagination__button' onClick={() => onPageChange(firstPage)} disabled={isPrevDisabled}>
        {'<<'}
      </button>
      <span> | </span>
      <button className='pagination__button' onClick={() => onPageChange(currentPage - 1)} disabled={isPrevDisabled}>
        {'<'}
      </button>
      <span> | </span>
      <p className='pagination__text'>
        {currentPage} of {totalPages}
      </p>
      <span> | </span>
      <button className='pagination__button' onClick={() => onPageChange(currentPage + 1)} disabled={isNextDisabled}>
        {'>'}
      </button>
      <span> | </span>
      <button className='pagination__button' onClick={() => onPageChange(lastPage)} disabled={isNextDisabled}>
        {'>>'}
      </button>
    </div>
  );
};

export default Pagination;
