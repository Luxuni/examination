const createResource = <T>(promise: Promise<T>) => {
  let status = 'loading';
  let result: null | T = null;
  return {
    read() {
      if (status === 'loading') {
        throw promise.then((r) => {
          status = 'success';
          result = r;
        });
      } else if (status === 'success') {
        return result;
      }
    },
  };
};

export { createResource };
