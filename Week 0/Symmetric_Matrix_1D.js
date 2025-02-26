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
    let row, num, i, arr = [];

    row = await askQuestion("Enter the number of rows for the square matrix: ");

    num = row * row;
    console.log(`Enter ${num} elements for the matrix:`);

    i = 0;
    while (i < num) {
        arr[i] = await askQuestion(`Element ${i + 1}: `);
        i = i + 1;
    }
    return { arr, row };
}

// Show data function
async function showData(arr, row) {
    let i, j, num;

    num = row * row;
    console.log("The corresponding matrix is:");

    i = 0;
    while (i < row) {
        let rowData = "";
        j = 0;
        while (j < row) {
            rowData = rowData + `${arr[i * row + j]} `;
            j = j + 1;
        }
        console.log(rowData.trim());
        i = i + 1;
    }
}

// Is symmetric function
function isSymmetric(arr, row) {
    let flag = 0;
    let i = 0, j = 0;

    while (i < row) {
        j = 0;
        while (j < i) {
            if (arr[i * row + j] !== arr[j * row + i]) {
                flag = flag + 1;
                break;
            }
            j = j + 1;
        }
        i = i + 1;
    }

    if (flag === 0) {
        console.log("The matrix is a symmetric matrix");
    } else {
        console.log("The matrix is not a symmetric matrix");
    }
}

// Main function 
async function main() {
    const { arr, row } = await getData();
    console.log("\nThe Matrix is:\n");
    await showData(arr, row);
    await isSymmetric(arr, row);
    A.close();
}

main();
