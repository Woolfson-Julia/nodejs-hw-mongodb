const parseIsFavourite = (value) => {
  if (typeof value === 'string') {
    if (value.toLowerCase() === 'true') return true;
    if (value.toLowerCase() === 'false') return false;
  }

  if (typeof value === 'boolean') return value;
  
  return undefined;
};

const parseContactType = (type) => {
  if (typeof type !== 'string') return;
  const validTypes = ['work', 'home', 'personal'];
  return validTypes.includes(type) ? type : undefined;
};

export const parseFilterParams = (query) => {
  const { isFavourite, contactType } = query;

  return {
    isFavourite: parseIsFavourite(isFavourite),
    contactType: parseContactType(contactType),
  };
};
