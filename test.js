const inputList = [
    [1, 2, 3],
    [1, 2, 4],
    [2, 3, 3],
    [4, 5, 6],
    [5, 3, 7],
];

const func = () => {
    inputList.sort((a, b) => a - b);
    inputList.forEach(v => console.log(v));
}

func();