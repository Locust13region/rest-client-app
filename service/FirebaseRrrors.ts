export const fireBaseErrors = {
  'auth/invalid-credential': '',
  'auth/email-already-in-use': '',
};

export const examp = {
  history: {
    '1f8a9e12-2d4c-4a98-9a2e-6f9a7f2341ab': {
      requestDuration: 120,
      responseStatus: 200,
      requestTimestamp: 1694505600,
      requestMethod: 'GET',
      requestSize: 512,
      responseSize: 2048,
      errorDetails: 'OK',
      endpoint: 'https://jsonplaceholder.typicode.com/posts',
    },
    '2c9d1b7f-4d2f-48aa-95e6-92b6c96b64f3': {
      requestDuration: 350,
      responseStatus: 201,
      requestTimestamp: 1694592000,
      requestMethod: 'POST',
      requestSize: 1024,
      responseSize: 512,
      errorDetails: 'Created',
      endpoint: 'https://jsonplaceholder.typicode.com/posts',
    },
    '3b7f6c21-95c4-4b9d-8e8c-bb3a7f2f8c23': {
      requestDuration: 220,
      responseStatus: 404,
      requestTimestamp: 1694678400,
      requestMethod: 'GET',
      requestSize: 480,
      responseSize: 128,
      errorDetails: 'Not Found',
      endpoint: 'https://jsonplaceholder.typicode.com/unknown',
    },
    '4e1c7f45-b9e2-41f6-91c7-5a2d4b8932d0': {
      requestDuration: 500,
      responseStatus: 500,
      requestTimestamp: 1694764800,
      requestMethod: 'PUT',
      requestSize: 2048,
      responseSize: 256,
      errorDetails: 'Internal Server Error',
      endpoint: 'https://jsonplaceholder.typicode.com/posts/1',
    },
    '5d3e8f92-7a4c-4b6c-8e2d-4f6a1b23e9a5': {
      requestDuration: 150,
      responseStatus: 200,
      requestTimestamp: 1694851200,
      requestMethod: 'DELETE',
      requestSize: 256,
      responseSize: 64,
      errorDetails: 'Deleted successfully',
      endpoint: 'https://jsonplaceholder.typicode.com/posts/1',
    },
  },
};
