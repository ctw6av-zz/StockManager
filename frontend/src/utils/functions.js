// Fit an asynchronous function into a promise. It let us choose
// when execute some code only when an asynchronous call is ended.
export async function makePromise(setter, value) {
  await setter(value)
}