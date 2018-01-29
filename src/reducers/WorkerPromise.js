export class WorkerPromise extends Worker {
  postMessage(message) {
    return new Promise((resolve, reject) => {
      super.onmessage = resolve;
      super.onerror = reject;
      super.postMessage(message);
    });
  }
}
