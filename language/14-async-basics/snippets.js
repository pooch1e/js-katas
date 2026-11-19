/**
 * Five small programs for the predictions kata. Each takes a `log`
 * function and calls it in some order. Read them; don't change them.
 */

export function snippetA(log) {
  log("A");
  setTimeout(() => log("B"), 0);
  Promise.resolve().then(() => log("C"));
  log("D");
}

export function snippetB(log) {
  async function work() {
    log("work start");
    await null;
    log("work end");
  }
  log("before");
  work();
  log("after");
}

export function snippetC(log) {
  setTimeout(() => {
    log("timeout 1");
    Promise.resolve().then(() => log("micro inside timeout 1"));
  }, 0);
  setTimeout(() => log("timeout 2"), 0);
  Promise.resolve().then(() => {
    log("micro 1");
    setTimeout(() => log("timeout from micro 1"), 0);
  });
}

export function snippetD(log) {
  Promise.resolve()
    .then(() => log("then 1"))
    .then(() => log("then 2"));
  queueMicrotask(() => log("queued"));
}

export function snippetE(log) {
  log("1");
  new Promise((resolve) => {
    log("2");
    resolve();
    log("3");
  }).then(() => log("4"));
  log("5");
}
