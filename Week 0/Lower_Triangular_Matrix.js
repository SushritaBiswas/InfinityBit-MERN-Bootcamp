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
    let row, N, i, arr = [];

    row = await askQuestion("Enter the number of rows for the lower triangular matrix: ");

    i = 1;
    N = 0;
    while (i <= row) {
        N = N + i;
        i = i + 1;
    }

    console.log(`Enter ${N} non-zero elements:`);

    i = 0;
    while (i < N) {
        arr[i] = await askQuestion(`Element ${i + 1}: `);
        i = i + 1;
    }
    return { arr, row };
}

// Show data function
async function showData(arr, row) {
    let scan, i, j;

    scan = 0;
    i = 1;

    while (i <= row) {
        j = 1;
        let rowData = "";

        while (j <= row) {
            if (j <= i) {
                rowData = rowData + `${arr[scan]} `;
                scan = scan + 1; 
            } else {
                rowData = rowData + "0 ";
            }
            j = j + 1;
        }
        
        console.log(rowData.trim());
        i = i + 1;
    }
}

// Main function 
async function main() {
    const { arr, row } = await getData();
    console.log("\nThe Lower Triangular Matrix is:\n");
    await showData(arr, row);
    A.close();
}

main();
