const fs = require("fs");
const readline = require("readline");
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

const FILE_PATH = "scores.json";

// ANSI Colors for CLI styling
const colors = {
    reset: "\x1b[0m",
    yellow: "\x1b[33m",
    green: "\x1b[32m",
    red: "\x1b[31m",
    blue: "\x1b[34m",
    cyan: "\x1b[36m",
    bold: "\x1b[1m",
};

let scores = fs.existsSync(FILE_PATH) ? JSON.parse(fs.readFileSync(FILE_PATH)) : {};

// General Questions set 1
const generalQuestions1 = [
    { question: "What is the capital of Australia?", options: ["Sydney", "Canberra", "Melbourne"], answer: "Canberra" },
    { question: "Which planet has the most moons?", options: ["Jupiter", "Saturn", "Neptune"], answer: "Saturn" },
    { question: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond"], answer: "Diamond" },
    { question: "Which language is most spoken worldwide?", options: ["English", "Spanish", "Mandarin"], answer: "Mandarin" },
    { question: "Which country is known as the Land of the Rising Sun?", options: ["China", "Japan", "Korea"], answer: "Japan" },
];

// General Knowledge Question set 2
const generalQuestions2 = [
    { question: "Who developed the theory of relativity?", options: ["Isaac Newton", "Albert Einstein", "Nikola Tesla"], answer: "Albert Einstein" },
    { question: "Who is the CEO of Tesla?", options: ["Elon Musk", "Jeff Bezos", "Bill Gates"], answer: "Elon Musk" },
    { question: "Who was the first President of the USA?", options: ["George Washington", "Abraham Lincoln", "Theodore Roosevelt"], answer: "George Washington" },
    { question: "Which footballer has won the most Ballon d'Or awards?", options: ["Cristiano Ronaldo", "Lionel Messi", "Neymar Jr"], answer: "Lionel Messi" },
    { question: "Who co-founded Microsoft?", options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg"], answer: "Bill Gates" },
];

// Subject-Based Question Set
const subjects = {
    physics: [
        { question: "What is the SI unit of power?", options: ["Joule", "Newton", "Watt"], answer: "Watt" },
        { question: "Which color of light has the shortest wavelength?", options: ["Red", "Blue", "Violet"], answer: "Violet" },
        { question: "What is the first law of motion?", options: ["Law of Inertia", "Law of Acceleration", "Law of Reaction"], answer: "Law of Inertia" },
        { question: "What is the speed of light in vacuum?", options: ["3 × 10⁸ m/s", "1.5 × 10⁸ m/s", "5 × 10⁸ m/s"], answer: "3 × 10⁸ m/s" },
        { question: "Which of these is a scalar quantity?", options: ["Velocity", "Acceleration", "Energy"], answer: "Energy" },
    ],
    chemistry: [
        { question: "Which element has the highest atomic number?", options: ["Uranium", "Oganesson", "Plutonium"], answer: "Oganesson" },
        { question: "What is the chemical formula for table salt?", options: ["NaCl", "KCl", "CaCl"], answer: "NaCl" },
        { question: "Which acid is found in lemons?", options: ["Sulfuric Acid", "Citric Acid", "Hydrochloric Acid"], answer: "Citric Acid" },
        { question: "Which gas is responsible for the greenhouse effect?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen"], answer: "Carbon Dioxide" },
        { question: "What is the pH value of pure water?", options: ["5", "7", "9"], answer: "7" },
    ],
};

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const startQuiz = () => {
    rl.question(`${colors.blue}Enter your name: ${colors.reset}`, (name) => {
        let userName = name.toLowerCase();
        if (!scores[userName]) scores[userName] = { level1: 0, level2: 0 };
        askCodingKnowledge(userName);
    });
};

const askCodingKnowledge = (userName) => {
    rl.question(`${colors.yellow}Do you know programming? (yes/no): ${colors.reset}`, (answer) => {
        if (answer.toLowerCase() === "yes") {
            askQuestions(generalQuestions1, "level1", userName);
        } else {
            rl.question(`${colors.blue}Choose a subject (physics/chemistry): ${colors.reset}`, (subject) => {
                subject = subject.toLowerCase();
                if (subjects[subject]) {
                    console.log(`${colors.cyan}You have selected ${subject}! Let's begin...${colors.reset}`);
                    askQuestions(subjects[subject], "level1", userName);
                } else {
                    console.log(`${colors.red}Invalid choice. Defaulting to Physics.${colors.reset}`);
                    askQuestions(subjects.physics, "level1", userName);
                }
            });
        }
    });
};

const askQuestions = (questions, level, userName) => {
    let index = 0;
    let score = 0;

    const askNext = () => {
        if (index < questions.length) {
            const { question, options, answer } = questions[index];
            console.log(`${colors.yellow}\n${question}${colors.reset}`);
            options.forEach((option, i) => console.log(`${colors.cyan}${i + 1}. ${option}${colors.reset}`));

            rl.question(`${colors.blue}Your answer (1/2/3): ${colors.reset}`, (userChoice) => {
                if (options[userChoice - 1] === answer) {
                    console.log(`${colors.green}✅ Correct!${colors.reset}\n`);
                    score++;
                } else {
                    console.log(`${colors.red}❌ Wrong! The correct answer was ${answer}.${colors.reset}\n`);
                }
                index++;
                askNext();
            });
        } else {
            scores[userName][level] = score;
            fs.writeFileSync(FILE_PATH, JSON.stringify(scores, null, 2));
            if (level === "level1") {
                askLevel2(userName);
            } else {
                console.log(`${colors.green}Your score is saved!${colors.reset}`);
                rl.close();
            }
        }
    };

    askNext();
};

const askLevel2 = (userName) => {
    rl.question(`${colors.yellow}Do you want to continue to Level 2? (yes/no): ${colors.reset}`, (choice) => {
        if (choice.toLowerCase() === "yes") {
            askQuestions(generalQuestions2, "level2", userName);
        } else {
            console.log(`${colors.green}Thanks for playing! Your scores are saved.${colors.reset}`);
            rl.close();
        }
    });
};

app.get("/", (req, res) => res.send("Welcome to the Quiz Server!"));
app.get("/questions", (req, res) => res.json({ questions: generalQuestions1 }));
app.get("/questions/level2", (req, res) => res.json({ questions: generalQuestions2 }));

app.listen(PORT, () => console.log(`${colors.green}Server is running on http://localhost:${PORT}${colors.reset}`));

startQuiz();
