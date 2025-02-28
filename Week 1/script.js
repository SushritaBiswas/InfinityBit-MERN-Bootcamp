const fs = require('fs'); // File system module
const readline = require('readline');

const databasePath = './database.json';

// Function to read data from the JSON file
function readDataFromJson() {
    try {
        return JSON.parse(fs.readFileSync(databasePath, 'utf-8'));
    } catch {
        return [];
    }
}

// Function to write data into the JSON file
function writeDataInJson(data) {
    try {
        fs.writeFileSync(databasePath, JSON.stringify(data, null, 2), 'utf-8');
        console.log('Data has been written successfully in the JSON file!');
    } catch (error) {
        console.error('Failed to write data:', error.message);
    }
}


// Function to add a new student
function addStudent(student) {
    const students = readDataFromJson();
    students.push(student);
    writeDataInJson(students);
    console.log('Student added successfully!');
}

// Function to list all students
function listStudents() {
    const students = readDataFromJson();
    if (students.length === 0) {
        console.log('No students found.');
    } else {
        console.log('\n--- Student List ---');
        students.forEach((student, index) => {
            console.log(`${index + 1}. ${student.regNum} - ${student.studentName}`);
        });
    }
}

// Function to edit a student's data by registration number
function editStudent(regNum) {
    const students = readDataFromJson();
    const index = students.findIndex(student => student.regNum === regNum);
    if (index === -1) {
        console.log('Student not found.');
        return;
    }
    console.log('Editing student:', students[index]);
    promptData((updatedStudent) => {
        students[index] = { ...students[index], ...updatedStudent };
        writeDataInJson(students);
        console.log('Student updated successfully!');
    });
}

// Function to delete a student by registration number
function deleteStudent(regNum) {
    const students = readDataFromJson();
    const updatedStudents = students.filter(student => student.regNum !== regNum);
    writeDataInJson(updatedStudents);
    console.log('Student deleted successfully!');
}

// Function to prompt for student data
function promptData(callback) {
    console.clear(); // Clear terminal before taking input
    const rdl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const student = {};

    rdl.question('Registration Number: ', (regNum) => {
        student.regNum = regNum.trim(); 
        rdl.question('Roll Number: ', (rollNum) => {
            student.rollNum = rollNum.trim();
            rdl.question('Student Name: ', (studentName) => {
                student.studentName = studentName.trim();

                rdl.question('Bengali Marks: ', (bengaliMarks) => {
                    student.bengaliMarks = parseInt(bengaliMarks);
                    rdl.question('English Marks: ', (englishMarks) => {
                        student.englishMarks = parseInt(englishMarks);
                        rdl.question('Math Marks: ', (mathMarks) => {
                            student.mathMarks = parseInt(mathMarks);
                            rdl.question('Physics Marks: ', (physicsMarks) => {
                                student.physicsMarks = parseInt(physicsMarks);
                                rdl.question('Chemistry Marks: ', (chemistryMarks) => {
                                    student.chemistryMarks = parseInt(chemistryMarks);
                                    rdl.question('Computer Science Marks: ', (csMarks) => {
                                        student.csMarks = parseInt(csMarks);
                                        callback(student);
                                        rdl.close();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

// Function to start Command-Line_Interface
function startCLI() {
    console.clear();
    const rdl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    //Showing operations that can be performed
    console.log('\n---Student Grade Calculator ---');
    console.log('1. Add Student');
    console.log('2. List Students');
    console.log('3. Edit Student');
    console.log('4. Delete Student');
    console.log('5. Exit\n');

    rdl.question('Your Choice: ', (c) => {
        switch (c.trim()) { 
            case '1':
                rdl.close();
                promptData(addStudent);
                break;
            case '2':
                listStudents();
                rdl.close();
                break;
            case '3':
                rdl.question('Enter Registration Number to Edit: ', (regNum) => {
                    editStudent(regNum.trim());
                    rdl.close();
                });
                break;
            case '4':
                rdl.question('Enter Registration Number to Delete: ', (regNum) => {
                    deleteStudent(regNum.trim());
                    rdl.close();
                });
                break;
            case '5':
                console.log('Terminating the code');
                rdl.close();
                break;
            default:
                console.log('Invalid choice. Please select a valid option.');
                rdl.close();
                break;
        }
    });
}

startCLI();
