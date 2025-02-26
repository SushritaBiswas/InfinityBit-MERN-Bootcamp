const readline = require("readline");

const A = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise(resolve => A.question(query, answer => resolve(parseInt(answer, 10))));
}

// Get data function
async function getData() {
    let N, i, arr = [];

    N = await askQuestion("Enter the number of elements to be inserted in the array: ");

    i = 0;
    while (i < N) {
        arr[i] = await askQuestion(`Enter data for element ${i + 1}: `);
        i = (i + 1);
    }
    return arr;
}

// Show data function
async function showData(arr) {
    console.log("The elements of the array are: ");
    let i = 0;
    while (i < arr.length) {
        console.log(`${arr[i]}`);
        i = (i + 1);
    }
}

// Insertion Sort function
async function insertionSort(arr) {
    let i, j, R;

    i = 1;
    while (i < arr.length) {
        R = arr[i];
        j = i - 1;

        while (j >= 0 && arr[j] > R) {
            arr[j + 1] = arr[j];
            j = (j - 1);
        }
        
        arr[j + 1] = R; 
        i = (i + 1);
    }
}

// Main function 
async function main() {
    const arr = await getData();
    console.log("Before Sorting:");
    await showData(arr);

    await insertionSort(arr);

    console.log("After Sorting:");
    await showData(arr);
    
    A.close();
}

main();
