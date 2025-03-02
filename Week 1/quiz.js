const fs = require("fs"); //Including file system module
const readline = require("readline"); //Including readline module

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const FILE_PATH = "scores.json";

// ANSI Colors for styling
const colors = {
    reset: "\x1b[0m",
    yellow: "\x1b[33m",
    green: "\x1b[32m",
    red: "\x1b[31m",
    blue: "\x1b[34m",
    cyan: "\x1b[36m",
    bold: "\x1b[1m",
};

// Loading previous scores
let scores = {};
if (fs.existsSync(FILE_PATH)) {
    scores = JSON.parse(fs.readFileSync(FILE_PATH));
}

// General Knowledge Question Set 1
const generalQuestions1 = [
    {
        question: "What is the capital of Australia?",
        options: ["Sydney", "Canberra", "Melbourne"],
        answer: "Canberra",
    },
    {
        question: "Which planet has the most moons?",
        options: ["Jupiter", "Saturn", "Neptune"],
        answer: "Saturn",
    },
    {
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond"],
        answer: "Diamond",
    },
    {
        question: "Which language is most spoken worldwide?",
        options: ["English", "Spanish", "Mandarin"],
        answer: "Mandarin",
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "Japan", "Korea"],
        answer: "Japan",
    },
];

// General Knowledge Question Set 2
const generalKnowledge2 = [
    {
      question: `Who is this person?\n
        [▓▓▓▓▓▓▓] 
        [ ░👓░ ]  <== Hint: Theoretical physicist with wild hair
        [ ░👃░ ]  
        [ ░👄░ ]  
      `,
      options: ["Isaac Newton", "Albert Einstein", "Nikola Tesla"],
      answer: "Albert Einstein",
    },
    {
      question: `Who is this tech entrepreneur?\n
        [▓▓▓▓▓▓▓]  
        [ ░👀░ ]  <== Hint: Tesla, SpaceX, X (Twitter)
        [ ░👃░ ]  
        [ ░👄░ ]  
      `,
      options: ["Elon Musk", "Jeff Bezos", "Bill Gates"],
      answer: "Elon Musk",
    },
    {
      question: `This leader was the first President of the USA.\n
        [▓▓▓▓▓▓▓]  
        [ ░🎩░ ]  <== Hint: Appears on the 1-dollar bill
        [ ░👃░ ]  
        [ ░👄░ ]  
      `,
      options: ["George Washington", "Abraham Lincoln", "Theodore Roosevelt"],
      answer: "George Washington",
    },
    {
      question: `Who is this famous footballer?\n
        [▓▓▓▓▓▓▓]  
        [ ░⚽️░ ]  <== Hint: Argentinian football legend
        [ ░👃░ ]  
        [ ░👄░ ]  
      `,
      options: ["Cristiano Ronaldo", "Lionel Messi", "Neymar Jr"],
      answer: "Lionel Messi",
    },
    {
      question: `This person co-founded Microsoft.\n
        [▓▓▓▓▓▓▓]  
        [ ░👓░ ]  <== Hint: Microsoft, Philanthropy
        [ ░👃░ ]  
        [ ░👄░ ]  
      `,
      options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg"],
      answer: "Bill Gates",
    },
  ];
  
