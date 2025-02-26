const readline = require('readline');

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

//Bubble Sort function
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

// Show data function
async function showData(arr) {
    console.log("The elements of the array are: ");
    let i = 0;
    while (i < arr.length) {
        console.log(`${arr[i]}`);
        i=(i+1);
    }
}


//Binary Search function
async function binarySearch(arr) {
    let x, loc, UB, LB, MID;

    x = await askQuestion("Enter the element to be searched: ");

    loc = -1;
    LB = 0;
    UB = ((arr.length) - 1);

    while (LB <= UB) {
        MID = Math.floor((LB + UB) / 2);
        if (x == arr[MID]) {
            loc = MID;
            break;
        }
        else if (x < arr[MID]) {
            UB = (MID - 1);
        }
        else {
            LB = (MID + 1);
        }
    }

    if (loc == -1) {
        console.log("Element not found");
    } else {
        console.log(`Element found at index ${loc}`);
    }

}

// Main function 
async function main() {
    const arr = await getData();
    await bubbleSort(arr); 
    await showData(arr);
    await binarySearch(arr);
    A.close();
}

main();
