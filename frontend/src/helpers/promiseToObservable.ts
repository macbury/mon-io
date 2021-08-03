import { Observable } from 'apollo-link'

export default promise =>
  // @ts-ignore
  new Observable((subscriber) => {
    promise.then(
      (value) => {
        if (subscriber.closed) return;
        subscriber.next(value);
        subscriber.complete();
      },
      err => subscriber.error(err)
    );
    return subscriber; // this line can removed, as per next comment
  });