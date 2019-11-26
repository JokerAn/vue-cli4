class MyPromise {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError(` Promise resolver ${executor} is not a function`);
    }

    this.init();

    // 这里用try...catch是因为
    // 在promise的参数函数中的错误需要被then中的第二个回调函数所捕获，或者被catch函数所捕获
    // 如果在promise的参数参数中抛出错误，就用catch捕获，用this.reject函数去改变状态和存储拒因
    try {
      executor(this.resolve, this.reject);
    } catch (err) {
      this.reject(err);
    }
  }
  init = () => {
    this.status = MyPromise.PENDING; // 状态
    this.value = null; // 终值
    this.reason = null; // 拒因
    this.onFulfilledCallbacks = []; // 成功回调数组
    this.onRejectedCallbacks = []; // 失败回调数组
  };
  resolve = value => {
    // 状态的改变，成功回调的执行
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.FULFILLED;
      this.value = value;
      this.onFulfilledCallbacks.forEach(fn => fn(this.value)); // 用于异步的情况
    }
  };
  reject = reason => {
    // 状态的改变，失败回调的执行
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.REJECTED;
      this.reason = reason;
      this.onRejectedCallbacks.forEach(fn => fn(this.reason));
    }
  };
  then = (onFulfilled, onRejected) => {
    // 两个参数都是可选的
    // 如果不是函数则被忽略
    if (typeof onFulfilled !== MyPromise.Function) {
      // 如果第一个参数不是函数，就把第一个参数设置成函数，该函数返回成功时的终值
      // 并且该函数要在状态变为fulfilled时执行，参数就是终值
      onFulfilled = value => value;
    }
    if (typeof onRejected !== MyPromise.Function) {
      // 如果第二个参数不是函数，就把第二个参数设置成函数，该函数返回失败时候的拒因
      // 并且该函数要在状态变为fulfilled时执行，参数就是终值
      onRejected = reason => {
        throw reason;
      };
    }

    // 注意：
    // then方法要实现链式调用，必须返回一个新的实例，如果是原来的promise实例
    // then方法返回一个新的promise实例，即promise2
    let promise2 = new Promise((resolve2, reject2) => {
      if (this.status === MyPromise.FULFILLED) {
        // 这里用setTimeout的原因是：执行顺序
        // 如果不用定时器，then方法会立即执行，则不是微任务的表现
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            MyPromise.resolvePromise(promise2, x, resolve2, reject2);
          } catch (err2) {
            reject2(err2);
          }
        }, 0);
      }
      if (this.status === MyPromise.REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            MyPromise.resolvePromise(promise2, x, resolve2, reject2);
          } catch (err2) {
            reject2(err2);
          }
        }, 0);
      }
      if (this.status === MyPromise.PENDING) {
        // 当promise的参数函数中有异步操作时，then方法会优先于resolve()或者reject()先执行
        // 这样就是导致执行then()方法时，状态是pending状态
        // 这是需要用一个数组来存储将来才会执行的onFulfilled函数
        // 这里push进onFulfilledCallbacks的函数，将在resolve()函数中去执行
        this.onFulfilledCallbacks.push(value => {
          setTimeout(() => {
            // 这里之所以还要用setTimeout是因为在成功的回调函数中，resolve()后面还有同步代码的话，要保证把同步执行完，在去执行resolve函数
            // 如下：
            // console.log('4')
            // resolve('5')
            // console.log('6')
            // 要保证 4 6 5这样的顺序
            try {
              const x = onFulfilled(value);
              MyPromise.resolvePromise(promise2, x, resolve2, reject2);
            } catch (err2) {
              reject2(err2);
            }
          });
        });
        this.onRejectedCallbacks.push(reason => {
          setTimeout(() => {
            try {
              const x = onRejected(reason);
              MyPromise.resolvePromise(promise2, x, resolve2, reject2);
            } catch (err2) {
              reject2(err2);
            }
          });
        });
      }
    });
    return promise2;
  };
}
MyPromise.PENDING = "PENDING";
MyPromise.FULFILLED = "FULFILLED";
MyPromise.REJECTED = "REJECTED";
MyPromise.Function = "function";
MyPromise.resolvePromise = function(promise2, x, resolve, reject) {
  // x 与 promise 相等
  if (promise2 === x) {
    reject(new TypeError("Chaining cycle detected for promise"));
  }

  let called = false;
  if (x instanceof MyPromise) {
    // 判断 x 为 Promise
    x.then(
      value => {
        MyPromise.resolvePromise(promise2, value, resolve, reject);
      },
      reason => {
        reject(reason);
      }
    );
  } else if (x !== null && (typeof x === "object" || typeof x === "function")) {
    // x 为对象或函数
    try {
      const then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          value => {
            if (called) return;
            called = true;
            MyPromise.resolvePromise(promise2, value, resolve, reject);
          },
          reason => {
            if (called) return;
            called = true;
            reject(reason);
          }
        );
      } else {
        if (called) return;
        called = true;
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
};

Promise.defer = Promise.deferred = function() {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

module.exports = MyPromise;
