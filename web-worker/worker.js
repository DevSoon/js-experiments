// worker.js
self.onmessage = function (event) {
    const { id, delay } = event.data;
    setTimeout(() => {
        const executionTime = performance.now(); // Web Workers에서는 Date.now() 대신 performance.now() 사용 가능
        self.postMessage({ id: id, time: executionTime });
    }, delay);
};
