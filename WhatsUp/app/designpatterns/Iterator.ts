export default function range(start: number, end: number, step = 1) {
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      if (start < end) {
        start = start + step;
        return { value: start, done: false };
      }
      return { done: true, value: end };
    },
  };
}

/* 
  // outputs 1,2,3,4,...,20
  for (const n of range(0, 20)) {
    console.log(n); 
  }
*/
