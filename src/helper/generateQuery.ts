export const generateQuery = (queryParams: Record<string, string | number>): string => {
  const entries = Object.entries(queryParams);
  return entries.length ? `?${entries.map((param) => `${param[0]}=${param[1]}`).join('&')}` : '';
};
