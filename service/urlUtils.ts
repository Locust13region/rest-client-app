import { KeyValuePair } from '@/types/restClient';

export const composeUrl = (
  pageSlug: string,
  path: string,
  method?: string,
  url?: string,
  body?: string,
  headers?: string
) => {
  const index = path.indexOf(pageSlug);
  let newPath = path;
  const encodedUrl = url ? btoa(url) : undefined;
  const encodedBody = body ? btoa(body) : undefined;
  const vars = [method, encodedUrl, encodedBody, headers];

  if (index !== -1) {
    const initPath = path.slice(0, index + pageSlug.length) + '/';
    newPath = initPath;
    for (const param of vars) {
      if (!param) break;
      newPath = newPath.concat(`${param}/`);
    }
  }
  return newPath.slice(0, -1);
};

export const composeHeaders = (headers: KeyValuePair[]): string => {
  let queryString = '';
  for (const pair of headers) {
    if (pair.key) {
      const enValue = encodeURIComponent(pair.value);
      queryString += `${pair.key}=${enValue}&`;
    }
  }
  return queryString ? `?${queryString.slice(0, -1)}` : queryString;
};

export function a11yTabProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}
