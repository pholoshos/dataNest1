function find(arr, searchFn) {
    for (let i = 0; i < arr.length; i++) {
        if (searchFn(arr[i])) {
            return arr[i];
        }
    }
    return undefined;
}

module.exports = {find}
