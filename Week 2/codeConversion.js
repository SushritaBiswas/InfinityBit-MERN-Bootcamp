const readline = require("readline"); // Importing readline module

// Function to create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to convert a binary number to a decimal number
function binaryDecimal(b) {
    let d = 0, p = 0;
    let i = b.length - 1;

    while (i >= 0) {
        if (b[i] === '1') {
            d += Math.pow(2, p);
        }
        p = (p + 1);
        i = (i - 1);
    }
    return d;
}

// Function to convert a decimal number to a binary number
function decimalBinary(d) {
    if (d === 0) return "0";
    let b = "";
    while (d > 0) {
        b = (d % 2) + b;
        d = Math.floor(d / 2);
    }
    return b;
}

// Function to convert binary to decimal (using 2's complement)
function twosComplementBinaryDecimal(binary) {
    if (binary[0] === '1') { // If MSB is 1, it's negative
        let inBinary = "";
        let carry = 1;
        let i = binary.length - 1;

        while (i >= 0) {
            let bit = binary[i] === '1' ? '0' : '1'; // Invert bits
            if (carry === 1) {
                if (bit === '1') {
                    bit = '0';
                } else {
                    bit = '1';
                    carry = 0;
                }
            }
            inBinary = bit + inBinary;
            i = (i - 1);
        }

        let positiveDecimal = binaryDecimal(inBinary);
        return -positiveDecimal;
    }

    return binaryDecimal(binary);
}

// Function to convert decimal to binary (using 2's complement)
function twosComplementDecimalBinary(decimal) {
    let bits = 8; // 8-bit representation
    let isNegative = decimal < 0;
    let binary = decimalBinary(Math.abs(decimal));

    while (binary.length < bits) {
        binary = "0" + binary;
    }

    if (isNegative) {
        let inBinary = "";
        let i = 0;
        while (i < binary.length) {
            inBinary += binary[i] === '1' ? '0' : '1';
            i = (i + 1);
        }

        let carry = 1;
        let twosComplement = "";
        i = inBinary.length - 1;

        while (i >= 0) {
            if (inBinary[i] === '1' && carry === 1) {
                twosComplement = "0" + twosComplement;
            } else if (inBinary[i] === '0' && carry === 1) {
                twosComplement = "1" + twosComplement;
                carry = 0;
            } else {
                twosComplement = inBinary[i] + twosComplement;
            }
            i = (i - 1);
        }

        return twosComplement;
    }

    return binary;
}

// Function to validate if a string is a valid binary number
function isValidBinary(str) {
    let i = 0;
    while (i < str.length) {
        if (str[i] !== '0' && str[i] !== '1') return false;
        i = (i + 1);
    }
    return true;
}

// Function to validate if input is a valid decimal number
function isValidDecimal(str) {
    return /^-?\d+$/.test(str);
}

// Reading user input
rl.question("Enter input (B ___, D ___, B -___, D -___): ", (input) => {
    if (input.startsWith("B ")) {
        let binary = input.slice(2).trim();
        if (!isValidBinary(binary)) {
            console.log("Invalid binary input.");
        } else {
            console.log(`Decimal: ${binaryDecimal(binary)}`);
        }
    }
    else if (input.startsWith("D ")) {
        let decimal = input.slice(2).trim();
        if (!isValidDecimal(decimal)) {
            console.log("Invalid decimal input.");
        } else {
            console.log(`Binary: ${decimalBinary(parseInt(decimal))}`);
        }
    }
    else if (input.startsWith("B -")) {
        let binary = input.slice(3).trim();
        if (!isValidBinary(binary)) {
            console.log("Invalid binary input.");
        } else {
            console.log(`Decimal (2's Complement): ${twosComplementBinaryDecimal(binary)}`);
        }
    }
    else if (input.startsWith("D -")) {
        let decimal = input.slice(3).trim();
        if (!isValidDecimal(decimal)) {
            console.log("Invalid decimal input.");
        } else {
            console.log(`Binary (2's Complement): ${twosComplementDecimalBinary(parseInt(decimal))}`);
        }
    }
    else {
        console.log("Invalid input format.");
    }
    rl.close();
});