// Subject Besed Question Set
const subjects = {
    physics: [
        {
            question: "What is the SI unit of power?",
            options: ["Joule", "Newton", "Watt"],
            answer: "Watt",
        },
        {
            question: "Which color of light has the shortest wavelength?",
            options: ["Red", "Blue", "Violet"],
            answer: "Violet",
        },
        {
            question: "What is the first law of motion?",
            options: ["Law of Inertia", "Law of Acceleration", "Law of Reaction"],
            answer: "Law of Inertia",
        },
        {
            question: "What is the speed of light in vacuum?",
            options: ["3 × 10⁸ m/s", "1.5 × 10⁸ m/s", "5 × 10⁸ m/s"],
            answer: "3 × 10⁸ m/s",
        },
        {
            question: "Which of these is a scalar quantity?",
            options: ["Velocity", "Acceleration", "Energy"],
            answer: "Energy",
        },
    ],
    chemistry: [
        {
            question: "Which element has the highest atomic number?",
            options: ["Uranium", "Oganesson", "Plutonium"],
            answer: "Oganesson",
        },
        {
            question: "What is the chemical formula for table salt?",
            options: ["NaCl", "KCl", "CaCl"],
            answer: "NaCl",
        },
        {
            question: "Which acid is found in lemons?",
            options: ["Sulfuric Acid", "Citric Acid", "Hydrochloric Acid"],
            answer: "Citric Acid",
        },
        {
            question: "Which gas is responsible for the greenhouse effect?",
            options: ["Oxygen", "Carbon Dioxide", "Nitrogen"],
            answer: "Carbon Dioxide",
        },
        {
            question: "What is the pH value of pure water?",
            options: ["5", "7", "9"],
            answer: "7",
        },
    ],
    computer: [
        {
            question: "What does RAM stand for?",
            options: ["Random Access Memory", "Read-Only Memory", "Real Application Machine"],
            answer: "Random Access Memory",
        },
        {
            question: "What does HTTP stand for?",
            options: ["HyperText Transfer Protocol", "High Tech Processing", "Hyperlink Transfer Platform"],
            answer: "HyperText Transfer Protocol",
        },
        {
            question: "Which of these is NOT an operating system?",
            options: ["Windows", "Linux", "Python"],
            answer: "Python",
        },
        {
            question: "Which of these is NOT a database?",
            options: ["MySQL", "MongoDB", "React"],
            answer: "React",
        },
        {
            question: "Which data structure uses LIFO?",
            options: ["Queue", "Stack", "Linked List"],
            answer: "Stack",
        },
    ],
    grammar: [
        {
            question: "Which sentence is correct?",
            options: [
                "She don't like ice cream.",
                "She doesn't like ice cream.",
                "She no like ice cream.",
            ],
            answer: "She doesn't like ice cream.",
        },
        {
            question: "Identify the verb: 'The cat jumped over the fence.'",
            options: ["Cat", "Jumped", "Fence"],
            answer: "Jumped",
        },
        {
            question: "What is the plural of 'child'?",
            options: ["Childs", "Children", "Childes"],
            answer: "Children",
        },
        {
            question: "Which is a conjunction?",
            options: ["Because", "Quickly", "Elephant"],
            answer: "Because",
        },
        {
            question: "Which sentence is in past tense?",
            options: ["He runs fast.", "He ran fast.", "He run fast."],
            answer: "He ran fast.",
        },
    ],
};

// Start the quiz
const startQuiz = () => {
    rl.question(`${colors.blue}Enter your name: ${colors.reset}`, (name) => {
        let userName = name.toLowerCase();

        if (scores[userName]) {
            console.log(`${colors.green}Welcome back, ${userName}! Your past scores:${colors.reset}`);
            console.log(`📌 Level 1: ${scores[userName].level1} / 5`);
            console.log(`📌 Level 2: ${scores[userName].level2} / 5`);
            rl.question(`${colors.yellow}Do you want to continue from where you left? (yes/no): ${colors.reset}`, (choice) => {
                if (choice.toLowerCase() === "yes") {
                    askQuestions(generalKnowledge2, "level2", userName);
                } else {
                    scores[userName] = { level1: 0, level2: 0 };
                    askCodingKnowledge(userName);
                }
            });
        } else {
            scores[userName] = { level1: 0, level2: 0 };
            askCodingKnowledge(userName);
        }
    });
};

// Asking if user knows coding
const askCodingKnowledge = (userName) => {
    rl.question(`${colors.yellow}Do you know programming? (yes/no): ${colors.reset}`, (answer) => {
        if (answer.toLowerCase() === "yes") {
            console.log(`${colors.green}Great! Your first round will be General Questions.${colors.reset}`);
            askQuestions(generalQuestions1, "level1", userName);
        } else {
            console.log(`${colors.cyan}Choose a subject: Physics, Chemistry, Computer Science, English Grammar${colors.reset}`);
            rl.question(`${colors.blue}Enter your choice: ${colors.reset}`, (subject) => {
                subject = subject.toLowerCase();
                if (subjects[subject]) {
                    askQuestions(subjects[subject], "level1", userName);
                } else {
                    console.log(`${colors.red}Invalid choice. Try again.${colors.reset}`);
                    askCodingKnowledge(userName);
                }
            });
        }
    });
};

// Asking questions
const askQuestions = (questions, level, userName) => {
    let index = 0;
    let score = 0;

    const askNext = () => {
        if (index < questions.length) {
            const { question, options, answer } = questions[index];

            console.log(`${colors.yellow}\n${question}${colors.reset}`);
            options.forEach((option, i) => console.log(`${colors.cyan}${i + 1}. ${option}${colors.reset}`));

            rl.question(`${colors.blue}Your answer (1/2/3): ${colors.reset}`, (userChoice) => {
                const choiceIndex = parseInt(userChoice) - 1;
                if (choiceIndex >= 0 && choiceIndex < options.length) {
                    if (options[choiceIndex] === answer) {
                        console.log(`${colors.green}✅ Correct!${colors.reset}\n`);
                        score++;
                    } else {
                        console.log(`${colors.red}❌ Wrong! The correct answer was ${answer}.${colors.reset}\n`);
                    }
                } else {
                    console.log(`${colors.red}Invalid choice! Please enter 1, 2, or 3.${colors.reset}`);
                }

                index++;
                askNext();
            });
        } else {
            scores[userName][level] = score;
            fs.writeFileSync(FILE_PATH, JSON.stringify(scores, null, 2));
            rl.close();
        }
    };

    askNext();
};

startQuiz();
