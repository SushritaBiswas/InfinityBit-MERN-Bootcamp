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
        i=(i+1)
    }
    return arr;
}

// Show data function
async function showData(arr) {
    console.log("The elements of the array are: ");
    let i = 0;
    while (i < arr.length) {
        console.log(`${arr[i]}`);
        i=(i+1);
    }
}

// Bubble Sort function
async function bubbleSort(arr) {
    let scan, R, i, F;

    scan = 0;
    while (scan < arr.length - 1) {
        i = 0;
        F = 0;
        while (i < (arr.length - scan - 1)) {
            if (arr[i] > arr[i + 1]) {
                R = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = R;
                F = 1;
            }
            i=(i+1);
        }
        if (F == 0) {
            break;
        }
        scan=(scan+1);
    }
}

// Main function 
async function main() {
    const arr = await getData();
    console.log("Before Sorting:");
    await showData(arr);

    await bubbleSort(arr);

    console.log("After Sorting:");
    await showData(arr);
    
    A.close();
}

main();
