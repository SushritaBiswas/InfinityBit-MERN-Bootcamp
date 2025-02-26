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

// Linear Search function
async function linearSearch(arr) {
    let x, i, loc;

    x = await askQuestion("Enter the element to be searched: ");

    loc = -1;
    i = 0;
    while (i < arr.length) {
        if (arr[i] == x) {
            loc = i;
            break;
        }
        i = (i + 1);
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
    await linearSearch(arr);
    A.close();
}

main();
