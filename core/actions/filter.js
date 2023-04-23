function filter(arr, filterFn) {
    const filtered = [];
    for (let i = 0; i < arr.length; i++) {
      if (filterFn(arr[i])) {
        filtered.push(arr[i]);
      }
    }
    return filtered;
}

module.exports = {filter}


  