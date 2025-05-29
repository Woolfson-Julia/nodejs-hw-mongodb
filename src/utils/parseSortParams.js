import { SORT_ORDER, CONTACT_SORT_KEYS } from '../constants/index.js';

const parseSortBy = (sortBy) => {
  return CONTACT_SORT_KEYS.includes(sortBy) ? sortBy : '_id';
};


const parseSortOrder = (sortOrder) => {
  return [SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder)
    ? sortOrder
    : SORT_ORDER.ASC;
};


export const parseSortParams = (query) => {
  const { sortOrder, sortBy } = query;

  return {
    sortOrder: parseSortOrder(sortOrder),
    sortBy: parseSortBy(sortBy),
  };
};
