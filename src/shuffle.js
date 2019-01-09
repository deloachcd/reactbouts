function shuffle(arr) {
    function swap(i, j) {
        let tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }

    for (let i = arr.length-1; i > 0; i--) {
        swap(i, Math.floor(Math.random() * i));
    }
}

export default shuffle;