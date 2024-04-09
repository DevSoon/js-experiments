function simplePromiseAllSettled(promises) {
    return new Promise((resolve) => {
        const results = [];
        let completed = 0;
        const total = promises.length;

        if (total === 0) {
            resolve(results);  // 빈 배열을 즉시 resolve
            return;
        }

        promises.forEach((promise, index) => {
            // 프로미스로 변환 (이미 프로미스가 아니라면)
            Promise.resolve(promise)
                .then(value => {
                    // 성공한 경우, 상태와 값을 결과 배열에 저장
                    results[index] = { status: 'fulfilled', value: value };
                })
                .catch(reason => {
                    // 실패한 경우, 상태와 이유를 결과 배열에 저장
                    results[index] = { status: 'rejected', reason: reason };
                })
                .finally(() => {
                    completed += 1;
                    if (completed === total) {
                        // 모든 프로미스가 처리되면 결과 배열을 resolve
                        resolve(results);
                    }
                });
        });
    });
}

// 성공 및 실패가 섞인 시나리오
simplePromiseAllSettled([Promise.resolve(1), Promise.reject('Failure'), Promise.resolve(3)])
    .then(result => console.log('Results:', result))
    .catch(error => console.log('Error:', error));  // allSettled은 실패 시 catch 블록을 실행하지 않습니다.

// 모두 성공 시나리오
simplePromiseAllSettled([Promise.resolve('A'), Promise.resolve('B')])
    .then(result => console.log('Results:', result));