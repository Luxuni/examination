type Status = 'loading' | 'success' | 'error';

const createResource = <T>(promise: Promise<T>) => {
  let status: Status = 'loading';
  let result: T | null = null;
  let error: Error | null = null;

  const suspender = promise.then(
    (r) => {
      status = 'success';
      result = r;
    },
    (e) => {
      status = 'error';
      error = e;
    },
  );

  return {
    read() {
      switch (status) {
        case 'loading':
          throw suspender;
        case 'success':
          return result;
        case 'error':
          throw error;
        default:
          throw new Error('This should be impossible');
      }
    },
  };
};

export { createResource };
