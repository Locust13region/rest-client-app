export const httpMethodsValues = [
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE',
] as const;
export type httpMethods = (typeof httpMethodsValues)[number];
