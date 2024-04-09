function simplePromiseAll(promises) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            reject(new TypeError("Input must be an array of promises."));
            return;
        }

        const results = new Array(promises.length);
        let completed = 0;
        const total = promises.length;
        let rejected = false;

        if (total === 0) {
            resolve(results);
            return;
        }

        promises.forEach((promise, index) => {
            Promise.resolve(promise).then(value => {
                if (!rejected) {
                    results[index] = value;
                    completed++;
                    if (completed === total) {
                        resolve(results);
                    }
                }
            }).catch(error => {
                if (!rejected) {
                    rejected = true;
                    reject(error);
                }
            });
        });
    });
}

// 성공 시나리오
simplePromiseAll([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)])
    .then(result => console.log('Success:', result))
    .catch(error => console.log('Error:', error));

// 실패 시나리오
simplePromiseAll([Promise.resolve(1), Promise.reject('Failure'), Promise.resolve(3)])
    .then(result => console.log('Success:', result))
    .catch(error => console.log('Error:', error));