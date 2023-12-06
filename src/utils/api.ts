import { MetaData } from '@interfaces/api';
import { APIResponseWithMeta } from '~types/api';

const getPageData = <T>(data: T[], pageSize: number, page: number = 1) => {
  const pageFromOne = page - 1;
  const from = pageFromOne * pageSize;
  const to = from + pageSize;

  return data.slice(from, to);
};

const getMeta = <T>(data: T[], pageSize: number, page: number = 1): MetaData => {
  const totalPages = Math.ceil(data.length / pageSize);

  return {
    current_page: page,
    next_page: page < totalPages ? page + 1 : null,
    per_page: pageSize,
    total_count: data.length,
    total_pages: totalPages
  };
};

const getResponseWithMeta = <T>(data: T[], pageSize: number, page: number = 1): APIResponseWithMeta<T> => ({
  data: getPageData<T>(data, pageSize, page),
  meta: getMeta<T>(data, pageSize, page)
});

export { getMeta, getPageData, getResponseWithMeta };
