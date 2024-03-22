type Status = 'loading' | 'success' | 'error';

class Resource<T> {
  status: Status = 'loading';
  result: T | null = null;
  error: Error | null = null;
  suspender: Promise<T>;

  constructor(promise: Promise<T>) {
    this.suspender = promise.then(
      (r) => {
        this.status = 'success';
        this.result = r;
        return r;
      },
      (e) => {
        this.status = 'error';
        this.error = e;
        throw e;
      },
    );
  }

  read() {
    switch (this.status) {
      case 'loading':
        throw this.suspender;
      case 'success':
        return this.result;
      case 'error':
        throw this.error;
      default:
        throw new Error('This should be impossible');
    }
  }
}

export { Resource };
