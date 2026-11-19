/**
 * countingArray(arr) — wraps an array in a Proxy that counts index reads, so
 * tests can check you used O(log n) reads. Already written; read, don't edit.
 */
export function countingArray(arr) {
  const counter = { reads: 0 };
  const proxy = new Proxy(arr, {
    get(target, prop, receiver) {
      if (typeof prop === "string" && /^\d+$/.test(prop)) counter.reads++;
      return Reflect.get(target, prop, receiver);
    },
  });
  return { array: proxy, counter };
}
