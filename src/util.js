
let i = 0
export let waitFor = (someAsyncVariable) => {
    if (someAsyncVariable) {
        return 
    }
    if (i === 100) {
        return
    }
    i++
    setTimeout(waitFor, 1000);
}