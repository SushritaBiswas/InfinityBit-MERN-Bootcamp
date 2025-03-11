const express = require('express'); //Including express module
const fs = require('fs');           //Including file system module
const readline = require('readline'); //Including readline module

const application = express();
const PORT = 3000;
const databasePath = './database.json';

application.use(express.json());

// Function to read data from JSON file
function readDataFromJson() {
    try {
        return JSON.parse(fs.readFileSync(databasePath, 'utf-8'));
    } catch {
        return [];
    }
}

// Function to write data into JSON file
function writeDataInJson(data) {
    try {
        fs.writeFileSync(databasePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error('Failed to write data:', error.message);
    }
}

// For getting all students
application.get('/students', (req, res) => {
    res.json(readDataFromJson());
});

// For adding a new student
application.post('/students', (req, res) => {
    const students = readDataFromJson();
    const newStudent = req.body;
    students.push(newStudent);
    writeDataInJson(students);
    res.status(201).json({ message: 'Student added successfully!', student: newStudent });
});

// For editing student via registration number
application.put('/students/:regNum', (req, res) => {
    const students = readDataFromJson();
    const index = students.findIndex(student => student.regNum === req.params.regNum);

    if (index === -1) {
        return res.status(404).json({ message: 'Student not found' });
    }

    students[index] = { ...students[index], ...req.body };
    writeDataInJson(students);
    res.json({ message: 'Student updated successfully!', student: students[index] });
});

// Route: Delete student via registration number
application.delete('/students/:regNum', (req, res) => {
    const students = readDataFromJson();
    const updatedStudents = students.filter(student => student.regNum !== req.params.regNum);

    if (students.length === updatedStudents.length) {
        return res.status(404).json({ message: 'Student not found' });
    }

    writeDataInJson(updatedStudents);
    res.json({ message: 'Student deleted successfully!' });
});

application.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// CLI Interface
function startCLI() {
    console.clear();
    const rdl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    console.log('\n--- Student Grade Calculator ---');
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
                console.log('Terminating...');
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